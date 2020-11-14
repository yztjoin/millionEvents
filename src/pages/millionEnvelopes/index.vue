<template>
  <div class="boxtop"
       :style="{backgroundImage:'url('+this.firstStagePageInfo.background+')',backgroundColor:firstStagePageInfo.bgcolor}">
    <p class="titletxt">{{firstStagePageInfo.titleTxt}}</p>
    <div class="adsorbentbtn adsorbentbtn--rule"
         ref="asd">活动规则</div>
    <div class="adsorbentbtn adsorbentbtn--reward"
         @click="toDetail">奖励明细</div>
    <div class="rewardpool">
      <div class="rewardpoolbox">
        <div style="background:#fff">
          <div class="rewardpoolbox-title">
            <img :src="allTimeOver? require('@/assets/img/over.png'):require('@/assets/img/ing.png')"
                 alt="">
            <span>我的奖金池</span>
            <p><i>提现规则</i><img src="~@/assets/img/arrow.png"
                   alt=""></p>
          </div>
          <div class="rewardpoolbox-countdown"
               v-show="firstStagePageInfo.isend&&!isWithdrawaltime">
            <p>提现倒计时<i>{{h}}</i>时<i>{{m}}</i>分<i>{{s}}</i>秒</p>
          </div>
          <div v-show='isWithdrawaltime'
               class="rewardpoolbox-Withdrawaltime">
            奖金池提现{{2020}}年{{11}}月{{12}}日开启
          </div>
          <div class="rewardpoolbox-assetsnum">
            <p><span>{{firstStagePageInfo.Ud}}</span><i>U点</i></p>
            <p><span>{{firstStagePageInfo.yuan}}</span><i>奖励金(元)</i></p>
            <p><span>{{firstStagePageInfo.Ub}}</span><i>U币</i></p>
          </div>
          <div class="rewardpoolbox-Withdrawalbtn"
               :class="{'rewardpoolbox-Withdrawalbtn--got':gotCash}"
               @click="getCash()"
               v-show="firstStagePageInfo.isend&&!isWithdrawaltime">提现</div>

          <div class="rewardpoolbox-line">
            <div :style="{transform: 'translateX(-50%)',left:'0px',backgroundColor:firstStagePageInfo.bgcolor}"></div>
            <p class="ext-border"></p>
            <div :style="{transform: 'translateX(50%)',backgroundColor:firstStagePageInfo.bgcolor,right:'0px'}"></div>
          </div>
        </div>
        <secondPageView ref="secondPageCom"
                        v-show="!secondInfo.isend"></secondPageView>
        <firstPageView @numChange='numChange'
                       :class="{firstPage:firstStagePageInfo.isend}"></firstPageView>
      </div>
    </div>
    <redPopView v-show="isFirstShowPop"
                @btndown='btndown'>
      <p class="upop-content"><span class="cost">{{getNum}}</span><span class="numtype">{{numtype}}</span></p>
      <p class="upop-txt">您拆得的奖励已经放入您的奖金池</p>
    </redPopView>
    <redPopView v-show="isShowEndPop"
                @btndown='isShowEndPop=!isShowEndPop'>
      <div class="upop-endcontent">
        <div>
          <p>{{secondRich.Ud}}</p>
          <span>U点</span>
        </div>
        <div>
          <p>{{secondRich.yuan}}</p>
          <span>奖励金(元)</span>
        </div>
        <div>
          <p>{{secondRich.Ub}}</p>
          <span>U币</span>
        </div>
      </div>
      <p class="upop-txt-endstage">
        您第二阶段接单{{secondInfo.completedNmm}}单，可提现{{(secondInfo.completedNmm>=5?secondInfo.stageAward[Math.floor(secondInfo.completedNmm/5)-1].Withdrawal:secondInfo.stageAward[0])*100}}%奖金池，现金和U币可以在您的账户中查看，U点将在12月12日到账
      </p>
    </redPopView>
    <button @click="first">第一阶段</button><button @click="second">第二阶段</button><button @click="tixian">提现阶段</button>
  </div>
</template>

