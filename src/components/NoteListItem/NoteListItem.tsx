import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { INote } from "../../types/NoteTypes";
import { moderateScale } from "../../assets/constants/scale";
import colours from "../../assets/constants/colours";
import NoScaleText from "../common/NoScaleText";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppDispatch } from "../../redux/hooks";
import { deleteNote } from "../../redux/slices/noteSlice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/NavigationTypes";

interface NoteListItemProps {
    item: INote;
    index: number;
}
type HomeScreenNavType = StackNavigationProp<RootStackParamList, "HomeScreen">;

const NoteListItem = (props: NoteListItemProps) => {
const navigation=useNavigation<HomeScreenNavType>();
    const dispatch = useAppDispatch();

    const removeNote = (index: number) => {
        Alert.alert(
            "Notes",
            "Are you sure you want to remove this note?",
            [
              { text: "Ok", onPress: () => dispatch(deleteNote(index)) },
              { text: "Cancel", onPress: () => console.log("") },
            ],
      
            { cancelable: true }
          );
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate("AddNoteScreen",{noteItem: props.item, noteIndex: props.index})}>
        <View style={{ marginTop: moderateScale(15), backgroundColor: colours.purple, paddingHorizontal: moderateScale(10), borderRadius: 5, paddingVertical: moderateScale(25), flexDirection: 'row', justifyContent: 'space-between'}}>
            <NoScaleText style={{fontSize: moderateScale(15), color: colours.white, fontWeight: "500"}}>
                {props.item.title}
            </NoScaleText>
            <TouchableOpacity onPress={() => removeNote(props.index)}>
                <Icon name="trash"></Icon>
            </TouchableOpacity>
        </View>
        </TouchableOpacity>

    );
}

export default NoteListItem;