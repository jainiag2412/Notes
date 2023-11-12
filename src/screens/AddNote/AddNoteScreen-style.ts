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
    headerStyle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#312921",
        marginBottom: 10,
    },
    txtBox: {
        height: moderateScale(50),
        width: values.deviceWidth - moderateScale(30),
        borderWidth: 1,
        borderColor: colours.black,
        justifyContent: "center",
        borderRadius: 10, paddingHorizontal: moderateScale(10),
        marginTop: moderateScale(5)
    },
    richTextContainer: {
        // display: "flex",
        // flexDirection: "column-reverse",
        width: "100%",
        marginBottom: 10,
        maxHeight: moderateScale(250)
    },

    richTextEditorStyle: {
        maxHeight: moderateScale(250),
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        fontSize: 20,
    },

    richTextToolbarStyle: {
        backgroundColor: "#c6c3b3",
        borderColor: "#c6c3b3",
        borderWidth: 1,
        maxHeight: moderateScale(250)
    },
    absoluteBtnView: {
        alignItems: "center", position: "absolute", bottom: moderateScale(20), paddingLeft: moderateScale(15)
    },
    saveBtnView: {
        height: moderateScale(40),
        width: values.deviceWidth - moderateScale(30),
        backgroundColor: colours.purple,
        paddingHorizontal: moderateScale(15),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: moderateScale(7),
        // position: "absolute",
        // bottom: moderateScale(15),

    },
    saveTxt: {
        color: colours.white,
        fontSize: moderateScale(14)
    }
});
