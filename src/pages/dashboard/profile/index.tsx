import {NextPage} from "next";
import DoctorLayout from "../../../components/layouts/DoctorLayout";
import Profile from "../../../components/views/doctor/Profile";

const ProfilePage: NextPage = () => {
  return (
    <DoctorLayout
      title="Dashboard"
      description="Bowell Dashboard"
      brandText="Profile"
    >
      <Profile/>
    </DoctorLayout>
  );
};

export default ProfilePage;
