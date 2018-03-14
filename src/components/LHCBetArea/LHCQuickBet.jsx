import React, { Component } from 'react'

export default class QuickBet extends Component {
  constructor(props) {
    super(props)
    this.selectedCaseList = []
    this.betList = []
    let shengXiao = props.shengXiao
    this.quickSelect = {
      单码: [
        '01', '03', '05', '07', '09',
        '11', '13', '15', '17', '19',
        '21', '23', '25', '27', '29',
        '31', '33', '35', '37', '39',
        '41', '43', '45', '47', '49'
      ],
      小单: [
        '01', '03', '05', '07', '09',
        '11', '13', '15', '17', '19',
        '21', '23'
      ],
      和单: [
        '01', '03', '05', '07', '09',
        '10', '12', '14', '16', '18',
        '21', '23', '25', '27', '29',
        '30', '32', '34', '36', '38',
        '41', '43', '45', '47', '49'
      ],
      双码: [
        '02', '04', '06', '08', '10',
        '12', '14', '16', '18', '20',
        '22', '24', '26', '28', '30',
        '32', '34', '36', '38', '40',
        '42', '44', '46', '48'
      ],
      小双: [
        '02', '04', '06', '08', '10',
        '12', '14', '16', '18', '20',
        '22', '24'
      ],
      和双: [
        '02', '04', '06', '08', '10',
        '11', '13', '15', '17', '19',
        '20', '22', '24', '26', '28',
        '31', '33', '35', '37', '39',
        '40', '42', '44', '46', '48'
      ],
      大码: [
        '25', '26', '27', '28', '29',
        '30', '31', '32', '33', '34',
        '35', '36', '37', '38', '39',
        '40', '41', '42', '43', '44',
        '45', '46', '47', '48', '49'
      ],
      大单: [
        '25', '27', '29',
        '31', '33', '35', '37', '39',
        '41', '43', '45', '47', '49'
      ],
      和大: [
        '07', '08', '09', '16', '17',
        '18', '19', '25', '26', '27',
        '28', '29', '34', '35', '36',
        '37', '38', '39', '43', '44',
        '45', '46', '47', '48'
      ],
      小码: [
        '01', '02', '03', '04',
        '05', '06', '07', '08', '09',
        '10', '11', '12', '13', '14',
        '15', '16', '17', '18', '19',
        '20', '21', '22', '23', '24'
      ],
      大双: [
        '26', '28', '30',
        '32', '34', '36', '38', '40',
        '42', '44', '46', '48'
      ],
      和小: [
        '01', '02', '03', '04', '05',
        '10', '11', '12', '13', '14',
        '15', '20', '21', '22', '23',
        '24', '30', '31', '32', '33',
        '40', '41', '42'
      ],
      '0头': [
        '01', '02', '03', '04', '05',
        '06', '07', '08', '09'
      ],
      '1头': [
        '10', '11', '12', '13', '14',
        '15','16', '17', '18', '19'
      ],
      '2头': [
        '20', '21', '22', '23', '24',
        '25','26', '27', '28', '29'
      ],
      '3头': [
        '30', '31', '32', '33', '34',
        '35','36', '37', '38', '39'
      ],
      '4头': [
        '40', '41', '42', '43', '44',
        '45', '46', '47', '48', '49'
      ],
      '0尾': ['10', '20', '30', '40'],
      '1尾': ['01', '11', '21', '31', '41'],
      '2尾': ['02', '12', '22', '32', '42'],
      '3尾': ['03', '13', '23', '33', '43'],
      '4尾': ['04', '14', '24', '34', '44'],
      '5尾': ['05', '15', '25', '35', '45'],
      '6尾': ['06', '16', '26', '36', '46'],
      '7尾': ['07', '17', '27', '37', '47'],
      '8尾': ['08', '18', '28', '38', '48'],
      '9尾': ['09', '19', '29', '39', '49'],
      '鼠': Object.keys(shengXiao).filter(n => shengXiao[n] === '鼠'),
      '牛': Object.keys(shengXiao).filter(n => shengXiao[n] === '牛'),
      '虎': Object.keys(shengXiao).filter(n => shengXiao[n] === '虎'),
      '兔': Object.keys(shengXiao).filter(n => shengXiao[n] === '兔'),
      '龙': Object.keys(shengXiao).filter(n => shengXiao[n] === '龙'),
      '蛇': Object.keys(shengXiao).filter(n => shengXiao[n] === '蛇'),
      '马': Object.keys(shengXiao).filter(n => shengXiao[n] === '马'),
      '羊': Object.keys(shengXiao).filter(n => shengXiao[n] === '羊'),
      '猴': Object.keys(shengXiao).filter(n => shengXiao[n] === '猴'),
      '鸡': Object.keys(shengXiao).filter(n => shengXiao[n] === '鸡'),
      '狗': Object.keys(shengXiao).filter(n => shengXiao[n] === '狗'),
      '猪': Object.keys(shengXiao).filter(n => shengXiao[n] === '猪'),
      '红': ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'],
      '绿': ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49'],
      '蓝': ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'],
      '红单': ['01', '07', '13', '19', '23', '29', '35', '45'],
      '红双': ['02', '08', '12', '18', '24', '30', '34', '40', '46'],
      '红大': ['29', '30', '34', '35', '40', '45', '46'],
      '红小': ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24'],
      '绿单': ['05', '11', '17', '21', '27', '33', '39', '43'],
      '绿双': ['06', '16', '22', '28', '32', '38', '44'],
      '绿大': ['27', '28', '32', '33', '38', '39', '43', '44'],
      '绿小': ['05', '06', '11', '16', '17', '21', '22'],
      '蓝单': ['03', '09', '15', '25', '31', '37', '41', '47'],
      '蓝双': ['04', '10', '14', '20', '26', '36', '42', '48'],
      '蓝大': ['25', '26', '31', '36', '37', '41', '42', '47', '48'],
      '蓝小': ['03', '04', '09', '10', '14', '15', '20']
    }
    this.state = {
      quickMoney: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.props.type || Object.keys(nextProps.betResult).length <= 0) {
      this.selectedCaseList = []
    }
  }

