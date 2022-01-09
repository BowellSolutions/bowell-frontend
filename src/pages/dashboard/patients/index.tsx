import {NextPage} from "next";
import Patients from "../../../components/views/doctor/Patients";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import {AppState, wrapper} from "../../../redux/store";
import {authFail} from "../../../redux/reducers/auth";
import {checkAuth} from "../../../redux/actions/auth";
import {retrievePatients} from "../../../redux/actions/dashboard";

const PatientsPage: NextPage<AppState> = () => {
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
      // doctor only endpoint
      if (auth?.user?.type === "PATIENT") {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        };
      }

      // load patients
      await store.dispatch<any>(retrievePatients(cookies.access));

      return {
        props: {}
      };
    }
);

export default PatientsPage;
