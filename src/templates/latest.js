import React from 'react';
import BumpsChart from '../components/SingleYearBumpsChart';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const Description = styled.h3`
  font-size: 1.2rem;
  padding-top: 2px;
  margin-bottom: 2px;
  text-align: center;
`;

export default ({ data }) => {
  return (
    <Layout>
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '16px',
          }}
        >
          <Description>
            {data.resultsJson.set} - {data.resultsJson.gender} -{' '}
            {data.resultsJson.endYear}
          </Description>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '520px' }}>
            <BumpsChart data={data.resultsJson} />
          </div>
        </div>
      </>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    resultsJson(fields: { slug: { eq: $slug } }) {
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
`;
