import {NextPage} from "next";
import DoctorLayout from "../../components/layouts/DoctorLayout";
import Recordings from "../../components/views/doctor/Recordings";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";

const RecordingsPage: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);

  if (typeof window !== 'undefined' && !loading && !isAuthenticated)
    router.push('/login').then();

  return (
    <DoctorLayout
      title="Dashboard"
      description="Bowell Dashboard"
      brandText="Recordings"
    >
      <Recordings/>
    </DoctorLayout>
  );
};

export default RecordingsPage;
