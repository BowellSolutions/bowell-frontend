/**
 * @author: Adam Lisichin
 * @file: Handles home page route
 **/
import type {NextPage} from 'next';
import MainLayout from "../components/layouts/MainLayout";
import HomePage from "../components/views/Home";

const Home: NextPage = () => {
  return (
    <MainLayout
      title="Bowell"
      content="Bowell Home"
    >
      <HomePage/>
    </MainLayout>
  );
};

export default Home;
