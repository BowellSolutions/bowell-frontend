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
