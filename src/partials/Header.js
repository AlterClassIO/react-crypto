import { Logo } from 'components';
// TODO: Import the react-router-dom dependencies here

/* TODO: Add the navigation links
 *  - Render a link to the "/" path
 *  - Render a link to the "/watchlist" path
 *  - The active link (the one who matches the current URL) should be styled differently (text in blue and bolder)
 */
const Header = () => (
  <header className="py-4 px-4 sm:px-8 border-b bg-white">
    <div className="w-full xl:max-w-screen-2xl mx-auto flex items-center space-x-12">
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* Navigation links */}
      <nav className="hidden sm:block space-x-8">
        {/* TODO: Add your code here */}
      </nav>
    </div>
  </header>
);

export default Header;
