import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { STYLED_COMPONENTS_PROPS } from "../constants/propTypes";

import UnstyledButton from "./UnstyledButton";

const SELECT_ACTIVATION_KEYS = ["Enter", " "];

// #region PropTypes
export const selectPropTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })
    ])
  ).isRequired,
  styles: PropTypes.shape({
    optionsWrapper: STYLED_COMPONENTS_PROPS.CSS,
    option: STYLED_COMPONENTS_PROPS.CSS,
    placeholder: STYLED_COMPONENTS_PROPS.CSS,
    placeholderOption: STYLED_COMPONENTS_PROPS.CSS
  }),
  autoClose: PropTypes.bool,
  includePlaceholderInOptions: PropTypes.bool,
  onChange: PropTypes.func,
  onSelectOpen: PropTypes.func,
  onSelectClose: PropTypes.func
};

export const selectDefaultProps = {
  className: null,
  placeholder: null,
  value: null,
  styles: {},
  autoClose: true,
  includePlaceholderInOptions: true,
  onChange: null,
  onSelectOpen: null,
  onSelectClose: null
};
// #endregion

// #region styled-components
const Wrapper = styled(UnstyledButton)``;
const OptionsWrapper = styled.div`
  ${props => props.customStyle};
`;
const Option = styled(UnstyledButton)`
  ${props => props.customStyle};
`;
const Placeholder = styled.div`
  ${props => props.customStyle};
`;
// #endregion

const getPropsForStyling = (state, props) => ({
  isOpened: state.isOpened,
  numberOfOption: props.options.length,
  includePlaceholderInOptions: props.includePlaceholderInOptions
});

const normalizeOption = (accumulator, option) => {
  const normalizedOption =
    typeof option === "string" ? { value: option, label: option } : option;
  accumulator[normalizedOption.value] = normalizedOption;
  return accumulator;
};

class UnstyledSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false
    };

    const totalNumberOfOptions = this.props.includePlaceholderInOptions
      ? props.options.length + 1
      : props.options.length;
    this.optionRefs = Array(totalNumberOfOptions)
      .fill()
      .map(() => React.createRef());
    this.wrapperRef = React.createRef();

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onWrapperActivation = this.onWrapperActivation.bind(this);
    this.onWrapperKeyDown = this.onWrapperKeyDown.bind(this);
    this.onSelectElementBlur = this.onSelectElementBlur.bind(this);
    this.getOnOptionActivation = this.getOnOptionActivation.bind(this);
    this.getOnOptionKeyDown = this.getOnOptionKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onDocumentClick);
  }

  onDocumentClick(event) {
    if (
      this.props.autoClose &&
      !this.wrapperRef.current.contains(event.target) &&
      this.state.isOpened
    ) {
      this.setState({ isOpened: false });
      if (this.props.onSelectClose) this.props.onSelectClose();
    }
  }

  onWrapperActivation() {
    this.setState(state => {
      if (state.isOpened && this.props.onSelectClose) {
        this.props.onSelectClose();
      } else if (!state.isOpened && this.props.onSelectOpen) {
        this.props.onSelectOpen();
      }
      return { isOpened: !state.isOpened };
    });
  }

  onSelectElementBlur(event) {
    event.stopPropagation();
    if (this.props.autoClose && this.state.isOpened) {
      setTimeout(() => {
        if (!this.wrapperRef.current.contains(document.activeElement)) {
          this.setState({ isOpened: false });
          if (this.props.onSelectClose) this.props.onSelectClose();
        }
      }, 0);
    }
  }

  onWrapperKeyDown(event) {
    if (this.state.isOpened) {
      if (event.key === "ArrowDown") {
        this.optionRefs[0].current.focus();
      } else if (event.key === "ArrowUp") {
        this.optionRefs[this.optionRefs.length - 1].current.focus();
      }
    }
    if (
      !this.state.isOpened &&
      (event.key === "ArrowDown" || event.key === "ArrowUp")
    ) {
      this.setState({ isOpened: true });
      if (this.props.onSelectOpen) this.props.onSelectOpen();
      this.optionRefs[0].current.focus();
    }
  }

  getOnOptionActivation(value) {
    return event => {
      event.stopPropagation();
      this.setState({ isOpened: false });
      if (this.props.onSelectClose) this.props.onSelectClose();

      // Only focus wrapper is option was selected by keypress
      if (event.key) this.wrapperRef.current.focus();

      if (this.props.onChange) this.props.onChange(value, event);
    };
  }

  getOnOptionKeyDown(optionIndex) {
    return event => {
      event.stopPropagation();
      if (event.key === "ArrowUp" && optionIndex !== 0) {
        this.optionRefs[optionIndex - 1].current.focus();
      } else if (
        event.key === "ArrowDown" &&
        optionIndex !== this.optionRefs.length - 1
      ) {
        this.optionRefs[optionIndex + 1].current.focus();
      }
    };
  }

  renderOptions(normalizedOptions, propsForStyling) {
    const allOptionsArray = this.props.includePlaceholderInOptions
      ? [
          { value: null, label: this.props.placeholder, isPlaceholder: true },
          ...Object.values(normalizedOptions)
        ]
      : Object.values(normalizedOptions);

    return allOptionsArray.map(({ value, label, isPlaceholder }, i) => {
      return (
        <Option
          {...propsForStyling}
          activationKeys={SELECT_ACTIVATION_KEYS}
          key={value}
          buttonRef={this.optionRefs[i]}
          onBlur={this.onSelectElementBlur}
          onKeyDown={this.getOnOptionKeyDown(i)}
          customStyle={css`
            ${this.props.styles.option};
            ${isPlaceholder && this.props.styles.placeholderOption};
          `}
          onActivation={this.getOnOptionActivation(value)}
          tabIndex={this.state.isOpened ? 0 : -1}
        >
          {label}
        </Option>
      );
    });
  }

  render() {
    const normalizedOptions = this.props.options.reduce(normalizeOption, {});
    const propsForStyling = getPropsForStyling(this.state, this.props);

    return (
      <Wrapper
        {...propsForStyling}
        className={this.props.className}
        onActivation={this.onWrapperActivation}
        buttonRef={this.wrapperRef}
        onKeyDown={this.onWrapperKeyDown}
        onBlur={this.onSelectElementBlur}
        activationKeys={SELECT_ACTIVATION_KEYS}
      >
        <Placeholder
          {...propsForStyling}
          customStyle={this.props.styles.placeholder}
        >
          {normalizedOptions[this.props.value]?.label || this.props.placeholder}
        </Placeholder>
        <OptionsWrapper
          {...propsForStyling}
          customStyle={this.props.styles.optionsWrapper}
          isOpened={this.state.isOpened}
          numberOfOption={this.props.options.length}
        >
          {this.renderOptions(normalizedOptions, propsForStyling)}
        </OptionsWrapper>
      </Wrapper>
    );
  }
}

UnstyledSelect.propTypes = selectPropTypes;

UnstyledSelect.defaultProps = selectDefaultProps;

export default UnstyledSelect;
