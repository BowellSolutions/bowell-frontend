import {NextPage} from "next";
import Layout from "../../components/layout/Layout";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";

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
      <h1>User Dashboard</h1>
      {user != null && <h2>Welcome {user.username}!</h2>}
    </Layout>
  );
};

export default Dashboard;
