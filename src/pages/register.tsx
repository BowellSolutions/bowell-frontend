import {NextPage} from "next";
import Register from "../components/views/Register";
import AuthLayout from "../components/layouts/AuthLayout";
import {useRouter} from "next/router";
import {useAppSelector} from "../redux/hooks";

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (typeof window !== 'undefined' && isAuthenticated) {
    router.push('/dashboard').then();
  }

  return (
    <AuthLayout
      title="Register"
      description="Bowell's login page"
      secondary={false}
    >
      <Register/>
    </AuthLayout>
  );
};

export default RegisterPage;
