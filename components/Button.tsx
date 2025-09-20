import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  disabled,
  ...props
}) => {
  const buttonStyles: ViewStyle[] = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    (loading || disabled) && styles.disabled,
    style,
  ];

  const textStyles: TextStyle[] = [
    styles.textBase,
    styles[`${variant}Text`],
    textStyle,
  ];

  const renderContent = () => (
    <>
      {leftIcon && <>{leftIcon} </>}
      {typeof children === "string" ? (
        <Text style={textStyles}>{loading ? "Loading..." : children}</Text>
      ) : (
        children
      )}
      {rightIcon && <> {rightIcon}</>}
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#fff" : "#4c669f"}
          style={styles.loader}
        />
      )}
    </>
  );

  if (variant === "primary") {
    return (
      <TouchableOpacity
        style={[styles.base, styles.primaryButton, style]}
        disabled={loading || disabled}
        activeOpacity={0.8}
        {...props}
      >
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, fullWidth && styles.fullWidth]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={loading || disabled}
      {...props}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 100,
  },
  gradient: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    overflow: "hidden",
  },
  primary: {
    backgroundColor: "#4c669f",
  },
  secondary: {
    backgroundColor: "#f0f4ff",
    borderWidth: 1,
    borderColor: "#4c669f",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#4c669f",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  md: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  lg: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.6,
  },
  textBase: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#4c669f",
  },
  outlineText: {
    color: "#4c669f",
  },
  ghostText: {
    color: "#4c669f",
  },
  loader: {
    marginLeft: 8,
  },
});

export default Button;
