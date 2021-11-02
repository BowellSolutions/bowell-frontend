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

interface DoctorLayoutProps {
  children: ReactNode;
  title: string,
  description?: string,
  brandText: string,
}

type SidebarVariantType = "opaque" | "transparent";

const DoctorLayout: FC<DoctorLayoutProps> = (
  {
    children,
    title,
    description,
    brandText
  }
) => {
  const [sidebarVariant, setSidebarVariant] = useState<SidebarVariantType>("transparent");
  const [fixed, setFixed] = useState<boolean>(false);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const mainPanel = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // check if we are still authenticated
    if (dispatch != null) dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <>
      <Head>
        <meta name="description" content={description}/>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Sidebar
        logoText="BOWELL DASHBOARD"
        display="none"
        sidebarVariant={sidebarVariant}
      />

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
    </>
  );
};

export default DoctorLayout;
