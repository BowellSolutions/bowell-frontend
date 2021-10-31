import {NextPage} from "next";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import DoctorLayout from "../../components/layouts/DoctorLayout";
import Dashboard from "../../components/views/doctor/Dashboard";

const DashboardHome: NextPage = () => {
  const router = useRouter();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);

  const user = useSelector((state: RootState) => state.auth.user);

  if (typeof window !== 'undefined' && !loading && !isAuthenticated)
    router.push('/login').then();

  // check user's role here and return proper layout

  return (
    <DoctorLayout
      title="Dashboard"
      description="Bowell Dashboard"
      brandText="Dashboard"
    >
      <Dashboard/>
    </DoctorLayout>
  );
};

export default DashboardHome;
