import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {INote} from '../../types/NoteTypes';
import {moderateScale} from '../../assets/constants/scale';
import colours from '../../assets/constants/colours';
import NoScaleText from '../common/NoScaleText';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch} from '../../redux/hooks';
import {deleteNote} from '../../redux/slices/noteSlice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/NavigationTypes';
import {values} from '../../assets/constants/values';

interface NoteListItemProps {
  item: INote;
  index: number;
}
type HomeScreenNavType = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const NoteListItem = (props: NoteListItemProps) => {
  const navigation = useNavigation<HomeScreenNavType>();
  const dispatch = useAppDispatch();

  const removeNote = (index: number) => {
    Alert.alert(
      'Notes',
      'Are you sure you want to remove this note?',
      [
        {text: 'Ok', onPress: () => dispatch(deleteNote(index))},
        {text: 'Cancel', onPress: () => console.log('')},
      ],

      {cancelable: true},
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('AddNoteScreen', {
          noteItem: props.item,
          noteIndex: props.index,
        })
      }>
      <View style={styles.noteItemMain}>
        <View>
          <NoScaleText style={styles.noteTitle}>{props.item.title}</NoScaleText>
          <View style={{maxHeight: moderateScale(50)}}>
            <RenderHtml
              contentWidth={values.deviceWidth}
              source={{html: `${props.item.noteText.slice(0, 50)}`}}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => removeNote(props.index)}>
          <Icon name="trash" size={moderateScale(20)}></Icon>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default NoteListItem;

const styles = StyleSheet.create({
  noteItemMain: {
    marginTop: moderateScale(10),
    backgroundColor: colours.gray[300],
    paddingHorizontal: moderateScale(10),
    borderRadius: 5,
    paddingVertical: moderateScale(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteTitle: {
    fontSize: moderateScale(15),
    color: colours.bgBlack,
    fontWeight: '500',
  },
});
