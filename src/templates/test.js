import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { findLastIndex, sum, sortBy } from 'lodash';
import Blade, { shortShortNames, abbreviations } from 'react-rowing-blades';

const Description = styled.h3`
  font-size: 1.2rem;
  padding-top: 2px;
  margin-bottom: 2px;
  text-align: center;
`;

export default ({ data, pathContext: { small } }) => {
  return null;
  
  const results = data.allResultsJson.edges
    .filter(d => d.node.small === small)
    .map(d => d.node);

  let names;
  let abbr;

  switch (results[0].set) {
    case 'May Bumps':
    case 'Lent Bumps':
      names = shortShortNames.cambridge;
      abbr = abbreviations.cambridge;
      break;
    case 'Summer Eights':
    case 'Torpids':
      names = shortShortNames.oxford;
      abbr = abbreviations.oxford;
      break;
    case 'Town Bumps':
      names = shortShortNames.uk;
      abbr = Object.assign(
        {},
        ...Object.values(abbreviations.uk).map(x => ({ [x]: x }))
      );
      break;
    default:
      throw new Error(`${data.resultsJson.set} not recognised as a set`);
  }

  const getClubCode = crewName => {
    const name = crewName.replace(/ ?\d+$/g, '');

    let code = Object.keys(names).find(key => names[key] === abbr[name]);

    // Couldn't find club code based on abbreviation
    // Search using full name instead
    if (!code) {
      code = Object.keys(names).find(key => names[key] === name);
    }

    if (!code) {
      if (name === 'LMBC') {
        code = 'lmb';
      } else if (name === '1st and 3rd') {
        code = 'ftt';
      } else if (name === "St Catharine's") {
        code = 'scc';
      } else if (name === "St Edmund's") {
        code = 'sec';
      }
    }

    return code;
  };

  const getCurrentHeadOfTheRiverDaysHeld = results => {
    const crew = results.crews.find(
      crew => crew.values[crew.values.length - 1].pos === 1
    );

    const values = crew.values;

    return {
      name: crew.name,
      daysHeld: values.length - 2 - findLastIndex(values, v => v.pos !== 1),
    };
  };

  const currentHeadOfTheRiverDaysHeld = results.map(r =>
    getCurrentHeadOfTheRiverDaysHeld(r)
  );

  const headships = sortBy(
    results[0].crews.map(crew => ({
      sum: sum(
        crew.valuesSplit
          .map(v => v.values[v.values.length - 1].pos)
          .filter(pos => pos === 1)
      ),
      name: crew.name,
    })),
    ['sum']
  ).reverse();

  const biggestRisers = sortBy(
    results[0].crews.map(crew => ({
      rise:
        crew.values[crew.values.length - 1 - 4].pos -
        crew.values[crew.values.length - 1].pos,
      name: crew.name,
    })),
    ['rise']
  ).reverse();

  const blades = sortBy(
    results[0].crews.map(crew => ({
      blades: sum(
        crew.valuesSplit
          .map(
            v =>
              v.values[1].pos < v.values[0].pos &&
              v.values[2].pos < v.values[1].pos &&
              v.values[3].pos < v.values[2].pos &&
              v.values[4].pos < v.values[3].pos
          )
          .filter(v => v)
          .map(v => (v ? 1 : 0))
      ),
      name: crew.name,
    })),
    ['blades']
  ).reverse();

  const spoons = sortBy(
    results[0].crews.map(crew => ({
      spoons: sum(
        crew.valuesSplit
          .map(
            v =>
              v.values[1].pos > v.values[0].pos &&
              v.values[2].pos > v.values[1].pos &&
              v.values[3].pos > v.values[2].pos &&
              v.values[4].pos > v.values[3].pos
          )
          .filter(v => v)
          .map(v => (v ? 1 : 0))
      ),
      name: crew.name,
    })),
    ['spoons']
  ).reverse();

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
          <div>
            <Description>{`${results[0].set}`}</Description>
            <p>
              Top crews, of those currently competing in {results[0].set} in
              different statistical categories
            </p>
            <h2>Headships & Div I crews</h2>
            {currentHeadOfTheRiverDaysHeld.map((d, i) => (
              <span key={i}>
                <Blade club={getClubCode(d.name)} size={80} />
                {d.name} ({d.daysHeld})
              </span>
            ))}
            <span>Current Head of the River and days held</span>

            <h3>Total Number of Headships</h3>
            <p>
              <Blade club={getClubCode(headships[0].name)} size={80} />
              {headships[0].name} ({headships[0].sum})
            </p>
            <h2>Movement this week</h2>
            <h3>Biggest rise this year</h3>
            <p>
              <Blade club={getClubCode(biggestRisers[0].name)} size={80} />
              {biggestRisers[0].name} ({biggestRisers[0].rise})
            </p>
            <h3>Biggest fall this year</h3>
            <p>
              <Blade
                club={getClubCode(biggestRisers[biggestRisers.length - 1].name)}
                size={80}
              />
              {biggestRisers[biggestRisers.length - 1].name} (
              {biggestRisers[biggestRisers.length - 1].rise})
            </p>
            <h2>Blades & Spoons</h2>
            <h3>Number of times gained Blades</h3>
            <p>
              <Blade club={getClubCode(blades[0].name)} size={80} />
              {blades[0].name} ({blades[0].blades})
            </p>
            <h3>Number of times gained Spoons</h3>
            <p>
              <Blade club={getClubCode(spoons[0].name)} size={80} />
              {spoons[0].name} ({spoons[0].spoons})
            </p>
          </div>
        </div>
      </>
    </Layout>
  );
};

export const query = graphql`
  query($small: String!) {
    allResultsJson(filter: { small: { eq: $small } }) {
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
`;
