import {NextPage} from "next";
import Patients from "../../components/views/doctor/Patients";
import DispatchLayout from "../../components/views/utils/DispatchLayout";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const PatientsPage: NextPage = () => {
  return (
    <DispatchLayout
      doctor={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard"
          brandText="Patients"
          type="doctor"
        >
          <Patients/>
        </DashboardLayout>
      }
      patient={null}
    />
  );
};

export default PatientsPage;
