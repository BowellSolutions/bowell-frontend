/**
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
