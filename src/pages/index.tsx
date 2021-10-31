import type {NextPage} from 'next';
import Homepage from "../components/views/Home";
import MainLayout from "../components/layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout
      title="Bowell"
      content="Bowell's home page"
    >
      <Homepage/>
    </MainLayout>
  );
};

export default Home;
