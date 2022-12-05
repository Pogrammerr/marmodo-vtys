import { globalColors } from "./config";
import { ThemedColors } from "./types";

const lightTheme: ThemedColors = {
  ...globalColors,
  id: "light",
  text: globalColors.black,
  secondaryText: globalColors.lightGray,
  bodyBackgroundColor: "#E2EEF1",
  cardBackgroundColor: "#A6B5EA",
  secondaryButton: "#fff",
  modalBackgroundColor: "#A6B5EA",
};

export default lightTheme;
