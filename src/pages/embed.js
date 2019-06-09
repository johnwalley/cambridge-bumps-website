import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import 'url-search-params-polyfill';
import Layout from '../components/embed';
import BumpsChart from '../components/SingleYearBumpsChart';

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const EmbedPage = ({ location }) => {
  const paramsString = location.search;
  const searchParams = new URLSearchParams(paramsString);
  const set = searchParams.get('set');
  const gender = searchParams.get('gender');

  const data = useStaticQuery(graphql`
    query {
      allLatestJson {
        edges {
          node {
            set
            gender
            small
            crews {
              name
              values {
                day
                pos
              }
              valuesSplit {
                blades
                day
                name
                spoons
                values {
                  day
                  pos
                }
              }
            }
            divisions {
              year
              startDay
              numDays
              divisions {
                start
                size
              }
            }
            startYear
            endYear
            maxCrews
          }
        }
      }
    }
  `);

  const singleSetData = data.allLatestJson.edges.find(
    edge =>
      edge.node.small.toLowerCase() === set &&
      edge.node.gender.toLowerCase() === gender
  );

  if (!singleSetData) {
    return (
      <p>
        Cannot find results for {set} - {gender}
      </p>
    );
  }

  return (
    <Layout>
      <Content>
        <p style={{ textAlign: 'center' }}>
          {`${searchParams.get('set')} - ${searchParams.get('gender')}`}
        </p>
        <BumpsChart data={singleSetData.node} />
      </Content>
    </Layout>
  );
};

export default EmbedPage;
