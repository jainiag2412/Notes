import React, { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { fonts } from "../../assets/constants/values";
import colours from "../../assets/constants/colours";
import { moderateScale } from "../../assets/constants/scale";
import NoScaleText from "./NoScaleText";
import { useSelector } from "react-redux";

type HeaderProps = {
  headingTitle?: string;
  rightIcon?: {
    name: string;
    bgColor: string;
    onPress: () => void;
  };
};

const Header: React.FC<PropsWithChildren<HeaderProps>> = (
  props: HeaderProps
) => {
  return (
    <View style={styles.headerView}>
      <NoScaleText style={styles.headingTitle}>
        {props.headingTitle}
      </NoScaleText>

      <TouchableOpacity onPress={props?.rightIcon?.onPress}>
        {props.rightIcon && (
          <View
            style={[
              styles.roundView,
              { backgroundColor: props?.rightIcon?.bgColor },
            ]}
          >
            <Icon
              name={props?.rightIcon?.name}
              size={fonts.smallFont}
              color={colours.white}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    height: moderateScale(50),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roundView: {
    height: moderateScale(40),
    width: moderateScale(40),
    backgroundColor: colours.black,
    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  headingTitle: {
    fontSize: fonts.mediumSmallFont,
    fontWeight: "600",
  },
  cartCountView: {
    position: "absolute",
    backgroundColor: "red",
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 10,
    right: -5,
    top: -5,
    alignItems: "center",
    justifyContent: "center",
  },
  cartCount: {
    color: colours.white,
  },
});
