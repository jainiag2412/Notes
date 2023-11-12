import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { fonts } from "../../assets/constants/values";
import colours from "../../assets/constants/colours";
import { moderateScale } from "../../assets/constants/scale";
import NoScaleText from "../common/NoScaleText";

type NoResultFoundType = {
  noDataTxt: string;
  icon: string;
};

const NoResultsFound = (props: NoResultFoundType) => {
  return (
    <View style={styles.mainView}>
      <Icon name={props.icon} size={moderateScale(50)} color={colours.purple} />
      <NoScaleText style={styles.noDataTxt}>{props.noDataTxt}</NoScaleText>
    </View>
  );
};

export default NoResultsFound;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(50),
  },

  noDataTxt: {
    fontWeight: "600",
    fontSize: fonts.inputFont + 2,
    marginVertical: moderateScale(20),
  },
});
