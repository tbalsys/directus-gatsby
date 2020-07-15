import React, { useEffect, useState } from 'react';
import styles from "./directus-comments.module.css";

const Comment = ({ author, body }) => (
  <div className={styles.comment}>
    <h2 className={styles.author}>{author}</h2>
    <p className={styles.body}>{body}</p>
  </div>
)

const Comments = ({ path }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://directus-dev.balsys.eu.org/_/items/comments?filter[path][eq]=${path}`
      );
      const json = await response.json();
 
      setComments(json.data || []);
    };

    fetchData();
  }, [path]);

  return (
    <div>
      {comments.map(comment => <Comment key={comment.id} {...comment} />)}
    </div>
  );
};

export default Comments;
