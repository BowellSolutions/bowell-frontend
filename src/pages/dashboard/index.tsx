import {NextPage} from "next";
import Layout from "../../components/layout/Layout";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {Heading} from "@chakra-ui/react";

const Dashboard: NextPage = () => {
  const router = useRouter();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);

  if (typeof window !== 'undefined' && !loading && !isAuthenticated)
    router.push('/login').then();

  return (
    <Layout
      title="Dashboard"
      content="Bowell's dashboard"
    >
      <Heading as="h1" size="xl">User Dashboard</Heading>
      {user != null && (
        <Heading as="h2" size="lg">Welcome {user.username}!</Heading>
      )}
    </Layout>
  );
};

export default Dashboard;
