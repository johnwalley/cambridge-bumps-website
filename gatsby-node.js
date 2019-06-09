const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `ResultsJson`) {
    createNodeField({
      node,
      name: `slug`,
      value: `${node.small.toLowerCase()}/${node.gender.toLowerCase()}`,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allResultsJson {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allResultsJson.edges.forEach(({ node }) => {
        createPage({
          path: `history/${node.fields.slug}`,
          component: path.resolve(`./src/templates/results.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        });

        createPage({
          path: `latest/${node.fields.slug}`,
          component: path.resolve(`./src/templates/latest.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        });
      });
      resolve();
    });
  });
};
