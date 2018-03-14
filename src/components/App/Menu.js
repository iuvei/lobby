import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initLotteryCategory, SetChaseState, SetTotalCost } from '../../redux/actions/index'
import { Scrollbars } from 'react-custom-scrollbars'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryList: [],
      lottery_id: null
    }
  }

  componentWillMount() {
    this.props.initLotteryCategory()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lotteryList && nextProps.lotteryList.length > 0 && nextProps.lotteryId) {
      let defaultItem = nextProps.lotteryList.filter(n => {
        if (n.lottery_info && n.lottery_info.length > 0) {
          for (let lottery of n.lottery_info) {
            if (lottery.lottery_id === nextProps.lotteryId) {
              return true
            }
          }
        }
        return false
      })
      let categoryList = this.state.categoryList
      if (!categoryList.includes(defaultItem[0].category_id)) {
        categoryList.push(defaultItem[0].category_id)
        this.setState({
          categoryList,
          activeCategoryId: defaultItem[0].category_id
        })
      } else {
        this.setState({
          activeCategoryId: defaultItem[0].category_id
        })
      }
    } else {
      this.setState({
        activeCategoryId: -1
      })
    }
  }

  render() {
    const lotteryList = this.props.lotteryList
    let categoryList = this.state.categoryList
    return (
      <div className="menu">
        <Scrollbars autoHide={true} style={{flex: 1}}>
        <div className="list">
          <div className="menu-lobby">
            <div className="logo">
              <i className="iconfont" style={{color: '#FFFFFF', fontSize: '20px'}}>&#xe601;</i>
            </div>
            <Link to="/Lottery/index/lobby">购彩大厅</Link>
            <div className="logo">
            </div>

          </div>
          {
            lotteryList && lotteryList.length > 0 ? (
              lotteryList.map((item, index) => {
                return (
                  <div className="category" key={index}>
                    <div className="category-info"
                      onClick={e => {
                        if (categoryList.includes(item.category_id) ) {
                          categoryList.splice(categoryList.indexOf(item.category_id), 1)
                        } else {
                          categoryList.push(item.category_id)
                        }
                        this.setState({categoryList: categoryList})
                      }}>
                      <div className="logo">
                        <img src={item.category_image} alt="logo"/>
                      </div>
                      <div className={`category-name ${this.state.activeCategoryId === item.category_id ? 'active' : null}`}>
                        {item.category_name}
                      </div>
                      <div className="logo">
                      {
                        categoryList.includes(item.category_id) ? (
                          <i className="iconfont">&#xe791;</i>
                        ) : (
                          <i className="iconfont">&#xe790;</i>
                        )
                      }
                      </div>
                    </div>
                    <div className="category-detail">
                    {
                      item.lottery_info && item.lottery_info.length > 0 && categoryList.includes(item.category_id) && (
                        item.lottery_info.map((info, index) =>
                          <Link
                            onClick={ () => {
                              this.setState({ lottery_id: info.lottery_id })
                              this.props.SetChaseState(false)
                              this.props.SetTotalCost(0)
                            }}
                            className={`lottery-info ${info.lottery_id === this.state.lottery_id ? 'active' : ''}`}
                            key={index}
                            activeclassname="active"
                            to={`/Lottery/index/bet/${info.lottery_id}`}>
                            <span >{info.lottery_name}</span>
                          </Link>
                        )
                      )
                    }
                    </div>
                  </div>
                )
              })
            ) : null
          }
        </div>
        </Scrollbars>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { lotteryList } = state
  return {
    lotteryList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    initLotteryCategory: () => {
      dispatch(initLotteryCategory())
    },
    SetChaseState: (value) => {
      dispatch(SetChaseState(value))
    },
    SetTotalCost: (value) => {
      dispatch(SetTotalCost(value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
