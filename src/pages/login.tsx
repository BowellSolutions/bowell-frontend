import {NextPage} from "next";
import Login from "../components/views/Login";
import AuthLayout from "../components/layouts/AuthLayout";
import {useRouter} from "next/router";
import {useAppSelector} from "../redux/hooks";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

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
