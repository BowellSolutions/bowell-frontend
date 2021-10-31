import {NextPage} from "next";
import DoctorLayout from "../../components/layouts/DoctorLayout";
import Patients from "../../components/views/doctor/Patients";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";

const PatientsPage: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);

  if (typeof window !== 'undefined' && !loading && !isAuthenticated)
    router.push('/login').then();

  return (
    <DoctorLayout
      title="Dashboard"
      description="Bowell Dashboard"
      brandText="Patients"
    >
      <Patients/>
    </DoctorLayout>
  );
};

export default PatientsPage;