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
    this.state = { endYear: null };
    this.bumpsChart = null;
  }

  componentDidMount() {
    const numYearsToView = Math.max(
      0,
      Math.ceil((this.props.width - 310) / widthOfOneYear)
    );

    this.setState({ endYear: this.props.data.endYear });

    const year = {
      start: this.props.data.endYear - numYearsToView,
      end: this.props.data.endYear,
    };

    this.chart = bumpsChart()
      .year(year)
      .windowWidth(this.props.width)
      .on('selectYear', (start, end) => this.setState({ endYear: end }));

    select(this.bumpsChart)
      .datum(this.props.data)
      .call(this.chart);
  }

  componentDidUpdate() {
    const numYearsToView = Math.max(
      0,
      Math.ceil((this.props.width - 310) / widthOfOneYear)
    );

    const year = {
      start: this.state.endYear - numYearsToView,
      end: this.state.endYear,
    };

    this.chart.year(year).windowWidth(this.props.width);

    select(this.bumpsChart)
      .datum(this.props.data)
      .call(this.chart);
  }

  render() {
    return (
      <Chart className="bumpsChart" innerRef={el => (this.bumpsChart = el)}>
        <svg width="100%" preserveAspectRatio="xMidYMin" />
      </Chart>
    );
  }
}

export default withSizes(({ width }) => ({ width }))(BumpsChart);
