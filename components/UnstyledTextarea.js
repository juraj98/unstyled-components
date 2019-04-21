import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// #region PropTypes
export const textareaPropTypes = {
  autoComplete: PropTypes.bool,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  resize: PropTypes.oneOf([
    "both",
    "vertical",
    "horizontal",
    "none",
    "inherit",
    "initial"
  ]),
  tabIndex: PropTypes.number,
  textareaRef: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export const textareaDefaultProps = {
  autoComplete: true,
  autoFocus: false,
  className: null,
  disabled: false,
  name: null,
  onBlur: null,
  onChange: null,
  onFocus: null,
  placeholder: null,
  resize: "initial",
  tabIndex: 0,
  textareaRef: null,
  value: ""
};
// #endregion

// #region Styled-Components
const Textarea = styled.textarea`
  line-height: 1.57;
  letter-spacing: -0.1px;
  font-size: 1.4rem;
  resize: ${props => props.resize};
`;
// #endregion

const UnstyledTextarea = props => {
  const elementProps = {
    autoComplete: props.autoComplete ? props.autoComplete.toString() : null,
    autoFocus: props.autoFocus,
    className: props.className,
    disabled: props.disabled,
    name: props.name,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onFocus: props.onFocus,
    placeholder: props.placeholder,
    resize: props.resize,
    tabIndex: props.tabIndex,
    value: props.value
  };

  return (
    <Textarea
      {...elementProps}
      readOnly={!props.onChange}
      ref={props.textareaRef}
    >
      Textarea
    </Textarea>
  );
};

UnstyledTextarea.propTypes = textareaPropTypes;

UnstyledTextarea.defaultProps = textareaDefaultProps;

export default UnstyledTextarea;
