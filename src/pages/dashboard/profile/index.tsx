import {NextPage} from "next";
import DoctorLayout from "../../../components/layouts/DoctorLayout";
import Profile from "../../../components/views/doctor/Profile";
import {useRouter} from "next/router";
import {useAppSelector} from "../../../redux/hooks";
import PatientLayout from "../../../components/layouts/PatientLayout";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const loading = useAppSelector((state) => state.auth.loading);
  const user = useAppSelector((state) => state.auth.user);

  if (typeof window !== 'undefined' && !loading && !isAuthenticated)
    router.push('/login').then();

  if (user && user.is_staff) {
    return (
      <DoctorLayout
        title="Dashboard"
        description="Bowell Dashboard"
        brandText="Profile"
      >
        <Profile/>
      </DoctorLayout>
    );
  } else if (user && !user.is_staff) {
    return (
      <PatientLayout
        title="Dashboard"
        description=""
      >
        <Profile/>
      </PatientLayout>
    );
  }
  return null;
};

export default ProfilePage;
