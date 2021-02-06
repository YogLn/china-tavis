const dataPro = {
  AccidentPatternOpt: [
    {
      value: '人与汽车相撞',
      label: '人与汽车相撞',
    },
    {
      value: '非机动二/三轮车与汽车相撞',
      label: '非机动二/三轮车与汽车相撞',
    },
    {
      value: '机动二/三轮车与汽车相撞',
      label: '机动二/三轮车与汽车相撞',
    },
    {
      value: '汽车单车事故',
      label: '汽车单车事故',
    },
    {
      value: '汽车撞静止车辆',
      label: '汽车撞静止车辆',
    },
    {
      value: '汽车与汽车正面相撞',
      label: '汽车与汽车正面相撞',
    },
    {
      value: '汽车与汽车侧面相撞',
      label: '汽车与汽车侧面相撞',
    },
    {
      value: '汽车与汽车尾随相撞',
      label: '汽车与汽车尾随相撞',
    },
    {
      value: '汽车与汽车相对刮撞',
      label: '汽车与汽车相对刮撞',
    },
    {
      value: '汽车与汽车同向刮撞',
      label: '汽车与汽车同向刮撞',
    },
    {
      value: '特殊事故形态',
      label: '特殊事故形态',
    },
  ],
  AccidentClassOpt: [
    {
      value: '轻微事故',
      label: '轻微事故',
    },
    {
      value: '一般事故',
      label: '一般事故',
    },
    {
      value: '重大事故',
      label: '重大事故',
    },
    {
      label: '特大事故',
      value: '特大事故',
    },
  ],
  // 障碍物类型
  obstacleType: [
    {
      value: '无',
      label: '无',
    },
    {
      value: '中央隔离带',
      label: '中央隔离带',
    },
    {
      value: '路边树木、路灯杆',
      label: '路边树木、路灯杆',
    },
    {
      value: '路上放置的牌子（如广告牌、施工警示牌等）',
      label: '路上放置的牌子（如广告牌、施工警示牌等）',
    },
    {
      value: '路上的施工围栏',
      label: '路上的施工围栏',
    },
    {
      value: '路上固定建筑物',
      label: '路上固定建筑物',
    },
    {
      value: '路上临时建筑物',
      label: '路上临时建筑物',
    },
    {
      value: '动态障碍物（移动车辆）',
      label: '动态障碍物（移动车辆）',
    },
    {
      value: '999-未知',
      label: '999-未知',
    },
  ],
  // 视频类型
  videoType: [
    {
      value: '道路监控视频',
      label: '道路监控视频',
    },
    {
      value: '行车记录仪视频',
      label: '行车记录仪视频',
    },
    {
      value: '道路监控视频+行车记录仪视频',
      label: '道路监控视频+行车记录仪视频',
    },
    {
      value: '其他监控视频',
      label: '其他监控视频',
    },
  ],
  // 参与方一视角下参与方二的行驶（走）方向
  PartTrendOPt: [
    {
      value: '1点钟方向',
      label: '1点钟方向',
    },
    {
      value: '2点钟方向',
      label: '2点钟方向',
    },
    {
      value: '3点钟方向',
      label: '3点钟方向',
    },
    {
      value: '4点钟方向',
      label: '4点钟方向',
    },
    {
      value: '5点钟方向',
      label: '5点钟方向',
    },
    {
      value: '6点钟方向',
      label: '6点钟方向',
    },
    {
      value: '7点钟方向',
      label: '7点钟方向',
    },
    {
      value: '8点钟方向',
      label: '8点钟方向',
    },
    {
      value: '9点钟方向',
      label: '9点钟方向',
    },
    {
      value: '10点钟方向',
      label: '10点钟方向',
    },
    {
      value: '11点钟方向',
      label: '11点钟方向',
    },
    {
      value: '12点钟方向',
      label: '12点钟方向',
    },
    {
      value: '碰撞前已摔倒在地面',
      label: '碰撞前已摔倒在地面',
    },
    {
      value: '000-不适用',
      label: '000-不适用',
    },
  ],
  // 道路信息
  roadInfo: [
    {
      value: '三枝分叉口',
      label: '三枝分叉口',
    },
    {
      value: '四枝分叉口',
      label: '四枝分叉口',
    },
    {
      value: '多枝分叉口',
      label: '多枝分叉口',
    },
    {
      value: '环形交叉',
      label: '环形交叉',
    },
    {
      value: '匝道口',
      label: '匝道口',
    },
    {
      value: '普通路段',
      label: '普通路段',
    },
    {
      value: '高架路段',
      label: '高架路段',
    },
    {
      value: '变窄路段',
      label: '变窄路段',
    },
    {
      value: '窄路',
      label: '窄路',
    },
    {
      value: '桥梁',
      label: '桥梁',
    },
    {
      value: '隧道',
      label: '隧道',
    },
    {
      value: '路段进出处',
      label: '路段进出处',
    },
    {
      value: '路侧险要路段',
      label: '路侧险要路段',
    },
    {
      value: '其他特殊路段',
      label: '其他特殊路段',
    },
  ],
  // 天气信息
  weather: [
    {
      value: '晴',
      label: '晴',
    },
    {
      value: '阴',
      label: '阴',
    },
    {
      value: '雨',
      label: '雨',
    },
    {
      value: '雪',
      label: '雪',
    },
    {
      value: '雾',
      label: '雾',
    },
    {
      value: '大风',
      label: '大风',
    },
    {
      value: '沙尘',
      label: '沙尘',
    },
    {
      value: '冰雹',
      label: '冰雹',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
  ],
  // 太阳光线
  sunRays: [
    {
      value: '000-不适用',
      label: '000-不适用',
    },
    {
      value: '太阳光线较强',
      label: '太阳光线较强',
    },
    {
      value: '太阳光线一般',
      label: '太阳光线一般',
    },
    {
      value: '太阳光线较弱',
      label: '太阳光线较弱',
    },
  ],
  // 雾霾天能见度
  visibility: [
    {
      value: '000-不适用',
      label: '000-不适用',
    },
    {
      value: '小于50米（强浓雾）',
      label: '小于50米（强浓雾）',
    },
    {
      value: '小于200米（浓雾）',
      label: '小于200米（浓雾）',
    },
    {
      value: '小于500米（大雾）',
      label: '小于500米（大雾）',
    },
    {
      value: '小于1000米（雾）',
      label: '小于1000米（雾）',
    },
    {
      value: '1-10公里（轻雾）',
      label: '1-10公里（轻雾）',
    },
    {
      value: '999-未知',
      label: '999-未知',
    },
  ],
  // 照明情况
  illumination: [
    {
      value: '良好',
      label: '良好',
    },
    {
      value: '差，对事故产生一定影响',
      label: '差，对事故产生一定影响',
    },
    {
      value: '999-未知',
      label: '999-未知',
    },
  ],
  options6005: [
    {
      value: '1',
      label: '1'
    },
    {
      value: '2',
      label: '2'
    },
    {
      value: '3',
      label: '3'
    },
    {
      value: '4',
      label: '4'
    },
    {
      value: '5',
      label: '5'
    },
    {
      value: '6',
      label: '6'
    },
    {
      value: '7',
      label: '7'
    },
    {
      value: '8',
      label: '8'
    },
    {
      value: '9',
      label: '9'
    },
    {
      value: '10',
      label: '10'
    },
    {
      value: '11',
      label: '11'
    },
    {
      value: '12',
      label: '12'
    },
    {
      value: '13',
      label: '13'
    },
    {
      value: '14',
      label: '14'
    },
    {
      value: '15',
      label: '15'
    },
    {
      value: '16',
      label: '16'
    },
    {
      value: '17',
      label: '17'
    },
    {
      value: '18',
      label: '18'
    },
    {
      value: '19',
      label: '19'
    },
    {
      value: '20',
      label: '20'
    },
    {
      value: '000-不适用',
      label: '000-不适用'
    },
  ],
  // 非机动车道
  nonMotorizedLane: [
    {
      value: '无',
      label: '无',
    },
    {
      value: '仅当前车道侧',
      label: '仅当前车道侧',
    },
    {
      value: '仅对向车道侧',
      label: '仅对向车道侧',
    },
    {
      value: '两侧均有',
      label: '两侧均有',
    },
  ],
  //  道路横截面轮廓
  crossSectionProfile: [
    {
      value: '没有横向的倾斜',
      label: '没有横向的倾斜',
    },
    {
      value: '拱形',
      label: '拱形',
    },
    {
      value: '向一侧横向倾斜',
      label: '向一侧横向倾斜',
    },
    {
      value: '888-其它',
      label: '888-其他',
    },
  ],
  // 对向机动车道隔离形式
  isolationForm: [
    {
      value: '没有隔离',
      label: '没有隔离',
    },
    {
      value: '单虚线',
      label: '单虚线',
    },
    {
      value: '单实线',
      label: '单实线',
    },
    {
      value: '双实线',
      label: '双实线',
    },
    {
      value: '中央绿化带',
      label: '中央绿化带',
    },
    {
      value: '隔离栅栏',
      label: '隔离栅栏',
    },
    {
      value: '单向道',
      label: '单向道',
    },
    {
      value: '石墩隔离',
      label: '石墩隔离',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
  ],
  // 本侧机非车道隔离形式
  isolationForm2: [
    {
      value: '单虚线',
      label: '单虚线',
    },
    {
      value: '单实线',
      label: '单实线',
    },
    {
      value: '绿化带',
      label: '绿化带',
    },
    {
      value: '护栏',
      label: '护栏',
    },
    {
      value: '石墩隔离',
      label: '石墩隔离',
    },
    {
      value: '提示杆',
      label: '提示杆',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
    {
      value: '000-不适用',
      label: '000-不适用',
    },
  ],
  // 现场有何种交通警告标志
  warningSign: [
    {
      value: '没有',
      label: '没有',
    },
    {
      value: '交叉路口',
      label: '交叉路口',
    },
    {
      value: '急弯口',
      label: '急弯口',
    },
    {
      value: '反向弯路',
      label: '反向弯路',
    },
    {
      value: '连续弯路',
      label: '连续弯路',
    },
    {
      value: '陡坡',
      label: '陡坡',
    },
    {
      value: '连续下坡',
      label: '连续下坡',
    },
    {
      value: '窄路',
      label: '窄路',
    },
    {
      value: '窄桥',
      label: '窄桥',
    },
    {
      value: '双向交通',
      label: '双向交通',
    },
    {
      value: '注意行人',
      label: '注意行人',
    },
    {
      value: '注意儿童',
      label: '注意儿童',
    },
    {
      value: '注意牲畜',
      label: '注意牲畜',
    },
    {
      value: '注意野生动物',
      label: '注意野生动物',
    },
    {
      value: '注意信号灯',
      label: '注意信号灯',
    },
    {
      value: '注意落石',
      label: '注意落石',
    },
    {
      value: '注意横风',
      label: '注意横风',
    },
    {
      value: '易滑',
      label: '易滑',
    },
    {
      value: '傍山险路',
      label: '傍山险路',
    },
    {
      value: '堤坝路',
      label: '堤坝路',
    },
    {
      value: '村庄',
      label: '村庄',
    },
    {
      value: '隧道',
      label: '隧道',
    },
    {
      value: '渡口',
      label: '渡口',
    },
    {
      value: '驼峰桥',
      label: '驼峰桥',
    },
    {
      value: '路面不平',
      label: '路面不平',
    },
    {
      value: '路面突高',
      label: '路面突高',
    },
    {
      value: '路面低洼',
      label: '路面低洼',
    },
    {
      value: '过水路面',
      label: '过水路面',
    },
    {
      value: '有人看守铁道口',
      label: '有人看守铁道口',
    },
    {
      value: '无人看守铁道口',
      label: '无人看守铁道口',
    },
    {
      value: '叉形符号',
      label: '叉形符号',
    },
    {
      value: '斜杠符号',
      label: '斜杠符号',
    },
    {
      value: '注意非机动车',
      label: '注意非机动车',
    },
    {
      value: '注意残疾人',
      label: '注意残疾人',
    },
    {
      value: '事故易发路段',
      label: '事故易发路段',
    },
    {
      value: '慢行',
      label: '慢行',
    },
    {
      value: '注意障碍物',
      label: '注意障碍物',
    },
    {
      value: '注意危险',
      label: '注意危险',
    },
    {
      value: '施工',
      label: '施工',
    },
    {
      value: '建议速度',
      label: '建议速度',
    },
    {
      value: '隧道开车灯',
      label: '隧道开车灯',
    },
    {
      value: '注意潮汐车道',
      label: '注意潮汐车道',
    },
    {
      value: '注意保持车距',
      label: '注意保持车距',
    },
    {
      value: '注意分离式道路',
      label: '注意分离式道路',
    },
    {
      value: '注意合流',
      label: '注意合流',
    },
    {
      value: '避险车道',
      label: '避险车道',
    },
    {
      value: '注意路面结冰、注意雨(雪)天、注意雾天、注意不利气象条件',
      label: '注意路面结冰、注意雨(雪)天、注意雾天、注意不利气象条件',
    },
    {
      value: '注意前方车辆排队',
      label: '注意前方车辆排队',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
  ],
  prohibitionSign: [
    {
      value: '没有',
      label: '没有',
    },
    {
      value: '交叉路口',
      label: '交叉路口',
    },
    {
      value: '急弯口',
      label: '急弯口',
    },
    {
      value: '反向弯路',
      label: '反向弯路',
    },
    {
      value: '续弯路',
      label: '续弯路',
    },
    {
      value: '陡坡',
      label: '陡坡',
    },
    {
      value: '连续下坡',
      label: '连续下坡',
    },
    {
      value: '窄路',
      label: '窄路',
    },
    {
      value: '窄桥',
      label: '窄桥',
    },
    {
      value: '双向交通',
      label: '双向交通',
    },
    {
      value: '注意行人',
      label: '注意行人',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
  ],
  // 现场有何种交通禁令标志
  trafficProhibitionSign: [
    {
      value: '没有',
      label: '没有',
    },
    {
      value: '停车让行',
      label: '停车让行',
    },
    {
      value: '减速让行',
      label: '减速让行',
    },
    {
      value: '会车让行',
      label: '会车让行',
    },
    {
      value: '禁止通行',
      label: '禁止通行',
    },
    {
      value: '禁止驶入',
      label: '禁止驶入',
    },
    {
      value: '禁止机动车驶入',
      label: '禁止机动车驶入',
    },
    {
      value: '禁止载货汽车驶入',
      label: '禁止载货汽车驶入',
    },
    {
      value: '禁止电动三轮车驶入',
      label: '禁止电动三轮车驶入',
    },
    {
      value: '禁止大型客车驶入',
      label: '禁止大型客车驶入',
    },
    {
      value: '禁止小型客车驶入',
      label: '禁止小型客车驶入',
    },
    {
      value: '禁止挂车、半挂车驶入',
      label: '禁止挂车、半挂车驶入',
    },
    {
      value: '禁止拖拉机驶入.',
      label: '禁止拖拉机驶入',
    },
    {
      value: '禁止三轮汽车、低速货车驶入',
      label: '禁止三轮汽车、低速货车驶入',
    },
    {
      value: '禁止摩托车驶入',
      label: '禁止摩托车驶入',
    },
    {
      value: '禁止某两种车驶入',
      label: '禁止某两种车驶入',
    },
    {
      value: '禁止非机动车进入',
      label: '禁止非机动车进入',
    },
    {
      value: '禁止畜力车进入.',
      label: '禁止畜力车进入',
    },
    {
      value: '禁止人力客运三轮车进入',
      label: '禁止人力客运三轮车进入',
    },
    {
      value: '禁止人力货运三轮车进入.',
      label: '禁止人力货运三轮车进入',
    },
    {
      value: '禁止人力车进入',
      label: '禁止人力车进入',
    },
    {
      value: '禁止行人进入',
      label: '禁止行人进入',
    },
    {
      value: '禁止向左转弯',
      label: '禁止向左转弯',
    },
    {
      value: '禁止向右转弯.',
      label: '禁止向右转弯',
    },
    {
      value: '禁止直行',
      label: '禁止直行',
    },
    {
      value: '禁止向左向右转弯',
      label: '禁止向左向右转弯',
    },
    {
      value: '禁止直行和向左转弯',
      label: '禁止直行和向左转弯',
    },
    {
      value: '禁止直行和向右转弯',
      label: '禁止直行和向右转弯',
    },
    {
      value: '禁止掉头.',
      label: '禁止掉头',
    },
    {
      value: '禁止超车',
      label: '禁止超车',
    },
    {
      value: '解除禁止超车.',
      label: '解除禁止超车',
    },
    {
      value: '禁止停车',
      label: '禁止停车',
    },
    {
      value: '禁止长时停车',
      label: '禁止长时停车',
    },
    {
      value: '禁止鸣喇叭',
      label: '禁止鸣喇叭',
    },
    {
      value: '限制宽度',
      label: '限制宽度',
    },
    {
      value: '限制高度',
      label: '限制高度',
    },
    {
      value: '限制质量',
      label: '限制质量',
    },
    {
      value: '限制轴重',
      label: '限制轴重',
    },
    {
      value: '限制速度',
      label: '限制速度',
    },
    {
      value: '解除限制速度',
      label: '解除限制速度',
    },
    {
      value: '停车检查',
      label: '停车检查',
    },
    {
      value: '禁止运输危险物品车辆驶入',
      label: '禁止运输危险物品车辆驶入',
    },
    {
      value: '海关',
      label: '海关',
    },
    {
      value: '区域限制速度',
      label: '区域限制速度',
    },
    {
      value: '区城限制速度解除',
      label: '区城限制速度解除',
    },
    {
      value: '区域禁止长时停车',
      label: '区域禁止长时停车',
    },
    {
      value: '区域禁止长时停车解除',
      label: '区域禁止长时停车解除',
    },
    {
      value: '区域禁止停车',
      label: '区域禁止停车',
    },
    {
      value: '区域禁止停车解除',
      label: '区域禁止停车解除',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
  ],
  // 道路的线形
  roadLinearity: [
    {
      value: '平直',
      label: '平直',
    },
    {
      value: '一般弯',
      label: '一般弯',
    },
    {
      value: '一般坡',
      label: '一般坡',
    },
    {
      value: '急弯',
      label: '急弯',
    },
    {
      value: '陡坡',
      label: '陡坡',
    },
    {
      value: '连续下坡',
      label: '连续下坡',
    },
    {
      value: '一般弯坡',
      label: '一般弯坡',
    },
    {
      value: '急弯陡坡',
      label: '急弯陡坡',
    },
    {
      value: '一般坡急弯',
      label: '一般坡急弯',
    },
    {
      value: '一般弯陡坡',
      label: '一般弯陡坡',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
  ],
  // 沿道路方向的趋势
  roadTrend: [
    {
      value: '平坦的',
      label: '平坦的',
    },
    {
      value: '上升',
      label: '上升',
    },
    {
      value: '下降',
      label: '下降',
    },
  ],
  // 路面材料
  roadMaterial: [
    {
      value: '沥青',
      label: '沥青',
    },
    {
      value: '水泥',
      label: '水泥',
    },
    {
      value: '沙石',
      label: '沙石',
    },
    {
      value: '土路',
      label: '土路',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
  ],
  // 道路表面污染
  roadPollution: [
    {
      value: '否',
      label: '否',
    },
    {
      value: '油',
      label: '油',
    },
    {
      value: '燃料',
      label: '燃料',
    },
    {
      value: '污垢',
      label: '污垢',
    },
    {
      value: '石头',
      label: '石头',
    },
    {
      value: '掉落的货物',
      label: '掉落的货物',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
  ],
  // 路表潮湿度
  roadHumidity: [
    {
      value: '干',
      label: '干',
    },
    {
      value: '湿',
      label: '湿',
    },
    {
      value: '冰冻',
      label: '冰冻',
    },
    {
      value: '积雪',
      label: '积雪',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
  ],
  // 路面情况
  roadCondition: [
    {
      value: '平坦',
      label: '平坦',
    },
    {
      value: '有凹槽，如车辙等',
      label: '有凹槽，如车辙等',
    },
    {
      value: '排水槽',
      label: '排水槽',
    },
    {
      value: '松动的路表',
      label: '松动的路表',
    },
    {
      value: '搓衣板状',
      label: '搓衣板状',
    },
    {
      value: '坑洼',
      label: '坑洼',
    },
    {
      value: '波浪状',
      label: '波浪状',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
  ],
  // 交通标志是否被阻挡不可见
  trafficSignIsBlocked: [
    {
      value: '无交通标志',
      label: '无交通标志',
    },
    {
      value: '否',
      label: '否',
    },
    {
      value: '是，因为植物',
      label: '是，因为植物',
    },
    {
      value: '是，因为建筑',
      label: '是，因为建筑',
      label: '是，因为建筑',
    },
    {
      value: '是，因为车辆',
      label: '是，因为车辆',
    },
    {
      value: '是，因为天气',
      label: '是，因为天气',
    },
    {
      value: '888-是，其他',
      label: '888-是，其他',
    },
  ],
  // 路口信号灯
  roadSignal: [
    {
      value: '没有',
      label: '没有',
    },
    {
      value: '仅有直行信号灯',
      label: '仅有直行信号灯',
    },
    {
      value: '既有直行信号灯，又有转弯信号灯',
      label: '既有直行信号灯，又有转弯信号灯',
    },
  ],
  // 路灯是否开启
  roadSignalLight: [
    {
      value: '无路灯',
      label: '无路灯',
    },
    {
      value: '有，点亮',
      label: '有，点亮',
    },
    {
      value: '有，关闭',
      label: '有，关闭',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
    {
      value: '000-不适用',
      label: '000-不适用',
    },
  ],
  // 路灯的密度
  streetLightDensity: [
    {
      value: '无稀少的路灯路灯',
      label: '稀少的路灯',
    },
    {
      value: '成列的路灯',
      label: '成列的路灯',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
    {
      value: '000-不适用',
      label: '000-不适用',
    },
  ],
  // 是否有轨道
  isTrack: [
    {
      value: '无',
      label: '无',
    },
    {
      value: '有，沿着道路方向',
      label: '有，沿着道路方向',
    },
    {
      value: '有，横穿道路的方向',
      label: '有，横穿道路的方向',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
  ],
  // 影响视线的障碍物
  obstacleAffectingSight: [
    {
      value: '无',
      label: '无',
    },
    {
      value: '有，非长期性(比如汽车)',
      label: '有，非长期性(比如汽车)',
    },
    {
      value: '有，长期性(比如建筑物、绿化等)',
      label: '有，长期性(比如建筑物、绿化等)',
    },
    {
      value: '888-其他',
      label: '888-其他',
    }
  ],
  // 道路状况评估
  roadConditionAssessment: [
    {
      value: '状况良好',
      label: '状况良好',
    },
    {
      value: '差，对交通有影响',
      label: '差，对交通有影响',
    },
    {
      value: '差，对交通无影响',
      label: '差，对交通无影响',
    },
    {
      value: '888-其他',
      label: '888-其他',
    }
  ],
  // 是否有建筑设施
  buildingFacilities: [
    {
      value: '没有',
      label: '没有',
    },
    {
      value: '因有建筑工地路面变窄',
      label: '因有建筑工地路面变窄',
    },
    {
      value: '因建筑工地而改变道路路线',
      label: '因建筑工地而改变道路路线',
    },
    {
      value: '888-其他',
      label: '888-其他',
    }
  ],
  // 交通限速设施
  TraSpeedLimitFac: [
    {
      value: '没有',
      label: '没有',
    },
    {
      value: '单一凸起减速带',
      label: '单一凸起减速带',
    },
    {
      value: '密集凸起圆点减速带',
      label: '密集凸起圆点减速带',
    },
    {
      value: '只有限速标志',
      label: '只有限速标志',
    },
    {
      value: '888-其他',
      label: '888-其他',
    }
  ],
  // 车辆是否冲到相应路边
  rushRoadSide: [
    {
      value: '否',
      label: '否',
    },
    {
      value: '是',
      label: '是',
    },
    {
      value: '000-不适用',
      label: '000-不适用',
    }
  ],
  // 是否为变宽路段
  wideningSection: [
    {
      value: '否',
      label: '否',
    },
    {
      value: '是',
      label: '是',
    },
    {
      value: '999-未知',
      label: '999-未知',
    }
  ],
  // 是否有为变窄路段
  narrowingSection: [
    {
      value: '否',
      label: '否',
    },
    {
      value: '是',
      label: '是',
    },
    {
      value: '999-未知',
      label: '999-未知',
    }
  ],
  // 是否有隧道和匝道口
  tunnel: [
    {
      value: '否',
      label: '否',
    },
    {
      value: '是',
      label: '是',
    },
    {
      value: '999-未知',
      label: '999-未知',
    }
  ],

  // 参与方信息---车
  // 类型（车辆类型）
  carType: [
    {
      value: '乘用车',
      label: '乘用车'
    },
    {
      value: '客车',
      label: '客车'
    },
    {
      value: '货车',
      label: '货车'
    },
    {
      value: '半挂牵引车',
      label: '半挂牵引车'
    },
    {
      value: '半挂牵引车及挂车',
      label: '半挂牵引车及挂车'
    },
    {
      value: '拖拉机运输机组',
      label: '拖拉机运输机组'
    },
    {
      value: '轮式专用机械',
      label: '轮式专用机械'
    }
  ],
  // 是否有EDR报告
  EDR: [
    {
      value: '是',
      label: '是'
    },
    {
      value: '否',
      label: '否'
    },
  ],
  // 车辆损坏情况
  carDamage: [
    {
      value: '无损坏',
      label: '无损坏'
    },
    {
      value: '轻微刮擦',
      label: '轻微刮擦'
    }, {
      value: '轻微变形',
      label: '轻微变形'
    },
    {
      value: '局部明显变形',
      label: '局部明显变形'
    }, {
      value: '大面积严重变形',
      label: '大面积严重变形'
    },
    {
      value: '报废',
      label: '报废'
    }, {
      value: '烧毁',
      label: '烧毁'
    },
    {
      value: '888-其他',
      label: '888-其他'
    },
  ],
  // 3008车内人员伤亡情况
  casualties: [
    {
      value: '有人员死亡',
      label: '有人员死亡'
    }, {
      value: '仅受伤',
      label: '仅受伤'
    },
    {
      value: '未受伤',
      label: '未受伤'
    }, {
      value: '999-未知',
      label: '999-未知'
    }
  ],
  // 参与方颜色（车辆颜色）
  carColor: [
    {
      value: '黄色',
      label: '黄色'
    },
    {
      value: '橙色',
      label: '橙色'
    },
    {
      value: '红色',
      label: '红色'
    },
    {
      value: '紫色',
      label: '紫色'
    },
    {
      value: '蓝色',
      label: '蓝色'
    },
    {
      value: '绿色',
      label: '绿色'
    },
    {
      value: '灰色',
      label: '灰色'
    },
    {
      value: '棕色',
      label: '棕色'
    },
    {
      value: '白色',
      label: '白色'
    },
    {
      value: '黑色',
      label: '黑色'
    },
    {
      value: '银色',
      label: '银色'
    },
    {
      value: '香槟色',
      label: '香槟色'
    },
    {
      value: '888-其他',
      label: '888-其他'
    },
    {
      value: '000-不适用',
      label: '000-不适用'
    }
  ],
  // 主要过错1
  majorFault1: [
  {
    value: '无过失',
    label: '无过失',
  },
  {
    value: '非机动车违法',
    label: '非机动车违法',
  },
  {
    value: '道路原因',
    label: '道路原因',
  },
  {
    value: '意外',
    label: '意外',
    
  },
  {
    value: '其他',
    label: '其他',
  }
  ],
  // 优先权
  priority: [
    {
      value: '有',
      label: '有'
    },
    {
      value: '没有',
      label: '没有'
    },
  ],
  // 所在道路方向
  roadDirection: [
    {
      value: '停着不动',
      label: '停着不动'
    },
    {
      value: '直线',
      label: '直线'
    },
    {
      value: '左转曲线',
      label: '左转曲线'
    },
    {
      value: '右转曲线',
      label: '右转曲线'
    },
    {
      value: 'S型曲线',
      label: 'S型曲线'
    }
  ],
  options3017: [
    {
      value: '无过失',
      label: '无过失',
    },
    {
      value: '机动车违法',
      label: '机动车违法',
    },
    {
      value: '机动车非违法过错',
      label: '机动车非违法过错',
    },
    {
      value: '非机动车违法',
      label: '非机动车违法',
      
    },
    {
      value: '行人及乘车人违法',
      label: '行人及乘车人违法',
    },
    {
      value: '道路原因',
      label: '道路原因',
    },
    {
      value: '意外',
      label: '意外',
    },
    {
      value: '其他',
      label: '其他',
    }
  ],
  options30181: [
    {
      value: '000-无过失',
      label: '000-无过失',
    }
  ],
  options30182: [
    {
      value: '超速行驶',
      label: '超速行驶'
    },
    {
      value: '酒后驾驶',
      label: '酒后驾驶'
    },
    {
      value: '逆向行驶',
      label: '逆向行驶'
    },
    {
      value: '疲劳驾驶',
      label: '疲劳驾驶'
    },
    {
      value: '违法变更车道',
      label: '违法变更车道'
    },
    {
      value: '违法超车',
      label: '违法超车'
    },
    {
      value: '违法倒车',
      label: '违法倒车'
    },
    {
      value: '违法掉头',
      label: '违法掉头'
    },
    {
      value: '违法会车',
      label: '违法会车'
    },
    {
      value: '违法牵引',
      label: '违法牵引'
    },
    {
      value: '违法抢行',
      label: '违法抢行'
    },
    {
      value: '违法上道路行驶',
      label: '违法上道路行驶'
    },
    {
      value: '违法停车',
      label: '违法停车'
    },
    {
      value: '违法占道行驶',
      label: '违法占道行驶'
    },
    {
      value: '违法装载',
      label: '违法装载'
    },
    {
      value: '违法装载超限及危险品运输',
      label: '违法装载超限及危险品运输'
    },
    {
      value: '违反交通信号',
      label: '违反交通信号'
    },
    {
      value: '未按规定让行',
      label: '未按规定让行'
    },
    {
      value: '无证驾驶',
      label: '无证驾驶'
    },
    {
      value: '不按规定使用灯光',
      label: '不按规定使用灯光'
    },
    {
      value: '其他影响安全行为',
      label: '其他影响安全行为'
    },
    {
      value: '未保持安全车距离',
      label: '未保持安全车距离'
    },
  ],
  options30183: [
    {
      value: '制动不当',
      label: '制动不当'
    },
    {
      value: '转向不当',
      label: '转向不当'
    },
    {
      value: '油门控制不当',
      label: '油门控制不当'
    },
    {
      value: '其他操作不当',
      label: '其他操作不当'
    },
  ],
  options30184: [
    {
      value: '超速行驶',
      label: '超速行驶'
    },
    {
      value: '酒后驾驶',
      label: '酒后驾驶'
    },
    {
      value: '逆向行驶',
      label: '逆向行驶'
    },
    {
      value: '违法超车',
      label: '违法超车'
    },
    {
      value: '违法牵引',
      label: '违法牵引'
    },
    {
      value: '违法抢行',
      label: '违法抢行'
    },
    {
      value: '违法上道路行驶',
      label: '违法上道路行驶'
    },
    {
      value: '违法停车',
      label: '违法停车'
    },
    {
      value: '违法占道行驶',
      label: '违法占道行驶'
    },
    {
      value: '违法装载',
      label: '违法装载'
    },
    {
      value: '违反交通信号',
      label: '违反交通信号'
    },
    {
      value: '违反交通信号',
      label: '违反交通信号'
    },
    {
      value: '无证驾驶',
      label: '无证驾驶'
    },
    {
      value: '其他影响安全行为',
      label: '其他影响安全行为'
    }
  ],
  options30185: [
    {
      value: '违法上道路行驶',
      label: '违法上道路行驶'
    },
    {
      value: '违法占道',
      label: '违法占道'
    },
    {
      value: '违法装载超限及危险品运输',
      label: '违法装载超限及危险品运输'
    },
    {
      value: '违反交通信号',
      label: '违反交通信号'
    },
    {
      value: '其他影响安全行为',
      label: '其他影响安全行为'
    },
  ],
  options30186: [
    {
      value: '未设置道路安全措施',
      label: '未设置道路安全措施'
    },
    {
      value: '安全设施损坏灭失',
      label: '安全设施损坏灭失'
    },
    {
      value: '道路缺陷',
      label: '道路缺陷'
    },
    {
      value: '其他道路原因',
      label: '其他道路原因'
    },
  ],
  options30187: [
    {
      value: '自然灾害',
      label: '自然灾害'
    },
    {
      value: '机件故障',
      label: '机件故障'
    },
    {
      value: '爆胎',
      label: '爆胎'
    },
    {
      value: '其他意外',
      label: '其他意外'
    },
  ],
  options30188: [
    {
      value: '888-其他',
      label: '888-其他'
    },
    {
      value: '999-未知',
      label: '999-未知'
    }
  ],
  // 3021事故前车辆要避撞的对向
  options3021: [
    {
      value: '道路上的物品',
      label: '道路上的物品'
    },
    {
      value: '极差（极颠簸）的路面',
      label: '极差（极颠簸）的路面'
    },
    {
      value: '道路上的动物',
      label: '道路上的动物'
    },
    {
      value: '道路上的车辆',
      label: '道路上的车辆'
    },
    {
      value: '道路上的非机动车',
      label: '道路上的非机动车'
    },
    {
      value: '道路上的行人',
      label: '道路上的行人'
    },
    {
      value: '其他避撞措施',
      label: '其他避撞措施'
    },
    {
      value: '999-未知',
      label: '999-未知'
    },
    {
      value: '没有避撞措施',
      label: '没有避撞措施'
    }
  ],
  // 3022事故前车辆的避撞行为
  options3022: [
    {
      value: '驾驶员不在场',
      label: '驾驶员不在场'
    },
    {
      value: '没有避撞措施',
      label: '没有避撞措施'
    },
    {
      value: '刹车',
      label: '刹车'
    },
    {
      value: '释放刹车踏板',
      label: '释放刹车踏板'
    },
    {
      value: '转向',
      label: '转向'
    },
    {
      value: '刹车并转向',
      label: '刹车并转向'
    },
    {
      value: '加速',
      label: '加速'
    },
    {
      value: '加速并转向',
      label: '加速并转向'
    },
    {
      value: '其他',
      label: '其他'
    },
    {
      value: '999-未知',
      label: '999-未知'
    }
  ],
  // 3023是否有视野盲区（车外）
  options3023: [
    {
      value: '无',
      label: '无'
    },
    {
      value: '隔离带造成',
      label: '隔离带造成'
    },
    {
      value: '路边树木造成',
      label: '路边树木造成'
    },
    {
      value: '路上放置的牌子（如广告牌、施工牌等）造成',
      label: '路上放置的牌子（如广告牌、施工牌等）造成'
    },
    {
      value: '车外人员造成',
      label: '车外人员造成'
    },
    {
      value: '车外其他车辆造成',
      label: '车外其他车辆造成'
    },
    {
      value: '路上固定建筑物造成',
      label: '路上固定建筑物造成'
    },
    {
      value: '路上临时建筑物造成',
      label: '路上临时建筑物造成'
    },
    {
      value: '888-其他',
      label: '888-其他'
    },
  ],
  // 3026事故发生前车辆运动类型
  options3026: [
    {
      value: '起步',
      label: '起步'
    },
    {
      value: '超车',
      label: '超车'
    },
    {
      value: '掉头',
      label: '掉头'
    },
    {
      value: '倒车',
      label: '倒车'
    },
    {
      value: '向右变道',
      label: '向右变道'
    },
    {
      value: '向左变道',
      label: '向左变道'
    },
    {
      value: '紧急停车',
      label: '紧急停车'
    },
    {
      value: '静止',
      label: '静止'
    },
    {
      value: '泊车中',
      label: '泊车中'
    },
    {
      value: '直行加速',
      label: '直行加速'
    },
    {
      value: '直行减速',
      label: '直行减速'
    },
    {
      value: '匀速直行',
      label: '匀速直行'
    },
    {
      value: '曲线行驶',
      label: '曲线行驶'
    },
    {
      value: '左转',
      label: '左转'
    },
    {
      value: '右转',
      label: '右转'
    },
    {
      value: '888-其他',
      label: '888-其他'
    },
    {
      value: '999-未知',
      label: '999-未知'
    },
  ],
  // 3027开始反应到碰撞前是否采取转向措施
  options3027: [
    {
      value: '是',
      label: '是'
    },
    {
      value: '否',
      label: '否'
    },
    {
      value: '999-未知',
      label: '999-未知'
    },
  ],
  // 3028是否使用安全带
  options3028: [
    {
      value: '是，正确使用',
      label: '是，正确使用'
    },
    {
      value: '是，错误使用',
      label: '是，错误使用'
    },
    {
      value: '未使用',
      label: '未使用'
    },
    {
      value: '999-未知',
      label: '999-未知'
    },
  ],
  // 3029安全气囊是否展开
  options3029: [
    {
      value: '未展开',
      label: '未展开'
    },
    {
      value: '正常展开',
      label: '正常展开'
    },
    {
      value: '异常展开',
      label: '异常展开'
    },
    {
      value: '888-其他',
      label: '888-其他'
    },
  ],
  // 3030是否有行人主动保护装置
  options3030: [
    {
      value: '无',
      label: '无'
    },
    {
      value: '机械控制可抬升的发动机罩',
      label: '机械控制可抬升的发动机罩'
    },
    {
      value: '爆燃式可抬升的发动机罩',
      label: '爆燃式可抬升的发动机罩'
    },
    {
      value: '行人保护气囊',
      label: '行人保护气囊'
    },
    {
      value: '行人保护保险杠',
      label: '行人保护保险杠'
    },
    {
      value: '888-其他',
      label: '888-其他'
    },
    {
      value: '000-不适用',
      label: '000-不适用'
    }
  ],
  // 3031是否有ABS防抱死系统
  // 3032是否有ABS防抱死系统
  // 3033是否有ABS防抱死系统
  // 3034是否有ABS防抱死系统
  optionsTF: [
    {
      value: '无',
      label: '无'
    },
    {
      value: '有',
      label: '有'
    },
    {
      value: '999-未知',
      label: '999-未知'
    }
  ],
  // 3036胎压监测装置
  // 3037胎压监测装置
  // 3038胎压监测装置
  // 3039胎压监测装置
  // 3040胎压监测装置
  // 3041胎压监测装置
  
  options3036: [
    {
      value: '无',
      label: '无'
    },
    {
      value: '有，关闭',
      label: '有，关闭'
    },
    {
      value: '有，开着',
      label: '有，开着'
    },
    {
      value: '有，未知是否使用',
      label: '有，未知是否使用'
    },
    {
      value: '999-未知',
      label: '999-未知'
    },
  ],

  // 参与方基本信息-行人   
  options4002: [
    {
      value: '男性',
      label: '男性'
    },
    {
      value: '女性',
      label: '女性'
    },
    {
      value: '999-未知',
      label: '999-未知'
    }
  ],
  // 4003人员伤亡情况
  options4003: [
    {
      value: '轻伤',
      label: '轻伤'
    },
    {
      value: '重伤',
      label: '重伤'
    },
    {
      value: '死亡',
      label: '死亡'
    },
    {
      value: '未受伤',
      label: '未受伤'
    }
  ],
  // 4005参与方颜色（衣着颜色）
  options4005: [
    {
      value: '黄色',
      label: '黄色'
    },
    {
      value: '橙色',
      label: '橙色'
    },
    {
      value: '红色',
      label: '红色'
    },
    {
      value: '紫色',
      label: '紫色'
    },
    {
      value: '蓝色',
      label: '蓝色'
    },
    {
      value: '绿色',
      label: '绿色'
    },
    {
      value: '灰色',
      label: '灰色'
    },
    {
      value: '棕色',
      label: '棕色'
    },
    {
      value: '白色',
      label: '白色'
    },
    {
      value: '黑色',
      label: '黑色'
    },
    {
      value: '银色',
      label: '银色'
    },
    {
      value: '香槟色',
      label: '香槟色'
    },
    {
      value: '888-其他',
      label: '888-其他'
    },
    {
      value: '000-不适用',
      label: '000-不适用'
    }
  ],
  // 4006黑暗处或夜间衣物可见性 
  options4006: [
    {
      value: '明亮的',
      label: '明亮的'
    },
    {
      value: '深色的/不可见',
      label: '深色的/不可见'
    },
    {
      value: '反光的',
      label: '反光的'
    },
    {
      value: '发光的',
      label: '发光的'
    },
    {
      value: '888-其他',
      label: '888-其他'
    },
    {
      value: '999-未知',
      label: '999-未知'
    },
    {
      value: '000-不适用',
      label: '000-不适用'
    }
  ],
  // 4007事故发生地点（行人被撞地点）
  options4007: [
    {
      value: '人行道',
      label: '人行道'
    },
    {
      value: '非机动车道',
      label: '非机动车道'
    },
    {
      value: '机动车道',
      label: '机动车道'
    },
    {
      value: '高速/高架',
      label: '高速/高架'
    },
    {
      value: '888-其他',
      label: '888-其他'
    }
  ],
  // 4008行人穿越机动车道位置
  options4008: [
    {
      value: '未穿越',
      label: '未穿越'
    },
    {
      value: '有红绿灯处',
      label: '有红绿灯处'
    },
    {
      value: '斑马线处',
      label: '斑马线处'
    },
    {
      value: '行人专用通道',
      label: '行人专用通道'
    },
    {
      value: '未有行人过街保护的机动车正常通行路段',
      label: '未有行人过街保护的机动车正常通行路段'
    },
    {
      value: '888-其他',
      label: '888-其他'
    },
    {
      value: '999-未知',
      label: '999-未知'
    }
  ],
  // 4009行人行走方向 
  options4009: [
    {
      value: '从车辆左侧',
      label: '从车辆左侧'
    },
    {
      value: '从车辆右侧',
      label: '从车辆右侧'
    },
    {
      value: '沿车辆运动方向',
      label: '沿车辆运动方向'
    },
    {
      value: '沿车辆运动反方向',
      label: '沿车辆运动反方向'
    },
    {
      value: '静止',
      label: '静止'
    }
  ],
  // 4010行人运动状态
  options4010: [
    {
      value: '静止',
      label: '静止'
    },
    {
      value: '缓慢步行',
      label: '缓慢步行'
    },
    {
      value: '快速步行',
      label: '快速步行'
    },
    {
      value: '跑步',
      label: '跑步'
    },
    {
      value: '前一次碰撞后非正常运动状态',
      label: '前一次碰撞后非正常运动状态'
    },
    {
      value: '888-其他',
      label: '888-其他'
    },
    {
      value: '999-未知',
      label: '999-未知'
    }
  ],
  // 4012行人被撞部位
  options4012: [
    {
      value: '前方',
      label: '前方'
    },
    {
      value: '后方',
      label: '后方'
    },
    {
      value: '左侧',
      label: '左侧'
    },
    {
      value: '右侧',
      label: '右侧'
    },
    {
      value: '碰撞前跌倒，躺在地上',
      label: '碰撞前跌倒，躺在地上'
    },
    {
      value: '888-其他',
      label: '888-其他'
    }
  ],
  // 碰撞前行人相对于车辆的位置
  options4013: [
    {
      value: '前方',
      label: '前方'
    },
    {
      value: '后方',
      label: '后方'
    },
    {
      value: '左侧',
      label: '左侧'
    },
    {
      value: '右侧',
      label: '右侧'
    }
  ],
  // 4014穿越机动车道时能否被看到
  options4014: [
    {
      value: '可以看见',
      label: '可以看见'
    },
    {
      value: '因停驻的车而看不到',
      label: '因停驻的车而看不到'
    },
    {
      value: '因植物而看不到',
      label: '因植物而看不到'
    },
    {
      value: '因建筑物而看不到',
      label: '因建筑物而看不到'
    },
    {
      value: '888-其他',
      label: '888-其他'
    },
    {
      value: '999-未知',
      label: '999-未知'
    }
  ],
    // 4015是否因为视野盲区造成事故
  // 4016是否由停靠车辆造成行人的视野盲区
  // 4017是否有其他造成行人视线盲区的物体
  // 4018开始反应到碰撞前是否有应急姿态
  // 4019行人是否从障碍物后穿出
  // 4020行人意识到危险之前是否加速
  // 4021事故前行人行走方向是否改变
  options4016: [
    {
      value: '否',
      label: '否'
    },
    {
      value: '是',
      label: '是'
    },
    {
      value: '999-未知',
      label: '999-未知'
    },
  ],
  options5002: [
    {
      value: '机动二轮车/三轮车',
      label: '机动二轮车/三轮车',
      children: [
        {
          value: '电动摩托车',
          label: '电动摩托车',
        },
        {
          value: '电动三轮车',
          label: '电动三轮车',
        },
        {
          value: '摩托车',
          label: '摩托车',
        },
        {
          value: '三轮摩托车',
          label: '三轮摩托车',
        },
      ]
    },
    {
      value: '非机动二轮车/三轮车',
      label: '非机动二轮车/三轮车',
      children: [
        {
          value: '电动自行车',
          label: '电动自行车',
        },
        {
          value: '自行车',
          label: '自行车',
        },
        {
          value: '三轮车',
          label: '三轮车',
        },
      ]
    }
  ],
  options5010: [
    {
      value: '直行',
      label: '直行',
    },
    {
      value: '左转',
      label: '左转',
    },
    {
      value: '右转',
      label: '右转',
    },
  ],
  options5020: [
    {
      value: '是',
      label: '是',
    },
    {
      value: '否',
      label: '否',
    },
    {
      value: '999-未知',
      label: '999-未知',
    },
    {
      value: '000-不适用',
      label: '000-不适用',
    },
  ],
  options5023: [
    {
      value: '掉头',
      label: '掉头',
    },
    {
      value: '向右变道',
      label: '向右变道',
    },
    {
      value: '向左变道',
      label: '向左变道',
    },
    {
      value: '静止',
      label: '静止',
    },
    {
      value: '直线加速',
      label: '直线加速',
    },
    {
      value: '直线减速',
      label: '直线减速',
    },
    {
      value: '匀速直线',
      label: '匀速直线',
    },
    {
      value: '曲线行驶',
      label: '曲线行驶',
    },
    {
      value: '左转',
      label: '左转',
    },
    {
      value: '右转',
      label: '右转',
    },
    {
      value: '888-其他',
      label: '888-其他',
    },
    {
      value: '999-未知',
      label: '999-未知',
    },
  ],
  options5024: [
    {
      value: '0',
      label: '0',
    },
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
    {
      value: '4',
      label: '4',
    },
    {
      value: '999-未知',
      label: '999-未知',
    },
  ],
  majorFault2First: [
    {
      value: '000-无过失',
      label: '000-无过失',
    }
  ],
  majorFault2Second: [
    {
      value: '超速行驶',
      label: '超速行驶'
    },
    {
      value: '酒后驾驶',
      label: '酒后驾驶'
    },
    {
      value: '逆向行驶',
      label: '逆向行驶'
    },
    {
      value: '违法超车',
      label: '违法超车'
    },
    {
      value: '违法牵引',
      label: '违法牵引'
    },
    {
      value: '违法抢行',
      label: '违法抢行'
    },
    {
      value: '违法上道路行驶',
      label: '违法上道形行驶'
    },
    {
      value: '违法停车',
      label: '违法停车'
    },
    {
      value: '违法占道行驶',
      label: '违法占道行驶'
    },
    {
      value: '违法装载',
      label: '违法装载'
    },
    {
      value: '违反交通信号',
      label: '违反交通信号'
    },
    {
      value: '未按规定让行',
      label: '未按规定让行'
    },
    {
      value: '无证驾驶',
      label: '无证驾驶'
    },
    {
      value: '其他影响安全行为',
      label: '其他影响安全行为'
    },
  ],
  majorFault2Third: [
    {
      value: '未设置道路安全措施',
      label: '未设置道路安全措施',
    },
    {
      value: '安全设施损坏灭失',
      label: '安全设施损坏灭失',
    },
    {
      value: '道路缺陷',
      label: '道路缺陷',
    },
    {
      value: '其他道路原因',
      label: '其他道路原因',
    },
    {
      value: '其他影响安全行为',
      label: '其他影响安全行为',
    }
  ],
  majorFault2Fourth: [
    {
      value: '自然灾害',
      label: '自然灾害'
    },
    {
      value: '机件故障',
      label: '机件故障'
    },
    {
      value: '爆胎',
      label: '爆胎'
    },
    {
      value: '其他意外',
      label: '其他意外'
    },
  ],
  majorFault2Fifth: [
    {
      value: '888-其他',
      label: '888-其他'
    },
    {
      value: '999-未知',
      label: '999-未知'
    }
  ]
}
export default dataPro
