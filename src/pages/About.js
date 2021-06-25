import { Layout } from 'partials';
import { generateDemoText } from 'utils';

const About = () => (
  <Layout>
    <h1 className="capitalize text-2xl font-semibold">About us</h1>
    <div className="mt-6 text-lg space-y-4">
      {generateDemoText().map(text => (
        <p>{text}</p>
      ))}
    </div>
  </Layout>
);

export default About;
