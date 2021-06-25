// TODO: Import the react-router-dom dependencies here

/* TODO: Render a link for the Logo component
 *  - Replace the span with the <Link /> component from react router
 *  - Don't forget to pass the 'to' prop to redirect to the homepage
 */
const Logo = () => (
  <span>
    <img
      src={`${process.env.PUBLIC_URL}/logo.svg`}
      alt="AlterClass"
      className="h-8 w-auto"
    />
  </span>
);
export default Logo;
