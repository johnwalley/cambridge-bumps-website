import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Header from '../components/Header'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const TemplateWrapper = ({ children, data }) => (
  <div>
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
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
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
`
