import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react"
import { RootStackParamList } from "../../types/NavigationTypes";
import categoriesList from '../../assets/cagegories.json';
import clientsList from '../../assets/clients.json';
import {
    actions,
    RichEditor,
    RichToolbar,
} from "react-native-pell-rich-editor";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale } from "../../assets/constants/scale";
import DropDownPicker from "react-native-dropdown-picker";
import NoScaleText from "../../components/common/NoScaleText";
import { NoScaleTextInput } from "../../components/common/NoScaleTextInput";
import { INote } from "../../types/NoteTypes";
import { useAppDispatch } from "../../redux/hooks";
import { addNote, editNote } from "../../redux/slices/noteSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import colours from "../../assets/constants/colours";
import Header from "../../components/common/Header";

type HomeScreenNavType = StackNavigationProp<RootStackParamList, "AddNoteScreen">;

const AddNoteScreen = () => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation<HomeScreenNavType>();


    const richText = useRef();
    const route = useRoute();

    const noteItem: INote = route.params?.noteItem;
    const noteItemIndex: number = route.params?.noteIndex;
    const [noteTitle, setNoteTitle] = useState(noteItem ? noteItem.title : "");
    const [descHTML, setDescHTML] = useState(noteItem ? noteItem.noteText : "");
    const [clientsDropDown, setClientsDropDown] = useState<{ label: string, value: number }[]>([]);
    const [categoryDropDown, setCategoryDropDown] = useState<{ label: string, value: number }[]>([]);

    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [clientsOpen, setClientsOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(noteItem ? noteItem.cagtegoryId : null);
    const [selectedClient, setSelectedClient] = useState(noteItem ? noteItem.clientId : null);


    useEffect(() => {
        const clientItems = clientsList.map((client, index) => {
            return { label: client.name, value: client.id }
        });

        const categoryItems = categoriesList.map((client, index) => {
            return { label: client.name, value: client.id }
        });

        setClientsDropDown(clientItems);
        setCategoryDropDown(categoryItems);
    }, [])

    const richTextHandle = (descriptionText: string) => {
        if (descriptionText) {
            setDescHTML(descriptionText);
        }
    };

    const createNote = () => {
        const note: INote = {
            noteText: descHTML,
            clientId: selectedClient ?? 0,
            cagtegoryId: selectedCategory ?? 0,
            title: noteTitle
        }
        if(noteItem) {
            dispatch(editNote({note: note, index: noteItemIndex}))
        }else {    
            dispatch(addNote(note));
        }
      
        navigation.goBack();
    }

    return (
        <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1, marginHorizontal: moderateScale(15) }}>
           
            <View style={styles.container}>
            <Header
                rightIcon={{
                    name: "back",
                    bgColor: colours.purple,
                    onPress: () => navigation.goBack(),
                }}
                headingTitle="Notes"
            />
                <NoScaleTextInput
                    // style={{flex:1}}
                    // autoCapitalize="none"
                    onChangeText={(text) => setNoteTitle(text)}
                    value={noteTitle}
                    placeholder="Card Number"
                    keyboardType="numeric"
                />
                <NoScaleText style={{ marginTop: moderateScale(30), }}>Select Category:</NoScaleText>
                <DropDownPicker
                    open={categoriesOpen}
                    items={categoryDropDown}
                    setOpen={setCategoriesOpen}
                    setValue={setSelectedCategory}
                    placeholder={'Choose category'}
                    multiple={false}
                    value={selectedCategory}
                    dropDownDirection="TOP"
                    style={{ marginBottom: moderateScale(15) }}
                />

                <NoScaleText style={{ marginTop: moderateScale(30), }}>Select Client:</NoScaleText>
                <DropDownPicker
                    open={clientsOpen}
                    items={clientsDropDown}
                    setOpen={setClientsOpen}
                    setValue={setSelectedClient}
                    placeholder={'Choose client'}
                    multiple={false}
                    value={selectedClient}
                    style={{ marginBottom: moderateScale(15) }}
                />

                <View style={styles.richTextContainer}>
                    <RichEditor
                        ref={richText}
                        onChange={richTextHandle}
                        placeholder="Write your cool content here :)"
                        androidHardwareAccelerationDisabled={true}
                        style={styles.richTextEditorStyle}
                        initialHeight={250}
                        initialContentHTML={descHTML}
                    />
                    <RichToolbar
                        editor={richText}
                        selectedIconTint="#873c1e"
                        iconTint="#312921"
                        actions={[
                            actions.insertImage,
                            actions.setBold,
                            actions.setItalic,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                            actions.insertLink,
                            actions.setStrikethrough,
                            actions.setUnderline,
                        ]}
                        style={styles.richTextToolbarStyle}
                    />
                    <TouchableOpacity
                        onPress={createNote}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        marginTop: moderateScale(100),
        alignItems: "center",
    },

    headerStyle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#312921",
        marginBottom: 10,
    },

    richTextContainer: {
        display: "flex",
        flexDirection: "column-reverse",
        width: "100%",
        marginBottom: 10,
    },

    richTextEditorStyle: {
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
    },
});


export default AddNoteScreen;