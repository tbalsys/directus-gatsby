import { PageProps, Link, graphql } from 'gatsby';
import React from 'react';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Comments from "./directus-comments"

type DataProps = {
  directusPost: {
    directusId: string;
    title: string;
    content: string;
  }
}

// A static query, the results from which
// will be passed to our component. Uses the 'directusId' property
// passed via the `createPage` context config to retrieve the blog post.
export const query = graphql`
  query($directusId: Int!) {
    directusPost(directusId: {eq: $directusId}) {
      directusId
      title
      content
    }
  }
`;

// The component we'll render for a given blog post
const BlogPost: React.FC<PageProps<DataProps>> = ({
  data: { directusPost: post }
}) => {

  return (
    <Layout>
      <SEO title="Blog" />
      <h1>{post.title}</h1>
      <p dangerouslySetInnerHTML={{__html: post.content}} />

      <div>
        <hr />
        <h2>Comments</h2>
        <p>No comments yet.</p>
        <h3>Add a comment</h3>
        <form
          method="POST"
          action="https://staticman.balsys.eu.org/v2/entry/tbalsys/directus-gatsby/master/comments"
        >
          <input
            name="fields[directusId]"
            type="hidden"
            value={post.directusId}
          />
          <input name="fields[name]" type="text" placeholder="Name" required />
          <input
            name="fields[email]"
            type="email"
            placeholder="Email"
            required
          />
          <textarea name="fields[message]" placeholder="Comment" required />
          <button type="submit">Submit Comment</button>
        </form>
      </div>

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );

};

export default BlogPost;
