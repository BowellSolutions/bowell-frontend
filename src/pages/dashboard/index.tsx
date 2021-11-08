import {NextPage} from "next";
import Dashboard from "../../components/views/doctor/Dashboard";
import DispatchLayout from "../../components/views/utils/DispatchLayout";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const DashboardHome: NextPage = () => {
  return (
    <DispatchLayout
      doctor={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard"
          brandText="Dashboard"
          type="doctor"
        >
          <Dashboard/>
        </DashboardLayout>
      }

      patient={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard"
          brandText="Dashboard"
          type="patient"
        >
          <></>
        </DashboardLayout>
      }/>
  );
};

export default DashboardHome;
