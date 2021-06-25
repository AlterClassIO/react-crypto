import React from 'react';
import { Chart } from 'react-charts';
import config from 'config';

const { sparkline } = config;

const Sparkline = ({ data = [], up = true }) => (
  <Chart
    data={sparkline.getFormattedData(data)}
    series={sparkline.series}
    getSeriesStyle={sparkline.getSeriesStyle(up)}
    axes={sparkline.axes}
  />
);

export default Sparkline;
