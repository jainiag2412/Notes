import { Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("window");

//Screen Constatnts
//375 and 812 are constants, check from Zeplin
const guidelineBaseWidth = 375;
const guidelineBaseHeight =
  Platform.OS === "ios" ? 812 : height <= 550 ? 667 : height;
/**
 * Function to scale a value based on the size of the screen size and the original
 * size used on the design.
 */

const scale = (size: number) => Math.ceil((width / guidelineBaseWidth) * size);
const verticalScale = (size: number) =>
  Math.ceil((height / guidelineBaseHeight) * size);
const moderateScale = (size: number, factor = 0.5) =>
  Math.ceil(size + (scale(size) - size) * factor);
const moderateVerticalScale = (size: number, factor = 0.5) =>
  Math.ceil(size + (verticalScale(size) - size) * factor);

const WP = (percent = 0) => {
  return Math.round(width * (percent / 100));
};

const HP = (percent = 0) => {
  return Math.round(height * (percent / 100));
};

export {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
  WP,
  HP,
  height,
  width,
};
