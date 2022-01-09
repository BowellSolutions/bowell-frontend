import {NextPage} from "next";
import Dashboard from "../../components/views/doctor/Dashboard";
import DispatchLayout from "../../components/views/utils/DispatchLayout";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PatientDashboard from "../../components/views/patient/Dashboard";
import {AppState, wrapper} from "../../redux/store";
import {checkAuth} from "../../redux/actions/auth";
import {authFail} from "../../redux/reducers/auth";
import {
  retrieveDoctorStatistics,
  retrieveExaminations,
  retrievePatients,
  retrieveRecordings
} from "../../redux/actions/dashboard";

const DashboardHome: NextPage<AppState> = () => {
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
          <PatientDashboard/>
        </DashboardLayout>
      }/>
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

      // dispatch check auth to verify token, get user if token is valid - to fill state on server side
      await store.dispatch<any>(checkAuth(cookies.access));

      const {auth} = store.getState();

      // load examinations, recordings, patients, statistics based on user type
      if (auth?.user?.type === "DOCTOR") {
        await store.dispatch<any>(retrieveRecordings(cookies.access));
        await store.dispatch<any>(retrievePatients(cookies.access));
        await store.dispatch<any>(retrieveDoctorStatistics(cookies.access));
      }

      await store.dispatch<any>(retrieveExaminations(cookies.access));

      return {
        props: {}
      };
    }
);

export default DashboardHome;
