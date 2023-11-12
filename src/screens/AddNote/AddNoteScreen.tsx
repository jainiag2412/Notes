import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {RootStackParamList} from '../../types/NavigationTypes';
import categoriesList from '../../assets/cagegories.json';
import clientsList from '../../assets/clients.json';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {TouchableOpacity, View} from 'react-native';
import {moderateScale} from '../../assets/constants/scale';
import DropDownPicker from 'react-native-dropdown-picker';
import NoScaleText from '../../components/common/NoScaleText';
import {NoScaleTextInput} from '../../components/common/NoScaleTextInput';
import {INote} from '../../types/NoteTypes';
import {useAppDispatch} from '../../redux/hooks';
import {addNote, editNote} from '../../redux/slices/noteSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import colours from '../../assets/constants/colours';
import Header from '../../components/common/Header';
import Statusbar from '../../components/common/Statusbar';
import {styles} from './AddNoteScreen-style';
import FunctionUtils from '../../Utils/FunctionUtils';

type HomeScreenNavType = StackNavigationProp<
  RootStackParamList,
  'AddNoteScreen'
>;

const AddNoteScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeScreenNavType>();

  const richText = useRef();
  const route = useRoute();

  const noteItem: INote = route.params?.noteItem;
  const noteItemIndex: number = route.params?.noteIndex;
  const [noteTitle, setNoteTitle] = useState(noteItem ? noteItem.title : '');
  const [descHTML, setDescHTML] = useState(noteItem ? noteItem.noteText : '');
  const [clientsDropDown, setClientsDropDown] = useState<
    {label: string; value: number}[]
  >([]);
  const [categoryDropDown, setCategoryDropDown] = useState<
    {label: string; value: number}[]
  >([]);

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(
    noteItem ? noteItem.cagtegoryId : null,
  );
  const [selectedClient, setSelectedClient] = useState(
    noteItem ? noteItem.clientId : null,
  );

  const isSaveDisabled = useMemo(() => {
    return (
      noteTitle === '' || selectedCategory === null || selectedClient === null
    );
  }, [noteTitle, selectedCategory, selectedClient]);

  useEffect(() => {
    const clientItems = clientsList.map((client, index) => {
      return {label: client.name, value: client.id};
    });

    const categoryItems = categoriesList.map((client, index) => {
      return {label: client.name, value: client.id};
    });

    setClientsDropDown(clientItems);
    setCategoryDropDown(categoryItems);
  }, []);

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
      title: noteTitle,
    };
    if (noteItem) {
      dispatch(editNote({note: note, id: noteItemIndex}));
      FunctionUtils.showToast('Note updated successfully');
    } else {
      dispatch(addNote(note));
      FunctionUtils.showToast('Note added successfully');
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Statusbar backgroundColor={colours.white} barStyle="dark-content" />
      <Header
        rightIcon={{
          name: 'arrow-left',
          bgColor: colours.purple,
          onPress: () => navigation.goBack(),
        }}
        headingTitle="Add Notes"
      />
      <NoScaleText style={{marginTop: moderateScale(20)}}>
        Enter Note Title
      </NoScaleText>

      <View style={styles.txtBox}>
        <NoScaleTextInput
          onChangeText={text => setNoteTitle(text)}
          value={noteTitle}
          placeholder="Note title"
        />
      </View>

      <NoScaleText style={{marginTop: moderateScale(20)}}>
        Select Category:
      </NoScaleText>
      <DropDownPicker
        open={categoriesOpen}
        items={categoryDropDown}
        setOpen={setCategoriesOpen}
        setValue={setSelectedCategory}
        placeholder={'Choose category'}
        multiple={false}
        value={selectedCategory}
        dropDownDirection="TOP"
        style={{
          marginBottom: moderateScale(15),
          height: moderateScale(50),
          marginTop: moderateScale(5),
        }}
      />

      <NoScaleText style={{marginTop: moderateScale(15)}}>
        Select Client:
      </NoScaleText>
      <DropDownPicker
        open={clientsOpen}
        items={clientsDropDown}
        setOpen={setClientsOpen}
        setValue={setSelectedClient}
        placeholder={'Choose client'}
        multiple={false}
        value={selectedClient}
        style={{
          marginBottom: moderateScale(15),
          height: moderateScale(50),
          marginTop: moderateScale(5),
        }}
      />

      <View style={styles.richTextContainer}>
        <RichToolbar
          editor={richText}
          selectedIconTint="#873c1e"
          iconTint="#312921"
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.setStrikethrough,
            actions.setUnderline,
          ]}
          style={styles.richTextToolbarStyle}
        />
        <RichEditor
          ref={richText}
          onChange={richTextHandle}
          placeholder="Write your cool content here :)"
          androidHardwareAccelerationDisabled={true}
          style={styles.richTextEditorStyle}
          initialHeight={250}
          initialContentHTML={descHTML}
        />
      </View>
      <View style={styles.absoluteBtnView}>
        <TouchableOpacity
          disabled={isSaveDisabled}
          style={[
            styles.saveBtnView,
            {
              backgroundColor: isSaveDisabled
                ? colours.purpleOpacity
                : colours.purple,
            },
          ]}
          onPress={createNote}>
          <NoScaleText style={styles.saveTxt}>Save</NoScaleText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNoteScreen;
