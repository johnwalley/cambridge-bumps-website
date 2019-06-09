import React from 'react';
import BumpsChart from '../components/BumpsChart';
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Description>
            {data.resultsJson.set} - {data.resultsJson.gender}
          </Description>
        </div>
        <BumpsChart data={data.resultsJson} />
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
