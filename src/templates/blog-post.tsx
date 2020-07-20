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
  allCommentsYaml: {
    edges: {
      node: {
        id: string;
        message: string;
        name: string;
        date: string;
      }
    }[];
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
    allCommentsYaml(filter: { directusId: { eq: $directusId } }) {
      edges {
        node {
          _id
          date
          email
          message
          name
        }
      }
    }
  }
`;

// The component we'll render for a given blog post
const BlogPost: React.FC<PageProps<DataProps>> = ({
  data: { directusPost: post, allCommentsYaml }
}) => {

  const comments = allCommentsYaml && Array.isArray(allCommentsYaml.edges)
    ? allCommentsYaml.edges.map(edge => edge.node)
    : [];

  return (
    <Layout>
      <SEO title="Blog" />
      <h1>{post.title}</h1>
      <p dangerouslySetInnerHTML={{__html: post.content}} />

      <div>
        <hr />
        <h2>Comments</h2>
        {
          comments.length ? (
            comments.map(comment => (
              <div key={comment.id}>
                <p>
                  Name: {comment.name}
                  <br />
                  Comment: {comment.message}
                  <br />
                  Date: {comment.date}
                </p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )mment: comm
Date: 1595236677
        }
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
