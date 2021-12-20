import {NextPage} from "next";
import {useRouter} from "next/router";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";

const ProfileDetail: NextPage = () => {
  const router = useRouter();
  // get user id from url
  const {id} = router.query;

  return (
    <DispatchLayout
      doctor={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard - Profile detail"
          brandText={`Profile #${id}`}
          type="doctor"
        >
          <></>
        </DashboardLayout>
      }
      patient={
        <DashboardLayout
          title="Dashboard"
          description="Bowell Dashboard - Profile detail"
          brandText={`Profile #${id}`}
          type="patient"
        >
          <></>
        </DashboardLayout>
      }
    />
  );
};

export default ProfileDetail;
