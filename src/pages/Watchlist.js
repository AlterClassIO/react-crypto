import useSWR from 'swr';
import { useLocalStorage, useMediaQuery } from 'hooks';
import { fetcher } from 'utils';
import { Layout } from 'partials';
import { Message, Table, TableSkeleton } from 'components';
import config from 'config';
// TODO: Import the react-router-dom dependencies here

const {
  table: { columns },
} = config;

const Watchlist = () => {
  // Retrieve coin's IDs in watchlist
  const [watchlist, setWatchlist] = useLocalStorage('crypto-watchlist', []);

  // Check screen dimensions
  const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false);

  // Fetch watchlist coins market data from API
  let {
    data: coins,
    error,
    isValidating,
  } = useSWR(
    () =>
      watchlist && watchlist?.length > 0
        ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=true&price_change_percentage=24h%2C7d&ids=${watchlist.join(
            ','
          )}`
        : null,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  // Format coins data
  if (coins && watchlist) {
    coins = coins?.map(coin => ({ ...coin, isInWatchlist: true }));
  }

  return (
    <Layout>
      <div className="mb-12 space-y-2">
        <h1 className="capitalize text-2xl font-semibold">Your watchlist</h1>
      </div>

      {error ? (
        <Message error>
          Something went wrong. Please try refreshing the page.
        </Message>
      ) : isValidating && !coins ? (
        <TableSkeleton cols={isLargeScreen ? 6 : 1} />
      ) : !coins || coins?.length === 0 ? (
        <Message>{/* TODO: Add a link back to the homepage here */}</Message>
      ) : (
        <Table
          columns={columns(isLargeScreen, null, id =>
            setWatchlist(watchlist?.filter(el => el !== id) ?? [])
          )}
          rows={coins}
        />
      )}
    </Layout>
  );
};

export default Watchlist;
