import React, { forwardRef } from "react";
import { Platform, TextInput, TextInputProps } from "react-native";

export const NoScaleTextInput = forwardRef<TextInput, TextInputProps>(
  function NoScaleTextInputNew(
    { children, allowFontScaling = false, ...props }: TextInputProps,
    ref
  ) {
    return (
      <TextInput
        keyboardType={
          Platform.OS === "ios" ? "ascii-capable" : "visible-password"
        }
        allowFontScaling={allowFontScaling}
        ref={(instance) => {
          if (typeof ref === "function") {
            ref(instance);
          } else if (ref != null) {
            ref.current = instance;
          }
        }}
        {...props}
      >
        {children}
      </TextInput>
    );
  }
);
