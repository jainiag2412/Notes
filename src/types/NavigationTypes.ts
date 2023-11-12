import { StackScreenProps } from "@react-navigation/stack";
import { INote } from "./NoteTypes";

export type Screens = [
  "HomeScreen",
  "AddNoteScreen",
  "EditNoteScreen",
];

export type ScreenName = Screens[number];
export type EmptyParamScreensName = Exclude<ScreenName, keyof RootStackParams>;

type RootStackParams = {
  noteDetail: {
    noteId: number;
  };
  addNoteScreen: {
    noteItem: INote;
    noteIndex: number
  }
  
};

export type RootStackParamList = RootStackParams & {
  [screen in Exclude<ScreenName, keyof RootStackParams>]: undefined;
};

export type RouteName = keyof RootStackParamList;

export type RootStackScreenProps<T extends ScreenName> = StackScreenProps<
  RootStackParamList,
  T
>;
