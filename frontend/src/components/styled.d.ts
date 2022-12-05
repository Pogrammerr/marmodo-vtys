import "styled-components";
import { PisagorTheme } from "./Theme";
import { ThemedColors } from "./Theme/types";

declare module "styled-components" {
  export interface DefaultTheme extends PisagorTheme {
    setTheme: () => void;
  }
}
