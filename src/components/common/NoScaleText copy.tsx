import React from "react";
import { Text, TextProps } from "react-native";

export default function NoScaleText(props: TextProps) {
  return (
    <Text
      allowFontScaling={props.allowFontScaling ? props.allowFontScaling : false}
      {...props}
    >
      {props.children}
    </Text>
  );
}
