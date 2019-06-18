import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../../components/layout';
import {
  findLastIndex,
  sum,
  sumBy,
  sortBy,
  uniq,
  flatten,
  groupBy,
  values,
  zip,
} from 'lodash';
import Blade, { shortShortNames, abbreviations } from 'react-rowing-blades';

const Description = styled.h3`
  font-size: 1.2rem;
  padding-top: 2px;
  margin-bottom: 2px;
  text-align: center;
`;

export default ({ data }) => {
  const results = data.allResultsJson.edges
    .filter(d => d.node.small === 'Town')
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

  const getTotalCrews = results => {
    return sortBy(
      values(
        groupBy(
          flatten(
            results.map(event =>
              event.crews
                .filter(crew => crew.values[crew.values.length - 1].pos !== -1)
                .map(crew => crew.name.replace(/[0-9]+$/, '').trim())
            )
          )
        )
      ).map(d => ({ club: d[0], count: d.length })),
      'club'
    );
  };

  const getPlacesGained = results => {
    return sortBy(
      Object.entries(
        groupBy(
          flatten(
            results.map(event =>
              event.crews
                .filter(crew => crew.values[crew.values.length - 1].pos !== -1)
                .map(crew => ({
                  club: crew.name.replace(/[0-9]+$/, '').trim(),
                  placesGained: sum(
                    [0, 1, 2, 3].map(d =>
                      crew.values[crew.values.length - 2 - d].pos === 1 &&
                      crew.values[crew.values.length - 1 - d].pos == 1
                        ? 1
                        : crew.values[crew.values.length - 2 - d].pos -
                          crew.values[crew.values.length - 1 - d].pos
                    )
                  ),
                }))
            )
          ),
          'club'
        )
      ).map(d => ({ club: d[0], placesGained: sumBy(d[1], 'placesGained') })),
      'club'
    );
  };

  const totalCrews = getTotalCrews(results);
  const placesGained = getPlacesGained(results);

  const finalResults = zip(totalCrews, placesGained).map(d => ({
    club: d[0].club,
    count: d[0].count,
    placesGained: d[1].placesGained,
    points: d[1].placesGained / d[0].count,
  }));

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
            <Description>John Jenner Trophy</Description>
            <p>Best overall performance.</p>
            {sortBy(finalResults, 'points')
              .reverse()
              .map(club => (
                <p key={club.club}>
                  {club.club} (
                  {parseFloat(Math.round(club.points * 100) / 100).toFixed(2)})
                </p>
              ))}
          </div>
        </div>
      </>
    </Layout>
  );
};

export const query = graphql`
  query {
    allResultsJson(filter: { small: { eq: "Town" } }) {
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
