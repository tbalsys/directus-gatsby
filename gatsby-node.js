/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Sample query for all blog posts.
  const response = await graphql(`
    query GatsbyNodeQuery {
      allDirectusPost {
        edges {
          node {
            directusId
          }
        }
      }
    }
  `);

  // Destructure response to get post IDs
  const {
    data: {
      allDirectusPost: { edges: posts = [] },
    },
  } = response;

  // Build a new page for each blog post, passing the directusId
  // via `context` for the static query
  posts.forEach(({ node: post }) => {
    createPage({
      path: `/blog/${post.directusId}`,
      component: path.resolve('./src/templates/blog-post.tsx'),
      context: {
        postIdInt: post.directusId,
        postIdString: `${post.directusId}`,
      },
    });
  });
};