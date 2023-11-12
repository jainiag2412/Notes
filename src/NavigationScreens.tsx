import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/NavigationTypes";
import HomeScreen from "./screens/Home/HomeScreen";
import AddNoteScreen from "./screens/AddNote/AddNoteScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navigationStack = (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AddNoteScreen"
      component={AddNoteScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
