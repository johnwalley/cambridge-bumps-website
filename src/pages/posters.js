import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';

const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const PostersPage = () => {
  return (
    <Layout>
      <Content>
        <h1>Posters</h1>
        <p>Download PDF posters showing club's historical results and highlighting particular events.</p>
        <h2>Town Bumps</h2>
        <ul>
          <li>
            <a href="/posters/21st-century-fight-for-the-womens-headship.pdf">
              21st Century Fight for the Women's Headship
            </a>
          </li>
        </ul>
      </Content>
    </Layout>
  );
};

export default PostersPage;
