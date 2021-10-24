import {FC, ReactNode} from "react";
import Head from "next/head";

interface LayoutProps {
  title: string,
  content: string,
  children: ReactNode,

}

const Layout: FC<LayoutProps> = ({title, content, children}) => {
  return (
    <>
      <Head>
        <meta name="description" content={content}/>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div>
        {children}
      </div>
    </>
  );
};

export default Layout;
