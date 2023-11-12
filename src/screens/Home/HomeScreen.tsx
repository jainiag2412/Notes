import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/NavigationTypes';
import {useSelector} from 'react-redux';
import {getNotes} from '../../redux/selectors/noteSelector';
import {SectionList, View} from 'react-native';
import {styles} from './HomeScreen-style';
import Statusbar from '../../components/common/Statusbar';
import colours from '../../assets/constants/colours';
import Header from '../../components/common/Header';
import {INote} from '../../types/NoteTypes';
import NoteListItem from '../../components/NoteListItem/NoteListItem';
import NoResultsFound from '../../components/common/NoResultsFound';
import categories from '../../assets/cagegories.json';
import NoScaleText from '../../components/common/NoScaleText';

type HomeScreenNavType = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface ISectionList {
  title: string;
  data: INote[];
}

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavType>();

  const [sectionListData, setSectionListData] = useState<ISectionList[]>([]);
  const notes = useSelector(getNotes);

  useEffect(() => {
    const groupedData = notes.notes.reduce((groupMap, obj) => {
      const key = obj.cagtegoryId;
      const group = groupMap.get(key) || [];
      group.push(obj);
      groupMap.set(key, group);
      return groupMap;
    }, new Map<number, INote[]>());

    const sectionedArray = Array.from(groupedData.entries()).map(
      ([categoryId, data]) => {
        const title =
          categories.find(category => category.id === categoryId)?.name ?? '';

        return {
          title,
          data,
        };
      },
    );

    setSectionListData(sectionedArray);
  }, [notes.notes]);

  console.log(notes.notes);
  return (
    <View style={styles.container}>
      <Statusbar backgroundColor={colours.white} barStyle="dark-content" />
      <Header
        rightIcon={{
          name: 'plus',
          bgColor: colours.purple,
          onPress: () => navigation.navigate('AddNoteScreen'),
        }}
        headingTitle="Notes"
      />
      {notes.notes.length > 0 ? (
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={sectionListData}
          renderItem={({item}) => <NoteListItem item={item} index={item.id!} />}
          renderSectionHeader={({section: {title}}) => (
            <NoScaleText style={styles.sectionTitle}>{title}</NoScaleText>
          )}
        />
      ) : (
        <NoResultsFound noDataTxt="No Notes Available" icon="ban" />
      )}
    </View>
  );
};

export default HomeScreen;
