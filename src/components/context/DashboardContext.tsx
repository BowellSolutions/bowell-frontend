/**
 * @author: Adam Lisichin
 * @file: Exports DashboardContext and useDashboardContext - context used to prevent props drilling
 **/
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
