import React from 'react';
import BumpsChart from '../components/BumpsChart';
import styled from 'styled-components';

const Description = styled.h3`
  font-size: 1.2rem;
  padding-top: 2px;
  margin-bottom: 2px;
  text-align: center;
`;

export default ({ data, onDecrementYear, onIncrementYear }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Description>
          {data.resultsJson.set} - {data.resultsJson.gender}
        </Description>
      </div>
      <BumpsChart data={data.resultsJson} />
    </div>
  );
};

export const query = graphql`
  query ResultsQuery($slug: String!) {
    resultsJson(fields: { slug: { eq: $slug } }) {
      set
      gender
      small
      crews {
        gender
        name
        set
        values {
          day
          pos
        }
        valuesSplit {
          blades
          day
          gender
          name
          set
          spoons
          values {
            day
            pos
          }
        }
      }
      divisions {
        divisions {
          year
          start
          size
        }
        gender
        set
        year
      }
      startYear
      endYear
      maxCrews
    }
  }
`;
