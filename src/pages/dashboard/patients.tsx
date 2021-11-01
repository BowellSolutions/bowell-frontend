import {NextPage} from "next";
import DoctorLayout from "../../components/layouts/DoctorLayout";
import Patients from "../../components/views/doctor/Patients";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {useAppSelector} from "../../redux/hooks";

const PatientsPage: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const loading = useAppSelector((state) => state.auth.loading);

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
