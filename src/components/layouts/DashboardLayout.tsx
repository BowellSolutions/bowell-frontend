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
 * @file: Exports DashboardLayout HOC which is used to wrap every dashboard page.
 * Provides html head with meta tags. Consists of multiple components (sidebar, navbar etc.).
 * Children are rendered into PanelContent component.
 * Dispatches checkAuthStatus action on mount to check if user has a valid token.
 */
import {FC, ReactNode, useEffect, useRef, useState} from "react";
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
  const [sidebarVariant, setSidebarVariant] = useState<SidebarVariantType>(() => {
    if (typeof window !== "undefined") {
      // if found a valid key in localStorage, keep it
      const item = localStorage.getItem("dashboard-sidebar-type");
      if (item === "transparent" || item === "opaque") return item;
      // else set default value in case somebody manually changed it to random string
      else localStorage.setItem("dashboard-sidebar-type", "transparent");
    }
    return "transparent";
  });

  const [fixed, setFixed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      // if found a valid key in localStorage, keep it
      const item = localStorage.getItem("dashboard-header-type");
      if (item === "true" || item === "false") return Boolean(item);
      // else set default value in case somebody manually changed it to random string
      else localStorage.setItem("dashboard-header-type", "false");
    }
    return false;
  });

  const {isOpen, onOpen, onClose} = useDisclosure();

  const mainPanel = useRef(null);

  const setSidebarType = (variant: SidebarVariantType) => {
    setSidebarVariant(variant);
    localStorage.setItem("dashboard-sidebar-type", variant);
  };

  const setFixedHeader = (value: boolean) => {
    setFixed(value);
    localStorage.setItem("dashboard-header-type", String(value));
  };

  useEffect(() => {
    // save sidebar and header type in localStorage if they have not been set before
    const sidebarType = localStorage.getItem("dashboard-sidebar-type");
    const isFixed = localStorage.getItem("dashboard-header-type");
    if (!sidebarType) localStorage.setItem("dashboard-sidebar-type", "transparent");
    if (!isFixed) localStorage.setItem("dashboard-header-type", "fixed");
  }, []);

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
            onSwitch={(value) => setFixedHeader(value)}
            onOpaque={() => setSidebarType("opaque")}
            onTransparent={() => setSidebarType("transparent")}
          />
        </MainPanel>
      </DashboardContext.Provider>
    </>
  );
};

export default DashboardLayout;
