import { useState, useMemo, useCallback } from 'react';
import { Chart } from 'react-charts';
import config from 'config';

const {
  coinChart: { axes, series, primaryCursor, tooltip },
} = config;

const MarketChart = ({ data = [] }) => {
  const [activeDatumIndex, setActiveDatumIndex] = useState(-1);

  // Format and memoized market data
  const memoized_market_chart = useMemo(() => {
    return [
      {
        label: 'Price',
        data:
          data?.prices?.map(([ts, price]) => ({
            primary: new Date(ts),
            secondary: price,
          })) ?? [],
      },
    ];
  }, [data]);

  const getDatumStyleMemoized = useCallback(
    datum => ({
      r: activeDatumIndex === datum.index ? 7 : 0,
    }),
    [activeDatumIndex]
  );

  const getSeriesStyle = useCallback(series => {
    const start = series?.datums?.[0]?.yValue,
      end = series?.datums?.[series.datums.length - 1]?.yValue;
    return {
      color: end > start ? '#22C55E' : '#EF4444',
    };
  }, []);

  const handleOnFocusChart = useCallback(
    focused => setActiveDatumIndex(focused ? focused.index : -1),
    [setActiveDatumIndex]
  );

  return (
    <Chart
      data={memoized_market_chart}
      series={series}
      axes={axes}
      tooltip={tooltip}
      getSeriesStyle={getSeriesStyle}
      getDatumStyle={getDatumStyleMemoized}
      onFocus={handleOnFocusChart}
      primaryCursor={primaryCursor}
    />
  );
};

export default MarketChart;
