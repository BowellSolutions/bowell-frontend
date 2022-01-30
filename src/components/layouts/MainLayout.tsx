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
