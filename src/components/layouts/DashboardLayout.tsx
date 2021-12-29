import React, {FC, ReactNode, useEffect, useRef, useState} from "react";
import ScrollToTopButton from "../utils/ScrollToTopButton";
import {useDisclosure} from "@chakra-ui/hooks";
import Footer from "../footer/Footer";
import PanelContent from "../panels/PanelContent";
import PanelContainer from "../panels/PanelContainer";
import MainPanel from "../panels/MainPanel";
import DashboardNavbar from "../navbar/DashboardNavbar";
import Sidebar from "../sidebar/Sidebar";
import Configurator from "../configurator/Configurator";
import {Portal} from "@chakra-ui/react";
import Head from "next/head";
import {useDispatch} from "react-redux";
import {checkAuthStatus} from "../../redux/actions/auth";
import DashboardContext from "../context/DashboardContext";

export type UserType = "doctor" | "patient";
export type SidebarVariantType = "opaque" | "transparent";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string,
  description?: string,
  brandText: string,
  type: UserType,
}

const DashboardLayout: FC<DashboardLayoutProps> = (
  {
    children,
    title,
    description,
    brandText,
    type,
  }
) => {
  const [sidebarVariant, setSidebarVariant] = useState<SidebarVariantType>("transparent");
  const [fixed, setFixed] = useState<boolean>(false);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const mainPanel = useRef(null);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   // check if we are still authenticated
  //   if (dispatch != null) dispatch(checkAuthStatus());
  // }, [dispatch]);

  return (
    <>
      <Head>
        <meta name="description" content={description}/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Sidebar
        logoText="BOWELL DASHBOARD"
        display="none"
        sidebarVariant={sidebarVariant}
        user={type}
      />

      <DashboardContext.Provider value={{
        type: type,
      }}>
        <MainPanel
          // @ts-ignore
          ref={mainPanel}
          w={{
            base: "100%",
            xl: "calc(100% - 275px)",
          }}
        >
          <Portal>
            <DashboardNavbar
              onOpen={onOpen}
              logoText="BOWELL DASHBOARD"
              brandText={brandText}
              secondary={false}
              fixed={fixed}
            />
          </Portal>

          <PanelContent>
            <PanelContainer>
              {children}
            </PanelContainer>
          </PanelContent>

          <Footer/>

          <Portal>
            <ScrollToTopButton/>
          </Portal>

          <Configurator
            secondary={false}
            isOpen={isOpen}
            onClose={onClose}
            isChecked={fixed}
            isTransparent={sidebarVariant === "transparent"}
            onSwitch={(value) => setFixed(value)}
            onOpaque={() => setSidebarVariant("opaque")}
            onTransparent={() => setSidebarVariant("transparent")}
          />
        </MainPanel>
      </DashboardContext.Provider>
    </>
  );
};

export default DashboardLayout;
