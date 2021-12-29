import {NextPage} from "next";
import Register from "../components/views/Register";
import AuthLayout from "../components/layouts/AuthLayout";
import {useRouter} from "next/router";
import {useAppSelector} from "../redux/hooks";
import {wrapper} from "../redux/store";
import {checkAuth} from "../redux/actions/auth";

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context) => {
      await store.dispatch<any>(checkAuth(context.req.headers.cookies));

      return {
        props: {}
      };
    }
);

export default RegisterPage;
