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
