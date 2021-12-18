import {NextPage} from "next";
import {useRouter} from "next/router";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";

const PatientDetail: NextPage = () => {
  const router = useRouter();
  // get patient id from url
  const {id} = router.query;

  return (
    <DispatchLayout
      doctor={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard - Examination detail"
          brandText={`Patient #${id}`}
          type="doctor"
        >
          <></>
        </DashboardLayout>
      }
      patient={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard - Examination detail"
          brandText={`Patient #${id}`}
          type="patient"
        >
          <></>
        </DashboardLayout>
      }
    />
  );
};

export default PatientDetail;
