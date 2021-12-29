import {NextPage} from "next";
import Examinations from "../../../components/views/doctor/Examinations";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import PatientExaminations from "../../../components/views/patient/Examinations";
import {AppState, wrapper} from "../../../redux/store";
import {authFail} from "../../../redux/reducers/auth";
import {checkAuth} from "../../../redux/actions/auth";
import {retrieveExaminations} from "../../../redux/actions/dashboard";

const ExaminationsPage: NextPage<AppState> = () => {
  return (
    <DispatchLayout
      // auth={auth}
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
      // if there is no access cookie, dispatch fail and redirect to login
      if (!context.req.cookies.access) {
        await store.dispatch(authFail());
        return {
          redirect: {
            destination: '/login',
            permanent: false
          }
        };
      }
      const cookies = context.req.headers.cookie;
      // dispatch check auth to verify token, get user if token is valid - to fill state on server side
      await store.dispatch<any>(checkAuth(cookies));

      // load examinations
      await store.dispatch<any>(retrieveExaminations(cookies));

      return {
        props: {}
      };
    }
);

export default ExaminationsPage;
