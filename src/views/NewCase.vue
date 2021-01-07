<template>
  <div class="container">
    <el-button slot="restore" class="restore" @click="restoreDataDialogVisible=true" size="medium" type="success">恢复数据</el-button>
    <el-button size="medium" type="warning" class="reset" slot="reset" @click="resetDialogVisible=true">重置案例</el-button>
    <!-- 面包屑导航区域 -->
    <breadcrumb class="breadcrumb" title="新建案例数据">
    </breadcrumb>
    <el-card class="card">
      <el-form>
        <el-tabs v-model="activeName">
          <el-tab-pane disabled label="总体信息" name="0">
            <el-form :model="totalInfo" :rules="totalInfoRules" ref="totalInfoRef" label-width="250px">
              <!-- 第一行 -->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="案例编号" prop="g1001">
                    <el-input v-model="totalInfo.g1001"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="鉴定委托号" prop="g1002">
                    <el-input v-model="totalInfo.g1002"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="参与方总数" prop="g1003">
                    <el-input v-model="totalInfo.g1003"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 第二行 -->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="事故形态" prop="g1004">
                    <el-select v-model="totalInfo.g1004" placeholder="请选择">
                      <el-option v-for="item in AccidentPatternOpt" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="事故分类" prop="g1005">
                    <el-select v-model="totalInfo.g1005" placeholder="请选择">
                      <el-option v-for="item in AccidentClassOpt" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="障碍物类型" prop="g1006">
                    <el-select v-model="totalInfo.g1006" placeholder="请选择">
                      <el-option v-for="item in obstacleType" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 第三行 -->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="视频类型" prop="g1007">
                    <el-select v-model="totalInfo.g1007" placeholder="请选择">
                      <el-option v-for="item in videoType" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="参与方一视角下参与方二的走向" prop="g1008">
                    <el-select v-model="totalInfo.g1008" placeholder="请选择">
                      <el-option v-for="item in PartTrendOPt" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="经度-东经（度）" prop="g1009">
                    <el-input v-model="totalInfo.g1009"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 第四行 -->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="纬度-北纬（度）" prop="g1010">
                    <el-input v-model="totalInfo.g1010"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="事故关注点" prop="g1011">
                    <el-input v-model="totalInfo.g1011"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane disabled label="环境信息" name="1">
            <el-form label-width="250px" label-position="right" :model="envInfo" ref="envInfoRef" :rules="envInfoRules">
              <!-- 第一行 -->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="案例编号" prop="e2001">
                    <el-input v-model="envInfo.e2001"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="路段信息" prop="e2002">
                    <el-select v-model="envInfo.e2002" placeholder="请选择">
                      <el-option v-for="item in roadInfo" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="天气" prop="e2003">
                    <el-select v-model="envInfo.e2003" placeholder="请选择">
                      <el-option v-for="item in weather" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 第二行 -->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="事故具体时间" prop="e2004">
                    <el-input v-model="envInfo.e2004" placeholder="时:分"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="日间太阳光线" prop="e2005">
                    <el-select v-model="envInfo.e2005" placeholder="请选择">
                      <el-option v-for="item in sunRays" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="雾霾天的能见度" prop="e2006">
                    <el-select v-model="envInfo.e2006" placeholder="请选择">
                      <el-option v-for="item in visibility" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 第三行 -->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="摄氏温度℃" prop="e2007">
                    <el-input v-model="envInfo.e2007"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="照明情况" prop="e2008">
                    <el-select v-model="envInfo.e2008" placeholder="请选择">
                      <el-option v-for="item in illumination" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane disabled label="道路信息" name="2" class="tab-scroll">
            <el-scrollbar style="height:90%;">
              <el-form label-width="250px" label-position="right" :model="wayInfo" ref="wayInfoRef" :rules="wayInfoRules">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="参与方编号" prop="r6002">
                      <el-select v-model="wayInfo.r6002" @change="partIdChange">
                        <el-option v-for="item in partIdOption" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-button type="info" plain style="margin-left: 30px;" @click="copyWayInfo1" v-if="isShow">复制参与方1</el-button>
                  </el-col>
                </el-row>
                <!-- 第一行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="案例编号" prop="r6001">
                      <el-input v-model="wayInfo.r6001"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="参与方所在道路名称" prop="r6003">
                      <el-input v-model="wayInfo.r6003"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="总体机动车道数（条）" prop="r6004">
                      <el-input v-model="wayInfo.r6004"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第二行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="参与方行驶方向机动车道数（条）" prop="r6005">
                      <el-input v-model="wayInfo.r6005"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="参与方对向机动车道数（条）" prop="r6006">
                      <el-input v-model="wayInfo.r6006"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="非机动车道" prop="r6007">
                      <el-select v-model="wayInfo.r6007" placeholder="请选择">
                        <el-option v-for="item in nonMotorizedLane" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第三行 -->

                <!-- 第四行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="对向机动车道隔离形式" prop="r6009">
                      <el-select v-model="wayInfo.r6009" placeholder="请选择">
                        <el-option v-for="item in isolationForm" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="本侧机非车道隔离形式" prop="r6010">
                      <el-select v-model="wayInfo.r6010" placeholder="请选择">
                        <el-option v-for="item in isolationForm2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="对向机动车道侧机非车道隔离形式" prop="r6011">
                      <el-select v-model="wayInfo.r6011" placeholder="请选择">
                        <el-option v-for="item in isolationForm2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="道路总宽度(m)" prop="r6012">
                      <el-input v-model="wayInfo.r6012"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="所在车道的宽度(m)" prop="r6013">
                      <el-input v-model="wayInfo.r6013"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="道路横截面的轮廓" prop="r6008">
                      <el-select v-model="wayInfo.r6008" placeholder="请选择">
                        <el-option v-for="item in crossSectionProfile" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第五行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="最高允许车速(km/h)" prop="r6014">
                      <el-input v-model="wayInfo.r6014"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="现场有何种交通警告标志" prop="r6015">
                      <el-select v-model="wayInfo.r6015" placeholder="请选择">
                        <el-option v-for="item in warningSign" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="现场有何种交通禁令标志" prop="r6016">
                      <el-select v-model="wayInfo.r6016" placeholder="请选择">
                        <el-option v-for="item in trafficProhibitionSign" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第六行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="道路的线形" prop="r6017">
                      <el-select v-model="wayInfo.r6017" placeholder="请选择">
                        <el-option v-for="item in roadTrend" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="沿道路方向的趋势" prop="r6018">
                      <el-select v-model="wayInfo.r6018" placeholder="请选择">
                        <el-option v-for="item in roadTrend" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="路面材料" prop="r6019">
                      <el-select v-model="wayInfo.r6019" placeholder="请选择">
                        <el-option v-for="item in roadMaterial" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第七行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="道路表面污染" prop="r6020">
                      <el-select v-model="wayInfo.r6020" placeholder="请选择">
                        <el-option v-for="item in roadPollution" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="路表潮湿度" prop="r6021">
                      <el-select v-model="wayInfo.r6021" placeholder="请选择">
                        <el-option v-for="item in roadHumidity" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="路面状况" prop="r6022">
                      <el-select v-model="wayInfo.r6022" placeholder="请选择">
                        <el-option v-for="item in roadCondition" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第八行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="交通标志是否被阻挡不可见" prop="r6023">
                      <el-select v-model="wayInfo.r6023" placeholder="请选择">
                        <el-option v-for="item in trafficSignIsBlocked" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="路口信号灯" prop="r6024">
                      <el-select v-model="wayInfo.r6024" placeholder="请选择">
                        <el-option v-for="item in roadSignal" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="路灯是否开启" prop="r6025">
                      <el-select v-model="wayInfo.r6025" placeholder="请选择">
                        <el-option v-for="item in roadSignalLight" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第九行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="路灯的密度" prop="r6026">
                      <el-select v-model="wayInfo.r6026" placeholder="请选择">
                        <el-option v-for="item in streetLightDensity" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否有轨道" prop="r6027">
                      <el-select v-model="wayInfo.r6027" placeholder="请选择">
                        <el-option v-for="item in isTrack" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="影响视线的障碍物" prop="r6028">
                      <el-select v-model="wayInfo.r6028" placeholder="请选择">
                        <el-option v-for="item in obstacleAffectingSight" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第十行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="道路状况评估" prop="r6029">
                      <el-select v-model="wayInfo.r6029" placeholder="请选择">
                        <el-option v-for="item in roadConditionAssessment" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否有建筑设施" prop="r6030">
                      <el-select v-model="wayInfo.r6030" placeholder="请选择">
                        <el-option v-for="item in buildingFacilities" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="交通限速设施" prop="r6031">
                      <el-select v-model="wayInfo.r6031" placeholder="请选择">
                        <el-option v-for="item in TraSpeedLimitFac" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第十一行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="车辆是否冲到相应路边" prop="r6032">
                      <el-select v-model="wayInfo.r6032" placeholder="请选择">
                        <el-option v-for="item in rushRoadSide" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否为变宽路段" prop="r6033">
                      <el-select v-model="wayInfo.r6033" placeholder="请选择">
                        <el-option v-for="item in wideningSection" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="是否有为变窄路段" prop="r6034">
                      <el-select v-model="wayInfo.r6034" placeholder="请选择">
                        <el-option v-for="item in narrowingSection" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第十二行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="是否有隧道" prop="r6035">
                      <el-select v-model="wayInfo.r6035" placeholder="请选择">
                        <el-option v-for="item in tunnel" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否为匝道口" prop="r6036">
                      <el-select v-model="wayInfo.r6036" placeholder="请选择">
                        <el-option v-for="item in tunnel" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane disabled label="参与方信息" name="3" class="tab-scroll-part">
            <!-- 车 -->
            <el-form label-width="250px" label-position="right">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="参与方编号">
                    <el-select v-model="partInfoId2" @change="changeSelectId" placeholder="请选择">
                      <el-option v-for="item in partIdOption" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="参与方类型">
                    <el-select v-model="partTypeVal" @change="changeSelectType" placeholder="请选择">
                      <el-option v-for="item in partType" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-scrollbar style="height:90%;">
              <el-form label-width="250px" label-position="right" :model="partInfoCar" :rules="partInfoCarRules" ref="partInfoCarRef" class="tab-scroll" v-show="partTypeVal === '车' ? true : false">
                <!-- 第一行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="案例编号" prop="v3001">
                      <el-input v-model="partInfoCar.v3001"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="车辆类型" prop="v3003">
                      <el-select v-model="partInfoCar.v3003" placeholder="请选择">
                        <el-option v-for="item in carType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否有EDR报告" prop="v3004">
                      <el-select v-model="partInfoCar.v3004" placeholder="请选择">
                        <el-option v-for="item in EDR" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第二行 -->
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="车辆品牌" prop="v3005">
                      <el-input v-model="partInfoCar.v3005"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="参与方车辆VIN码" prop="v3006">
                      <el-input v-model="partInfoCar.v3006"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="车辆损坏情况" prop="v3007">
                      <el-select v-model="partInfoCar.v3007" placeholder="请选择">
                        <el-option v-for="item in carDamage" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 第三行 -->
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="车内人员伤亡情况" prop="v3008">
                      <el-select v-model="partInfoCar.v3008" placeholder="请选择">
                        <el-option v-for="item in casualties" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="参与方颜色（车辆颜色）" prop="v3009">
                      <el-select v-model="partInfoCar.v3009" placeholder="请选择">
                        <el-option v-for="item in carColor" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="车长（mm）" prop="v3010">
                      <el-input v-model="partInfoCar.v3010"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第四行 -->
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="车宽（mm）" prop="v3011">
                      <el-input v-model="partInfoCar.v3011"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="车高（mm）" prop="v3012">
                      <el-input v-model="partInfoCar.v3012"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="车辆的整备质量（kg）" prop="v3013">
                      <el-input v-model="partInfoCar.v3013"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 第五行 -->
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="轴距(mm)" prop="v3014">
                      <el-input v-model="partInfoCar.v3014"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="前轮距(mm)" prop="v3015">
                      <el-input v-model="partInfoCar.v3015"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="后轮距(mm)" prop="v3016">
                      <el-input v-model="partInfoCar.v3016"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第六行 -->
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="主要过错1" prop="v3017">
                      <el-select v-model="partInfoCar.v3017" placeholder="请选择" @change="changeCarFault">
                        <el-option v-for="item in majorFault1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="主要过错2" prop="v3018">
                      <el-select v-model="partInfoCar.v3018" :disabled="isCarFault" placeholder="请选择">
                        <el-option v-for="item in majorFault1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否有优先权" prop="v3019">
                      <el-select v-model="partInfoCar.v3019" placeholder="请选择">
                        <el-option v-for="item in priority" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第七行 -->
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="所在道路方向" prop="v3020">
                      <el-select v-model="partInfoCar.v3020" placeholder="请选择">
                        <el-option v-for="item in roadDirection" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="事故前车辆要避撞的对向" prop="v3021">
                      <el-select v-model="partInfoCar.v3021" placeholder="请选择">
                        <el-option v-for="item in options3021" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="事故前车辆的避撞行为" prop="v3022">
                      <el-select v-model="partInfoCar.v3022" placeholder="请选择">
                        <el-option v-for="item in options3022" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第八行 -->
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="是否有视野盲区（车外）" prop="v3023">
                      <el-select v-model="partInfoCar.v3023" placeholder="请选择">
                        <el-option v-for="item in options3023" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="车辆初始速度" prop="v3024">
                      <el-input v-model="partInfoCar.v3024"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="碰撞时速（km/h）" prop="v3025">
                      <el-input v-model="partInfoCar.v3025"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第九行 -->
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="事故发生前车辆运动类型" prop="v3026">
                      <el-select v-model="partInfoCar.v3026" placeholder="请选择">
                        <el-option v-for="item in options3026" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开始反应到碰撞前是否采取转向措施" prop="v3027">
                      <el-select v-model="partInfoCar.v3027" placeholder="请选择">
                        <el-option v-for="item in options3027" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否使用安全带" prop="v3028">
                      <el-select v-model="partInfoCar.v3028" placeholder="请选择">
                        <el-option v-for="item in options3028" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第十行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="安全气囊是否展开" prop="v3029">
                      <el-select v-model="partInfoCar.v3029" placeholder="请选择">
                        <el-option v-for="item in options3029" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否有行人主动保护装置" prop="v3030">
                      <el-select v-model="partInfoCar.v3030" placeholder="请选择">
                        <el-option v-for="item in options3030" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否有ABS防抱死系统" prop="v3031">
                      <el-select v-model="partInfoCar.v3031" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第十一行 -->
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="是否有EBD制动力分配系统系统" prop="v3032">
                      <el-select v-model="partInfoCar.v3032" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否有ESP/VSC车身电子稳定系统" prop="v3033">
                      <el-select v-model="partInfoCar.v3033" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否有ASR/TCS/TRC/ATC控制系统" prop="v3034">
                      <el-select v-model="partInfoCar.v3034" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第十二行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="并线辅助/盲点监测" prop="v3037">
                      <el-select v-model="partInfoCar.v3037" placeholder="请选择">
                        <el-option v-for="item in options3036" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否有EBA/BAS刹车辅助系统" prop="v3035">
                      <el-select v-model="partInfoCar.v3035" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="胎压监测装置" prop="v3036">
                      <el-select v-model="partInfoCar.v3036" placeholder="请选择">
                        <el-option v-for="item in options3036" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第十三行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="自动紧急制动系统（AEB）" prop="v3040">
                      <el-select v-model="partInfoCar.v3040" placeholder="请选择">
                        <el-option v-for="item in options3036" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="车道偏离预警LDW" prop="v3038">
                      <el-select v-model="partInfoCar.v3038" placeholder="请选择">
                        <el-option v-for="item in options3036" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="车道保持系统LKA" prop="v3039">
                      <el-select v-model="partInfoCar.v3039" placeholder="请选择">
                        <el-option v-for="item in options3036" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第十四行 -->
                <el-row>

                  <el-col :span="8">
                    <el-form-item label="预碰撞安全系统AWS" prop="v3041">
                      <el-select v-model="partInfoCar.v3041" placeholder="请选择">
                        <el-option v-for="item in options3036" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!-- 人 -->
              <el-form v-show="partTypeVal === '人' ? true : false" label-width="250px" label-position="right" :model="partInfoPeo" :rules="partInfoPeoRules" ref="partInfoPeoRef" class="tab-scroll">
                <!-- 第一行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="案例编号" prop="p4001">
                      <el-input v-model="partInfoPeo.p4001"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="性别" prop="p4002">
                      <el-select v-model="partInfoPeo.p4002" placeholder="请选择">
                        <el-option v-for="item in options4002" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="人员伤亡情况" prop="p4003">
                      <el-select v-model="partInfoPeo.p4003" placeholder="请选择">
                        <el-option v-for="item in options4003" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第二行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="人员身高（cm）" prop="p4004">
                      <el-input v-model="partInfoPeo.p4004"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="参与方颜色（衣着颜色）" prop="p4005">
                      <el-select v-model="partInfoPeo.p4005" placeholder="请选择">
                        <el-option v-for="item in options4005" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="黑暗处或夜间衣物可见性" prop="p4006">
                      <el-select v-model="partInfoPeo.p4006" placeholder="请选择">
                        <el-option v-for="item in options4006" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第三行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="事故发生地点" prop="p4007">
                      <el-select v-model="partInfoPeo.p4007" placeholder="请选择">
                        <el-option v-for="item in options4007" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="行人穿越机动车道位置" prop="p4008">
                      <el-select v-model="partInfoPeo.p4008" placeholder="请选择">
                        <el-option v-for="item in options4008" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="行人行走方向" prop="p4009">
                      <el-select v-model="partInfoPeo.p4009" placeholder="请选择">
                        <el-option v-for="item in options4009" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第四行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="行人运动状态" prop="p4010">
                      <el-select v-model="partInfoPeo.p4010" placeholder="请选择">
                        <el-option v-for="item in options4010" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="行人速度（km/h）" prop="p4011">
                      <el-input v-model="partInfoPeo.p4011"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="行人被撞部位" prop="p4012">
                      <el-select v-model="partInfoPeo.p4012" placeholder="请选择">
                        <el-option v-for="item in options4012" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第五行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="碰撞前行人相对于车辆的位置" prop="p4013">
                      <el-select v-model="partInfoPeo.p4013" placeholder="请选择">
                        <el-option v-for="item in options4013" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="穿越机动车道时能否被看到" prop="p4014">
                      <el-select v-model="partInfoPeo.p4014" placeholder="请选择">
                        <el-option v-for="item in options4014" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否因为视野盲区造成事故" prop="p4015">
                      <el-select v-model="partInfoPeo.p4015" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第六行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="是否由停靠车辆造成行人的视野盲区" prop="p4016">
                      <el-select v-model="partInfoPeo.p4016" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否有其他造成行人视线盲区的物体" prop="p4017">
                      <el-select v-model="partInfoPeo.p4017" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开始反应到碰撞前是否有应急姿态" prop="p4018">
                      <el-select v-model="partInfoPeo.p4018" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第七行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="行人是否从障碍物后穿出" prop="p4019">
                      <el-select v-model="partInfoPeo.p4019" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="行人意识到危险之前是否加速" prop="p4020">
                      <el-select v-model="partInfoPeo.p4020" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="事故前行人行走方向是否改变" prop="p4021">
                      <el-select v-model="partInfoPeo.p4021" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!--二/三轮车  -->
              <el-form label-width="250px" label-position="right" :model="partInfoTH" ref="partInfoThRef" :rules="partInfoTHRules" class="tab-scroll" v-show="partTypeVal === '二/三轮车' ? true : false">
                <!-- 第一行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="案例编号" prop="t5001">
                      <el-input v-model="partInfoTH.t5001"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="车辆具体类型" prop="t5002">
                      <el-cascader v-model="partInfoTH.t5002" :options="options5002" :props="{ expandTrigger: 'hover' }" @change="thType"></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="参二/三轮车颜色" prop="t5003">
                      <el-select v-model="partInfoTH.t5003" placeholder="请选择">
                        <el-option v-for="item in carColor" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第二行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="车长（总长度(mm)）" prop="t5004">
                      <el-input v-model="partInfoTH.t5004"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="车宽（车最宽处宽度(mm)）" prop="t5005">
                      <el-input v-model="partInfoTH.t5005"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="车高（车把离地高度(mm)）" prop="t5006">
                      <el-input v-model="partInfoTH.t5006"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第三行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="二/三轮车载重（Kg）" prop="t5007">
                      <el-input v-model="partInfoTH.t5007"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="主要过错1" prop="t5008">
                      <el-select v-model="partInfoTH.t5008" placeholder="请选择" @change="changeThFault">
                        <el-option v-for="item in majorFault1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="主要过错2" prop="t5009">
                      <el-select v-model="partInfoTH.t5009" placeholder="请选择" :disabled="isThFault">
                        <el-option v-for="item in majorFault1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第四行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="二/三轮车运动方向" prop="t5010">
                      <el-select v-model="partInfoTH.t5010" placeholder="请选择">
                        <el-option v-for="item in options5010" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="二轮车/三速度（km/h）" prop="t5011">
                      <el-input v-model="partInfoTH.t5011"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="二/三轮车第一碰撞位置相对自身方位" prop="t5012">
                      <el-select v-model="partInfoTH.t5012" placeholder="请选择">
                        <el-option v-for="item in PartTrendOPt" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第五行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="骑车人性别" prop="t5013">
                      <el-select v-model="partInfoTH.t5013" placeholder="请选择">
                        <el-option v-for="item in options4002" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="衣着颜色" prop="t5014">
                      <el-select v-model="partInfoTH.t5014" placeholder="请选择">
                        <el-option v-for="item in options4005" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="骑车人伤亡情况" prop="t5015">
                      <el-select v-model="partInfoTH.t5015" placeholder="请选择">
                        <el-option v-for="item in options4003" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第六行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="是否佩戴头盔" prop="t5016">
                      <el-select v-model="partInfoTH.t5016" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="头盔颜色" prop="t5017">
                      <el-select v-model="partInfoTH.t5017" placeholder="请选择">
                        <el-option v-for="item in options4005" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="在黑暗处或夜间衣物可见性" prop="t5018">
                      <el-select v-model="partInfoTH.t5018" placeholder="请选择">
                        <el-option v-for="item in options4006" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第七行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="事故时转向避让反应" prop="t5019">
                      <el-select v-model="partInfoTH.t5019" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="事故时二/三轮车转向灯是否开启" prop="t5020">
                      <el-select v-model="partInfoTH.t5020" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否有优先权" prop="t5021">
                      <el-select v-model="partInfoTH.t5021" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第八行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="开始反应到碰撞前是否采取转向措施" prop="t5022">
                      <el-select v-model="partInfoTH.t5022" placeholder="请选择">
                        <el-option v-for="item in optionsTF" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="事故发生前车辆运动类型" prop="t5023">
                      <el-select v-model="partInfoTH.t5023" placeholder="请选择">
                        <el-option v-for="item in options3026" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="二轮车/三乘客数" prop="t5024">
                      <el-select v-model="partInfoTH.t5024" placeholder="请选择">
                        <el-option v-for="item in options5024" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 第九行 -->
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="乘员伤亡情况" prop="t5025">
                      <el-select v-model="partInfoTH.t5025" placeholder="请选择">
                        <el-option v-for="item in options4003" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <!-- 按钮区域 -->
      <div class="btn">
        <el-button type="primary" @click="Previous" icon="el-icon-arrow-left" v-if="activeIndex!==0">上一步</el-button>
        <el-button type="primary" @click="save()">保存信息</el-button>
        <el-button type="primary" @click="next" :disabled="Release === true ? false : true" v-if="this.activeIndex!==3">
          下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        <el-button type="primary" @click="createCase" v-if="createCaseBtn">创建案例</el-button>
      </div>

      <!-- 恢复数据对话框 -->
      <el-dialog title="恢复案例" :visible.sync="restoreDataDialogVisible" width="30%" @close="restoreDataDialogClosed">
        <el-form :model="caseForm" :rules="caseFormRules" ref="caseFormRef" label-width="100px">
          <el-form-item label="案例编号" prop="id">
            <el-input v-model="caseForm.id"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="restoreDataDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="restoreData">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>

    <!-- 重置案例对话框 -->
    <el-dialog title="重置案例" :visible.sync="resetDialogVisible" width="30%" @close="resetDialogClosed">
      <el-form :model="resetCaseForm" :rules="resetCaseFormRules" ref="resetCaseFormRef" label-width="100px">
        <el-form-item label="案例编号" prop="id">
          <el-input v-model="resetCaseForm.id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDialogClosed">取 消</el-button>
        <el-button type="primary" @click="resetCase">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import Breadcrumb from '../components/common/Breadcrumb.vue'
