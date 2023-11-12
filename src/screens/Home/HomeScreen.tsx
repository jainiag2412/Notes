import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/NavigationTypes";
import { useAppDispatch } from "../../redux/hooks";
import { useSelector } from "react-redux";
import { getNotes } from "../../redux/selectors/noteSelector";
import { FlatList, Text, View } from "react-native";
import { styles } from "./HomeScreen-style";
import Statusbar from "../../components/common/Statusbar";
import colours from "../../assets/constants/colours";
import Header from "../../components/common/Header";
import { INote } from "../../types/NoteTypes";
import NoteListItem from "../../components/NoteListItem/NoteListItem";
import NoResultsFound from "../../components/common/NoResultsFound";

type HomeScreenNavType = StackNavigationProp<RootStackParamList, "HomeScreen">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavType>();

  const notes = useSelector(getNotes);

  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Statusbar backgroundColor={colours.white} barStyle="dark-content" />
      <Header
        rightIcon={{
          name: "plus",
          bgColor: colours.purple,
          onPress: () => navigation.navigate("AddNoteScreen"),
        }}
        headingTitle="Notes"
      />
      <FlatList
        data={notes.notes}
        renderItem={({ item, index }) => <NoteListItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.flatLst}
        ListEmptyComponent={<NoResultsFound
          icon={"search"}
          noDataTxt="No notes available at this moment."
        />}
      />
    </View>
  );
};

export default HomeScreen;
