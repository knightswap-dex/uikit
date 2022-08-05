import styled, { DefaultTheme } from "styled-components";
import { space } from "styled-system";
import { ButtonProps, ButtonThemeVariant, variants } from "./types";

type ThemedProps = {
  theme: DefaultTheme;
} & ButtonProps;

const getDisabledStyles = ({ isLoading, theme }: ThemedProps) => {
  if (isLoading === true) {
    return `
      &:disabled,
      &.button--disabled {
        cursor: not-allowed;
      }
    `;
  }

  return `
    &:disabled,
    &.button--disabled {
      background-color: ${theme.colors.backgroundDisabled};
      border-color: ${theme.colors.backgroundDisabled};
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
    }
  `;
};

const removePointerEvents = ({ disabled, as }: ThemedProps) => {
  if (disabled && as && as !== "button") {
    return `
      pointer-events: none;
    `;
  }

  return "";
};

const getButtonVariantProp = (prop: keyof ButtonThemeVariant) => ({
  theme,
  variant = variants.PRIMARY,
}: ThemedProps) => {
  return theme.button[variant][prop];
};

const StyledButton = styled.button<ButtonProps>`
  align-items: center;
  background-color: transparent;
  background-image: url("data:image/png;base64,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");
  // background-color: ${getButtonVariantProp("background")};
  border: none;
  // border-radius: 16px;
  background-size: 100% 100%;
    background-repeat: no-repeat;
  // box-shadow: ${getButtonVariantProp("boxShadow")};
  // color: ${getButtonVariantProp("color")};
  color: #C9D5EB;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;  
  font-weight: 600;
  /* max-content instead of auto for Safari fix */
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "max-content")};
  height: ${({ size }) => (size === "sm" ? "32px" : "48px")};
  line-height: 1;
  letter-spacing: 0.03em;
  justify-content: center;
  outline: 0;
  padding: ${({ size }) => (size === "sm" ? "0 16px" : "0 24px")};
  transition: background-color 0.2s;
  opacity: ${({ isLoading }) => (isLoading ? 0.5 : 1)};

  &:hover:not(:disabled):not(.button--disabled):not(:active) {
    opacity: 0.8;
  }

  &:active:not(:disabled):not(.button--disabled) {
    opacity: 0.85;
  }

  ${getDisabledStyles}
  ${removePointerEvents}
  ${space}
`;

StyledButton.defaultProps = {
  fullWidth: false,
  type: "button",
};

export default StyledButton;