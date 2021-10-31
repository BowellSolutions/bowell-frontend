import {NextPage} from "next";
import Login from "../components/views/Login";
import AuthLayout from "../components/layouts/AuthLayout";
import {useSelector} from "react-redux";
import {RootState} from "../redux/reducers";
import {useRouter} from "next/router";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (typeof window !== 'undefined' && isAuthenticated) {
    router.push('/dashboard').then();
  }

  return (
    <AuthLayout
      title="Login"
      description="Bowell's login page"
      secondary={false}
    >
      <Login/>
    </AuthLayout>
  );
};

export default LoginPage;
