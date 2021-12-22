import {NextPage} from "next";
import Examinations from "../../../components/views/doctor/Examinations";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import PatientExaminations from "../../../components/views/patient/Examinations";

const ExaminationsPage: NextPage = () => {
  return (
    <DispatchLayout
      doctor={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard"
          brandText="Examinations"
          type="doctor"
        >
          <Examinations/>
        </DashboardLayout>
      }
      patient={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard"
          brandText="Examinations"
          type="patient"
        >
          <PatientExaminations/>
        </DashboardLayout>
      }
    />
  );
};

export default ExaminationsPage;
