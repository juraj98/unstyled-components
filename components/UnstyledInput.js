import React from "react";
import PropTypes from "prop-types";

export const INPUT_TYPES = [
  "email",
  "number",
  "password",
  "search",
  "tel",
  "text",
  "url"
];

// #region PropTypes
export const inputPropTypes = {
  autoComplete: PropTypes.bool,
  autoFocus: PropTypes.bool,
  inputRef: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  pattern: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(INPUT_TYPES),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export const inputDefaultProps = {
  autoComplete: true,
  autoFocus: false,
  inputRef: null,
  className: null,
  disabled: false,
  max: null,
  maxLength: null,
  min: null,
  name: null,
  pattern: null,
  placeholder: null,
  tabIndex: 0,
  type: "text",
  value: "",
  onChange: null,
  onFocus: null,
  onBlur: null
};
// #endregion

const UnstyledInput = props => {
  const elementProps = {
    autoComplete: props.autoComplete ? props.autoComplete.toString() : null,
    autoFocus: props.autoFocus,
    className: props.className,
    disabled: props.disabled,
    max: props.max,
    maxLength: props.maxLength,
    min: props.min,
    name: props.name,
    pattern: props.pattern,
    placeholder: props.placeholder,
    type: props.type,
    value: props.value || "",
    onChange: props.onChange,
    onFocus: props.onFocus,
    onBlur: props.onBlur
  };

  return (
    <input {...elementProps} readOnly={!props.onChange} ref={props.inputRef} />
  );
};

UnstyledInput.propTypes = inputPropTypes;

UnstyledInput.defaultProps = inputDefaultProps;

export default UnstyledInput;
