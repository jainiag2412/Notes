import { PixelRatio, Platform } from "react-native";

export function normalize(size: number, scale: number) {
  const newSize = size * scale;
  let value;

  if (Platform.OS === "ios") {
    value = PixelRatio.roundToNearestPixel(newSize);
  } else {
    value = PixelRatio.roundToNearestPixel(newSize) - 2;
  }

  return Math.round(value);
}
