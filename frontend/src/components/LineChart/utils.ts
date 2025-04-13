import { SkFont } from "@shopify/react-native-skia";
import { Platform } from "react-native";

export const calculateTextWidth = (text: string, font: SkFont) => {
  const calulatedWidth =
    Platform.OS === "web"
      ? font?.getGlyphWidths(font.getGlyphIDs(text)).reduce((acc, width) => acc + width, 0)
      : font?.measureText(text).width;

  return calulatedWidth || 0;
};
