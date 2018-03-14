const layout = [
  {
    name: '两面',
    id: 1,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '号码', type: 'label', width: '20%'},
          {name: '赔率', type: 'odds', width: '20%'},
          {name: '金额', type: 'money', width: '60%'}
        ],
        hideTitle: false,
        cols: 4,
        cells: [
          {label: '特单', name: 'SP_ODD'},
          {label: '特双', name: 'SP_EVEN'},
          {label: '特大', name: 'SP_OVER'},
          {label: '特小', name: 'SP_UNDER'},
          {label: '和单', name: 'SP_SODD'},
          {label: '和双', name: 'SP_SEVEN'},
          {label: '和大', name: 'SP_SOVER'},
          {label: '和小', name: 'SP_SUNDER'},
          {label: '总单', name: 'NA_ODD'},
          {label: '总双', name: 'NA_EVEN'},
          {label: '总大', name: 'NA_OVER'},
          {label: '总小', name: 'NA_UNDER'}
        ]
      },
      {
        type: 'normal_grid',
        totleTitle: ['正码一', '正码二', '正码三', '正码四', '正码五', '正码六'],
        title: [
          {name: '赔率', type: 'odds', width: '30%'},
          {name: '金额', type: 'money', width: '70%'}
        ],
        TDTitle: ['号码', '单', '双', '大', '小', '和单', '和双', '和大', '和小'], //Two-dimensional Title
        cols: 6,
        cells: [
          {name: 'NO1_ODD'},
          {name: 'NO2_ODD'},
          {name: 'NO3_ODD'},
          {name: 'NO4_ODD'},
          {name: 'NO5_ODD'},
          {name: 'NO6_ODD'},
          {name: 'NO1_EVEN'},
          {name: 'NO2_EVEN'},
          {name: 'NO3_EVEN'},
          {name: 'NO4_EVEN'},
          {name: 'NO5_EVEN'},
          {name: 'NO6_EVEN'},
          {name: 'NO1_OVER'},
          {name: 'NO2_OVER'},
          {name: 'NO3_OVER'},
          {name: 'NO4_OVER'},
          {name: 'NO5_OVER'},
          {name: 'NO6_OVER'},
          {name: 'NO1_UNDER'},
          {name: 'NO2_UNDER'},
          {name: 'NO3_UNDER'},
          {name: 'NO4_UNDER'},
          {name: 'NO5_UNDER'},
          {name: 'NO6_UNDER'},
          {name: 'NO1_SODD'},
          {name: 'NO2_SODD'},
          {name: 'NO3_SODD'},
          {name: 'NO4_SODD'},
          {name: 'NO5_SODD'},
          {name: 'NO6_SODD'},
          {name: 'NO1_SEVEN'},
          {name: 'NO2_SEVEN'},
          {name: 'NO3_SEVEN'},
          {name: 'NO4_SEVEN'},
          {name: 'NO5_SEVEN'},
          {name: 'NO6_SEVEN'},
          {name: 'NO1_SOVER'},
          {name: 'NO2_SOVER'},
          {name: 'NO3_SOVER'},
          {name: 'NO4_SOVER'},
          {name: 'NO5_SOVER'},
          {name: 'NO6_SOVER'},
          {name: 'NO1_SUNDER'},
          {name: 'NO2_SUNDER'},
          {name: 'NO3_SUNDER'},
          {name: 'NO4_SUNDER'},
          {name: 'NO5_SUNDER'},
          {name: 'NO6_SUNDER'}
        ]
      }
    ]
  },
  {
    name: '特码AB',
    selected: true,
    id: 2,
    type: 'tebiehao',
    quickBet: true,
    tabs: [
      {
        name: '特码A',
        type: 'TMA',
        items:[
          {
            type: 'normal_grid',
            title: [
              {name: '号码', type: 'number', width: '20%'},
              {name: '赔率', type: 'odds', width: '20%'},
              {name: '金额', type: 'money', width: '60%'}
            ],
            hideTitle: false,
            cols: 5,
            cells: [
              {number: '01',name: 'A_SP01'},
              {number: '11',name: 'A_SP11'},
              {number: '21',name: 'A_SP21'},
              {number: '31',name: 'A_SP31'},
              {number: '41',name: 'A_SP41'},
              {number: '02',name: 'A_SP02'},
              {number: '12',name: 'A_SP12'},
              {number: '22',name: 'A_SP22'},
              {number: '32',name: 'A_SP32'},
              {number: '42',name: 'A_SP42'},
              {number: '03',name: 'A_SP03'},
              {number: '13',name: 'A_SP13'},
              {number: '23',name: 'A_SP23'},
              {number: '33',name: 'A_SP33'},
              {number: '43',name: 'A_SP43'},
              {number: '04',name: 'A_SP04'},
              {number: '14',name: 'A_SP14'},
              {number: '24',name: 'A_SP24'},
              {number: '34',name: 'A_SP34'},
              {number: '44',name: 'A_SP44'},
              {number: '05',name: 'A_SP05'},
              {number: '15',name: 'A_SP15'},
              {number: '25',name: 'A_SP25'},
              {number: '35',name: 'A_SP35'},
              {number: '45',name: 'A_SP45'},
              {number: '06',name: 'A_SP06'},
              {number: '16',name: 'A_SP16'},
              {number: '26',name: 'A_SP26'},
              {number: '36',name: 'A_SP36'},
              {number: '46',name: 'A_SP46'},
              {number: '07',name: 'A_SP07'},
              {number: '17',name: 'A_SP17'},
              {number: '27',name: 'A_SP27'},
              {number: '37',name: 'A_SP37'},
              {number: '47',name: 'A_SP47'},
              {number: '08',name: 'A_SP08'},
              {number: '18',name: 'A_SP18'},
              {number: '28',name: 'A_SP28'},
              {number: '38',name: 'A_SP38'},
              {number: '48',name: 'A_SP48'},
              {number: '09',name: 'A_SP09'},
              {number: '19',name: 'A_SP19'},
              {number: '29',name: 'A_SP29'},
              {number: '39',name: 'A_SP39'},
              {number: '49',name: 'A_SP49'},
              {number: '10',name: 'A_SP10'},
              {number: '20',name: 'A_SP20'},
              {number: '30',name: 'A_SP30'},
              {number: '40',name: 'A_SP40'},
              {number: ''}
            ]
          },
          {
            type: 'normal_grid',
            title: [
              {name: '号码', type: 'label', width: '20%'},
              {name: '赔率', type: 'odds', width: '20%'},
              {name: '金额', type: 'money', width: '60%'}
            ],
            hideTitle: true,
            cols: 5,
            cells: [
              {label: '特单', name: 'SP_ODD'},
              {label: '特双', name: 'SP_EVEN'},
              {label: '特大', name: 'SP_OVER'},
              {label: '特小', name: 'SP_UNDER'},
              {label: '尾大', name: 'SF_OVER'},
              {label: '和单', name: 'SP_SODD'},
              {label: '和双', name: 'SP_SEVEN'},
              {label: '和大', name: 'SP_SOVER'},
              {label: '和小', name: 'SP_SUNDER'},
              {label: '尾小', name: 'SF_UNDER'},
              {label: '大双', name: 'HS_EO'},
              {label: '小双', name: 'HS_EU'},
              {label: '大单', name: 'HS_OO'},
              {label: '小单', name: 'HS_OU'},
              {}
            ]
          }
        ]
      },
      {
        name: '特码B',
        type: 'TMB',
        defaultSelected: true,
        items:[
          {
            type: 'normal_grid',
            title: [
              {name: '号码', type: 'number', width: '20%'},
              {name: '赔率', type: 'odds', width: '20%'},
              {name: '金额', type: 'money', width: '60%'}
            ],
            hideTitle: false,
            cols: 5,
            cells: [
              {number: '01',name: 'B_SP01'},
              {number: '11',name: 'B_SP11'},
              {number: '21',name: 'B_SP21'},
              {number: '31',name: 'B_SP31'},
              {number: '41',name: 'B_SP41'},
              {number: '02',name: 'B_SP02'},
              {number: '12',name: 'B_SP12'},
              {number: '22',name: 'B_SP22'},
              {number: '32',name: 'B_SP32'},
              {number: '42',name: 'B_SP42'},
              {number: '03',name: 'B_SP03'},
              {number: '13',name: 'B_SP13'},
              {number: '23',name: 'B_SP23'},
              {number: '33',name: 'B_SP33'},
              {number: '43',name: 'B_SP43'},
              {number: '04',name: 'B_SP04'},
              {number: '14',name: 'B_SP14'},
              {number: '24',name: 'B_SP24'},
              {number: '34',name: 'B_SP34'},
              {number: '44',name: 'B_SP44'},
              {number: '05',name: 'B_SP05'},
              {number: '15',name: 'B_SP15'},
              {number: '25',name: 'B_SP25'},
              {number: '35',name: 'B_SP35'},
              {number: '45',name: 'B_SP45'},
              {number: '06',name: 'B_SP06'},
              {number: '16',name: 'B_SP16'},
              {number: '26',name: 'B_SP26'},
              {number: '36',name: 'B_SP36'},
              {number: '46',name: 'B_SP46'},
              {number: '07',name: 'B_SP07'},
              {number: '17',name: 'B_SP17'},
              {number: '27',name: 'B_SP27'},
              {number: '37',name: 'B_SP37'},
              {number: '47',name: 'B_SP47'},
              {number: '08',name: 'B_SP08'},
              {number: '18',name: 'B_SP18'},
              {number: '28',name: 'B_SP28'},
              {number: '38',name: 'B_SP38'},
              {number: '48',name: 'B_SP48'},
              {number: '09',name: 'B_SP09'},
              {number: '19',name: 'B_SP19'},
              {number: '29',name: 'B_SP29'},
              {number: '39',name: 'B_SP39'},
              {number: '49',name: 'B_SP49'},
              {number: '10',name: 'B_SP10'},
              {number: '20',name: 'B_SP20'},
              {number: '30',name: 'B_SP30'},
              {number: '40',name: 'B_SP40'},
              {number: ''}
            ]
          },
          {
            type: 'normal_grid',
            title: [
              {name: '号码', type: 'label', width: '20%'},
              {name: '赔率', type: 'odds', width: '20%'},
              {name: '金额', type: 'money', width: '60%'}
            ],
            hideTitle: true,
            cols: 5,
            cells: [
              {label: '特单', name: 'SP_ODD'},
              {label: '特双', name: 'SP_EVEN'},
              {label: '特大', name: 'SP_OVER'},
              {label: '特小', name: 'SP_UNDER'},
              {label: '尾大', name: 'SF_OVER'},
              {label: '和单', name: 'SP_SODD'},
              {label: '和双', name: 'SP_SEVEN'},
              {label: '和大', name: 'SP_SOVER'},
              {label: '和小', name: 'SP_SUNDER'},
              {label: '尾小', name: 'SF_UNDER'},
              {label: '大双', name: 'HS_EO'},
              {label: '小双', name: 'HS_EU'},
              {label: '大单', name: 'HS_OO'},
              {label: '小单', name: 'HS_OU'},
              {}
            ]
          }
        ]
      }
    ]

  },
  {
    name: '正码',
    id: 3,
    type: 'zhengma',
    quickBet: true,
    items:[
      {
        type: 'normal_grid',
        title: [
          {name: '号码', type: 'number', width: '20%'},
          {name: '赔率', type: 'odds', width: '20%'},
          {name: '金额', type: 'money', width: '60%'}
        ],
        hideTitle: false,
        cols: 5,
        cells: [
          {number: '01', name: 'NA01'},
          {number: '11', name: 'NA11'},
          {number: '21', name: 'NA21'},
          {number: '31', name: 'NA31'},
          {number: '41', name: 'NA41'},
          {number: '02', name: 'NA02'},
          {number: '12', name: 'NA12'},
          {number: '22', name: 'NA22'},
          {number: '32', name: 'NA32'},
          {number: '42', name: 'NA42'},
          {number: '03', name: 'NA03'},
          {number: '13', name: 'NA13'},
          {number: '23', name: 'NA23'},
          {number: '33', name: 'NA33'},
          {number: '43', name: 'NA43'},
          {number: '04', name: 'NA04'},
          {number: '14', name: 'NA14'},
          {number: '24', name: 'NA24'},
          {number: '34', name: 'NA34'},
          {number: '44', name: 'NA44'},
          {number: '05', name: 'NA05'},
          {number: '15', name: 'NA15'},
          {number: '25', name: 'NA25'},
          {number: '35', name: 'NA35'},
          {number: '45', name: 'NA45'},
          {number: '06', name: 'NA06'},
          {number: '16', name: 'NA16'},
          {number: '26', name: 'NA26'},
          {number: '36', name: 'NA36'},
          {number: '46', name: 'NA46'},
          {number: '07', name: 'NA07'},
          {number: '17', name: 'NA17'},
          {number: '27', name: 'NA27'},
          {number: '37', name: 'NA37'},
          {number: '47', name: 'NA47'},
          {number: '08', name: 'NA08'},
          {number: '18', name: 'NA18'},
          {number: '28', name: 'NA28'},
          {number: '38', name: 'NA38'},
          {number: '48', name: 'NA48'},
          {number: '09', name: 'NA09'},
          {number: '19', name: 'NA19'},
          {number: '29', name: 'NA29'},
          {number: '39', name: 'NA39'},
          {number: '49', name: 'NA49'},
          {number: '10', name: 'NA10'},
          {number: '20', name: 'NA20'},
          {number: '30', name: 'NA30'},
          {number: '40', name: 'NA40'},
          {number: ''}
        ]
      }
    ]
  },
  {
    name: '正码特',
    id: 4,
    type: 'zhengmate',
    quickBet: true,
    tabs: [
      {
        name: '正码特 1',
        type: 'N1',
        defaultSelected: true,
        items: [{
          type: 'normal_grid',
          title: [
            {name: '号码', type: 'number', width: '20%'},
            {name: '赔率', type: 'odds', width: '20%'},
            {name: '金额', type: 'money', width: '60%'}
          ],
          hideTitle: false,
          cols: 5,
          cells: [
            {number: '01', odds: 46, name: 'N101'},
            {number: '11', odds: 46, name: 'N111'},
            {number: '21', odds: 46, name: 'N121'},
            {number: '31', odds: 46, name: 'N131'},
            {number: '41', odds: 46, name: 'N141'},
            {number: '02', odds: 46, name: 'N102'},
            {number: '12', odds: 46, name: 'N112'},
            {number: '22', odds: 46, name: 'N122'},
            {number: '32', odds: 46, name: 'N132'},
            {number: '42', odds: 46, name: 'N142'},
            {number: '03', odds: 46, name: 'N103'},
            {number: '13', odds: 46, name: 'N113'},
            {number: '23', odds: 46, name: 'N123'},
            {number: '33', odds: 46, name: 'N133'},
            {number: '43', odds: 46, name: 'N143'},
            {number: '04', odds: 46, name: 'N104'},
            {number: '14', odds: 46, name: 'N114'},
            {number: '24', odds: 46, name: 'N124'},
            {number: '34', odds: 46, name: 'N134'},
            {number: '44', odds: 46, name: 'N144'},
            {number: '05', odds: 46, name: 'N105'},
            {number: '15', odds: 46, name: 'N115'},
            {number: '25', odds: 46, name: 'N125'},
            {number: '35', odds: 46, name: 'N135'},
            {number: '45', odds: 46, name: 'N145'},
            {number: '06', odds: 46, name: 'N106'},
            {number: '16', odds: 46, name: 'N116'},
            {number: '26', odds: 46, name: 'N126'},
            {number: '36', odds: 46, name: 'N136'},
            {number: '46', odds: 46, name: 'N146'},
            {number: '07', odds: 46, name: 'N107'},
            {number: '17', odds: 46, name: 'N117'},
            {number: '27', odds: 46, name: 'N127'},
            {number: '37', odds: 46, name: 'N137'},
            {number: '47', odds: 46, name: 'N147'},
            {number: '08', odds: 46, name: 'N108'},
            {number: '18', odds: 46, name: 'N118'},
            {number: '28', odds: 46, name: 'N128'},
            {number: '38', odds: 46, name: 'N138'},
            {number: '48', odds: 46, name: 'N148'},
            {number: '09', odds: 46, name: 'N109'},
            {number: '19', odds: 46, name: 'N119'},
            {number: '29', odds: 46, name: 'N129'},
            {number: '39', odds: 46, name: 'N139'},
            {number: '49', odds: 46, name: 'N149'},
            {number: '10', odds: 46, name: 'N110'},
            {number: '20', odds: 46, name: 'N120'},
            {number: '30', odds: 46, name: 'N130'},
            {number: '40', odds: 46, name: 'N140'},
            {number: ''}
          ]
        }]
      }, //defaultSelected 待优化
      {
        name: '正码特 2',
        type: 'N2',
        items: [{
          type: 'normal_grid',
          title: [
            {name: '号码', type: 'number', width: '20%'},
            {name: '赔率', type: 'odds', width: '20%'},
            {name: '金额', type: 'money', width: '60%'}
          ],
          hideTitle: false,
          cols: 5,
          cells: [
            {number: '01', odds: 46, name: 'N201'},
            {number: '11', odds: 46, name: 'N211'},
            {number: '21', odds: 46, name: 'N221'},
            {number: '31', odds: 46, name: 'N231'},
            {number: '41', odds: 46, name: 'N241'},
            {number: '02', odds: 46, name: 'N202'},
            {number: '12', odds: 46, name: 'N212'},
            {number: '22', odds: 46, name: 'N222'},
            {number: '32', odds: 46, name: 'N232'},
            {number: '42', odds: 46, name: 'N242'},
            {number: '03', odds: 46, name: 'N203'},
            {number: '13', odds: 46, name: 'N213'},
            {number: '23', odds: 46, name: 'N223'},
            {number: '33', odds: 46, name: 'N233'},
            {number: '43', odds: 46, name: 'N243'},
            {number: '04', odds: 46, name: 'N204'},
            {number: '14', odds: 46, name: 'N214'},
            {number: '24', odds: 46, name: 'N224'},
            {number: '34', odds: 46, name: 'N234'},
            {number: '44', odds: 46, name: 'N244'},
            {number: '05', odds: 46, name: 'N205'},
            {number: '15', odds: 46, name: 'N215'},
            {number: '25', odds: 46, name: 'N225'},
            {number: '35', odds: 46, name: 'N235'},
            {number: '45', odds: 46, name: 'N245'},
            {number: '06', odds: 46, name: 'N206'},
            {number: '16', odds: 46, name: 'N216'},
            {number: '26', odds: 46, name: 'N226'},
            {number: '36', odds: 46, name: 'N236'},
            {number: '46', odds: 46, name: 'N246'},
            {number: '07', odds: 46, name: 'N207'},
            {number: '17', odds: 46, name: 'N217'},
            {number: '27', odds: 46, name: 'N227'},
            {number: '37', odds: 46, name: 'N237'},
            {number: '47', odds: 46, name: 'N247'},
            {number: '08', odds: 46, name: 'N208'},
            {number: '18', odds: 46, name: 'N218'},
            {number: '28', odds: 46, name: 'N228'},
            {number: '38', odds: 46, name: 'N238'},
            {number: '48', odds: 46, name: 'N248'},
            {number: '09', odds: 46, name: 'N209'},
            {number: '19', odds: 46, name: 'N219'},
            {number: '29', odds: 46, name: 'N229'},
            {number: '39', odds: 46, name: 'N239'},
            {number: '49', odds: 46, name: 'N249'},
            {number: '10', odds: 46, name: 'N210'},
            {number: '20', odds: 46, name: 'N220'},
            {number: '30', odds: 46, name: 'N230'},
            {number: '40', odds: 46, name: 'N240'},
            {number: ''}
          ]
        }]
      },
      {
        name: '正码特 3',
        type: 'N3',
        items: [{
          type: 'normal_grid',
          title: [
            {name: '号码', type: 'number', width: '20%'},
            {name: '赔率', type: 'odds', width: '20%'},
            {name: '金额', type: 'money', width: '60%'}
          ],
          hideTitle: false,
          cols: 5,
          cells: [
            {number: '01', odds: 46, name: 'N301'},
            {number: '11', odds: 46, name: 'N311'},
            {number: '21', odds: 46, name: 'N321'},
            {number: '31', odds: 46, name: 'N331'},
            {number: '41', odds: 46, name: 'N341'},
            {number: '02', odds: 46, name: 'N302'},
            {number: '12', odds: 46, name: 'N312'},
            {number: '22', odds: 46, name: 'N322'},
            {number: '32', odds: 46, name: 'N332'},
            {number: '42', odds: 46, name: 'N342'},
            {number: '03', odds: 46, name: 'N303'},
            {number: '13', odds: 46, name: 'N313'},
            {number: '23', odds: 46, name: 'N323'},
            {number: '33', odds: 46, name: 'N333'},
            {number: '43', odds: 46, name: 'N343'},
            {number: '04', odds: 46, name: 'N304'},
            {number: '14', odds: 46, name: 'N314'},
            {number: '24', odds: 46, name: 'N324'},
            {number: '34', odds: 46, name: 'N334'},
            {number: '44', odds: 46, name: 'N344'},
            {number: '05', odds: 46, name: 'N305'},
            {number: '15', odds: 46, name: 'N315'},
            {number: '25', odds: 46, name: 'N325'},
            {number: '35', odds: 46, name: 'N335'},
            {number: '45', odds: 46, name: 'N345'},
            {number: '06', odds: 46, name: 'N306'},
            {number: '16', odds: 46, name: 'N316'},
            {number: '26', odds: 46, name: 'N326'},
            {number: '36', odds: 46, name: 'N336'},
            {number: '46', odds: 46, name: 'N346'},
            {number: '07', odds: 46, name: 'N307'},
            {number: '17', odds: 46, name: 'N317'},
            {number: '27', odds: 46, name: 'N327'},
            {number: '37', odds: 46, name: 'N337'},
            {number: '47', odds: 46, name: 'N347'},
            {number: '08', odds: 46, name: 'N308'},
            {number: '18', odds: 46, name: 'N318'},
            {number: '28', odds: 46, name: 'N328'},
            {number: '38', odds: 46, name: 'N338'},
            {number: '48', odds: 46, name: 'N348'},
            {number: '09', odds: 46, name: 'N309'},
            {number: '19', odds: 46, name: 'N319'},
            {number: '29', odds: 46, name: 'N329'},
            {number: '39', odds: 46, name: 'N339'},
            {number: '49', odds: 46, name: 'N349'},
            {number: '10', odds: 46, name: 'N310'},
            {number: '20', odds: 46, name: 'N320'},
            {number: '30', odds: 46, name: 'N330'},
            {number: '40', odds: 46, name: 'N340'},
            {number: ''}
          ]
        }]
      },
      {
        name: '正码特 4',
        type: 'N4',
        items: [{
          type: 'normal_grid',
          title: [
            {name: '号码', type: 'number', width: '20%'},
            {name: '赔率', type: 'odds', width: '20%'},
            {name: '金额', type: 'money', width: '60%'}
          ],
          hideTitle: false,
          cols: 5,
          cells: [
            {number: '01', odds: 46, name: 'N401'},
            {number: '11', odds: 46, name: 'N411'},
            {number: '21', odds: 46, name: 'N421'},
            {number: '31', odds: 46, name: 'N431'},
            {number: '41', odds: 46, name: 'N441'},
            {number: '02', odds: 46, name: 'N402'},
            {number: '12', odds: 46, name: 'N412'},
            {number: '22', odds: 46, name: 'N422'},
            {number: '32', odds: 46, name: 'N432'},
            {number: '42', odds: 46, name: 'N442'},
            {number: '03', odds: 46, name: 'N403'},
            {number: '13', odds: 46, name: 'N413'},
            {number: '23', odds: 46, name: 'N423'},
            {number: '33', odds: 46, name: 'N433'},
            {number: '43', odds: 46, name: 'N443'},
            {number: '04', odds: 46, name: 'N404'},
            {number: '14', odds: 46, name: 'N414'},
            {number: '24', odds: 46, name: 'N424'},
            {number: '34', odds: 46, name: 'N434'},
            {number: '44', odds: 46, name: 'N444'},
            {number: '05', odds: 46, name: 'N405'},
            {number: '15', odds: 46, name: 'N415'},
            {number: '25', odds: 46, name: 'N425'},
            {number: '35', odds: 46, name: 'N435'},
            {number: '45', odds: 46, name: 'N445'},
            {number: '06', odds: 46, name: 'N406'},
            {number: '16', odds: 46, name: 'N416'},
            {number: '26', odds: 46, name: 'N426'},
            {number: '36', odds: 46, name: 'N436'},
            {number: '46', odds: 46, name: 'N446'},
            {number: '07', odds: 46, name: 'N407'},
            {number: '17', odds: 46, name: 'N417'},
            {number: '27', odds: 46, name: 'N427'},
            {number: '37', odds: 46, name: 'N437'},
            {number: '47', odds: 46, name: 'N447'},
            {number: '08', odds: 46, name: 'N408'},
            {number: '18', odds: 46, name: 'N418'},
            {number: '28', odds: 46, name: 'N428'},
            {number: '38', odds: 46, name: 'N438'},
            {number: '48', odds: 46, name: 'N448'},
            {number: '09', odds: 46, name: 'N409'},
            {number: '19', odds: 46, name: 'N419'},
            {number: '29', odds: 46, name: 'N429'},
            {number: '39', odds: 46, name: 'N439'},
            {number: '49', odds: 46, name: 'N449'},
            {number: '10', odds: 46, name: 'N410'},
            {number: '20', odds: 46, name: 'N420'},
            {number: '30', odds: 46, name: 'N430'},
            {number: '40', odds: 46, name: 'N440'},
            {number: ''}
          ]
        }]
      },
      {
        name: '正码特 5',
        type: 'N5',
        items: [{
          type: 'normal_grid',
          title: [
            {name: '号码', type: 'number', width: '20%'},
            {name: '赔率', type: 'odds', width: '20%'},
            {name: '金额', type: 'money', width: '60%'}
          ],
          hideTitle: false,
          cols: 5,
          cells: [
            {number: '01', odds: 46, name: 'N501'},
            {number: '11', odds: 46, name: 'N511'},
            {number: '21', odds: 46, name: 'N521'},
            {number: '31', odds: 46, name: 'N531'},
            {number: '41', odds: 46, name: 'N541'},
            {number: '02', odds: 46, name: 'N502'},
            {number: '12', odds: 46, name: 'N512'},
            {number: '22', odds: 46, name: 'N522'},
            {number: '32', odds: 46, name: 'N532'},
            {number: '42', odds: 46, name: 'N542'},
            {number: '03', odds: 46, name: 'N503'},
            {number: '13', odds: 46, name: 'N513'},
            {number: '23', odds: 46, name: 'N523'},
            {number: '33', odds: 46, name: 'N533'},
            {number: '43', odds: 46, name: 'N543'},
            {number: '04', odds: 46, name: 'N504'},
            {number: '14', odds: 46, name: 'N514'},
            {number: '24', odds: 46, name: 'N524'},
            {number: '34', odds: 46, name: 'N534'},
            {number: '44', odds: 46, name: 'N544'},
            {number: '05', odds: 46, name: 'N505'},
            {number: '15', odds: 46, name: 'N515'},
            {number: '25', odds: 46, name: 'N525'},
            {number: '35', odds: 46, name: 'N535'},
            {number: '45', odds: 46, name: 'N545'},
            {number: '06', odds: 46, name: 'N506'},
            {number: '16', odds: 46, name: 'N516'},
            {number: '26', odds: 46, name: 'N526'},
            {number: '36', odds: 46, name: 'N536'},
            {number: '46', odds: 46, name: 'N546'},
            {number: '07', odds: 46, name: 'N507'},
            {number: '17', odds: 46, name: 'N517'},
            {number: '27', odds: 46, name: 'N527'},
            {number: '37', odds: 46, name: 'N537'},
            {number: '47', odds: 46, name: 'N547'},
            {number: '08', odds: 46, name: 'N508'},
            {number: '18', odds: 46, name: 'N518'},
            {number: '28', odds: 46, name: 'N528'},
            {number: '38', odds: 46, name: 'N538'},
            {number: '48', odds: 46, name: 'N548'},
            {number: '09', odds: 46, name: 'N509'},
            {number: '19', odds: 46, name: 'N519'},
            {number: '29', odds: 46, name: 'N529'},
            {number: '39', odds: 46, name: 'N539'},
            {number: '49', odds: 46, name: 'N549'},
            {number: '10', odds: 46, name: 'N510'},
            {number: '20', odds: 46, name: 'N520'},
            {number: '30', odds: 46, name: 'N530'},
            {number: '40', odds: 46, name: 'N540'},
            {number: ''}
          ]
        }]
      },
      {
        name: '正码特 6',
        type: 'N6',
        items: [{
          type: 'normal_grid',
          title: [
            {name: '号码', type: 'number', width: '20%'},
            {name: '赔率', type: 'odds', width: '20%'},
            {name: '金额', type: 'money', width: '60%'}
          ],
          hideTitle: false,
          cols: 5,
          cells: [
            {number: '01', odds: 46, name: 'N601'},
            {number: '11', odds: 46, name: 'N611'},
            {number: '21', odds: 46, name: 'N621'},
            {number: '31', odds: 46, name: 'N631'},
            {number: '41', odds: 46, name: 'N641'},
            {number: '02', odds: 46, name: 'N602'},
            {number: '12', odds: 46, name: 'N612'},
            {number: '22', odds: 46, name: 'N622'},
            {number: '32', odds: 46, name: 'N632'},
            {number: '42', odds: 46, name: 'N642'},
            {number: '03', odds: 46, name: 'N603'},
            {number: '13', odds: 46, name: 'N613'},
            {number: '23', odds: 46, name: 'N623'},
            {number: '33', odds: 46, name: 'N633'},
            {number: '43', odds: 46, name: 'N643'},
            {number: '04', odds: 46, name: 'N604'},
            {number: '14', odds: 46, name: 'N614'},
            {number: '24', odds: 46, name: 'N624'},
            {number: '34', odds: 46, name: 'N634'},
            {number: '44', odds: 46, name: 'N644'},
            {number: '05', odds: 46, name: 'N605'},
            {number: '15', odds: 46, name: 'N615'},
            {number: '25', odds: 46, name: 'N625'},
            {number: '35', odds: 46, name: 'N635'},
            {number: '45', odds: 46, name: 'N645'},
            {number: '06', odds: 46, name: 'N606'},
            {number: '16', odds: 46, name: 'N616'},
            {number: '26', odds: 46, name: 'N626'},
            {number: '36', odds: 46, name: 'N636'},
            {number: '46', odds: 46, name: 'N646'},
            {number: '07', odds: 46, name: 'N607'},
            {number: '17', odds: 46, name: 'N617'},
            {number: '27', odds: 46, name: 'N627'},
            {number: '37', odds: 46, name: 'N637'},
            {number: '47', odds: 46, name: 'N647'},
            {number: '08', odds: 46, name: 'N608'},
            {number: '18', odds: 46, name: 'N618'},
            {number: '28', odds: 46, name: 'N628'},
            {number: '38', odds: 46, name: 'N638'},
            {number: '48', odds: 46, name: 'N648'},
            {number: '09', odds: 46, name: 'N609'},
            {number: '19', odds: 46, name: 'N619'},
            {number: '29', odds: 46, name: 'N629'},
            {number: '39', odds: 46, name: 'N639'},
            {number: '49', odds: 46, name: 'N649'},
            {number: '10', odds: 46, name: 'N610'},
            {number: '20', odds: 46, name: 'N620'},
            {number: '30', odds: 46, name: 'N630'},
            {number: '40', odds: 46, name: 'N640'},
            {number: ''}
          ]
        }]
      }
    ]
  },
  {
    name: '正码 1-6',
    id: 5,
    items: [
      {
        type: 'normal_grid',
        totleTitle: ['正码一', '正码二', '正码三', '正码四', '正码五', '正码六'],
        title: [
          {name: '赔率', type: 'odds', width: '30%'},
          {name: '金额', type: 'money', width: '70%'}
        ],
        TDTitle: ['号码', '单', '双', '大', '小', '和单', '和双', '和大', '和小', '尾大', '尾小', '红波', '绿波', '蓝波'],
        cols: 6,
        cells: [
          {name: 'NO1_ODD'},
          {name: 'NO2_ODD'},
          {name: 'NO3_ODD'},
          {name: 'NO4_ODD'},
          {name: 'NO5_ODD'},
          {name: 'NO6_ODD'},
          {name: 'NO1_EVEN'},
          {name: 'NO2_EVEN'},
          {name: 'NO3_EVEN'},
          {name: 'NO4_EVEN'},
          {name: 'NO5_EVEN'},
          {name: 'NO6_EVEN'},
          {name: 'NO1_OVER'},
          {name: 'NO2_OVER'},
          {name: 'NO3_OVER'},
          {name: 'NO4_OVER'},
          {name: 'NO5_OVER'},
          {name: 'NO6_OVER'},
          {name: 'NO1_UNDER'},
          {name: 'NO2_UNDER'},
          {name: 'NO3_UNDER'},
          {name: 'NO4_UNDER'},
          {name: 'NO5_UNDER'},
          {name: 'NO6_UNDER'},
          {name: 'NO1_SODD'},
          {name: 'NO2_SODD'},
          {name: 'NO3_SODD'},
          {name: 'NO4_SODD'},
          {name: 'NO5_SODD'},
          {name: 'NO6_SODD'},
          {name: 'NO1_SEVEN'},
          {name: 'NO2_SEVEN'},
          {name: 'NO3_SEVEN'},
          {name: 'NO4_SEVEN'},
          {name: 'NO5_SEVEN'},
          {name: 'NO6_SEVEN'},
          {name: 'NO1_SOVER'},
          {name: 'NO2_SOVER'},
          {name: 'NO3_SOVER'},
          {name: 'NO4_SOVER'},
          {name: 'NO5_SOVER'},
          {name: 'NO6_SOVER'},
          {name: 'NO1_SUNDER'},
          {name: 'NO2_SUNDER'},
          {name: 'NO3_SUNDER'},
          {name: 'NO4_SUNDER'},
          {name: 'NO5_SUNDER'},
          {name: 'NO6_SUNDER'},
          {name: 'NO1_FOVER'},
          {name: 'NO2_FOVER'},
          {name: 'NO3_FOVER'},
          {name: 'NO4_FOVER'},
          {name: 'NO5_FOVER'},
          {name: 'NO6_FOVER'},
          {name: 'NO1_FUNDER'},
          {name: 'NO2_FUNDER'},
          {name: 'NO3_FUNDER'},
          {name: 'NO4_FUNDER'},
          {name: 'NO5_FUNDER'},
          {name: 'NO6_FUNDER'},
          {name: 'NO1_R'},
          {name: 'NO2_R'},
          {name: 'NO3_R'},
          {name: 'NO4_R'},
          {name: 'NO5_R'},
          {name: 'NO6_R'},
          {name: 'NO1_G'},
          {name: 'NO2_G'},
          {name: 'NO3_G'},
          {name: 'NO4_G'},
          {name: 'NO5_G'},
          {name: 'NO6_G'},
          {name: 'NO1_B'},
          {name: 'NO2_B'},
          {name: 'NO3_B'},
          {name: 'NO4_B'},
          {name: 'NO5_B'},
          {name: 'NO6_B'}
        ]
      }
    ]
  },
  {
    name: '正码过关',
    id: 6,
    type: 'zhengmaguoguan',
    items: [
      {
        type: 'normal_grid',
        totleTitle: ['正码一', '正码二', '正码三', '正码四', '正码五', '正码六'],
        title: [
          {name: '赔率', type: 'odds_radio', width: '50%'},
          {name: '选择', type: 'radio', width: '50%'}
        ],
        TDTitle: ['号码', '单', '双', '大', '小', '和单', '和双', '和大', '和小', '尾大', '尾小', '红', '绿', '蓝'],
        cols: 6,
        cells: [
          {name: 'game1', value: 'NAP1_ODD'},
          {name: 'game2', value: 'NAP2_ODD'},
          {name: 'game3', value: 'NAP3_ODD'},
          {name: 'game4', value: 'NAP4_ODD'},
          {name: 'game5', value: 'NAP5_ODD'},
          {name: 'game6', value: 'NAP6_ODD'},
          {name: 'game1', value: 'NAP1_EVEN'},
          {name: 'game2', value: 'NAP2_EVEN'},
          {name: 'game3', value: 'NAP3_EVEN'},
          {name: 'game4', value: 'NAP4_EVEN'},
          {name: 'game5', value: 'NAP5_EVEN'},
          {name: 'game6', value: 'NAP6_EVEN'},
          {name: 'game1', value: 'NAP1_OVER'},
          {name: 'game2', value: 'NAP2_OVER'},
          {name: 'game3', value: 'NAP3_OVER'},
          {name: 'game4', value: 'NAP4_OVER'},
          {name: 'game5', value: 'NAP5_OVER'},
          {name: 'game6', value: 'NAP6_OVER'},
          {name: 'game1', value: 'NAP1_UNDER'},
          {name: 'game2', value: 'NAP2_UNDER'},
          {name: 'game3', value: 'NAP3_UNDER'},
          {name: 'game4', value: 'NAP4_UNDER'},
          {name: 'game5', value: 'NAP5_UNDER'},
          {name: 'game6', value: 'NAP6_UNDER'},
          {name: 'game1', value: 'NAP1_SODD'},
          {name: 'game2', value: 'NAP2_SODD'},
          {name: 'game3', value: 'NAP3_SODD'},
          {name: 'game4', value: 'NAP4_SODD'},
          {name: 'game5', value: 'NAP5_SODD'},
          {name: 'game6', value: 'NAP6_SODD'},
          {name: 'game1', value: 'NAP1_SEVEN'},
          {name: 'game2', value: 'NAP2_SEVEN'},
          {name: 'game3', value: 'NAP3_SEVEN'},
          {name: 'game4', value: 'NAP4_SEVEN'},
          {name: 'game5', value: 'NAP5_SEVEN'},
          {name: 'game6', value: 'NAP6_SEVEN'},
          {name: 'game1', value: 'NAP1_SOVER'},
          {name: 'game2', value: 'NAP2_SOVER'},
          {name: 'game3', value: 'NAP3_SOVER'},
          {name: 'game4', value: 'NAP4_SOVER'},
          {name: 'game5', value: 'NAP5_SOVER'},
          {name: 'game6', value: 'NAP6_SOVER'},
          {name: 'game1', value: 'NAP1_SUNDER'},
          {name: 'game2', value: 'NAP2_SUNDER'},
          {name: 'game3', value: 'NAP3_SUNDER'},
          {name: 'game4', value: 'NAP4_SUNDER'},
          {name: 'game5', value: 'NAP5_SUNDER'},
          {name: 'game6', value: 'NAP6_SUNDER'},
          {name: 'game1', value: 'NAP1_FOVER'},
          {name: 'game2', value: 'NAP2_FOVER'},
          {name: 'game3', value: 'NAP3_FOVER'},
          {name: 'game4', value: 'NAP4_FOVER'},
          {name: 'game5', value: 'NAP5_FOVER'},
          {name: 'game6', value: 'NAP6_FOVER'},
          {name: 'game1', value: 'NAP1_FUNDER'},
          {name: 'game2', value: 'NAP2_FUNDER'},
          {name: 'game3', value: 'NAP3_FUNDER'},
          {name: 'game4', value: 'NAP4_FUNDER'},
          {name: 'game5', value: 'NAP5_FUNDER'},
          {name: 'game6', value: 'NAP6_FUNDER'},
          {name: 'game1', value: 'NAP1_R'},
          {name: 'game2', value: 'NAP2_R'},
          {name: 'game3', value: 'NAP3_R'},
          {name: 'game4', value: 'NAP4_R'},
          {name: 'game5', value: 'NAP5_R'},
          {name: 'game6', value: 'NAP6_R'},
          {name: 'game1', value: 'NAP1_G'},
          {name: 'game2', value: 'NAP2_G'},
          {name: 'game3', value: 'NAP3_G'},
          {name: 'game4', value: 'NAP4_G'},
          {name: 'game5', value: 'NAP5_G'},
          {name: 'game6', value: 'NAP6_G'},
          {name: 'game1', value: 'NAP1_B'},
          {name: 'game2', value: 'NAP2_B'},
          {name: 'game3', value: 'NAP3_B'},
          {name: 'game4', value: 'NAP4_B'},
          {name: 'game5', value: 'NAP5_B'},
          {name: 'game6', value: 'NAP6_B'}
        ]
      }
    ]
  },
  {
    name: '连码',
    id: 7,
    type: 'lianma',
    tabs: [
      {
        name: '四全中',
        type: 'CH_4',
        defaultSelected: true,
        subTabs: ['正/副号', '肖串尾数', '交叉碰', '胆拖', '胆拖色波', '胆拖生肖'],
        series: 4
      },
      {
        name: '三全中',
        type: 'CH_3',
        subTabs: ['正/副号', '肖串尾数', '交叉碰', '胆拖', '胆拖色波', '胆拖生肖'],
        series: 3
      },
      {
        name: '三中二',
        type: 'CH_32',
        subTabs: ['正/副号', '肖串尾数', '交叉碰', '胆拖', '胆拖色波', '胆拖生肖'],
        series: 3
      },
      {
        name: '二全中',
        type: 'CH_2',
        subTabs: ['正/副号', '生肖对碰', '尾数对碰', '肖串尾数', '交叉碰', '胆拖', '胆拖色波', '胆拖生肖'],
        series: 2
      },
      {
        name: '二中特',
        type: 'CH_2S',
        subTabs: ['正/副号', '生肖对碰', '尾数对碰', '肖串尾数', '交叉碰', '胆拖', '胆拖色波', '胆拖生肖'],
        series: 2
      },
      {
        name: '特串',
        type: 'CH_2SP',
        subTabs: ['正/副号', '生肖对碰', '尾数对碰', '肖串尾数', '交叉碰', '胆拖', '胆拖色波', '胆拖生肖'],
        series: 2
      }
    ]
  },
  {
    name: '连肖',
    id: 8,
    type: 'lianxiao',
    tabs: [
      {name: '二肖连', type: 'LX2', defaultSelected: true},
      {name: '三肖连', type: 'LX3'},
      {name: '四肖连', type: 'LX4'},
      {name: '五肖连', type: 'LX5'}
    ]
  },
  {
    name: '连尾',
    id: 9,
    type: 'lianwei',
    tabs: [
      {name: '二尾碰', type: 'LF2', defaultSelected: true},
      {name: '三尾碰', type: 'LF3'},
      {name: '四尾碰', type: 'LF4'},
      {name: '五尾碰', type: 'LF5'}
    ]
  },
  {
    name: '自选不中',
    id: 10,
    type: 'zixuanbuzhong',
    tabs: [
      {name: '五不中', type: 'NI5', defaultSelected: true},
      {name: '六不中', type: 'NI6'},
      {name: '七不中', type: 'NI7'},
      {name: '八不中', type: 'NI8'},
      {name: '九不中', type: 'NI9'},
      {name: '十不中', type: 'NIA'},
      {name: '十一不中', type: 'NIB'},
      {name: '十二不中', type: 'NIC'}
    ]
  },
  {
    name: '生肖',
    id: 11,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '十二生肖', type: 'label', width: '20%'},
          {name: '号码', type: 'shengXiao', width: '35%'},
          {name: '赔率', type: 'odds', width: '20%'},
          {name: '金额', type: 'money', width: '25%'}
        ],
        hideTitle: false,
        cols: 2,
        cells: [
          {label: '鼠', shengXiao: '09, 21, 33, 45', name: 'SP_A1'},
          {label: '牛', shengXiao: '08, 20, 32, 44', name: 'SP_A2'},
          {label: '虎', shengXiao: '07, 19, 31, 43', name: 'SP_A3'},
          {label: '兔', shengXiao: '06, 18, 30, 42', name: 'SP_A4'},
          {label: '龙', shengXiao: '05, 17, 29, 41', name: 'SP_A5'},
          {label: '蛇', shengXiao: '04, 16, 28, 40', name: 'SP_A6'},
          {label: '马', shengXiao: '03, 15, 27, 39', name: 'SP_A7'},
          {label: '羊', shengXiao: '02, 14, 26, 38', name: 'SP_A8'},
          {label: '猴', shengXiao: '01, 13, 25, 37, 49', name: 'SP_A9'},
          {label: '鸡', shengXiao: '12, 24, 36, 48', name: 'SP_AA'},
          {label: '狗', shengXiao: '11, 23, 35, 47', name: 'SP_AB'},
          {label: '猪', shengXiao: '10, 22, 34, 46', name: 'SP_AC'}
        ]
      }
    ]
  },
  {
    name: '正肖',
    id: 12,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '正肖', type: 'label', width: '20%'},
          {name: '号码', type: 'shengXiao', width: '35%'},
          {name: '赔率', type: 'odds', width: '20%'},
          {name: '金额', type: 'money', width: '25%'}
        ],
        hideTitle: false,
        cols: 2,
        cells: [
          {label: '鼠', shengXiao: '09, 21, 33, 45', name: 'NA_A1'},
          {label: '牛', shengXiao: '08, 20, 32, 44', name: 'NA_A2'},
          {label: '虎', shengXiao: '07, 19, 31, 43', name: 'NA_A3'},
          {label: '兔', shengXiao: '06, 18, 30, 42', name: 'NA_A4'},
          {label: '龙', shengXiao: '05, 17, 29, 41', name: 'NA_A5'},
          {label: '蛇', shengXiao: '04, 16, 28, 40', name: 'NA_A6'},
          {label: '马', shengXiao: '03, 15, 27, 39', name: 'NA_A7'},
          {label: '羊', shengXiao: '02, 14, 26, 38', name: 'NA_A8'},
          {label: '猴', shengXiao: '01, 13, 25, 37, 49', name: 'NA_A9'},
          {label: '鸡', shengXiao: '12, 24, 36, 48', name: 'NA_AA'},
          {label: '狗', shengXiao: '11, 23, 35, 47', name: 'NA_AB'},
          {label: '猪', shengXiao: '10, 22, 34, 46', name: 'NA_AC'}
        ]
      }
    ]
  },
  {
    name: '一肖',
    id: 13,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '一肖', type: 'label', width: '20%'},
          {name: '号码', type: 'shengXiao', width: '35%'},
          {name: '赔率', type: 'odds', width: '20%'},
          {name: '金额', type: 'money', width: '25%'}
        ],
        hideTitle: false,
        cols: 2,
        cells: [
          {label: '鼠', shengXiao: '09, 21, 33, 45', name: 'SP_B1'},
          {label: '牛', shengXiao: '08, 20, 32, 44', name: 'SP_B2'},
          {label: '虎', shengXiao: '07, 19, 31, 43', name: 'SP_B3'},
          {label: '兔', shengXiao: '06, 18, 30, 42', name: 'SP_B4'},
          {label: '龙', shengXiao: '05, 17, 29, 41', name: 'SP_B5'},
          {label: '蛇', shengXiao: '04, 16, 28, 40', name: 'SP_B6'},
          {label: '马', shengXiao: '03, 15, 27, 39', name: 'SP_B7'},
          {label: '羊', shengXiao: '02, 14, 26, 38', name: 'SP_B8'},
          {label: '猴', shengXiao: '01, 13, 25, 37, 49', name: 'SP_B9'},
          {label: '鸡', shengXiao: '12, 24, 36, 48', name: 'SP_BA'},
          {label: '狗', shengXiao: '11, 23, 35, 47', name: 'SP_BB'},
          {label: '猪', shengXiao: '10, 22, 34, 46', name: 'SP_BC'}
        ]
      }
    ]
  },
  {
    name: '合肖',
    id: 14,
    type: 'hexiao',
    tabs: [
      {
        name: '中',
        type: 'NX_IN',
        defaultSelected: true,
        subTabs: ['野兽', '家禽', '单', '双', '前肖', '后肖', '天肖', '地肖']
      },
      {
        name: '不中',
        type: 'NX_OUT',
        subTabs: ['野兽', '家禽', '单', '双', '前肖', '后肖', '天肖', '地肖']
      }
    ]
  },
  {
    name: '总肖',
    id: 15,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '号码', type: 'label', width: '25%'},
          {name: '赔率', type: 'odds', width: '25%'},
          {name: '金额', type: 'money', width: '50%'}
        ],
        hideTitle: true,
        mainTitle: '总肖',
        cols: 2,
        cells: [
          {label: '234肖', name: 'TX2'},
          {label: '5肖', name: 'TX5'},
          {label: '6肖', name: 'TX6'},
          {label: '7肖', name: 'TX7'},
          {label: '总肖单', name: 'TX_ODD'},
          {label: '总肖双', name: 'TX_EVEN'}
        ]
      }
    ]
  },
  {
    name: '色波',
    id: 16,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '号码', type: 'label', width: '25%'},
          {name: '赔率', type: 'odds', width: '25%'},
          {name: '金额', type: 'money', width: '50%'}
        ],
        hideTitle: true,
        mainTitle: '色波',
        cols: 3,
        cells: [
          {label: '红波', name: 'SP_R'},
          {label: '蓝波', name: 'SP_B'},
          {label: '绿波', name: 'SP_G'}
        ]
      }
    ]
  },
  {
    name: '半波',
    id: 17,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '半波', type: 'label', width: '20%'},
          {name: '赔率', type: 'odds', width: '20%'},
          {name: '金额', type: 'money', width: '25%'},
          {name: '号码', type: 'balls', width: '35%'},
        ],
        hideTitle: false,
        cols: 1,
        cells: [
          {
            label: '红单',
            balls: ['01', '07', '13', '19', '23', '29', '35', '45'],
            name: 'HB_RODD'
          },
          {
            label: '红双',
            balls: ['02', '08', '12', '18', '24', '30', '34', '40', '46'],
            name: 'HB_REVEN'
          },
          {
            label: '红大',
            balls: ['29', '30', '34', '35', '40', '45', '46'],
            name: 'HB_ROVER'
          },
          {
            label: '红小',
            balls: ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24'],
            name: 'HB_RUNDER'
          },
          {
            label: '绿单',
            balls: ['05', '11', '17', '21', '27', '33', '39', '43'],
            name: 'HB_GODD'
          },
          {
            label: '绿双',
            // balls: ['06', '17', '22', '28', '32', '38', '44'],
            balls: ['06', '16', '22', '28', '32', '38', '44'],
            name: 'HB_GEVEN'
          },
          {
            label: '绿大',
            balls: ['27', '28', '32', '33', '38', '39', '43', '44'],
            name: 'HB_GOVER'
          },
          {
            label: '绿小',
            balls: ['05', '06', '11', '16', '17', '21', '22'],
            name: 'HB_GUNDER'
          },
          {
            label: '蓝单',
            balls: ['03', '09', '15', '25', '31', '37', '41', '47'],
            name: 'HB_BODD'
          },
          {
            label: '蓝双',
            balls: ['04', '10', '14', '20', '26', '36', '42', '48'],
            name: 'HB_BEVEN'
          },
          {
            label: '蓝大',
            balls: ['25', '26', '31', '36', '37', '41', '42', '47', '48'],
            name: 'HB_BOVER'
          },
          {
            label: '蓝小',
            balls: ['03', '04', '09', '10', '14', '15', '20'],
            name: 'HB_BUNDER'
          }
        ]
      }
    ]
  },
  {
    name: '半半波',
    id: 18,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '半半波', type: 'label', width: '20%'},
          {name: '赔率', type: 'odds', width: '20%'},
          {name: '金额', type: 'money', width: '25%'},
          {name: '号码', type: 'balls', width: '35%'},
        ],
        hideTitle: false,
        cols: 1,
        cells: [
          {
            label: '红大单',
            balls: ['29', '35', '45'],
            name: 'HH_ROO'
          },
          {
            label: '红大双',
            balls: ['30', '34', '40', '46'],
            name: 'HH_ROE'
          },
          {
            label: '红小单',
            balls: ['01', '07', '13', '19', '23'],
            name: 'HH_RUO'
          },
          {
            label: '红小双',
            balls: ['02', '08', '12', '18', '24'],
            name: 'HH_RUE'
          },
          {
            label: '绿大单',
            balls: ['27', '33', '39', '43'],
            name: 'HH_GOO'
          },
          {
            label: '绿大双',
            balls: ['28', '32', '38', '44'],
            name: 'HH_GOE'
          },
          {
            label: '绿小单',
            // balls: ['05', '11', '17', '21', '38', '39', '43', '44'],
            balls: ['05', '11', '17', '21'],
            name: 'HH_GUO'
          },
          {
            label: '绿小双',
            balls: ['06', '16', '22'],
            name: 'HH_GUE'
          },
          {
            label: '蓝大单',
            balls: ['25', '31', '37', '41', '47'],
            name: 'HH_BOO'
          },
          {
            label: '蓝大双',
            balls: ['26', '36', '42', '48'],
            name: 'HH_BOE'
          },
          {
            label: '蓝小单',
            balls: ['03', '09', '15'],
            name: 'HH_BUO'
          },
          {
            label: '蓝小双',
            balls: ['04','10', '14', '20'],
            name: 'HH_BUE'
          }
        ]
      }
    ]
  },
  {
    name: '七色波',
    id: 19,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '号码', type: 'label', width: '25%'},
          {name: '赔率', type: 'odds', width: '25%'},
          {name: '金额', type: 'money', width: '50%'}
        ],
        hideTitle: false,
        cols: 4,
        cells: [
          {label: '红波', name: 'C7_R'},
          {label: '蓝波', name: 'C7_B'},
          {label: '绿波', name: 'C7_G'},
          {label: '和局', name: 'C7_N'}
        ]
      }
    ]
  },
  {
    name: '头尾数',
    id: 20,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '号码', type: 'label', width: '25%'},
          {name: '赔率', type: 'odds', width: '25%'},
          {name: '金额', type: 'money', width: '50%'}
        ],
        hideTitle: true,
        mainTitle: '特码头尾数',
        cols: 5,
        cells: [
          {label: '头0', name: 'SH0'},
          {label: '头1', name: 'SH1'},
          {label: '头2', name: 'SH2'},
          {label: '头3', name: 'SH3'},
          {label: '头4', name: 'SH4'},
          {label: '尾0', name: 'SF0'},
          {label: '尾1', name: 'SF1'},
          {label: '尾2', name: 'SF2'},
          {label: '尾3', name: 'SF3'},
          {label: '尾4', name: 'SF4'},
          {label: '尾5', name: 'SF5'},
          {label: '尾6', name: 'SF6'},
          {label: '尾7', name: 'SF7'},
          {label: '尾8', name: 'SF8'},
          {label: '尾9', name: 'SF9'}
        ]
      }
    ]
  },
  {
    name: '正特尾数',
    id: 21,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '号码', type: 'label', width: '25%'},
          {name: '赔率', type: 'odds', width: '25%'},
          {name: '金额', type: 'money', width: '50%'}
        ],
        hideTitle: true,
        mainTitle: '正特尾数',
        cols: 2,
        cells: [
          {label: '尾0', name: 'NF0'},
          {label: '尾1', name: 'NF1'},
          {label: '尾2', name: 'NF2'},
          {label: '尾3', name: 'NF3'},
          {label: '尾4', name: 'NF4'},
          {label: '尾5', name: 'NF5'},
          {label: '尾6', name: 'NF6'},
          {label: '尾7', name: 'NF7'},
          {label: '尾8', name: 'NF8'},
          {label: '尾9', name: 'NF9'}
        ]
      }
    ]
  },
  {
    name: '七码五行',
    id: 22,
    items: [
      {
        type: 'normal_grid',
        title: [
          {name: '七码', type: 'label', width: '35%'},
          {name: '赔率', type: 'odds', width: '30%'},
          {name: '金额', type: 'money', width: '35%'}
        ],
        hideTitle: false,
        cols: 2,
        cells: [
          {label: '单0 . 双7', name: 'S7_0O7E'},
          {label: '大0 . 小7', name: 'S7_0O7U'},
          {label: '单1 . 双6', name: 'S7_1O6E'},
          {label: '大1 . 小6', name: 'S7_1O6U'},
          {label: '单2 . 双5', name: 'S7_2O5E'},
          {label: '大2 . 小5', name: 'S7_2O5U'},
          {label: '单3 . 双4', name: 'S7_3O4E'},
          {label: '大3 . 小4', name: 'S7_3O4U'},
          {label: '单4 . 双3', name: 'S7_4O3E'},
          {label: '大4 . 小3', name: 'S7_4O3U'},
          {label: '单5 . 双2', name: 'S7_5O2E'},
          {label: '大5 . 小2', name: 'S7_5O2U'},
          {label: '单6 . 双1', name: 'S7_6O1E'},
          {label: '大6 . 小1', name: 'S7_6O1U'},
          {label: '单7 . 双0', name: 'S7_7O0E'},
          {label: '大7 . 小0', name: 'S7_7O0U'}
        ]
      },
      {
        type: 'normal_grid',
        title: [
          {name: '五行', type: 'label', width: '20%'},
          {name: '号码', type: 'number', width: '30%'},
          {name: '赔率', type: 'odds', width: '20%'},
          {name: '金额', type: 'money', width: '30%'}
        ],
        hideTitle: false,
        cols: 1,
        cells: [
          {
            label: '金',
            number: '03,04,17,18,25,26,33,34,47,48',
            name: 'F_METAL'
          },
          {
            label: '木',
            number: '07,08,15,16,29,30,37,38,45,46',
            name: 'F_WOOD'
          },
          {
            label: '水',
            number: '05,06,13,14,21,22,35,36,43,44',
            name: 'F_WATER'
          },
          {
            label: '火',
            number: '01,02,09,10,23,24,31,32,39,40',
            name: 'F_FIRE'
          },
          {
            label: '土',
            number: '11,12,19,20,27,28,41,42,49',
            name: 'F_EARTH'
          }
        ]
      }
    ]
  },
  {
    name: '中一',
    id: 23,
    type: 'zhongyi',
    tabs: [
      {name: '五中一', type: 'IN15', defaultSelected: true},
      {name: '六中一', type: 'IN16'},
      {name: '七中一', type: 'IN17'},
      {name: '八中一', type: 'IN18'},
      {name: '九中一', type: 'IN19'},
      {name: '十中一', type: 'IN1A'}
    ]
  }
]


export default layout;
