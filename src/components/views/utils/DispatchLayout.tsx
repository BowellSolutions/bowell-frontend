/**
 * @author: Adam Lisichin
 * @file: Exports DispatchLayout HOC which returns component received in props based on user type (or null).
 * Used as a wrapper to every page inside the dashboard.
 **/
import {FC, ReactElement} from "react";
import {useRouter} from "next/router";
import {useAppSelector} from "../../../redux/hooks";

interface DispatchLayoutProps {
  doctor: ReactElement | null,
  patient: ReactElement | null,
}

/**
 * High Order Component which renders either:
 * - patient prop (component) - when user's type is patient
 * - doctor prop (component) - when user's type is doctor
 * - null - otherwise e.g user is not authenticated
 */
const DispatchLayout: FC<DispatchLayoutProps> = (
  {doctor, patient}
) => {
  const router = useRouter();
  const {isAuthenticated, user} = useAppSelector(state => state.auth);

  if (typeof window !== 'undefined' && !isAuthenticated)
    router.push('/login').then();

  if (user && user.type == "DOCTOR") {
    return doctor;
  } else if (user && user.type == "PATIENT") {
    return patient;
  }
  return null;
};

export default DispatchLayout;
