import Mock from 'mockjs'

import * as mUtils from '@/utils/mUtils'


let List = []
const count = 300
let typelist = [1, 2, 3, 4, 5, 6, 7, 8]
let modulesList= ['OGI','OG2']
let companyList= [
'华为技术有限公司',
'中兴通讯股份有限公司',
'深圳市车米云图科技有限公司',
'亚太导航科技有限公司',
'链动科技有限公司',
'海信集团有限公司',
'UT斯达康通讯有限公司',
'海尔集团公司',
'神州数码(中国)有限公司',
'浙江浙大网新科技股份有限公司',
'熊猫电子集团有限公司',
'浪潮集团有限公司',
'东软集团有限公司',
'北京北大方正集团',
'微软(中国)有限公司',
'朝华科技(集团)股份有限公司',
'中国计算机软件与技术服务总公司',
'清华同方股份有限公司',
'上海贝尔阿尔卡特股份有限公司',
'山东中创软件工程股份有限公司',
'国际商业机器(中国)有限公司(IBM)',
'大唐电信科技股份有限公司(北京)',
'摩托罗拉(中国)电子有限公司',
'上海宝信软件股份有限公司',
'托普集团科技发展有限责任公司',
'中国民航信息网络股份有限公司',
'北京用友软件股份有限公司',
'中国长城计算机集团公司',
'北京四方继保自动化有限公司',
'烟台东方电子信息产业集团有限公司',
'北京甲骨文软件系统有限公司',
'南京联创科技股份有限公司',
'金蝶软件(中国)有限公司',
'南京南瑞集团公司',
'杭州恒生电子集团有限公司',
'上海新华控制技术(集团)有限公司',
'新太科技股份有限公司',
'思爱普(北京)软件系统有限公司', 
'哈尔滨亿阳信通股份公司', 
'云南南天电子信息产业股份公司', 
'杭州新中大软件股份公司', 
'株洲时代集团公司',
'南京南瑞继保电气有限公司', 
'江苏南大苏富特软件股份有限公司', 
'创智集团', 
'深圳市南凌科技发展有限公司', 
'北京握奇数据系统有限公司', 
'毕益辉系统(中国)有限公司(BEA)', 
'华立集团有限公司', 
'广州华南资讯科技有限公司', 
'杭州士兰微电子股份有限公司', 
'浙江中控科技集团有限公司', 
'盛趣信息技术(上海)有限公司', 
'长春一汽启明信息技术有限公司', 
'湖南计算机集团', 
'华北计算机系统工程研究所', 
'深圳迈瑞生物医疗电子股份有限公司', 
'福建星网锐捷通讯有限公司', 
'广州海格通信有限公司', 
'京华网络有限公司', 
'北京市和利时系统工程股份有限公司', 
'长江计算机(集团)公司(上海)', 
'太极计算机集团(北京)', 
'江苏东大金智软件股份有限公司', 
'杭州信雅达系统工程股份有限公司', 
'上海达因信息技术股份有限公司', 
'湖南长沙新宇科技发展有限公司',
'北京联想软件有限公司', 
'深圳市金证科技股份有限公司', 
'中程科技有限公司', 
'大恒新纪元科技股份有限公司', 
'沈阳先锋计算机工程有限公司', 
'福建新大陆电脑股份有限公司',
'上海致达信息产业股份有限公司', 
'福建榕基软件开发有限公司', 
'宏智科技股份有限公司', 
'海湾安全技术股份有限公司', 
'亚信科技(中国)有限公司', 
'上海复旦光华信息科技股份有限公司', 
'北京天桥北大青鸟科技股份有限公司', 
'掌中万维中国信息科技有限公司', 
'九娱(上海)信息技术有限公司', 
'四川汇源科技发展股份公司', 
'北京东华合创数码科技股份有限公司', 
'华迪计算机有限公司', 
'北京朗新信息系统有限公司', 
'北京中科大洋科技发展股份有限公司', 
'深圳市现代计算机有限公', 
'北京新晨科技股份有限公司', 
'南昌先锋软件股份有限公司', 
'湖南国讯国际网络有限公司', 
'大连华信计算机技术有限公司', 
'建研科技股份有限公司', 
'中科软科技股份有限公司', 
'南望信息产业集团有限公司', 
'赛贝斯软件(中国)有限公司', 
'四川托日信息工程有限责任公司', 
'国电南瑞科技股份有限公司', 
'北京先进数通信息技术有限公司', 
'万达信息股份有限公司', 
'杭州颐和科技信息系统有限公司', 
'黎明网络有限公司', 
'浙江大华信息技术股份有限公司', 
'IC设计企业一览~ 北京地区',  
'大唐微电子技术有限公司',  
'北京北大众志微系统科技有限责任公司',  
'北京中星微电子有限公司',
'中国华大集成电路设计中心',
'北京中电华大电子设计有限责任公司',
'北京清华同方微电子有限公司',
'北京神州龙芯集成电路设计有限公司',
'威盛电子（中国）有限公司',
'北京九方中实电子科技有限责任公司',
'北京ＮＥＣ集成电路设计公司',
'北京华虹集成电路设计有限责任公司',　
'北京北方华虹微系统有限公司',
'北京海尔集成电路设计有限公司',
'北京六合万通微电子技术有限公司',
'北京中庆微数字设备开发有限公司',
'北京讯风光通信技术开发有限责任公司',
'北京兆日科技有限责任公司',
'北京北大青鸟集成电路有限公司',
'北京宏思电子技术有限公司',
'北京航天伟盈微电子有限公司',
'北京火马微电子技术有限公司',
'北京奇普嘉科技有限公司',
'北京思旺电子技术有限公司',
'北京协同伟业信息技术有限公司',
'北京利亚德电子科技有限公司',
'北京芯网拓科技有限公司',
'清华大学微电子学研究所',
'北京奥贝克电子信息技术有限公司',
'北京东世科技有限公司',
'北京青鸟元芯微系统科技有限责任公司',
'北京中科飞鸿科技有限公司',
'北京凝思科技有限公司',
'北京天宏绎集成电路科技发展有限公司',
'北京东科微电子有限公司',
'北京福星晓程电子科技股份有限公司',
'国家专用集成电路设计工程技术研究中心',
'北京国际工程咨询公司',
'北京中科联创科技有限公司',
'北京清华紫光微电子系统有限公司',
'北京时代华诺科技有限公司',
'北京中科微电子技术有限公司',
'奥华微电子（北京）有限公司',
'北京博旭华达科技有限公司',
'北京国芯安集成电路设计有限公司',
'北京凯赛德航天系统集成设计有限公司',
'北京伊泰克电子有限公司',
'矽统科技有限公司北京代表处',
'北京明宇科技有限公司',
'北京英贝多嵌入式网络技术有限公司',
'方舟科技（北京）有限公司',
'摩托罗拉强芯（天津）集成电路设计有限公司',
'美国家半导体',
'深圳市中兴集成电路设计有限责任公司',
'深圳市国微电子股份有限公司',
'深圳市国微技术有限公司',
'深圳市明微电子有限公司',
'深圳市力合微电子有限公司',
'深圳市爱思科微电子有限公司',
'深圳市长运通集成电路设计有限公司',
'芯邦微电子有限公司',
'深圳市剑拓科技有限公司',
'深圳市方通科技有限公司',
'深圳市明华澳汉科技股份有限公司',
'深圳方禾集成电路有限公司',
'深圳市昊天旭辉科技有限公司',
'深圳市矽谷电子系统有限公司',
'深圳市中密科技有限公司',
'深圳市世纪经纬数据系统有限公司',
'深圳市国芯微电子有限公司',
'深圳深爱半导体有限公司',
'深圳艾科创新微电子有限公司',
'深圳市先功集成电路有限公司',
'深圳市互动宝科技开发有限公司',
'深圳市中微半导体有限公司',
'深圳市安健科技有限公司',
'美芯集成电路（深圳）有限公司',
'深圳市冠日通讯科技有限公司',
'深圳市兴域电子有限公司',
'深圳兰光电子集团公司',
'安凯开曼公司',
'深圳凯达网络技术有限公司',
'创系电子科技（深圳）有限公司',
'深圳市名声电子科技开发',
'富大微电子科技（深圳）有限公司',
'深圳市日松微电子有限公司',
'深圳市惠而特科技有限公司',
'深圳市天微电子有限公司',
'晶门科技（深圳）有限公司',
'深圳源核微电子技术有限公司　',
'深圳华超软件与微电子设计有限公司',
'深圳市江波龙电子有限公司',
'泰格阳技术（深圳）有限公司',
'深圳市朗科科技有限公司',
'深圳市鹏思电子有限公司',
'珠海炬力集成电路设计有限公司',
'深圳赛格高技术投资股份有限公司',
'广晟微电子有限公司',
'深圳市贝顿科技有限公司',
'深圳市易成科技有限公司',
'上海华虹集成电路有限责任公司',
'上海新茂半导体有限公司',
'复旦大学专用集成电路与系统国家重点实验室',
'宏羚科技（上海）有限公司',
'上大众芯微电子有限公司',
'上海华龙信息技术开发中心',
'圣景微电子公司',
'上海精致科技有限公司',
'泰鼎多媒体技术（上海）有限公司',
'鼎芯半导体（上海）有限公司',
'展讯通信有限公司',
'新益系统科技有限公司',
'上海明波通信技术有限公司',
'美国微芯科技公司',
'上海微科集成电路有限公司',
'上海大缔微电子有限公司',
'上海宽频科技股份有限公司',
'中颖电子（上海）有限公司',
'上海矽创微电子有限公司',
'上海至益电子技术有限公司',
'芯原微电子（上海）有限公司',
'智芯科技（上海）有限公司',
'得理微电子（上海）有限公司',
'格科微电子（上海）有限公司',
'上海爱普生电子有限公司',
'上海华园微电子技术有限公司',
'上海众华电子有限公司',
'德力微电子有限公司',
'勇瑞科技（上海）有限公司',
'苏州中科集成电路设计中心',
'江苏意源科技有限公司',
'无锡市爱芯科微电子有限公司',
'无锡市华方微电子有限公司',
'无锡华润矽科微电子有限公司',
'宁波市科技园区甬晶微电子有限公司',
'杭州士兰微电子股份有限公司',
'杭州中天微系统有限公司',
'中国电子科技集团公司第五十五研究所',
'德国英飞凌科技有限公司',
'西安华西集成电路设计中心',
'西安亚同集成电路技术有限公司',
'西安深亚电子有限公司',
'西安联圣科技有限公司',
'西安交大数码技术有限责任公司',
'西安中芯微电子技术有限公司',
'陕西美欧电信技术有限公司',
'西安万思微电子有限公司',
'西安和记奥普泰通信技术有限公司',
'西北工业大学航空微电子中心',
'西安科大华成电子股份有限公司',
'西安北斗星数码信息有限公司',
'西安启圣科技有限责任公司',
'西安西电捷通无线网络通信有限公司',
'西安华泰集成电路设计中心',
'富微科技有限公司',
'西安德智科技有限公司',
'西安德恒科技有限公司',
'西安开元微电子科技股份有限公司',
'陕西航天意德高科技产业有限公司',
'西安蓝启科技有限责任公司',
'西安秦芯科技有限公司',
'西安大唐电信有限公司ＩＣ设计部',
'西安集成电路设计专业孵化器',
'成都国腾微电子有限公司',
'绵阳凯路微电子有限公司',
'四川南山之桥微电子有限公司',
'成都登巅科技有限公司',
'成都天锐电子科技有限公司',
'成都威斯达芯片有限责任公司',
'中国电子工程设计院西南分院',
'信息产业电子第十一设计研究院有限公司',
'成都华微电子系统有限公司',
]
let terminalList= ['GT1100','IDP-782','CT3000','ST6100']
let stateList= ['已激活']
let runStateList= ['启用','停用','故障']
let accountTypeList= ['主账号','子账号']
let channelTypeList= ['中国电信','AT&T','Inmarsat IDP','ORBCOMM','Vodafone']
let operatorTypeList= ['中国电信','中国联通','中国移动']
let comboTypeList= ['套餐一','套餐二','套餐三','套餐四','套餐五','套餐六']

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    username: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    // createTime: Mock.Random.datetime(),
    income: Mock.Random.float(0, 9999, 2,2),
    pay: Mock.Random.float(-5999, 0, 2,2),
    accoutCash: Mock.Random.float(0, 9999, 2,2),
    'incomePayType|1': typelist,
    sortnum: i + 1,
    createTime: Mock.Random.datetime(),
    updateTime: Mock.Random.now(),
    ip:Mock.mock('@ip'),
    region:Mock.mock('@region'),
    areaId:/\d{7}/,
    email: Mock.Random.email(),
    'isp|1': typelist,
    'company|1': companyList,
    'accountType|1': accountTypeList,
    'channelType|1': channelTypeList,
    'operatorType|1': operatorTypeList,
    companyIndex: /\d{7}/,
    accountIndex: /\d{15}/,
    deviceId: /\d{12}/,
    tel: /1\d{10}/,
    'module|1':modulesList,
    moduleAmount: /\d{3}/,
    moduleAmount1: /\d{2}/,
    'terminal|1':terminalList,
    'state|1': stateList,
    'runState|1': runStateList,
    'accountType_company':/NTS_\d{8}/,
    'comboType|1':comboTypeList,
    orderId: /201912\d{5}/
  }))
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  
  getMoneyList: config => {
    const { name, page = 1, limit = 20 } = mUtils.param2Obj(config.url)
    const mockList = List.filter(user => {
      if (name && user.company.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        total: mockList.length,
        moneyList: pageList
      }
    }
  },

  getUserList: config => {
    const { name, page = 1, limit = 12 } = mUtils.param2Obj(config.url)
    // console.log(config.url);
    const userList = List.filter(user => {
      if (name && user.company.indexOf(name) === -1) return false
      return true
    })
    const pageList = userList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        total: userList.length,
        userList: pageList
      }
    }
  },

  /**
   * 增加资金信息
   * @param username, address, createTime, income, pay , accoutCash, incomePayType
   * @return {{code: number, data: {message: string}}}
   */
  createMoney: config => {
    const { username, address, income, pay , accoutCash, incomePayType } = mUtils.param2Obj(config.url)
    List.push({
      id: Mock.Random.guid(),
      username: username,
      address: address,
      createTime: Mock.Random.now(),
      income: income,
      pay: pay,
      accoutCash: accoutCash,
      incomePayType: incomePayType
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteMoney: config => {
    const { id } = mUtils.param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        data: {
          message: '删除成功'
        }
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremoveMoney: config => {
    // console.log(config);
    // console.log(mUtils.param2Obj(config.url));
    let { ids } = mUtils.param2Obj(config.url)
    // console.log(ids);
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 200,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateMoney: config => {
    const { id,username, address, income, pay , accoutCash, incomePayType } = mUtils.param2Obj(config.url)
    List.some(u => {
      if (u.id === id) {
        u.username = username
        u.address = address
        u.income = income
        u.pay = pay
        u.accoutCash = accoutCash
        u.incomePayType = incomePayType

        // u.createTime= createTime,
        // u.updateTime= updateTime,
        // u.ip= ip,
        // u.region= region,
        // u.areaId= areaId,
        // u.email= email,
        // u.company= company,
        // u.companyIndex= companyIndex,
        // u.tel= tel
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
}