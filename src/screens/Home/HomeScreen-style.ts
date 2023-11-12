import { StyleSheet } from "react-native";
import colours from "../../assets/constants/colours";
import { moderateScale } from "../../assets/constants/scale";
import { values } from "../../assets/constants/values";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    paddingHorizontal: moderateScale(15),
  },
  searchView: {
    height: moderateScale(50),
    width: values.deviceWidth - moderateScale(30),
    backgroundColor: colours.gray[200],
    marginTop: moderateScale(15),
    borderRadius: moderateScale(25),
    flexDirection: "row",
    alignItems: "center",
  },
  txtInput: {
    paddingHorizontal: moderateScale(15),
  },
  optionMainView: {
    height: values.deviceHeight * 0.32,
    width: values.deviceWidth / 2 - moderateScale(20),
    borderRadius: 5,
    backgroundColor: colours.gray[100],
    margin: 3,
  },
  flatLst: {
    flex: 1,
    marginTop: moderateScale(10),
  },
});
