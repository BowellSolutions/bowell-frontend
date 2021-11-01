import {NextPage} from "next";
import DoctorLayout from "../../components/layouts/DoctorLayout";
import Examinations from "../../components/views/doctor/Examinations";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {useRouter} from "next/router";
import {useAppSelector} from "../../redux/hooks";

const ExaminationsPage: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const loading = useAppSelector((state) => state.auth.loading);

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
