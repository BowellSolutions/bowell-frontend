import {Icon} from "@chakra-ui/react";
import {BiReceipt} from "react-icons/bi";
import {BsFillPeopleFill, BsFillPersonFill, BsFillVolumeUpFill,} from "react-icons/bs";
import {IoIosHome} from "react-icons/io";
import Dashboard from "./views/doctor/Dashboard";
import Patients from "./views/doctor/Patients";
import Examinations from "./views/doctor/Examinations";
import Recordings from "./views/doctor/Recordings";
import Profile from "./views/doctor/Profile";

const routes = [
  {
    path: "",
    name: "Dashboard",
    icon: <Icon as={IoIosHome} color="inherit"/>,
    component: Dashboard,
    layout: "/dashboard",
  },

  {
    path: "/patients",
    name: "Patients",
    icon: <Icon as={BsFillPeopleFill} color="inherit"/>,
    component: Patients,
    layout: "/dashboard",
  },

  {
    path: "/examinations",
    name: "Examinations",
    icon: <Icon as={BiReceipt} color="inherit"/>,
    component: Examinations,
    layout: "/dashboard",
  },

  {
    path: "/recordings",
    name: "Recordings",
    icon: <Icon as={BsFillVolumeUpFill} color="inherit"/>,
    component: Recordings,
    layout: "/dashboard",
  },

  {
    path: "/profile",
    name: "Profile",
    icon: <Icon as={BsFillPersonFill} color="inherit"/>,
    component: Profile,
    layout: "/dashboard",
  },
];

export const patientsRoutes = [];

export default routes;