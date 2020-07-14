import { PageProps, Link, graphql } from 'gatsby';
import React from 'react';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Comments from "./comments"

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

      <Link to="/">Go back to the homepage</Link>

      <Comments id={post.directusId} />
    </Layout>
  );

};

export default BlogPost;