  handleClick(caseName) {
    let selectedCase = this.quickSelect[caseName]
    const { type, betResult, setBetResult } = this.props

    let key = ''
    if (type === 'TMA') {
      key = 'A_SP'
    } else if (type === 'TMB') {
      key = 'B_SP'
    } else if (type === 'zhengma') {
      key = 'NA'
    } else if (type === 'N1') {
      key = 'N1'
    } else if (type === 'N2') {
      key = 'N2'
    } else if (type === 'N3') {
      key = 'N3'
    } else if (type === 'N4') {
      key = 'N4'
    } else if (type === 'N5') {
      key = 'N5'
    } else if (type === 'N6') {
      key = 'N6'
    }
    let newResult = betResult
    let quickMoney = this.state.quickMoney
    let selectedCaseList = this.selectedCaseList
    if (selectedCaseList.includes(caseName)) {
      selectedCaseList.splice(selectedCaseList.indexOf(caseName), 1)
      let removeItem = []
      let allItem = []
      for (let item of selectedCaseList) {
        allItem = allItem.concat(this.quickSelect[item])
      }
      for (let item of selectedCase) {
        if (!allItem.includes(item)) {
          removeItem.push(item)
        }
      }
      for (let item of removeItem) {
        delete newResult[key + item]
        this.betList.splice(this.betList.indexOf(key + item), 1)
      }
    } else {
      selectedCaseList.push(caseName)
      for (let item of selectedCase) {
        newResult[key + item] = quickMoney
        if (!this.betList.includes(key + item)) {
          this.betList.push(key + item)
        }
      }
    }
    this.selectedCaseList = selectedCaseList
    setBetResult('reset', null, newResult)


  }

  handleChange(val) {
    const { betResult, setBetResult } = this.props
    let newResult = betResult
    for (let key of Object.keys(newResult)) {
      if (this.betList.includes(key)) {
        newResult[key] = val
      }
    }
    setBetResult('reset', null, newResult)
    this.setState({quickMoney: val})
  }

  render() {
    const quickSelect = this.quickSelect
    return(
      <div className="quick-bet-area">
        <div className="quick-money">
          <div>
            <label>预设金额：</label>
            <input value={this.state.quickMoney} onChange={e => {
                this.handleChange(e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g, ''))
              }}/>
          </div>

        </div>
        <div className="quick-bet-select">
        {
          Object.keys(quickSelect).map((item, index) =>
            <div key={index} className={this.selectedCaseList.includes(item) ? 'case-selected' : ''}
              onClick={e => {this.handleClick(item)}}>
              {item}
            </div>
          )
        }
        </div>
      </div>
    )
  }
}
