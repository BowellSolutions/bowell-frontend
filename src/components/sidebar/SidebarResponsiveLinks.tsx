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
 * @file: Exports SidebarResponsiveLinks component which renders button and active button links in mobile sidebar
 **/
import {FC} from "react";
import {Box, Divider, Icon} from "@chakra-ui/react";
import {doctorsRoutes, patientsRoutes} from "../routes";
import {useDashboardContext} from "../context/DashboardContext";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {MdLogin} from "react-icons/md";
import {IoIosRocket} from "react-icons/io";
import ButtonActiveLink from "./ButtonActiveLink";
import ButtonLink from "./ButtonLink";
import SidebarButton from "./Button";
import {logoutUser} from "../../redux/actions/auth";


const SidebarResponsiveLinks: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {type: userType} = useDashboardContext();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  const routesToMap = userType === "doctor" ? doctorsRoutes : patientsRoutes;

  const logout = () => {
    dispatch(logoutUser()).unwrap().then(async () => await router.push("/"));
  };

  return (
    <Box>
      {routesToMap && routesToMap.map((prop) => {
        if (router.pathname === prop.layout + prop.path) {
          return (
            <ButtonActiveLink
              icon={prop.icon}
              name={prop.name}
              href={prop.layout + prop.path}
              key={`button-link-${prop.name}-active`}
            />
          );
        }
        return (
          <ButtonLink
            icon={prop.icon}
            name={prop.name}
            href={prop.layout + prop.path}
            key={`button-link-${prop.name}`}
          />
        );
      })}

      {isAuthenticated && (
        <SidebarButton icon={<Icon as={MdLogin}/>} name="Logout" onClick={() => logout()}/>
      )}

      {!isAuthenticated && (
        <>
          <Divider/>

          {router.pathname === "login" ? (
            <ButtonActiveLink
              icon={<Icon as={MdLogin}/>}
              name="Login"
              href="/login"
              key="button-link-login-active"
            />
          ) : (
            <ButtonLink
              icon={<Icon as={MdLogin}/>}
              name="Login"
              href="/login"
              key="button-link-login"
            />
          )}

          {router.pathname === "/register" ? (
            <ButtonActiveLink
              icon={<Icon as={IoIosRocket}/>}
              name="Register"
              href="/register"
              key="button-link-register-active"
            />
          ) : (
            <ButtonLink
              icon={<Icon as={IoIosRocket}/>}
              name="Register"
              href="/register"
              key="button-link-register"
            />
          )}
        </>
      )}
    </Box>
  );
};

export default SidebarResponsiveLinks;
