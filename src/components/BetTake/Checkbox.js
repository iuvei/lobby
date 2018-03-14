import React, { Component } from 'react'
import Immutable from 'immutable'

class Checkbox extends Component {
  constructor(props) {
    super(props)
    this.checked = []
  }

  handleCheckbox(unit) {
    if (this.checked.includes(unit)) {
      this.checked.splice(this.checked.indexOf(unit), 1)
    } else {
      this.checked.push(unit)
    }
    this.props.checked(this.checked)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!Immutable.is(nextProps.data, this.props.data)
      || !Immutable.is(nextProps.orderInfo.checked, this.props.orderInfo.checked)) {
      return true
    }

    return false
  }

  render() {
    const { data, orderInfo } = this.props
    this.checked = orderInfo.checked
    return(
      <div className="checkbox animated bounceInRight">
        <div className="checkbox-row">
          <div className="unit">
            {data.title}
          </div>
          <div className="items">
            {
              data.label.map((item, index) =>
                <div className="checkbox-group" key={index} onClick={e => {
                    this.handleCheckbox(item)
                  }}>
                  <i className={`iconfont ${this.checked && this.checked.includes(item) ? 'icon-checkbox-check' : 'icon-checkbox-uncheck'}`}/>
                  <span>{item}</span>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Checkbox;
