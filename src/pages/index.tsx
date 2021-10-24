import type {NextPage} from 'next';
import Homepage from "../components/Home";
import Layout from "../components/layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout
      title="Bowell"
      content="Bowell's home page"
    >
      <Homepage/>
    </Layout>
  );
};

export default Home;
