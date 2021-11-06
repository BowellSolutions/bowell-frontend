import {NextPage} from "next";
import {useRouter} from "next/router";
import DoctorLayout from "../../components/layouts/DoctorLayout";
import Dashboard from "../../components/views/doctor/Dashboard";
import {useAppSelector} from "../../redux/hooks";
import PatientLayout from "../../components/layouts/PatientLayout";

const DashboardHome: NextPage = () => {
  const router = useRouter();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const loading = useAppSelector((state) => state.auth.loading);

  const user = useAppSelector((state) => state.auth.user);

  if (typeof window !== 'undefined' && !loading && !isAuthenticated)
    router.push('/login').then();

  // check user's role here and return proper layout
  if (user && user.is_staff) {
    return (
      <DoctorLayout
        title="Dashboard"
        description="Bowell Dashboard"
        brandText="Dashboard"
      >
        <Dashboard/>
      </DoctorLayout>
    );
  } else if (user && !user.is_staff) {
    return (
      <PatientLayout
        title="Dashboard"
        description="Bowell Dashboard"
      >
        <h1>Patient dashboard</h1>
      </PatientLayout>
    );
  }
  return null;
};

export default DashboardHome;
