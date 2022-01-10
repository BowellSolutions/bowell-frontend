import {NextPage} from "next";
import Examinations from "../../../components/views/doctor/Examinations";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import PatientExaminations from "../../../components/views/patient/Examinations";
import {AppState, wrapper} from "../../../redux/store";
import {authFail} from "../../../redux/reducers/auth";
import {checkAuth} from "../../../redux/actions/auth";

const ExaminationsPage: NextPage<AppState> = () => {
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context) => {
      const cookies = context.req.cookies;
      // if there is no access cookie, dispatch fail and redirect to login
      if (!cookies.access) {
        await store.dispatch(authFail());
        return {
          redirect: {
            destination: '/login',
            permanent: false
          }
        };
      }

      await store.dispatch<any>(checkAuth(cookies.access))

      return {
        props: {}
      };
    }
);

export default ExaminationsPage;
