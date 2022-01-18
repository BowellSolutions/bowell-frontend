/**
 * @author: Adam Lisichin
 * @file: Handles dashboard profile route - /dashboard/patients/[id].
 * Authorized and doctor only route.
 **/
import {NextPage} from "next";
import {useRouter} from "next/router";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DispatchLayout from "../../../components/views/utils/DispatchLayout";
import {AppState, wrapper} from "../../../redux/store";
import {authFail} from "../../../redux/reducers/auth";
import {checkAuth} from "../../../redux/actions/auth";

const PatientDetail: NextPage<AppState> = () => {
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

      return {
        props: {}
      };
    }
);

export default PatientDetail;
