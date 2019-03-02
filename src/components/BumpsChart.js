import React from 'react';
import { select } from 'd3-selection';
import 'd3-transition';
import { bumpsChart } from 'd3-bumps-chart';
import styled from 'styled-components';
import withSizes from 'react-sizes';

const Chart = styled.div`
  svg {
    font-family: sans-serif;
  }
`;

const widthOfOneYear = 110;

class BumpsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { startYear: null };
    this.bumpsChart = null;
  }

  componentDidMount() {
    const numYearsToView = Math.max(
      0,
      Math.ceil((this.props.width - 310) / widthOfOneYear)
    );

    this.setState({ startYear: this.props.data.endYear - numYearsToView + 1 });

    const year = this.props.data.startYear;

    this.chart = bumpsChart()
      .year(year)
      .numYearsToView(numYearsToView)
      .windowWidth(this.props.width)
      .on('selectYear', (start, end) => this.setState({ startYear: start }));

    select(this.bumpsChart)
      .datum(this.props.data)
      .call(this.chart);
  }

  componentDidUpdate() {
    const numYearsToView = Math.max(
      0,
      Math.ceil((this.props.width - 310) / widthOfOneYear)
    );

    const year = this.state.startYear;

    this.chart
      .year(year)
      .numYearsToView(numYearsToView)
      .windowWidth(this.props.width);

    select(this.bumpsChart)
      .datum(this.props.data)
      .call(this.chart);
  }

  render() {
    return (
      <Chart className="bumpsChart" ref={el => (this.bumpsChart = el)}>
        <svg width="100%" preserveAspectRatio="xMidYMin" />
      </Chart>
    );
  }
}

export default withSizes(({ width }) => ({ width }))(BumpsChart);
