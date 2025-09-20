import React, { forwardRef } from "react";
import { Platform, StyleProp, ViewStyle } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

export type AppBottomSheetProps = {
  height?: number;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  draggable?: boolean;
} & Partial<React.ComponentProps<typeof RBSheet>>;

export type AppBottomSheetRef = RBSheet;

/**
 * Reusable Bottom Sheet Component
 * Usage:
 * const ref = useRef<RBSheet>(null);
 * <AppBottomSheet ref={ref}><Text>Hello</Text></AppBottomSheet>
 * ref.current?.open()
 */
const AppBottomSheet = forwardRef<AppBottomSheetRef, AppBottomSheetProps>(
  (
    { height = 450, children, containerStyle, draggable = false, ...rest },
    ref
  ) => {
    return (
      <RBSheet
        ref={ref}
        height={height}
        closeOnPressMask={true}
        closeOnPressBack={true}
        useNativeDriver
        draggable={draggable}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          container: [
            {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 16,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              ...Platform.select({
                ios: {
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                },
                android: {
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  elevation: 5,
                },
              }),
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
              overflow: "hidden",
            },
            containerStyle as any,
          ],
          draggableIcon: {
            backgroundColor: "#ccc",
            width: 60,
          },
        }}
        {...rest}
      >
        {children}
      </RBSheet>
    );
  }
);

AppBottomSheet.displayName = "AppBottomSheet";

export default AppBottomSheet;
