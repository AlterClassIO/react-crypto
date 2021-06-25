// TODO: Import the react-router-dom dependencies here
//...

// TODO: Setup route-based code splitting with React.lazy
import {
  Home,
  Coins,
  NotFound,
  Watchlist,
  About,
  Terms,
  PrivacyPolicy,
} from 'pages';

import { useScrollToTop } from 'hooks';

// Component for scroll restoration
function ScrollToTop({ children = null }) {
  useScrollToTop();
  return children;
}

/* TODO: Enable routing and create the routes of your application
 *  - Render the <Home /> page when the URL matches (exactly) "/"
 *  - Render the <Coins /> page when the URL matches /coins/:id
 *  - Render the <Watchlist /> page when the URL matches /watchlist
 *  - Render the <About /> page when the URL matches /about
 *  - Render the <Terms /> page when the URL matches /terms
 *  - Render the <PrivacyPolicy /> page when the URL matches /privacy-policy
 *  - Render the <NotFound /> page when the URL matches /404
 *  - Redirect the user to /404 when no route matches (catch-all route)
 *  - Make sure to render only the first route that matches (hint: use the Switch component)
 *  - [OPTIONAL] Wrap all your routes inside the <ScrollToTop /> component scroll the window up on every navigation
 */
function App() {
  {
    /* TODO: Add your code here */
  }
  return <p>Hello, AlterClass!</p>;
}

export default App;
