import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// #region Helper functions
export const getButtonOnClick = (
  isDisabled,
  onClick,
  useLateClick,
  onActivation
) => event => {
  if (isDisabled) return;
  if (onClick && !useLateClick) onClick(event);
  if (onActivation) onActivation(event);
  if (onClick && useLateClick) onClick(event);
};

export const getButtonOnKeyPress = (
  isDisabled,
  onKeyPress,
  useLateKeyPress,
  onActivation,
  activationKeys
) => event => {
  if (isDisabled) return;
  if (onKeyPress && !useLateKeyPress) onKeyPress(event);
  if (onActivation && event.key && activationKeys.includes(event.key)) {
    onActivation(event);
  }
  if (onKeyPress && useLateKeyPress) onKeyPress(event);
};
// #endregion

// #region PropTypes
export const buttonPropTypes = {
  /** List of keys that will trigger onActivation */
  activationKeys: PropTypes.arrayOf(PropTypes.string),
  /** Function that recieves component reference as argument. Can be used to set reference if the UnstyledButton is used directly */
  ref: PropTypes.func,
  /** Determines if button is disabled or not */
  isDisabled: PropTypes.bool,
  /** Function that recieves component reference as argument. Can be used to set reference if the UnstyledButton is used as styled-component */
  buttonRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  /** Sets Button’s content */
  children: PropTypes.node,
  /** Sets Button's className. Used to style component using styled-components */
  className: PropTypes.string,
  /** If set to false preventDefault and stopPropagation will be called on mouseDown, preveting focusing of Button on click. */
  focusOnClick: PropTypes.bool,
  /** Sets Button’s tabIndex */
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** If set to true, on click event onClick function will be executed after onActivation function */
  useLateClick: PropTypes.bool,
  /** If set to true, on keyPress event onKeyPress function will be executed after onActivation function */
  useLateKeyPress: PropTypes.bool,
  /** Function that is be called onClick event and onKeyPress if it is invoked by pressing “Enter” */
  onActivation: PropTypes.func,
  /** Function that is be called onClick event. */
  onClick: PropTypes.func,
  /** Function that is called onKeyDown event. */
  onKeyDown: PropTypes.func,
  /** Function that is called onKeyPress event. */
  onKeyPress: PropTypes.func,
  /** Function that is called onMouseDown event. */
  onMouseDown: PropTypes.func,
  /** Function that is called onMouseDown event. */
  onFocus: PropTypes.func,
  /** Function that is called onMouseDown event. */
  onBlur: PropTypes.func,
  /** Determines which HTML element will be used for component. */
  htmlElement: PropTypes.oneOf(["div", "button"])
};

export const defaultButtonProps = {
  activationKeys: ["Enter"],
  buttonRef: null,
  isDisabled: false,
  children: null,
  className: null,
  focusOnClick: false,
  ref: null,
  tabIndex: 0,
  useLateClick: false,
  useLateKeyPress: false,
  onActivation: null,
  onClick: null,
  onKeyDown: null,
  onKeyPress: null,
  onFocus: null,
  onBlur: null,
  onMouseDown: null,
  htmlElement: "div"
};
// #endregion

const UnstyledButton = props => {
  const onMouseDown = event => {
    if (!props.focusOnClick) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const onClick = getButtonOnClick(
    props.isDisabled,
    props.onClick,
    props.useLateClick,
    props.onActivation
  );

  const onKeyPress = getButtonOnKeyPress(
    props.isDisabled,
    props.onKeyPress,
    props.useLateKeyPress,
    props.onActivation,
    props.activationKeys
  );

  const elementProps = {
    onClick,
    onKeyPress,
    onMouseDown,
    role: "Button",
    tabIndex: props.tabIndex,
    className: props.className,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    onKeyDown: props.onKeyDown,
    ref: props.ref || props.buttonRef
  };

  return (
    <div as={props.htmlElement} {...elementProps}>
      {props.children}
    </div>
  );
};

UnstyledButton.propTypes = buttonPropTypes;
UnstyledButton.defaultProps = defaultButtonProps;

export default UnstyledButton;
