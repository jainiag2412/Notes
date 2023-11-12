import { Dimensions, PixelRatio } from "react-native";
import { normalize } from "./methods";

export const values = {
  deviceWidth: Dimensions.get("window").width,
  deviceHeight: Dimensions.get("window").height,
  mapEdgePadding: { top: 50, right: 100, bottom: 50, left: 100 },
};

export const scale =
  values.deviceWidth < 600
    ? Math.round((values.deviceWidth / 320) * 10) / 10
    : 1.2;

export const fonts = {
  graphFont: normalize(8, scale),
  smallerFont: normalize(10, scale),
  smallFont: normalize(12, scale),
  inputFont: normalize(14, scale),
  mediumSmallFont: normalize(16, scale),
  mediumFont: normalize(18, scale),
  mediumLargeFont: normalize(20, scale),
  largeFont: normalize(24, scale),
  scoringFont: normalize(28, scale),
  boldFont: normalize(32, scale),
  xlargeFont: normalize(36, scale),
  xxlargeFont: normalize(50, scale),
};

export const scoreEntryComponentWidth: number = Math.round(
  values.deviceWidth * 0.9
);

export const widthPercentageToDP = (widthPercent: string) => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((values.deviceWidth * elemWidth) / 100);
};

export const heightPercentageToDP = (heightPercent: string) => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(
    (values.deviceHeight * elemHeight) / 100
  );
};
