import { Header, Footer } from './index';

const Layout = ({ children = null }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 px-4 py-4 sm:px-8 sm:py-16">
      <div className="w-full xl:max-w-screen-2xl mx-auto">{children}</div>
    </main>
    <Footer />
  </div>
);

export default Layout;
