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
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const loading = useAppSelector((state) => state.auth.loading);
  const user = useAppSelector((state) => state.auth.user);

  if (typeof window !== 'undefined' && !loading && !isAuthenticated)
    router.push('/login').then();

  if (user && user.is_staff) {
    return doctor;
  } else if (user && !user.is_staff) {
    return patient;
  }
  return null;
};

export default DispatchLayout;
