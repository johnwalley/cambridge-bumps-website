import React from 'react';
import styled from 'styled-components';
import 'url-search-params-polyfill';
import Layout from '../components/embed';

const Content = styled.div`
  width: 100%;
  height: 100%;
  background: #c02425; /* fallback for old browsers */
  background: linear-gradient(to right, #f0cb35, #c02425);
`;

const EmbedPage = ({ location }) => {
  const paramsString = location.search;

  const searchParams = new URLSearchParams(paramsString);

  return (
    <Layout>
      <Content>
        <p style={{ textAlign: 'center', color: 'white' }}>
          {`${searchParams.get('set')} - ${searchParams.get('gender')}`}
        </p>
      </Content>
    </Layout>
  );
};

export default EmbedPage;
