import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { STYLED_COMPONENTS_PROPS } from "../constants/propTypes";
import UnstyledButton from "./UnstyledButton";

// #region PropTypes
export const togglePropTypes = {
  value: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  name: PropTypes.string,
  onActivation: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyPress: PropTypes.func,
  onMouseDown: PropTypes.func,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  useLateClick: PropTypes.bool,
  useLateKeyPress: PropTypes.bool
};

export const toggleDefaultProps = {
  value: null,
  children: null,
  className: null,
  disabled: false,
  invalid: false,
  name: null,
  onActivation: null,
  onBlur: null,
  onFocus: null,
  onKeyPress: null,
  onMouseDown: null,
  tabIndex: 0,
  useLateClick: false,
  useLateKeyPress: false
};

// #endregion

// #region Styled-Components
const Wrapper = styled(UnstyledButton)`
  ${props => props.styles.default};
  ${props => props.value === true && props.styles.active};
  ${props => props.value === false && props.styles.inactive};
  ${props => props.disabled && props.styles.disabled};
  ${props => props.invalid && props.styles.invalid};
`;
// #endregion

const UnstyledToggle = props => (
  <Wrapper
    className={props.className}
    disabled={props.disabled}
    invalid={props.invalid}
    name={props.name}
    onActivation={props.onActivation}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
    onKeyPress={props.onKeyPress}
    onMouseDown={props.onMouseDown}
    tabIndex={props.tabIndex}
    useLateClick={props.useLateClick}
    useLateKeyPress={props.useLateKeyPress}
    value={props.value}
    styles={props.styles}
  >
    {props.children}
  </Wrapper>
);

UnstyledToggle.propTypes = {
  ...togglePropTypes,
  styles: PropTypes.shape({
    default: STYLED_COMPONENTS_PROPS.CSS,
    invalid: STYLED_COMPONENTS_PROPS.CSS,
    active: STYLED_COMPONENTS_PROPS.CSS,
    inactive: STYLED_COMPONENTS_PROPS.CSS,
    disabled: STYLED_COMPONENTS_PROPS.CSS
  }).isRequired
};
UnstyledToggle.defaultProps = toggleDefaultProps;

export default UnstyledToggle;
