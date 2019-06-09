import React from 'react';
import Helmet from 'react-helmet';
import './embed.css';

const EmbedWrapper = ({ children }) => (
  <>
    <Helmet
      title="Cambridge Bumps"
      meta={[
        { name: 'description', content: 'Cambridge Bumps' },
        { name: 'keywords', content: 'bumps, rowing' },
      ]}
    />
    {children}
  </>
);

export default EmbedWrapper;
