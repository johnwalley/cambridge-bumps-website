import React from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import { StaticQuery, graphql } from 'gatsby';

import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.css';

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
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
    `}
    render={data => (
      <>
        <Helmet
          title="Cambridge Bumps"
          meta={[
            { name: 'description', content: 'Cambridge Bumps' },
            { name: 'keywords', content: 'bumps, rowing' },
          ]}
        />
        <Header data={data} />
        <div
          style={{
            margin: '0 auto',
            marginTop: '1rem',
            padding: '0px 1.0875rem 1.45rem',
          }}
        >
          {children}
        </div>
      </>
    )}
  />
);

export default TemplateWrapper;