<script>
import firstPageView from './firstPage'
import secondPageView from './secondPage'
import redPopView from '@/components/redEnvelopesPop'
export default {
  data() {
    return {
      allTimeOver:false,
      isWithdrawaltime: false,
      gotCash: false,
      isShowEndPop: false,
      isFirstShowPop: false, // 弹窗开关
      getNum: 0, // 已经获取的奖励数
      numtype: null, // 奖励的类型
      h: '',
      m: '',
      s: '',
      Withdrawaltime: '2020-11-13 17:51',
      timer: null,
      secondRich: {
        Ub: 0,
        Ud: 0,
        yuan: 0,
      },
      firstStagePageInfo: {
        // 页面信息
        isend: false, // 是否结束
        background: require('@/assets/img/banner.png'), // 引入头部的背景图
        titleTxt: '第二阶段满单提现奖金池', // 头部文字信息
        theme: '第一阶段', // 阶段文字
        Ud: 314, // u点
        yuan: 512.12, // 奖励金
        Ub: 1234, // u币
        bgcolor: '#F9180B', // 整个的背景颜色
      },
      rewardpool: [
        // 接单红包的奖励信息
        {
          isday: true,
          day: '2020-11-11', // 当天日期
          completedNmm: 9, // 完成单数
          total: 9, // 完成所有奖励的总共单数
          completedImg: require('@/assets/img/ing-packet.png'), // 完成状态的图片
          stageAward: [
            // 每一个阶段的奖励信息
            {
              receive: 1,
              index: 3,
              src: require('@/assets/img/open-coin.png'),
              incompleteImg: require('@/assets/img/close-coin.png'),
              Ub: 4,
            },
            {
              receive: 1,
              index: 6,
              src: require('@/assets/img/open-udot.png'),
              incompleteImg: require('@/assets/img/close-udot.png'),
              Ud: 4,
            },
            {
              receive: 1,
              index: 9,
              src: require('@/assets/img/open-package.png'),
              incompleteImg: require('@/assets/img/close-package.png'),
              yuan: 3.1,
            },
          ],
        },
        {
          isday: false,
          day: '2020-11-10',
          completedNmm: 8,
          total: 9,
          completedImg: require('@/assets/img/ing-packet.png'),
          stageAward: [
            {
              receive: 1,
              index: 3,
              src: require('@/assets/img/open-coin.png'),
              incompleteImg: require('@/assets/img/close-coin.png'),
              Ub: 4,
            },
            {
              receive: 1,
              index: 6,
              src: require('@/assets/img/open-udot.png'),
              incompleteImg: require('@/assets/img/close-udot.png'),
              Ud: 4,
            },
            {
              receive: 0,
              index: 9,
              src: require('@/assets/img/open-package.png'),
              incompleteImg: require('@/assets/img/close-package.png'),
              yuan: 3.1,
            },
          ],
        },
        {
          isday: false,
          day: '2020-10-09',
          completedNmm: 3,
          total: 9,
          completedImg: require('@/assets/img/ing-packet.png'),
          stageAward: [
            {
              receive: 1,
              index: 3,
              src: require('@/assets/img/open-coin.png'),
              incompleteImg: require('@/assets/img/close-coin.png'),
              Ub: 4,
            },
            {
              receive: 0,
              index: 6,
              src: require('@/assets/img/open-udot.png'),
              incompleteImg: require('@/assets/img/close-udot.png'),
              Ud: 4,
            },
            {
              receive: 0,
              index: 9,
              src: require('@/assets/img/open-package.png'),
              incompleteImg: require('@/assets/img/close-package.png'),
              yuan: 3.1,
            },
          ],
        },
        {
          isday: false,
          day: '2020-11-08',
          completedNmm: 0,
          total: 9,
          completedImg: require('@/assets/img/ing-packet.png'),
          stageAward: [
            {
              receive: 0,
              index: 3,
              src: require('@/assets/img/open-coin.png'),
              incompleteImg: require('@/assets/img/close-coin.png'),
              Ub: 4,
            },
            {
              receive: 0,
              index: 6,
              src: require('@/assets/img/open-udot.png'),
              incompleteImg: require('@/assets/img/close-udot.png'),
              Ud: 4,
            },
            {
              receive: 0,
              index: 9,
              src: require('@/assets/img/open-package.png'),
              incompleteImg: require('@/assets/img/close-package.png'),
              yuan: 3.1,
            },
          ],
        },
      ],
      secondInfo: {
        isend: true,
        timerange: '10.10-10.22', // 活动日期范围
        completedNmm: 12, // 完成单数
        countNum: 20, // 完成所有奖励的总共单数
        stageAward: [
          // 奖励图片状态信息
          {
            id: 1,
            Withdrawal: 0.1,
            num: 5,
          },
          {
            id: 2,
            Withdrawal: 0.3,
            num: 10,
          },
          {
            id: 3,
            Withdrawal: 0.5,
            num: 15,
          },
          {
            id: 4,
            Withdrawal: 1,
            num: 20,
          },
        ],
      },
    }
  },
  components: {
    firstPageView,
    secondPageView,
    redPopView,
  },
  computed: {
    timeEnd() {
      return this.secondInfo.isend && this.firstStagePageInfo.isend
    },
    
  },
  methods: {
    isallTimeOver() {
      let date1
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        date1 = new Date(this.Withdrawaltime.replace(/-/g, '/'))
      } else {
        date1 = new Date(this.Withdrawaltime)
      }
      let nowDate = new Date()
      let range = date1 - nowDate
      if (range > 0) {
        return false
      } else {
        return true
      }
    },
    timeNum(endtime, fn) {
      let date1
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        date1 = new Date(endtime.replace(/-/g, '/'))
      } else {
        date1 = new Date(endtime)
      }
      let nowDate = new Date()
      let range = date1 - nowDate
      if (range <= 0) {
        this.s = 0
        this.m = 0
        this.h = 0
        this.initTime()
        fn()
        return
      }
      this.s = parseInt(range / 1000) % 60
      this.m = parseInt(parseInt(range / 1000) / 60) % 60
      this.h = parseInt(parseInt(parseInt(range / 1000) / 60) / 60)
      this.initTime()
      this.countDown(fn)
    },
    countDown(fn) {
      this.timer = setInterval(() => {
        if (parseInt(this.s) <= 0) {
          if (parseInt(this.m) > 0) {
            this.m = parseInt(this.m) - 1
            this.s = 59
          } else if (parseInt(this.m) == 0 && parseInt(this.h) > 0) {
            this.m = 59
            this.s = 59
            this.h = parseInt(this.h) - 1
          } else {
            clearInterval(this.timer)
            this.timer = null
            this.isTimeUp = true
            fn()
          }
        }
        if (
          parseInt(this.m) == 0 &&
          parseInt(this.s) == 0 &&
          parseInt(this.h) == 0
        ) {
          this.s = 0
        } else {
          this.s = parseInt(this.s) - 1
        }
        this.initTime()
      }, 1000)
    },
    // 格式化时间
    initTime() {
      this.s = ('0' + this.s).slice(-2)
      this.m = ('0' + this.m).slice(-2)
      this.h = ('0' + this.h).slice(-2)
    },
    btndown() {
      this.isFirstShowPop = !this.isFirstShowPop
    },
    toDetail() {
      this.$router.push({
        path: '/awardDeails',
      })
    },
    getCash() {
      if (this.gotCash) return
      this.isShowEndPop = !this.isShowEndPop
      this.secondRich.Ub = this.firstStagePageInfo.Ub
      this.secondRich.Ud = this.firstStagePageInfo.Ud
      if (this.secondInfo.completedNmm >= 5) {
        this.secondRich.yuan = (
          this.secondInfo.stageAward[
            Math.floor(this.secondInfo.completedNmm / 5) - 1
          ].Withdrawal * this.firstStagePageInfo.yuan
        ).toFixed(2)
      } else {
        this.secondRich.yuan = 0
      }
      this.gotCash = true
    },
    numChange(obj) {
      let arr = Object.keys(obj)
      this.firstStagePageInfo[arr[0]] += obj[arr[0]]
      this.getNum = obj[arr[0]]
      this.numtype = obj[arr[1]]
    },
    ShowPop() {
      this.isFirstShowPop = !this.isFirstShowPop
    },
    first() {
      this.firstStagePageInfo.isend = false
      this.secondInfo.isend = true
    },
    tixian() {
      this.firstStagePageInfo.isend = true
      this.isWithdrawaltime = false
      this.secondInfo.isend = false
      clearInterval(this.timer)
      this.timer = null
      console.log(this.timer)
      this.timeNum(this.Withdrawaltime, () => {
        this.gotCash = true
        this.isTimeEnd = true
        this.allTimeOver = true
        console.log('时间到了')
      })
    },
    second() {
      this.firstStagePageInfo.isend = true
      this.secondInfo.isend = false
      this.isWithdrawaltime = true
    },
  },
  created() {},
  mounted() {
    this.allTimeOver = this.isallTimeOver()
    if (this.allTimeOver) {
      this.firstStagePageInfo.isend = true
      this.secondInfo.isend = false
      this.isWithdrawaltime = false
      this.gotCash = true
    }
    this.timeNum(this.Withdrawaltime, () => {
      this.gotCash = true
      this.allTimeOver = true
      console.log('时间到了')
    })
  },
}
</script>

<style lang="stylus" scoped>
@import './css/util.styl'
@import './css/index.styl'
.firstPage
  margin 20px 0px
  border-radius 16px
</style>