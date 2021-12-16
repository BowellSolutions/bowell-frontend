import {NextPage} from "next";
import {useRouter} from "next/router";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";
import DoctorExaminationDetail from "../../../components/views/doctor/ExaminationDetail";

const ExaminationDetail: NextPage = () => {
  const router = useRouter();
  // get examination id from url
  const {id} = router.query;

  return (
    <DispatchLayout
      doctor={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard - Examination detail"
          brandText={`Examination #${id}`}
          type="doctor"
        >
          <DoctorExaminationDetail examinationID={id as string}/>
        </DashboardLayout>
      }
      patient={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard - Examination detail"
          brandText={`Examination #${id}`}
          type="patient"
        >
          <></>
        </DashboardLayout>
      }
    />
  );
};

export default ExaminationDetail;
