import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  ColorValue,
  StatusBarProps,
} from "react-native";
import { moderateScale } from "../../assets/constants/scale";

const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? 50 : StatusBar.currentHeight + moderateScale(15);

interface Props extends StatusBarProps {
  backgroundColor: ColorValue | undefined;
}

const Statusbar: React.FC<Props> = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default Statusbar;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    zIndex: 2,
  },
});
