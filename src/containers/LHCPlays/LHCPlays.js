import React from 'react'
import NormalGrid from '../../components/LHCPlays/NormalGrid.jsx'
import LianMa from '../LHCPlayLianMA/LHCPlayLianMA.jsx'
import LianXiao from '../../components/LHCPlays/LianXiao.jsx'
import LianWei from '../../components/LHCPlays/LianWei.jsx'
import ZiXuanBuZhong from '../../components/LHCPlays/ZiXuanBuZhong.jsx'
import ZhongYi from '../../components/LHCPlays/ZhongYi.jsx'
import HeXiao from '../../components/LHCPlays/HeXiao.jsx'
import ZhengMaGuoGuan from '../../components/LHCPlays/ZhengMaGuoGuan.jsx'

const LHCPlays = ({ selectedTab, betting, data, playWay, shengXiao, playAttr, isBetting, status, goldList, betResult, setBetResult, handleCancelClick, handleBet }) => {
  let odds = playAttr.odds
  if (playWay.type === 'lianma') {
    return <LianMa data={data} id={playWay.id} tab={selectedTab} playAttr={playAttr}
                   betting={betting} goldList={status === 1 ? goldList : null} shengXiao={shengXiao}/>
  } else if (playWay.type === 'lianxiao') {
    return <LianXiao data={data} id={playWay.id} tab={selectedTab} playAttr={playAttr}
                     betting={betting} goldList={status === 1 ? goldList : null} shengXiao={shengXiao}/>
  } else if (playWay.type === 'lianwei') {
    return <LianWei data={data} id={playWay.id} tab={selectedTab} playAttr={playAttr}
                    betting={betting} goldList={status === 1 ? goldList : null}/>
  } else if (playWay.type === 'zixuanbuzhong') {
    return <ZiXuanBuZhong data={data} id={playWay.id} tab={selectedTab} playAttr={playAttr}
                          betting={betting} goldList={status === 1 ? goldList : null}/>
  } else if (playWay.type === 'zhongyi') {
    return <ZhongYi data={data} id={playWay.id} tab={selectedTab} playAttr={playAttr}
                    betting={betting} goldList={status === 1 ? goldList : null}/>
  } else if (playWay.type === 'hexiao') {
    return <HeXiao data={data} id={playWay.id} tab={selectedTab} playAttr={playAttr}
                   betting={betting} goldList={status === 1 ? goldList : null} shengXiao={shengXiao}/>
  } else if (playWay.type === 'zhengmaguoguan') {
    return <ZhengMaGuoGuan data={playWay} id={playWay.id} tab={selectedTab} playAttr={playAttr}
                           betting={betting} goldList={status === 1 ? goldList : null}/>
  } else {
    if (playWay.type === 'zhengmate' || playWay.type === 'tebiehao') {
      playWay.items = data
    }
    let moneyTotal = 0
    for (let key in betResult) {
      if (betResult.hasOwnProperty(key)) {
        moneyTotal += (parseInt(betResult[key], 10) || 0)
      }
    }
    return (
      <div>
        {
          playWay.items.map((item, index) =>
            <NormalGrid data={item} key={index} odds={odds}
                        setBetResult={setBetResult} betResult={betResult}
                        goldList={status === 1 ? goldList : null} shengXiao={shengXiao}/>
          )
        }
        <div className="lhc-bet-result">
          <div className="desc">
            <div className="dotted"></div>
            <div className="info-check">
              您已经选中了<span>{Object.getOwnPropertyNames(betResult).length || 0}</span>注，
              共<span>{moneyTotal}</span>元
            </div>
            <div className="dotted"></div>
          </div>
          <div className="btn-group">
            <button className="cancel" onClick={handleCancelClick}>取消</button>
            <button className="confirm" disabled={isBetting} onClick={handleBet}>确认</button>
          </div>
        </div>
      </div>
    )
  }
}

export default LHCPlays
