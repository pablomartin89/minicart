import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ArrowDownIcon from './ArrowDownIcon'
import config from 'vtex-tachyons/config'

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      optionsWidth: 0,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
    this.setState({ optionsWidth: this.wrapperRef.clientWidth })
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  };

  setSelectRef = el => {
    this.select = el
  };

  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({ open: false }, () => {
        this.props.onClose && this.props.onClose(e)
      })
    }
  };

  handleClick = e => {
    const { onOpen, onClose } = this.props
    this.select && this.select.blur()
    this.setState({ open: !this.state.open }, () => {
      this.state.open ? onOpen && onOpen(e) : onClose && onClose(e)
    })
  };

  handleOptionClick = (e, option) => {
    const { disabled, onChange, onClose } = this.props

    !disabled && onChange && onChange(e, option)
    this.setState({ open: false }, () => {
      onClose && onClose(e)
    })
  };

  getValueLabel() {
    const option = this.props.options.find(option => option.value === this.props.value)
    if (!option) return '\xa0'
    return option.label
  }

  render() {
    const {
      label,
      id,
      short,
      long,
      large,
      xLarge,
      block,
      value,
      disabled,
      options,
    } = this.props
    const { open } = this.state

    if (label && !id) {
      throw new Error('Dropdown component with Label must have an Id')
    }

    if (short && long) {
      throw new Error(
        'Dropdown component cannot be short AND long at the same time'
      )
    }

    if (large && xLarge) {
      throw new Error(
        'Dropdown component cannot be large AND extra large at the same time'
      )
    }

    let width
    let maxHeight
    let iconSize

    let classes = 'bg-transparent bn w-100 '
    let containerClasses = 'br2 bw1 '
    let optionsClasses = 'absolute bl br bb bw1 br2 br--bottom bg-white flex-column z-max overflow-y-auto '
    let optionClasses = 'w-100 pointer flex bg-white hover-bg-near-white near-black tl bb-0 bl-0 br-0 bt b--near-white '

    if (block) width = '100%'

    classes += (disabled ? 'bg-light-gray ' : 'pointer ')
    classes += (!disabled && value ? 'near-black ' : 'gray ')

    if (large) {
      classes += 'f5 pv4 pl6 pr5 '
      optionClasses += 'f5 pv4 ph6 '
      maxHeight = '200px'
      iconSize = 18
      if (!block) {
        if (short) {
          width = '100px'
        } else if (long) {
          width = '420px'
        } else {
          width = '250px'
        }
      }
    } else if (xLarge) {
      classes += 'f4 pv5 pl7 pr6 '
      optionClasses += 'f4 pv5 ph7 '
      maxHeight = '260px'
      iconSize = 22
      if (!block) {
        if (short) {
          width = '150px'
        } else if (long) {
          width = '520px'
        } else {
          width = '320px'
        }
      }
    } else {
      classes += 'f6 pv3 pl5 pr4 '
      optionClasses += 'f6 pv3 ph5 '
      maxHeight = '150px'
      iconSize = 16
      if (!block) {
        if (short) {
          width = '70px'
        } else if (long) {
          width = '350px'
        } else {
          width = '200px'
        }
      }
    }

    const containerStyle = { width: width }
    const optionsStyle = {
      maxHeight: maxHeight,
      width: this.state.optionsWidth,
    }

    if (disabled) {
      containerClasses += 'bg-light-gray '
    } else {
      containerClasses += 'bg-white '
    }

    if (open) {
      containerClasses += 'bl br bt pb1 b--silver br--top '
      optionsClasses += 'b--silver '
    } else {
      containerClasses += 'ba b--light-gray '
      optionsClasses += 'pointer b--light-gray'
      if (!disabled) {
        containerClasses += 'hover-b--silver '
      }
    }

    return (
      <div ref={this.setWrapperRef} className={block ? 'db' : 'dib'}>
        {label &&
          <label htmlFor={id} className={`dib mb3 ${block ? 'w-100' : ''}`}>
            {label}
          </label>}
        <div className={containerClasses} style={containerStyle}>
          <button
            id={id}
            disabled={disabled}
            ref={this.setSelectRef}
            onClick={this.handleClick}
            className={classes}
          >
            <div className="flex">
              <div className="flex-auto tl">
                {this.getValueLabel()}
              </div>
              <div className="flex-none flex items-center pl6">
                <ArrowDownIcon
                  size={iconSize}
                  fill={disabled ? config.colors['gray'] : config.colors.blue}
                />
              </div>
            </div>
          </button>
        </div>
        {open &&
          <div className={optionsClasses} style={optionsStyle}>
            {options.map(option => (
              <button
                key={option.value}
                className={optionClasses}
                onClick={e => this.handleOptionClick(e, option)}
              >
                {option.label}
              </button>
            ))}
          </div>}
      </div>
    )
  }
}

Dropdown.propTypes = {
  /** Dropdown Id */
  id: PropTypes.string,
  /** Dropdown Label */
  label: PropTypes.string,
  /** Size: Large style */
  large: PropTypes.bool,
  /** Size: xLarge style */
  xLarge: PropTypes.bool,
  /** Width: Short style */
  short: PropTypes.bool,
  /** Width: Long style */
  long: PropTypes.bool,
  /** Block style */
  block: PropTypes.bool,
  /** Dropdown value */
  value: PropTypes.string,
  /** onChange event */
  onChange: PropTypes.func,
  /** onOpen event */
  onOpen: PropTypes.func,
  /** onClose event */
  onClose: PropTypes.func,
  /** Dropdown options list */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  /** Dropdown disabled */
  disabled: PropTypes.bool,
}

export default Dropdown
