require("dotenv").config({ path: `.env` });

module.exports = {
  siteMetadata: {
    title: `Directus + Gatsby`,
    description: `Gatsby static site generator configured to use Directus headless CMS`,
    author: `Tomas Balsys`,
  },
  plugins: [
    {
      resolve: '@directus/gatsby-source-directus',
      options: {
        url: process.env.DIRECTUS_URL,
        project: '_',
        auth: {
          token: process.env.DIRECTUS_TOKEN,
        },
        targetStatuses: ['published', '__NONE__'],
        downloadFiles: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/_data/comments`,
        name: 'comments',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
