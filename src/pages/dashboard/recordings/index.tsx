import {NextPage} from "next";
import Recordings from "../../../components/views/doctor/Recordings";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import {AppState, wrapper} from "../../../redux/store";
import {authFail} from "../../../redux/reducers/auth";
import {checkAuth} from "../../../redux/actions/auth";
import {retrieveRecordings} from "../../../redux/actions/dashboard";

const RecordingsPage: NextPage<AppState> = () => {
  return (
    <DispatchLayout
      // auth={auth}
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

      // load recordings
      await store.dispatch<any>(retrieveRecordings(cookies));

      return {
        props: {}
      };
    }
);

export default RecordingsPage;
