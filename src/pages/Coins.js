import useSWR from 'swr';
import { useLocalStorage } from 'hooks';
import { fetcher, formatCurrency, formatNumber, createMarkup } from 'utils';
import { MarketChart, Message } from 'components';
import { Layout } from 'partials';
import {
  CodeIcon,
  ChevronRightIcon,
  LinkIcon,
  ExternalLinkIcon,
  StarIcon as StarIconOutline,
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import config from 'config';
// TODO: Import the react-router-dom dependencies here

const {
  coinChart: { days },
} = config;

const Coins = () => {
  // 1. TODO: Retrieve the URL parameter (id)
  const id = '';

  const [daysRange, setDaysRange] = useLocalStorage('chart-days-range', 'max');

  // Retrieve coin's IDs in watchlist
  const [watchlist, setWatchlist] = useLocalStorage('crypto-watchlist', []);
  const isInWatchlist = watchlist?.find(el => el === id);

  // Fetch coin market data from API using ID from params
  const { data: coin, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${id}?tickers=false&sparkline=true`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  // Fetch coin chart data from API
  const { data: market_chart_data, error: market_chart_error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${daysRange}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const handleOnClickWatchlist = () => {
    if (isInWatchlist) {
      setWatchlist(watchlist?.filter(el => el !== id) ?? []);
    } else {
      setWatchlist([...watchlist, id]);
    }
  };

  // Retrieve and build UI for the coin's links
  const renderCoinLinks = () => {
    const links = [];

    // Retrieve coin's website
    if (coin?.links?.homepage?.[0]) {
      links.push({
        url: coin.links.homepage[0],
        label: 'Homepage',
        icon: LinkIcon,
      });
    }
    // Retrieve coin's source code repository
    if (coin?.links?.repos_url?.github?.[0]) {
      links.push({
        url: coin.links.repos_url.github[0],
        label: 'Source code',
        icon: CodeIcon,
      });
    }

    return (
      <div className="flex space-x-2 mt-6">
        {links.map(({ url, label, icon: Icon }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 hover:bg-gray-400 hover:text-white rounded-md py-2 px-3 text-sm flex items-center space-x-1 group"
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{label}</span>
            <ExternalLinkIcon className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-100" />
          </a>
        ))}
      </div>
    );
  };

  // Retrieve and build UI for the coin's info (name + symbol + rank + links)
  const renderCoinInfo = () => {
    const {
      name,
      symbol,
      image: { large: image_url = '' },
      market_cap_rank,
    } = coin;

    return (
      <div>
        {/* Image + Name + Symbol */}
        <div className="flex items-center space-x-2">
          {image_url ? (
            <img
              src={image_url}
              alt={symbol}
              className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0"
            />
          ) : null}
          <div className="flex items-center space-x-3">
            <span className="text-2xl sm:text-4xl font-semibold truncate">
              {name}
            </span>
            <span className="bg-gray-100 text-gray-500 text-xs font-medium uppercase rounded-md py-1 px-2">
              {symbol}
            </span>
            <span className="border border-gray-400 rounded-md group cursor-pointer p-1">
              {isInWatchlist ? (
                <StarIcon
                  className="w-4 h-4 text-yellow-500"
                  onClick={handleOnClickWatchlist}
                />
              ) : (
                <StarIconOutline
                  className="w-4 h-4 text-gray-400 group-hover:text-yellow-500"
                  onClick={handleOnClickWatchlist}
                />
              )}
            </span>
          </div>
        </div>

        {/* Rank */}
        <span className="inline-block bg-gray-400 text-gray-50 text-xs font-medium rounded-md py-1 px-2 mt-4">
          Rank #{market_cap_rank}
        </span>

        {/* Links */}
        {renderCoinLinks()}
      </div>
    );
  };

  // Retrieve and build UI for the coin's price + price change + low & high
  const renderCoinPrice = () => {
    const {
      market_data: {
        current_price: { usd: price = 0 },
        price_change_percentage_24h: price_change = 0,
        low_24h: { usd: low = 0 },
        high_24h: { usd: high = 0 },
      },
    } = coin;

    return (
      <div className="flex flex-col sm:items-end">
        <div className="flex justify-between sm:justify-start items-center space-x-2">
          <span className="text-3xl sm:text-4xl font-bold truncate">
            {formatCurrency(price)}
          </span>
          <span
            className={`rounded-md py-1 px-2 text-white ${
              price_change < 0 ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {formatNumber(price_change)}%
          </span>
        </div>
        <div className="mt-4 text-gray-500 text-sm sm:text-base text-left sm:text-right">
          <p>
            Low: <span className="font-semibold">{formatCurrency(low)}</span> -
            High: <span className="font-semibold">{formatCurrency(high)}</span>{' '}
            (24h)
          </p>
        </div>
      </div>
    );
  };

  // Retrieve and build UI for the coin's market data
  const renderCoinMarketData = () => {
    const {
      market_data: {
        market_cap: { usd: market_cap = 0 },
        fully_diluted_valuation: { usd: fully_diluted_valuation = 0 },
        total_volume: { usd: total_volume = 0 },
        circulating_supply = 0,
      },
    } = coin;

    const items = [
      {
        label: 'Market cap',
        value: formatCurrency(market_cap, {
          maximumFractionDigits: 0,
        }),
      },
      {
        label: 'Fully diluted valuation',
        value: formatCurrency(fully_diluted_valuation, {
          maximumFractionDigits: 0,
        }),
      },
      {
        label: 'Volume (24h)',
        value: formatCurrency(total_volume, {
          maximumFractionDigits: 0,
        }),
      },
      {
        label: 'Circulating supply',
        value: formatNumber(circulating_supply),
      },
    ];

    return items.map(({ label, value }) => (
      <div
        key={label}
        className="flex flex-row sm:flex-col justify-between items-center space-x-2 sm:space-x-0 sm:space-y-1"
      >
        <p className="text-sm sm:text-lg capitalize">{label}</p>
        <p className="text-base sm:text-xl font-semibold">{value}</p>
      </div>
    ));
  };

  const renderCoinChart = () => {
    return (
      <div className="mt-4">
        {/* Days ranges */}
        <div className="flex justify-between items-center space-x-1 bg-gray-200 w-full max-w-xs p-1 rounded-md">
          {days?.map(({ label, value }) => (
            <span
              key={value}
              onClick={() => setDaysRange(value)}
              className={`py-1 px-2 sm:px-3 uppercase font-medium text-sm text-gray-500 rounded-md hover:bg-gray-50 cursor-pointer ${
                value === daysRange ? 'bg-white' : 'bg-transparent'
              }`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Chart */}
        <div
          className={`mt-8 w-full h-80 sm:h-[28rem] ${
            market_chart_error || !market_chart_data
              ? 'flex items-center rounded-md bg-gray-100'
              : ''
          }`}
        >
          {market_chart_error ? (
            <Message error>
              Something went wrong. Please try refreshing the page.
            </Message>
          ) : !market_chart_data ? (
            <Message loading>Please wait, we are loading the chart...</Message>
          ) : (
            <MarketChart data={market_chart_data ?? []} />
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {error ? (
        <Message error>
          Something went wrong. Please try refreshing the page.
        </Message>
      ) : !coin ? (
        <Message loading>Loading coin...</Message>
      ) : (
        <>
          {/* 2. TODO: Render a breadcrumb
           *  - It should have the following format: "Coins > Bitcoin"
           *  - "Coins" should be a link to "/"
           */}

          {/* Coin's info + price */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-6 sm:space-y-0 sm:space-x-4">
            {renderCoinInfo()}
            {renderCoinPrice()}
          </div>
          {/* Coin's market data */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t grid grid-cols-1 sm:grid-cols-4 gap-4 sm:divide-x-[1px]">
            {renderCoinMarketData()}
          </div>
          {/* Coin's chart */}
          <div className="mt-16">
            <h2 className="text-xl sm:text-3xl">{coin.name} Chart</h2>
            {renderCoinChart()}
          </div>
          {/* Coin's description */}
          <div className="mt-16">
            <h2 className="text-xl sm:text-3xl">
              About {coin.name}{' '}
              <span className="uppercase">({coin.symbol})</span>
            </h2>
            <p
              className="mt-4 prose lg:prose-xl max-w-none"
              dangerouslySetInnerHTML={createMarkup(coin.description?.en ?? '')}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Coins;
