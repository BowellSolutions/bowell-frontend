import {NextPage} from "next";
import DoctorLayout from "../../components/layouts/DoctorLayout";
import Recordings from "../../components/views/doctor/Recordings";
import {useRouter} from "next/router";
import {useAppSelector} from "../../redux/hooks";

const RecordingsPage: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const loading = useAppSelector((state) => state.auth.loading);
  const user = useAppSelector((state) => state.auth.user);

  if (typeof window !== 'undefined' && !loading && !isAuthenticated)
    router.push('/login').then();

  if (user && !user.is_staff) return null;

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
