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
 * @file: Exports DispatchLayout HOC which returns component received in props based on user type (or null).
 * Used as a wrapper to every page inside the dashboard.
 **/
import {FC, ReactElement} from "react";
import {useRouter} from "next/router";
import {useAppSelector} from "../../../redux/hooks";

interface DispatchLayoutProps {
  doctor: ReactElement | null,
  patient: ReactElement | null,
}

/**
 * High Order Component which renders either:
 * - patient prop (component) - when user's type is patient
 * - doctor prop (component) - when user's type is doctor
 * - null - otherwise e.g user is not authenticated
 */
const DispatchLayout: FC<DispatchLayoutProps> = (
  {doctor, patient}
) => {
  const router = useRouter();
  const {isAuthenticated, user} = useAppSelector(state => state.auth);

  if (typeof window !== 'undefined' && !isAuthenticated)
    router.push('/login').then();

  if (user && user.type == "DOCTOR") {
    return doctor;
  } else if (user && user.type == "PATIENT") {
    return patient;
  }
  return null;
};

export default DispatchLayout;
