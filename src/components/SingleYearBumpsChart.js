import React from 'react';
import BumpsChart from 'react-bumps-chart';
import styled from 'styled-components';

const SingleYearBumpsChart = ({ data }) => {
  console.log(data);

  // Filter out crews not taking part in the latest year
  data.crews = data.crews.filter(
    crew => crew.values[crew.values.length - 1].pos !== -1
  );

  // Extract correct values
  data.crews = data.crews.map(crew => ({
    name: crew.name,
    values: crew.values.slice(-5).map((v, i) => ({ day: i, pos: v.pos })),
    valuesSplit: crew.valuesSplit.slice(-1),
  }));

  return <BumpsChart data={data} />;
};

export default SingleYearBumpsChart;
