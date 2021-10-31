import {NextPage} from "next";
import DoctorLayout from "../../components/layouts/DoctorLayout";
import Examinations from "../../components/views/doctor/Examinations";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {useRouter} from "next/router";

const ExaminationsPage: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);

  if (typeof window !== 'undefined' && !loading && !isAuthenticated)
    router.push('/login').then();

  return (
    <DoctorLayout
      title="Dashboard"
      description="Bowell Dashboard"
      brandText="Examinations"
    >
      <Examinations/>
    </DoctorLayout>
  );
};

export default ExaminationsPage;
