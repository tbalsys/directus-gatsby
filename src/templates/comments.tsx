import React, {useEffect} from 'react';

// Helper to add scripts to our page
const insertScript = (id, parentElement) => {
  const script = window.document.createElement('script');
  script.async = true;
  script.id    = id;
  script.text  = `
      var remark_config = {
        host: "https://remark42-dev.balsys.eu.org",
        site_id: "directus-gatsby.netlify.app",
        components: ["embed"],
        url: "/blog/${id}",
      };
      (function(c) {
        for(var i = 0; i < c.length; i++){
          var d = document, s = d.createElement("script");
          s.src = remark_config.host + "/web/" +c[i] +".js";
          s.defer = true;
          (d.head || d.body).appendChild(s);
        }
      })(remark_config.components || ["embed"]);
  `;
  parentElement.appendChild(script);

  return script;
};

// Helper to remove scripts from our page
const removeScript = (id, parentElement) => {
  const script = window.document.getElementById(id);
  if (script) {
    parentElement.removeChild(script);
  }
};

// The actual component
const Comments = ({ id }) => {
  useEffect(() => {
    // If there's no window there's nothing to do for us
    if (! window) {
      return;
    }
    const document = window.document;

    // In case our #remark42 container exists we can add our comments script
    if (document.getElementById('remark42')) {
      insertScript(id, document.body);
    }

    // Cleanup; remove the script from the page
    return () => removeScript(id, document.body);
  }, [id]);

  return <div id="remark42" />
};

export default Comments;
