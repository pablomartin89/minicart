import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Tabs extends PureComponent {
  handleClick = e => {
    this.props.onClick && this.props.onClick(e)
  }

  render() {
    const { options, active } = this.props
    return (
      <div className="flex flex-row bb b--light-gray mid-gray overflow-y-auto">
        {options.map(option => (
          <button
            id={option.id}
            key={option.id}
            type="button"
            onClick={this.handleClick}
            className={`vtex-tab__button pointer bt-0 bl-0 br-0 bw1 ${
              active === option.id
                ? 'near-black b--rebel-pink'
                : 'mid-gray b--transparent'
            } hover-near-black fw5 fw4 v-mid relative pv5 ph4 f5 bg-transparent outline-0`}
          >
            {option.value}
          </button>
        ))}
      </div>
    )
  }
}

Tabs.defaultProps = {
  options: [],
}

Tabs.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.any,
  })),
}

export default Tabs
