import { Logo } from 'components';
// TODO: Import the react-router-dom dependencies here

/* TODO: Add the navigation links
 *  - Render a link to the "/about" path
 *  - Render a link to the "/terms" path
 *  - Render a link to the "/privacy-policy" path
 *  - The active link (the one who matches the current URL) should be styled differently (text in blue and bolder)
 */
const Footer = () => (
  <footer className="mt-20 py-6 px-4 sm:px-8">
    <div className="w-full xl:max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between space-y-12 md:space-y-0 md:space-x-16">
        <div className="space-y-4">
          <Logo />
          <p>Cryptocurrency Prices, Charts And Market Capitalizations</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-20">
          {/* TODO: Add your code here */}
        </div>
      </div>

      {/* Copyright */}
      <p className="mt-12 pt-8 text-sm leading-6 text-gray-500 text-center">
        © 2021 AlterClass. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
