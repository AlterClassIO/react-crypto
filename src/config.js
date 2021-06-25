import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatSparklineData,
} from 'utils';
import { StarIcon } from '@heroicons/react/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/outline';
import { Sparkline } from 'components';
// TODO: Import the react-router-dom dependencies here

// Coins listing table config
const limits = [100, 50, 20];

const columns = (
  isLargeScreen = false,
  addToWatchList = () => null,
  removeFromWatchList = () => null
) => [
  {
    id: 'watchlist',
    label: '',
    renderCell: row =>
      row.isInWatchlist ? (
        <StarIcon
          className="w-5 h-5 cursor-pointer text-yellow-500"
          onClick={() => removeFromWatchList(row.id)}
        />
      ) : (
        <StarIconOutline
          className="w-4 h-4 cursor-pointer"
          onClick={() => addToWatchList(row.id)}
        />
      ),
  },
  {
    id: 'rank',
    label: '#',
    renderCell: row => (
      <span className="text-sm">{row?.market_cap_rank ?? '-'}</span>
    ),
    hidden: !isLargeScreen,
  },
  {
    id: 'name',
    label: 'Name',
    align: 'left',
    renderCell: row => (
      /* TODO:
       *  - Render a <Link /> instead of a span
       *  - It should link to the corresponding coin's page
       *  - [Hint]: use row.id to get the current coin's id
       */
      <span className="flex items-center space-x-2">
        <img src={row.image} alt={row.symbol} width={24} height={24} />
        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
          <span className="text-sm sm:text-base sm:whitespace-nowrap">
            {row.name}
          </span>
          <p className="uppercase text-xs sm:text-base">
            <span className="bg-gray-200 text-gray-500 rounded-md py-1 px-2 font-medium mr-1 sm:hidden">
              {row.market_cap_rank}
            </span>
            <span className="text-gray-400">{row.symbol}</span>
          </p>
        </div>
      </span>
    ),
  },
  {
    id: 'price',
    label: 'Price',
    align: 'right',
    renderCell: row => formatCurrency(row.current_price),
  },
  {
    id: 'price_change_perc_24h',
    label: '24h %',
    align: 'right',
    renderCell: row => (
      <span
        className={
          row.price_change_percentage_24h_in_currency > 0
            ? 'text-green-500'
            : 'text-red-500'
        }
      >
        {formatNumber(row.price_change_percentage_24h_in_currency)}%
      </span>
    ),
  },
  {
    id: 'price_change_perc_7d',
    label: '7d %',
    align: 'right',
    renderCell: row => (
      <span
        className={
          row.price_change_percentage_7d_in_currency > 0
            ? 'text-green-500'
            : 'text-red-500'
        }
      >
        {formatNumber(row.price_change_percentage_7d_in_currency)}%
      </span>
    ),
  },
  {
    id: 'market_cap',
    label: 'Market cap',
    align: 'right',
    renderCell: row =>
      formatCurrency(row.market_cap, { maximumFractionDigits: 0 }),
  },
  {
    id: 'total_volume',
    label: 'Total Volume',
    align: 'right',
    renderCell: row =>
      formatCurrency(row.total_volume, { maximumFractionDigits: 0 }),
  },
  {
    id: 'circulating_supply',
    label: 'Circulating Supply',
    align: 'right',
    renderCell: row => (
      <span>
        {formatNumber(row.circulating_supply)}{' '}
        <span className="uppercase">{row.symbol}</span>
      </span>
    ),
  },
  {
    id: 'sparkline_in_7d',
    label: 'Last 7 days',
    align: 'right',
    renderCell: row => (
      <div className="h-12 w-40">
        <Sparkline
          data={row?.sparkline_in_7d?.price ?? []}
          up={row?.price_change_percentage_7d_in_currency > 0}
        />
      </div>
    ),
  },
];

// Sparkline config
const sparkline = {
  axes: [
    {
      primary: true,
      position: 'bottom',
      type: 'linear',
      show: false,
    },
    { position: 'left', type: 'linear', show: false },
  ],
  series: {
    showPoints: false,
  },
  getSeriesStyle:
    (up = true) =>
    () => ({
      color: up ? '#22C55E' : '#EF4444', // up -> green, down -> red
      opacity: 1,
    }),
  getFormattedData: (data = []) => formatSparklineData(data),
};

// Coin chart config
const coinChart = {
  axes: [
    {
      primary: true,
      position: 'bottom',
      type: 'time',
      showGrid: false,
    },
    { position: 'left', type: 'linear', format: d => `$${d}` },
  ],
  series: {
    showPoints: true,
  },
  primaryCursor: {
    showLabel: false,
  },
  tooltip: {
    anchor: 'closest',
    align: 'auto',
    render: ({ datum }) =>
      datum ? (
        <div className="text-white pointer-events-none px-2 py-1">
          <h3 className="font-semibold">{formatDate(datum.primary)}</h3>
          <p>
            Price:{' '}
            <span className="font-semibold">
              {formatCurrency(datum.secondary)}
            </span>
          </p>
        </div>
      ) : null,
  },
  days: [
    {
      label: '24H',
      value: 1,
    },
    {
      label: '7D',
      value: 7,
    },
    {
      label: '1M',
      value: 30,
    },
    {
      label: '3M',
      value: 90,
    },
    {
      label: '1Y',
      value: 365,
    },
    {
      label: 'MAX',
      value: 'max',
    },
  ],
};

const config = {
  table: {
    columns,
    limits,
  },
  sparkline,
  coinChart,
};
export default config;
