import {NextPage} from "next";
import Register from "../components/views/Register";
import AuthLayout from "../components/layouts/AuthLayout";

const RegisterPage: NextPage = () => {
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
