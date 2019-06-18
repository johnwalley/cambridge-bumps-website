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
  const { createPage, createRedirect } = actions;

  createRedirect({
    fromPath: '/town/men',
    toPath: '/history/town/men',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/town/women',
    toPath: '/history/town/women',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/mays/men',
    toPath: '/history/mays/men',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/mays/women',
    toPath: '/history/mays/women',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/lents/men',
    toPath: '/history/lents/men',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/lents/women',
    toPath: '/history/lents/women',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/torpids/men',
    toPath: '/history/torpids/men',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/torpids/women',
    toPath: '/history/torpids/women',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/eights/men',
    toPath: '/history/eights/men',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/eights/women',
    toPath: '/history/eights/women',
    isPermanent: true,
    redirectInBrowser: true,
  });

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
            slug: node.fields.slug,
          },
        });

        createPage({
          path: `latest/${node.fields.slug}`,
          component: path.resolve(`./src/templates/latest.js`),
          context: {
            slug: node.fields.slug,
          },
        });

        createPage({
          path: `stats/${node.fields.slug}`,
          component: path.resolve(`./src/templates/stats.js`),
          context: {
            slug: node.fields.slug,
          },
        });
      });

      resolve();
    });

    graphql(`
      {
        allResultsJson {
          group(field: small) {
            field
            fieldValue
            totalCount
            edges {
              node {
                set
                gender
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allResultsJson.group.forEach(({ fieldValue }) => {
        createPage({
          path: `test/${fieldValue.toLowerCase()}`,
          component: path.resolve(`./src/templates/test.js`),
          context: {
            small: fieldValue,
          },
        });
      });

      resolve();
    });
  });
};
