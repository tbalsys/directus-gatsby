import { PageProps, Link, graphql } from 'gatsby';
import React from 'react';

import Layout from "../components/layout"
import SEO from "../components/seo"

type DataProps = {
  allDirectusPost: {
    edges: {
      node: {
        directusId: string;
        title: string;
      }
    }[]
  }
}

export const pageQuery = graphql`
  query BlogQuery {
    allDirectusPost {
      edges {
        node {
          directusId
          title
        }
      }
    }
  }
`;

// The component that will render a list of blog posts
const BlogPage: React.FC<PageProps<DataProps>> = ({ data }) => {

  // Extracting post data from props.
  const { allDirectusPost: { edges = [] } } = data;
  const posts = edges.map(edge => edge.node);

  return (
    <Layout>
    <SEO title="Blog" />
    <h1>Posts</h1>

    {posts.map(post => (
      <p key={post.directusId}><Link to={`/blog/${post.directusId}`}>{post.title}</Link></p>
    ))}

    <Link to="/">Go back to the homepage</Link>
  </Layout>
  );

};

export default BlogPage;