import dataPro from '../components/newcase/dataProcess'
export default {
  components: { Breadcrumb },
  data() {
    var checkLongitude = (rule, value, cb) => {
      const target = parseFloat(value)
      if (
        (target > 73.33 && target < 135.05) ||
        value == null ||
        value.trim().length == 0
      ) {
        return cb()
      }
      cb(new Error('经度范围在73.3300~135.0500之间'))
    }
    var checkLatitude = (rule, value, cb) => {
      const target = parseFloat(value)
      if (
        (target > 3.51 && target < 53.33) ||
        value == null ||
        value.trim().length == 0
      ) {
        return cb()
      }
      cb(new Error('纬度范围在3.5100至53.3300之间'))
    }
    var checkg1001 = (rule, value, cb) => {
      const regRule = /^[a-zA-Z]{3}\d{6}$/
      if (regRule.test(value)) {
        return cb()
      }
      cb(new Error('案例编号必须由3个字母和6个数字组成'))
    }
    var checke2004 = (rule, value, cb) => {
      const regRule = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/
      if (regRule.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的时间格式（时：分）'))
    }
    var checke2007 = (rule, value, cb) => {
      const target = parseFloat(value)
      if (
        (target >= -50 && target <= 60) ||
        value == null ||
        value === '' ||
        value.trim().length == 0
      ) {
        return cb()
      }
      cb(new Error('温度必须在-50！~ 60之间'))
    }
    var checkp4004 = (rule, value, cb) => {
      const target = parseFloat(value)
      if (
        (target >= 0 && target <= 250) ||
        value == null ||
        value === '' ||
        value.trim().length == 0
      ) {
        return cb()
      }
      cb(new Error('身高必须在0 ~ 250之间'))
    }
    var checkv3006 = (rule, value, cb) => {
      if (
        value.length === 17 ||
        value == null ||
        value === '' ||
        value.trim().length == 0
      ) {
        return cb()
      }
      cb(new Error('VIN由17位数字+字母组成'))
    }
    var checkv3010 = (rule, value, cb) => {
      const target = parseFloat(value)
      if (
        (target >= 0 && target <= 30000) ||
        value == null ||
        value === '' ||
        value.trim().length == 0
      ) {
        return cb()
      }
      cb(new Error('范围在0 ~ 30000之间'))
    }
    var checkv3011 = (rule, value, cb) => {
      const target = parseFloat(value)
      if (
        (target >= 0 && target <= 3000) ||
        value == null ||
        value === '' ||
        value.trim().length == 0
      ) {
        return cb()
      }
      cb(new Error('范围在0 ~ 3000之间'))
    }
    var checkv3012 = (rule, value, cb) => {
      const target = parseFloat(value)
      if (
        (target >= 0 && target <= 5000) ||
        value == null ||
        value === '' ||
        value.trim().length == 0
      ) {
        return cb()
      }
      cb(new Error('范围在0 ~ 5000之间'))
    }
    var checkv3013 = (rule, value, cb) => {
      const target = parseFloat(value)
      if (
        (target >= 0 && target <= 80000) ||
        value == null ||
        value === '' ||
        value.trim().length == 0
      ) {
        return cb()
      }
      cb(new Error('范围在0 ~ 80000之间'))
    }
    var checkv3014 = (rule, value, cb) => {
      const target = parseFloat(value)
      if (
        (target >= 0 && target <= 20000) ||
        value == null ||
        value === '' ||
        value.trim().length == 0
      ) {
        return cb()
      }
      cb(new Error('范围在0 ~ 20000之间'))
    }
    return {
      // 重置案例
      resetDialogVisible: false,
      isCarFault: true,
      isThFault: true,
      creatRoadList: [],
      creatPartPeoList: [],
      creatPartCarList: [],
      creatPartThList: [],
      // 恢复数据
      wayInfoList: [],
      partInfoCarList: [],
      partInfoPeoList: [],
      partInfoTHList: [],
      activeIndex: 0,
      allIndex: 0,
      activeName: '0',
      AccidentPatternOpt: [],
      AccidentClassOpt: [],
      obstacleType: [],
      videoType: [],
      PartTrendOPt: [],
      roadInfo: [],
      weather: [],
      sunRays: [],
      visibility: [],
      illumination: [],
      nonMotorizedLane: [],
      crossSectionProfile: [],
      isolationForm: [],
      isolationForm2: [],
      warningSign: [],
      prohibitionSign: [],
      trafficProhibitionSign: [],
      roadLinearity: [],
      roadTrend: [],
      roadMaterial: [],
      roadPollution: [],
      roadHumidity: [],
      roadCondition: [],
      trafficSignIsBlocked: [],
      roadSignal: [],
      roadSignalLight: [],
      streetLightDensity: [],
      isTrack: [],
      obstacleAffectingSight: [],
      roadConditionAssessment: [],
      buildingFacilities: [],
      TraSpeedLimitFac: [],
      rushRoadSide: [],
      wideningSection: [],
      narrowingSection: [],
      tunnel: [],

      carType: [],
      EDR: [],
      carDamage: [],
      casualties: [],
      carColor: [],
      majorFault1: [],
      majorFault2: [],
      priority: [],
      roadDirection: [],
      options3021: [],
      options3022: [],
      options3023: [],
      options3026: [],
      options3027: [],
      options3028: [],
      options3029: [],
      options3030: [],
      optionsTF: [],
      options3036: [],
      options4002: [],
      options4003: [],
      options4005: [],
      options4006: [],
      options4007: [],
      options4008: [],
      options4009: [],
      options4010: [],
      options4012: [],
      options4013: [],
      options4014: [],
      options5002: [],
      options5010: [],
      options5024: [],
      addCaseForm: {},
      // 总体信息
      totalInfo: {
        g1001: '',
        g1002: '',
        g1003: '',
        g1004: '',
        g1005: '',
        g1006: '',
        g1007: '',
        g1008: '',
        g1009: '',
        g1010: '',
        g1011: '',
      },
      // 环境信息
      envInfo: {
        e2001: '',
        e2002: '',
        e2003: '',
        e2004: '',
        e2005: '',
        e2006: '',
        e2007: '',
        e2008: '',
      },
      // 道路信息
      roadInfoID: '',
      wayInfo: {
        r6001: '',
        r6002: 1,
        r6003: '',
        r6004: '',
        r6005: '',
        r6006: '',
        r6007: '',
        r6008: '',
        r6009: '',
        r6010: '',
        r6011: '',
        r6012: '',
        r6013: '',
        r6014: '',
        r6015: '',
        r6016: '',
        r6017: '',
        r6018: '',
        r6019: '',
        r6020: '',
        r6021: '',
        r6022: '',
        r6023: '',
        r6024: '',
        r6025: '',
        r6026: '',
        r6027: '',
        r6028: '',
        r6029: '',
        r6030: '',
        r6031: '',
        r6032: '',
        r6033: '',
        r6034: '',
        r6035: '',
        r6036: '',
      },
      wayInfoCp: {
        r6001: '',
        r6002: 1,
        r6003: '',
        r6004: '',
        r6005: '',
        r6006: '',
        r6007: '',
        r6008: '',
        r6009: '',
        r6010: '',
        r6011: '',
        r6012: '',
        r6013: '',
        r6014: '',
        r6015: '',
        r6016: '',
        r6017: '',
        r6018: '',
        r6019: '',
        r6020: '',
        r6021: '',
        r6022: '',
        r6023: '',
        r6024: '',
        r6025: '',
        r6026: '',
        r6027: '',
        r6028: '',
        r6029: '',
        r6030: '',
        r6031: '',
        r6032: '',
        r6033: '',
        r6034: '',
        r6035: '',
        r6036: '',
      },
      // 参与方信息
      partInfoCar: {
        v3001: '',
        v3002: 1,
        v3003: '',
        v3004: '',
        v3005: '',
        v3006: '',
        v3007: '',
        v3008: '',
        v3009: '',
        v3010: '',
        v3011: '',
        v3012: '',
        v3013: '',
        v3014: '',
        v3015: '',
        v3016: '',
        v3017: '',
        v3018: '',
        v3019: '',
        v3020: '',
        v3021: '',
        v3022: '',
        v3023: '',
        v3024: '',
        v3025: '',
        v3026: '',
        v3027: '',
        v3028: '',
        v3029: '',
        v3030: '',
        v3031: '',
        v3032: '',
        v3033: '',
        v3034: '',
        v3035: '',
        v3036: '',
        v3037: '',
        v3038: '',
        v3039: '',
        v3040: '',
        v3041: '',
      },
      partInfoCarCp: {
        v3001: '',
        v3002: 1,
        v3003: '',
        v3004: '',
        v3005: '',
        v3006: '',
        v3007: '',
        v3008: '',
        v3009: '',
        v3010: '',
        v3011: '',
        v3012: '',
        v3013: '',
        v3014: '',
        v3015: '',
        v3016: '',
        v3017: '',
        v3018: '',
        v3019: '',
        v3020: '',
        v3021: '',
        v3022: '',
        v3023: '',
        v3024: '',
        v3025: '',
        v3026: '',
        v3027: '',
        v3028: '',
        v3029: '',
        v3030: '',
        v3031: '',
        v3032: '',
        v3033: '',
        v3034: '',
        v3035: '',
        v3036: '',
        v3037: '',
        v3038: '',
        v3039: '',
        v3040: '',
        v3041: '',
      },
      partInfoPeo: {
        p4001: '',
        p4002: '',
        p4003: '',
        p4004: '',
        p4005: '',
        p4006: '',
        p4007: '',
        p4008: '',
        p4009: '',
        p4010: '',
        p4011: '',
        p4012: '',
        p4013: '',
        p4014: '',
        p4015: '',
        p4016: '',
        p4017: '',
        p4018: '',
        p4019: '',
        p4020: '',
        p4021: '',
        participantNumber: 1,
      },
      partInfoPeoCp: {
        p4001: '',
        p4002: '',
        p4003: '',
        p4004: '',
        p4005: '',
        p4006: '',
        p4007: '',
        p4008: '',
        p4009: '',
        p4010: '',
        p4011: '',
        p4012: '',
        p4013: '',
        p4014: '',
        p4015: '',
        p4016: '',
        p4017: '',
        p4018: '',
        p4019: '',
        p4020: '',
        p4021: '',
        participantNumber: 1,
      },
      partInfoTH: {
        participantNumber: 1,
        t5001: '',
        t5002: '',
        t5003: '',
        t5004: '',
        t5005: '',
        t5006: '',
        t5007: '',
        t5008: '',
        t5009: '',
        t5010: '',
        t5011: '',
        t5012: '',
        t5013: '',
        t5014: '',
        t5015: '',
        t5016: '',
        t5017: '',
        t5018: '',
        t5019: '',
        t5020: '',
        t5021: '',
        t5022: '',
        t5023: '',
        t5024: '',
        t5025: '',
      },
      partInfoTHCp: {
        participantNumber: 1,
        t5001: '',
        t5002: '',
        t5003: '',
        t5004: '',
        t5005: '',
        t5006: '',
        t5007: '',
        t5008: '',
        t5009: '',
        t5010: '',
        t5011: '',
        t5012: '',
        t5013: '',
        t5014: '',
        t5015: '',
        t5016: '',
        t5017: '',
        t5018: '',
        t5019: '',
        t5020: '',
        t5021: '',
        t5022: '',
        t5023: '',
        t5024: '',
        t5025: '',
      },
      totalInfoRules: {
        g1001: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z]{3}\d{6}$/,
            message: '请输入正确的案例编号',
            trigger: 'blur',
          },
        ],
        g1002: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        g1003: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        g1004: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        g1005: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        g1006: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        g1007: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        g1008: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        g1009: [
          { required: false, validator: checkLongitude, trigger: 'blur' },
        ],
        g1010: [{ required: false, validator: checkLatitude, trigger: 'blur' }],
      },
      envInfoRules: {
        e2001: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        e2002: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        e2003: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        e2004: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
          { validator: checke2004, trigger: 'blur' },
        ],
        e2007: [{ validator: checke2007, trigger: 'blur' }],
        e2008: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
      },
      wayInfoRules: {
        r6002: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        r6001: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        r6004: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
          {
            pattern: /^40$|^([1-3]\d)$|^\d?$/,
            message: '范围在0 ~ 40',
            trigger: 'blur',
          },
        ],
        r6005: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
          {
            pattern: /^20$|^([1]\d)$|^\d?$/,
            message: '范围在0 ~ 20',
            trigger: 'blur',
          },
        ],
        r6006: [
          {
            pattern: /^20$|^([1]\d)$|^\d?$/,
            message: '范围在0 ~ 20',
            trigger: 'blur',
          },
        ],
        r6012: [
          {
            pattern: /^100$|^([1-9]\d)$|^\d?$/,
            message: '范围在0 ~ 100',
            trigger: 'blur',
          },
        ],
        r6013: [
          {
            pattern: /^[0-9|10]$/,
            message: '范围在0 ~ 10',
            trigger: 'blur',
          },
        ],
        r6014: [
          {
            pattern: /^(1[1-4][0-9]|150)$|^([1-9][0-9])$|^[0-9]$/,
            message: '范围在0 ~ 150',
            trigger: 'blur',
          },
        ],
        r6019: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        r6020: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        r6021: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        r6032: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        r6033: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        r6034: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        r6035: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        r6036: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
      },
      partInfoCarRules: {
        v3001: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        v3002: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        v3003: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        v3004: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        v3006: [{ validator: checkv3006, trigger: 'blur' }],
        v3007: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        v3008: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        v3010: [{ validator: checkv3010, trigger: 'blur' }],
        v3011: [{ validator: checkv3011, trigger: 'blur' }],
        v3012: [{ validator: checkv3012, trigger: 'blur' }],
        v3013: [{ validator: checkv3013, trigger: 'blur' }],
        v3014: [{ validator: checkv3014, trigger: 'blur' }],
        v3015: [{ validator: checkv3011, trigger: 'blur' }],
        v3016: [{ validator: checkv3011, trigger: 'blur' }],
        v3023: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        v3026: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
      },
      partInfoPeoRules: {
        p4003: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4004: [{ validator: checkp4004, trigger: 'blur' }],
        p4007: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4008: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4009: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4010: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4011: [
          {
            pattern: /^30$|^([1-2]\d)$|^\d?$/,
            message: '范围在0 ~ 30',
            trigger: 'blur',
          },
        ],
        p4012: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4013: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4014: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4015: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4016: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4017: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4018: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4019: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4020: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        p4021: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
      },
      partInfoTHRules: {
        t5001: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        t5002: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        t5004: [{ validator: checkv3012, trigger: 'blur' }],
        t5005: [{ validator: checkv3011, trigger: 'blur' }],
        t5006: [{ validator: checkv3011, trigger: 'blur' }],
        t5007: [{ validator: checkv3012, trigger: 'blur' }],
        t5010: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        t5011: [
          {
            pattern: /^([1-9]|[1-9]\\d|100)$/,
            message: '范围0-100',
            trigger: 'blur',
          },
        ],
        t5012: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        t5015: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        t5019: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
        t5023: [
          { required: true, message: '必填信息不得为空', trigger: 'blur' },
        ],
      },
      partIdOption: [],
      partType: [
        {
          label: '人',
          value: '人',
        },
        {
          label: '车',
          value: '车',
        },
        {
          label: '二/三轮车',
          value: '二/三轮车',
        },
      ],
      partTypeVal: '人',
      // 下一步放行开关,false为不放行
      Release: false,
      // 拷贝道路信息1
      wayInfo1: {},
      isShow: false,
      partInfoId: 1,
      partInfoId2: 1,
      recoveryPartId: 1,
      isRecovery: false,
      isCase: false,
      addBtnCount: 1,
      createCaseBtn: false,
      restoreDataDialogVisible: false,
      caseForm: {
        id: '',
      },
      caseFormRules: {
        id: [
          { required: true, message: '请输入案例编号', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z]{3}\d{6}$/,
            message: '请输入正确的案例编号',
            trigger: 'blur',
          },
        ],
      },
      roadInfoSet: new Set(),
      partInfoSet: new Set(),
      isRelase: new Set(),
      resetCaseForm: {
        id: '',
      },
      resetCaseFormRules: {
        id: [{ required: true, message: '请输入案例编号', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    resetDialogClosed() {
      this.resetDialogVisible = false
      this.$refs.resetCaseFormRef.resetFields()
    },
    resetCase() {
      this.$refs.resetCaseFormRef.validate(async (valid) => {
        if (!valid) return
        const res = await this.$http.delete(
          `total/cache/${this.resetCaseForm.id}`
        )
        if (res.data.code !== 200) {
          return this.$message.error('案例不存在')
        }
        this.$message.success('重置案例成功')
        this.resetDialogVisible = false
      })
    },
    // 经纬度
    eastLongitudeFixed() {
      if (this.totalInfo.g1009 === null || this.totalInfo.g1009 === '') {
        this.totalInfo.g1009 = ''
      } else {
        this.totalInfo.g1009 = parseFloat(this.totalInfo.g1009).toFixed(4)
      }
    },
    northLatitudeFixed() {
      if (this.totalInfo.g1010 === null || this.totalInfo.g1009 === '') {
        this.totalInfo.g1010 = ''
      } else {
        this.totalInfo.g1010 = parseFloat(this.totalInfo.g1010).toFixed(4)
      }
    },
    Previous() {
      if (this.activeIndex >= 0) {
        if (this.activeIndex === 3) {
          this.activeName = '2'
          if (this.isRelase.has('2')) this.Release = true
        } else if (this.activeIndex === 2) {
          if (this.isRelase.has('1')) this.Release = true
          this.activeName = '1'
        } else if (this.activeIndex === 1) {
          if (this.isRelase.has('0')) this.Release = true
          this.activeName = '0'
        } else {
          if (this.isRelase.has('0')) this.Release = true
        }
        this.activeIndex--
      }
    },
    next() {
      this.allIndex++
      this.isRelase.add(this.activeName)
      if (this.activeIndex <= 2) {
        // 第一页
        this.activeIndex++
        if (this.activeIndex === 1) {
          if (this.isRecovery) {
            this.Release = true
          } else if (this.isRelase.has('1')) {
            this.Release = true
          } else {
            this.Release = false
          }
          this.activeName = '1'
        } else if (this.activeIndex === 2) {
          this.activeName = '2'
          if (this.isRecovery) {
            this.Release = true
          } else if (this.isRelase.has('2')) {
            this.Release = true
          } else {
            this.Release = false
          }
          this.partIdSelect()
        } else {
          this.activeName = '3'
        }
      }
    },
    save() {
      if (this.activeIndex === 0) {
        this.saveTotalInfo()
      } else if (this.activeIndex === 1) {
        this.saveEnvInfo()
      } else if (this.activeIndex === 2) {
        this.saveRoadInfo()
      } else {
        this.savePartInfo()
      }
    },
    saveTotalInfo() {
      this.$refs.totalInfoRef.validate(async (valid) => {
        if (!valid) return
        this.eastLongitudeFixed()
        this.northLatitudeFixed()
        console.log(this.totalInfo)
        const res = await this.$http.post('accident', this.totalInfo)

        if (res.status !== 200 || res.data.code !== 200) {
          return this.$message.error('保存失败')
        }
        console.log(res)
        this.Release = true
        this.envInfo.e2001 = this.totalInfo.g1001
        this.wayInfo.r6001 = this.totalInfo.g1001
        this.partInfoCar.v3001 = this.totalInfo.g1001
        this.partInfoPeo.p4001 = this.totalInfo.g1001
        this.partInfoTH.t5001 = this.totalInfo.g1001
        this.$message.success('保存成功')
      })
    },
    saveEnvInfo() {
      this.$refs.envInfoRef.validate(async (valid) => {
        if (!valid) return
        const res = await this.$http.post('environment', this.envInfo)
        if (res.status !== 200 || res.data.code !== 200) {
          return this.$message.error('保存失败')
        }
        this.Release = true
        this.$message.success('保存成功')
      })
    },
    saveRoadInfo() {
      this.$refs.wayInfoRef.validate(async (valid) => {
        if (!valid) return
        const res = await this.$http.post('road', this.wayInfo)
        if (res.data.code !== 200 || res.status !== 200) {
          return this.$message.error('保存失败')
        }
        this.$message.success('保存成功')
        // 放行
        this.ReleaseCheck()
        // 新建案例执行
        if (!this.isRecovery) {
          console.log(this.partInfoId - 1)
          let id = this.partInfoId - 1
          console.log(this.wayInfo)
          this.creatRoadList[id] = JSON.parse(JSON.stringify(this.wayInfo))
          // 拷贝
          this.wayInfo1 = this.creatRoadList[0]
          this.wayInfo.r6002 = this.partInfoId
          this.wayInfo.r6001 = this.totalInfo.g1001
        }
      })
    },
    savePartInfo() {
      this.partInfoSet.add(this.partInfoId2)
      if (this.partInfoSet.size >= this.totalInfo.g1003) {
        this.createCaseBtn = true
        this.partInfoSet.clear()
      }
      if (this.partTypeVal === '人') {
        this.$refs.partInfoPeoRef.validate(async (valid) => {
          if (!valid) return
          this.partInfoPeo.participantNumber = this.partInfoId2
          console.log(this.partInfoPeo)
          const res = await this.$http.post('pedestrian', this.partInfoPeo)
          if (res.data.code !== 200 || res.status !== 200) {
            return this.$message.error('保存失败')
          }
          this.creatPartPeoList[this.partInfoId2 - 1] = this.partInfoPeo
          this.addBtnCount++
          this.$message.success('保存成功')
        })
      } else if (this.partTypeVal === '车') {
        this.$refs.partInfoCarRef.validate(async (valid) => {
          if (!valid) return
          this.partInfoCar.v3002 = this.partInfoId2
          console.log(this.partInfoCar)
          const res = await this.$http.post('car', this.partInfoCar)
          if (res.data.code !== 200 || res.status !== 200) {
            return this.$message.error('保存失败')
          }
          this.addBtnCount++
          this.creatPartCarList[this.partInfoId2 - 1] = this.partInfoCar
          this.$message.success('保存成功')
        })
      } else if (this.partTypeVal === '二/三轮车') {
        this.$refs.partInfoThRef.validate(async (valid) => {
          if (!valid) return
          this.partInfoTH.participantNumber = this.partInfoId2
          console.log(this.partInfoTH)
          const res = await this.$http.post('two_wheeler', this.partInfoTH)
          if (res.data.code !== 200 || res.status !== 200) {
            return this.$message.error('保存失败')
          }
          console.log(res)
          this.addBtnCount++
          this.creatPartThList[this.partInfoId2 - 1] = this.partInfoTH
          this.$message.success('保存成功')
        })
      }
    },
    async createCase() {
      const res = await this.$http.post(`total/save/${this.totalInfo.g1001}`)
      if (res.status !== 200 || res.data.code !== 200) {
        return this.$message.error('新建案例失败')
      }
      this.$message.success('新建案例成功')
      this.activeName = '0'
      this.activeIndex = 0
      this.Release = false
      this.createCaseBtn = false
      this.creatPartPeoList = []
      this.creatPartCarList = []
      this.creatPartThList = []

      Object.keys(this.totalInfo).forEach((key) => (this.totalInfo[key] = ''))
      Object.keys(this.envInfo).forEach((key) => (this.envInfo[key] = ''))
      Object.keys(this.wayInfo).forEach((key) => (this.wayInfo[key] = ''))
      Object.keys(this.partInfoCar).forEach(
        (key) => (this.partInfoCar[key] = '')
      )
      Object.keys(this.partInfoPeo).forEach(
        (key) => (this.partInfoPeo[key] = '')
      )
      Object.keys(this.partInfoTH).forEach((key) => (this.partInfoTH[key] = ''))
      this.wayInfoList = []
      this.creatRoadList = []
      this.partInfoCarList = []
      this.partInfoPeoList = []
      this.partInfoTHList = []
    },
    ReleaseCheck() {
      this.roadInfoSet.add(this.partInfoId)
      if (this.roadInfoSet.size >= this.totalInfo.g1003) {
        this.Release = true
        this.roadInfoSet.clear()
      }
    },
    // 恢复数据
    showRestreDaraDialog() {
      this.restoreDataDialogVisible = true
    },
    restoreDataDialogClosed() {
      this.$refs.caseFormRef.resetFields()
      this.restoreDataDialogVisible = false
    },
    restoreData() {
      this.$refs.caseFormRef.validate(async (valid) => {
        if (!valid) return
        const caseNumber = this.caseForm.id
        const { data: res } = await this.$http.post(
          `total/recovery/${caseNumber}`
        )
        if (res.code !== 200) {
          return this.$message.error('恢复数据失败')
        }
        if (res.data === null) {
          return this.$message.error('数据为空')
        }
        this.$message.success('恢复数据成功')
        this.Release = true
        this.restoreDataDialogVisible = false
        this.isRecovery = true
        // 设置案例编号
        this.envInfo.e2001 = res.data.accident.g1001
        this.wayInfo.r6001 = res.data.accident.g1001
        this.partInfoCar.v3001 = res.data.accident.g1001
        this.partInfoPeo.p4001 = res.data.accident.g1001
        this.partInfoTH.t5001 = res.data.accident.g1001
        if (res.data.accident !== null) {
          this.totalInfo = res.data.accident
        }
        if (res.data.environment !== null) {
          this.envInfo = res.data.environment
        }
        if (res.data.roads !== null) {
          this.wayInfo = res.data.roads[0]
          this.wayInfo1 = res.data.roads[0]
          this.wayInfoList.push(...res.data.roads)
          for (
            let i = res.data.roads.length;
            i < res.data.accident.g1003;
            i++
          ) {
            this.wayInfoList.push(JSON.parse(JSON.stringify(this.wayInfoCp)))
          }
        }
        if (res.data.car !== null) {
          this.partInfoCarList = res.data.cars
        }
        if (res.data.pedestrians !== null) {
          this.partInfoPeoList = res.data.pedestrians
        }
        if (res.data.twoWheelers !== null) {
          this.partInfoTHList = res.data.twoWheelers
        }
        this.recoverList(1)
      })
    },
    copyWayInfo1() {
      this.wayInfo = this.wayInfo1
      this.wayInfo.r6002 = this.partInfoId
    },
    partIdChange(id) {
      this.partInfoId = id
      // 是否是恢复的数据
      if (this.isRecovery) {
        if (this.wayInfoList.length >= id) {
          this.wayInfoList.forEach((item) => {
            if (item.r6002 === id) {
              this.wayInfo = item
            }
          })
          this.wayInfo = this.wayInfoList[id - 1]
          this.wayInfo.r6002 = id
        }
        this.wayInfo.r6002 = id
      } else {
        this.wayInfo = this.creatRoadList[id - 1]
        this.wayInfo.r6002 = id
      }
      if (id !== 1 && this.partIdOption.length !== 1) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    partIdSelect() {
      let total = this.totalInfo.g1003
      this.partIdOption = []
      this.creatRoadList = []
      for (let i = 1; i <= total; i++) {
        this.partIdOption.push({
          label: i,
          value: i,
        })
        this.wayInfoCp.r6001 = this.totalInfo.g1001
        this.partInfoPeoCp.p4001 = this.totalInfo.g1001
        this.partInfoCarCp.v3001 = this.totalInfo.g1001
        this.partInfoTHCp.t5001 = this.totalInfo.g1001
        this.creatRoadList.push(JSON.parse(JSON.stringify(this.wayInfoCp)))
        this.creatPartPeoList.push(
          JSON.parse(JSON.stringify(this.partInfoPeoCp))
        )
        this.creatPartCarList.push(
          JSON.parse(JSON.stringify(this.partInfoCarCp))
        )
        this.creatPartThList.push(JSON.parse(JSON.stringify(this.partInfoTHCp)))
      }
    },
    // 参与方信息参与方编号
    changeSelectId(opt) {
      this.partInfoId2 = opt
      if (this.isRecovery) {
        if (this.partInfoCarList !== null) {
          for (let i = 0; i < this.partInfoCarList.length; i++) {
            if (this.partInfoCarList[i].v3002 == opt)
              this.partInfoCar = this.partInfoCarList[i]
          }
        } else if (this.partInfoPeoList.length !== null) {
          for (let i = 0; i < this.partInfoPeoList.length; i++) {
            if (this.partInfoPeoList[i].participantNumber == opt)
              this.partInfoPeo = this.partInfoPeoList[i]
          }
        } else if (this.partInfoTHList.length !== null) {
          for (let i = 0; i < this.partInfoTHList.length; i++) {
            if (this.partInfoTHList[i].participantNumber == opt)
              this.partInfoTH = this.partInfoTHList[i]
          }
        }
        this.recoverList(this.partInfoId2)
      } else {
        if (this.partTypeVal === '人') {
          this.partInfoPeo = this.creatPartPeoList[opt - 1]
        } else if (this.partTypeVal === '车') {
          this.partInfoCar = this.creatPartCarList[opt - 1]
        } else {
          this.partInfoTH = this.creatPartThList[opt - 1]
        }
      }
    },
    recoverList(id) {
      if (this.partInfoCarList != null) {
        this.partInfoCarList.forEach((item) => {
          if (item.v3002 === id) {
            this.partInfoCar = item
            this.partTypeVal = '车'
          }
        })
      }
      if (this.partInfoPeoList != null) {
        this.partInfoPeoList.forEach((item) => {
          if (item.participantNumber === id) {
            this.partInfoPeo = item
            this.partTypeVal = '人'
          }
        })
      }
      if (this.partInfoTHList != null) {
        this.partInfoTHList.forEach((item) => {
          if (item.participantNumber === id) {
            this.partInfoTH = item
            this.partTypeVal = '二/三轮车'
          }
        })
      }
    },
    changeSelectType(opt) {
      this.partTypeVal = opt
    },
    changeCarFault() {
      this.isCarFault = false
    },
    changeThFault() {
      this.isThFault = false
    },
    thType(arr) {
      this.partInfoTH.t5002 = arr[1]
    },
    initPage() {
      this.illumination = dataPro.illumination
      this.AccidentPatternOpt = dataPro.AccidentPatternOpt
      this.AccidentClassOpt = dataPro.AccidentClassOpt
      this.obstacleType = dataPro.obstacleType
      this.videoType = dataPro.videoType
      this.PartTrendOPt = dataPro.PartTrendOPt
      this.roadInfo = dataPro.roadInfo
      this.weather = dataPro.weather
      this.sunRays = dataPro.sunRays
      this.visibility = dataPro.visibility
      this.nonMotorizedLane = dataPro.nonMotorizedLane
      this.crossSectionProfile = dataPro.crossSectionProfile
      this.isolationForm = dataPro.isolationForm
      this.isolationForm2 = dataPro.isolationForm2
      this.warningSign = dataPro.warningSign
      this.prohibitionSign = dataPro.prohibitionSign
      this.trafficProhibitionSign = dataPro.trafficProhibitionSign
      this.roadLinearity = dataPro.roadLinearity
      this.roadTrend = dataPro.roadTrend
      this.roadMaterial = dataPro.roadMaterial
      this.roadPollution = dataPro.roadPollution
      this.roadHumidity = dataPro.roadHumidity
      this.roadCondition = dataPro.roadCondition
      this.trafficSignIsBlocked = dataPro.trafficSignIsBlocked
      this.roadSignal = dataPro.roadSignal
      this.roadSignalLight = dataPro.roadSignalLight
      this.streetLightDensity = dataPro.streetLightDensity
      this.isTrack = dataPro.isTrack
      this.obstacleAffectingSight = dataPro.obstacleAffectingSight
      this.roadConditionAssessment = dataPro.roadConditionAssessment
      this.buildingFacilities = dataPro.buildingFacilities
      this.TraSpeedLimitFac = dataPro.TraSpeedLimitFac
      this.rushRoadSide = dataPro.rushRoadSide
      this.wideningSection = dataPro.wideningSection
      this.narrowingSection = dataPro.narrowingSection
      this.tunnel = dataPro.tunnel

      this.carType = dataPro.carType
      this.EDR = dataPro.EDR
      this.carDamage = dataPro.carDamage
      this.casualties = dataPro.casualties
      this.carColor = dataPro.carColor
      this.majorFault1 = dataPro.majorFault1
      this.majorFault2 = dataPro.majorFault2
      this.priority = dataPro.priority
      this.roadDirection = dataPro.roadDirection
      this.options3021 = dataPro.options3021
      this.options3022 = dataPro.options3022
      this.options3023 = dataPro.options3023
      this.options3026 = dataPro.options3026

      this.options3027 = dataPro.options3027
      this.options3028 = dataPro.options3028
      this.options3029 = dataPro.options3029
      this.options3030 = dataPro.options3030

      this.optionsTF = dataPro.optionsTF
      this.options3036 = dataPro.options3036
      this.options4002 = dataPro.options4002
      this.options4003 = dataPro.options4003

      this.options4005 = dataPro.options4005
      this.options4006 = dataPro.options4006
      this.options4007 = dataPro.options4007
      this.options4008 = dataPro.options4008

      this.options4009 = dataPro.options4009
      this.options4010 = dataPro.options4010
      this.options4012 = dataPro.options4012
      this.options4013 = dataPro.options4013

      this.options4014 = dataPro.options4014
      this.options5002 = dataPro.options5002
      this.options5010 = dataPro.options5010
      this.options5024 = dataPro.options5024
    },
  },
}
</script>
<style lang="less" scoped>
.container {
  position: relative;
}
.card {
  position: relative;
}
.reset {
  position: absolute;
  top: 40px;
  right: 10px;
  z-index: 1;
  align-items: center;
}
.restore {
  position: absolute;
  right: 120px;
  position: absolute;
  top: 40px;
  z-index: 1;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-scrollbar {
  height: 90%;
}
.el-form .el-form-item__label {
  font-size: 12px;
}
.el-card {
  height: 600px;
  position: relative;
}
.el-input {
  width: 100%;
}
.btn {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  bottom: 20px;
}
.el-main {
  padding: 0;
}
/deep/.el-tabs {
  background-color: #fff;
  font-weight: 200;
  .el-tabs__header {
    .el-tabs__nav-wrap {
      .el-tabs__nav-scroll {
        .el-tabs__nav {
          .el-tabs__item {
            font-size: 16px;
            font-weight: 200;
            color: #808080;
          }
          .el-tabs__active-bar {
            height: 0;
          }
          .el-tabs__item.is-active {
            color: #409eff;
          }
        }
      }
    }
  }
}

.el-cascader,
.el-select {
  width: 100%;
}
.tab-scroll {
  height: 500px;
}
.tab-scroll-part {
  height: 450px;
}
</style>
