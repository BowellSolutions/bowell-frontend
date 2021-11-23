import {FC} from "react";
import {Box, Divider, Icon} from "@chakra-ui/react";
import {doctorsRoutes, patientsRoutes} from "../routes";
import {useDashboardContext} from "../context/DashboardContext";
import {useRouter} from "next/router";
import {useAppSelector} from "../../redux/hooks";
import {MdLogin} from "react-icons/md";
import {IoIosRocket} from "react-icons/io";
import ButtonActiveLink from "./ButtonActiveLink";
import ButtonLink from "./ButtonLink";


const SidebarResponsiveLinks: FC = () => {
  const router = useRouter();
  const {type: userType} = useDashboardContext();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  const routesToMap = userType === "doctor" ? doctorsRoutes : patientsRoutes;

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
