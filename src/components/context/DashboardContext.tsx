import {createContext, useContext} from "react";
import {UserType} from "../layouts/DashboardLayout";

interface DashboardContextProps {
  type: UserType,
}

const DashboardContext = createContext<DashboardContextProps>({
  type: "doctor",
});

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardContext;
