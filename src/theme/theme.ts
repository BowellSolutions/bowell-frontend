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
 * @file: Exports Chakra UI base theme extended with:
 * - breakpoints
 * - global styles
 * - fonts
 * - components:
 *  - builtin   button
 *  - builtin   badge
 *  - builtin   link
 *  - builtin   drawer
 *  - custom    card
 *  - custom    card body
 *  - custom    card header
 *  - custom    main panel
 *  - custom    panel content
 *  - custom    panel container
 *  - plugin    stepper
 **/
import {extendTheme} from "@chakra-ui/react";
import {breakpoints} from "./foundations/breakpoints";
import {linkStyles} from "./components/builtins/link";
import {drawerStyles} from "./components/builtins/drawer";
import {badgeStyles} from "./components/builtins/badge";
import {PanelContentComponent} from "./components/additions/PanelContent";
import {globalStyles} from "./styles";
import {CardBodyComponent} from "./components/additions/CardBody";
import {MainPanelComponent} from "./components/additions/MainPanel";
import {PanelContainerComponent} from "./components/additions/PanelContainer";
import {CardComponent} from "./components/additions/Card";
import {CardHeaderComponent} from "./components/additions/CardHeader";
import {font} from "./foundations/fonts";
import {buttonStyles} from "./components/builtins/button";
import {Stepper} from "./components/plugins/Steps";

export default extendTheme(
  {breakpoints}, // Breakpoints
  globalStyles, // Global styles
  font,
  buttonStyles, // Button styles
  badgeStyles, // Badge styles
  linkStyles, // Link styles
  drawerStyles, // Sidebar variant for Chakra's drawer
  CardComponent, // Card component
  CardBodyComponent, // Card Body component
  CardHeaderComponent, // Card Header component
  MainPanelComponent, // Main Panel component
  PanelContentComponent, // Panel Content component
  PanelContainerComponent, // Panel Container component
  Stepper, // chakra-ui-steps Stepper
);
