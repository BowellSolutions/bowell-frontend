import React, {FC, ReactNode, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {checkAuthStatus} from "../../redux/actions/auth";
import Head from "next/head";
import MainPanel from "../panels/MainPanel";

interface PatientLayoutProps {
  children: ReactNode;
  title: string,
  description?: string,
}


const PatientLayout: FC<PatientLayoutProps> = (
  {children, title, description}
) => {
  const dispatch = useDispatch();

  const mainPanel = useRef(null);

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

      <MainPanel
        // @ts-ignore
        ref={mainPanel}
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        {children}
      </MainPanel>
    </>
  );
};

export default PatientLayout;
