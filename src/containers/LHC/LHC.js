import React, { Component } from 'react'
import '../../styles/scss/lhc.scss'
import layout from '../../components/lhc/layout.js'
import LHCBetArea from '../LHCBetArea/LHCBetArea.jsx'

export default class LHC extends Component {
  constructor(props) {
    super(props)
    this.layout = layout.filter(n => Object.keys(props.typeList).includes(n.id.toString()))
    this.state = {
      playWay: this.layout.filter(n => n.selected)[0]
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    this.handleClick(this.layout.filter(n => n.selected)[0])
  }

  handleClick(playWay) {
    this.setState({
      playWay: playWay,
      selectedPW: playWay.name
    })
  }

  render() {
    const { typeList } = this.props
    return(
      <div>
        <div className="lhc-play-choice animated shake">
          {
            layout.map((playWay, index) =>
              <div key={index} onClick={this.handleClick.bind(this, playWay)}
                className={playWay.name === this.state.selectedPW ? 'play-selected' : 'false'}>
                {playWay.name}
              </div>
            )
          }
        </div>
        <LHCBetArea playWay={this.state.playWay} playAttr={typeList[this.state.playWay.id]}/>
      </div>
    )
  }
}
