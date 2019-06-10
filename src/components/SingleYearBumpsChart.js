import React from 'react';
import BumpsChart from 'react-bumps-chart';

const SingleYearBumpsChart = ({ data }) => {
  const singleYearData = {
    set: data.set,
    gender: data.gender,
    crews: data.crews
      .filter(crew => crew.values[crew.values.length - 1].pos !== -1)
      .map(crew => ({
        name: crew.name,
        values: crew.values.slice(-5).map((v, i) => ({ day: i, pos: v.pos })),
        valuesSplit: crew.valuesSplit.slice(-1),
      })),
    divisions: data.divisions.slice(-1),
  };

  return <BumpsChart data={singleYearData} />;
};

export default SingleYearBumpsChart;
