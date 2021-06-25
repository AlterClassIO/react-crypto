import { useState } from 'react';
import useSWR from 'swr';
import { useMediaQuery, useLocalStorage } from 'hooks';
import { fetcher, formatNumber } from 'utils';
import { Message, Pagination, Select, Table, TableSkeleton } from 'components';
import { Layout } from 'partials';
import config from 'config';
// TODO: Import the react-router-dom dependencies here

const {
  table: { columns, limits },
} = config;

const Home = () => {
  // 1. TODO: Retrieve the browser's history instance
  const history = null;
  // 2. TODO: Retrieve the location object that represents the current URL
  const location = null;
  // 3. TODO: Parse the URL query strings using URLSearchParams
  const query = new URLSearchParams('');
  // 4. TODO: Retrieve the URL query string (page)
  const page = '';

  // Check screen dimensions
  const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false);

  // For controlling the table's pagination
  const [pageIndex, setPageIndex] = useState(parseInt(page) || 1);
  const [pageLimit, setPageLimit] = useLocalStorage('page-limit', limits[0]);

  const [watchlist, setWatchlist] = useLocalStorage('crypto-watchlist', []);

  // Fetch global data about market from API
  const { data: globalData } = useSWR(
    'https://api.coingecko.com/api/v3/global',
    {
      refreshInterval: 1000,
    }
  );

  // Fetch coins market data from API (paginated)
  let { data: coins, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=true&price_change_percentage=24h%2C7d&page=${pageIndex}&per_page=${pageLimit}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  // Format coins data
  if (coins && watchlist) {
    coins = coins?.map(coin =>
      watchlist?.find(el => el === coin.id)
        ? { ...coin, isInWatchlist: true }
        : coin
    );
  }

  // Compute/retrieve data to display
  const totalMarketCap = globalData?.data?.total_market_cap?.usd ?? 0;
  const marketCapChangePerc24h =
    globalData?.data?.market_cap_change_percentage_24h_usd ?? 0;
  const totalActiveCryptos = globalData?.data?.active_cryptocurrencies ?? 0;
  const totalPages = Math.ceil(totalActiveCryptos / pageLimit);
  const start = 1 + (pageIndex - 1) * pageLimit;
  const end = totalActiveCryptos
    ? Math.min(start + pageLimit - 1, totalActiveCryptos)
    : '...';

  // Event handlers - page number change
  const handleOnPageChange = newPage => {
    // Update page state variable + path
    setPageIndex(newPage);

    // 5. TODO: add the new page index into the URL by pushing a new entry on the browser's history stack
    // ...

    // Scroll to top
    window.scrollTo(0, 0);
  };

  // Event handlers - page limit change
  const handleOnLimitChange = newLimit => {
    setPageLimit(newLimit);
  };

  return (
    <Layout>
      <div className="mb-12 space-y-2">
        <h1 className="capitalize text-2xl font-semibold">
          Today's cryptocurrency prices by market cap
        </h1>
        <p className="text-gray-500">
          The global crypto market cap is $
          {formatNumber(totalMarketCap, {
            notation: 'compact',
          })}
          , a{' '}
          <span
            className={`${
              marketCapChangePerc24h < 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {formatNumber(marketCapChangePerc24h)}%
          </span>{' '}
          {marketCapChangePerc24h < 0 ? 'decrease' : 'increase'} over the last
          day.
        </p>
      </div>

      {error ? (
        <Message error>
          Something went wrong. Please try refreshing the page.
        </Message>
      ) : (
        <>
          {!coins ? (
            <TableSkeleton cols={isLargeScreen ? 6 : 1} />
          ) : (
            <Table
              columns={columns(
                isLargeScreen,
                id => setWatchlist([...watchlist, id]),
                id => setWatchlist(watchlist?.filter(el => el !== id) ?? [])
              )}
              rows={coins}
            />
          )}
          <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-4 mt-6">
            {/* Table info */}
            <div className="text-gray-600 mt-6 lg:mt-0">
              Showing <span className="font-medium">{start}</span> to{' '}
              <span className="font-medium">{end}</span> of{' '}
              <span className="font-medium">{totalActiveCryptos}</span> results
            </div>

            {/* Table pagination */}
            <div className="order-first lg:order-none mx-auto">
              <Pagination
                currentPage={pageIndex}
                totalPages={totalPages}
                delta={isLargeScreen ? 2 : 1}
                onPageChange={handleOnPageChange}
              />
            </div>

            {/* Page limit selection */}
            <div className="flex items-center space-x-2 text-gray-600 mt-6 lg:mt-0">
              <span>Show rows</span>
              <Select
                options={limits}
                initialOption={pageLimit}
                onSelect={handleOnLimitChange}
              />
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
