import {NextPage} from "next";
import Profile from "../../../components/views/doctor/Profile";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import PatientProfile from "../../../components/views/patient/Profile";

const ProfilePage: NextPage = () => {
  return (
    <DispatchLayout
      doctor={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard"
          brandText="Profile"
          type="doctor"
        >
          <Profile/>
        </DashboardLayout>
      }
      patient={
        <DashboardLayout
          title="Dashboard"
          description=""
          brandText="Profile"
          type="patient"
        >
          <PatientProfile/>
        </DashboardLayout>
      }
    />
  );
};

export default ProfilePage;
