const { execSync } = require("child_process")

const configList = [
  {
    theme: 'red',
    bgBranchList: [
      'c9', 'dfc', 'cpcp', '8n', 'd500', 'cp555', 'cp500w', 'cplecai',
      'cp88', 'cp361', 'cp99', 'ssc', 'c02', 'cp9a', 'xyc', 'cp500w2', 'c29',
      'cp500x4', 'yicaicp', 'cp336', 'c81', 'wmcp', 'fcwcp', 'cp500w4', 'xycp2',
      'zcp', 'c01', 'c222', 'hfcp', 'cp5050', 'zgc', 'c6', 'bycpw', 'xyc3',
      'c36', 'cp7c', 'c48', 'cp500w3', 'cp8888', 'cp703', 'cpbw', 'cp1216',
      'cp500x3', 'aicai', 'zcw', 'c45', 'lequcai', 'cp3hao', 'dayingjia2',
      'juxingcai', 'cp55', 'cp688', 'cp9', 'gaoxingcp', 'xycp3', 'cp500500',
      'cp99x2', 'cp500x5', 'jingcai', 'c8800', 'cp500w5', 'wfccp', 'diyicaipiao',
      'cp3a', 'aitou', 'dayingjia5', 'shunfengcp3', 'fuxingcai', 'cp588', 'cp188', 'c76',
      'aicai2', 'dayingjia4','cp777', 'fhcp', 'c899'
      'kosun.net',

    ]
  },
  {
    theme: 'blue',
    bgBranchList: [
      'duocai', 'ncw', 'cp7070', 'yccp', 'shunfengcp', 'cp1516', 'dayingjia3', 'liucai'
    ]
  },
  {
    theme: 'orange',
    bgBranchList: [
      'cp899', 'cp111', 'zccp', 'cp916', 'k3cp',
    ]
  },
]



for (let config of configList) {

  for (let branch of config.bgBranchList) {
    execSync(`
      jq '{
        source: "dist/${config.theme}",
        dest: "${branch}/Public/Home/js/lottery/static",
        accessKeyId: "LTAIkjlMJMFyr8sm",
        secretAccessKey: "n2LOv19Q6i6LJN3pi9CMYpHjybxw40",
        endpoint: "http://oss-cn-shenzhen.aliyuncs.com",
        bucket: "cp-web"
      }' oss/temp.json | tee oss/oss-sync.json
      `, {stdio: [0, 1, 2]})

    execSync('osync oss/oss-sync.json -f', {stdio: [0, 1, 2]})
  }
}


// const themeList = ['red', 'blue', 'orange']
//
// for (let theme of themeList) {
//   execSync(`
//     jq '{
//       source: "dist/${theme}",
//       dest: "digital/lobby/${theme}",
//       accessKeyId: "LTAIkjlMJMFyr8sm",
//       secretAccessKey: "n2LOv19Q6i6LJN3pi9CMYpHjybxw40",
//       endpoint: "http://oss-cn-shenzhen.aliyuncs.com",
//       bucket: "cp-static-res"
//     }' oss/temp.json | tee oss/oss-sync.json
//     `, {stdio: [0, 1, 2]})
//
//   execSync('osync oss/oss-sync.json -f', {stdio: [0, 1, 2]})
// }

console.log('build end')
