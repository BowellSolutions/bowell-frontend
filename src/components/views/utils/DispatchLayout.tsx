import {FC, ReactElement} from "react";
import {useRouter} from "next/router";
import {useAppSelector} from "../../../redux/hooks";

interface DispatchLayoutProps {
  doctor: ReactElement | null,
  patient: ReactElement | null,
}

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
