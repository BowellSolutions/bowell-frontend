import {NextPage} from "next";
import Recordings from "../../../components/views/doctor/Recordings";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";
import DashboardLayout from "../../../components/layouts/DashboardLayout";

const RecordingsPage: NextPage = () => {
  return (
    <DispatchLayout
      doctor={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard"
          brandText="Recordings"
          type="doctor"
        >
          <Recordings/>
        </DashboardLayout>
      }
      patient={null}
    />
  );
};

export default RecordingsPage;
