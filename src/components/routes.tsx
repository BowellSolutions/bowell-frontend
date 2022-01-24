/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Gustaw Daczkowski, Hubert Decyusz, Wojciech Nowicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
 * @author: Adam Lisichin
 * @file: Exports doctor and patients routes used in Sidebar
 **/
import {Icon} from "@chakra-ui/react";
import {BiReceipt} from "react-icons/bi";
import {BsFillPeopleFill, BsFillPersonFill, BsFillVolumeUpFill,} from "react-icons/bs";
import {IoIosHome} from "react-icons/io";
import Dashboard from "./views/doctor/Dashboard";
import Patients from "./views/doctor/Patients";
import Examinations from "./views/doctor/Examinations";
import Recordings from "./views/doctor/Recordings";
import Profile from "./views/doctor/Profile";


export const doctorsRoutes = [
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

export const patientsRoutes = [
  {
    path: "",
    name: "Dashboard",
    icon: <Icon as={IoIosHome} color="inherit"/>,
    layout: "/dashboard",
  },
  {
    path: "/examinations",
    name: "Examinations",
    icon: <Icon as={BiReceipt} color="inherit"/>,
    layout: "/dashboard",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <Icon as={BsFillPersonFill} color="inherit"/>,
    layout: "/dashboard",
  },
];
