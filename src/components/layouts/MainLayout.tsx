/**
 * @author: Adam Lisichin
 * @file: Exports MainLayout Higher Order Component - used on home page.
 * Provides html head with meta tags and main container with styles from scss file into,
 * which wraps children passed to this layout.
 * Dispatches checkAuthStatus action on mount to check if user has a valid token.
 **/
import {FC, ReactNode, useEffect} from "react";
import Head from "next/head";
import {useDispatch} from "react-redux";
import {checkAuthStatus} from "../../redux/actions/auth";

interface LayoutProps {
  title: string,
  content: string,
  children?: ReactNode,
}

const MainLayout: FC<LayoutProps> = ({title, content, children}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // check if we are still authenticated
    if (dispatch != null) dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <>
      <Head>
        <meta name="description" content={content}/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div className="main">
        {children}
      </div>
    </>
  );
};

export default MainLayout;
