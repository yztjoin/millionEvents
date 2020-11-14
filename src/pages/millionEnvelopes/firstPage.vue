<template>
  <div class="firstPageView">
    <div class="rewardpoolbox-theme">
      <img src="~@/assets/img/rt.png"
           alt=""
           :style="{transform: 'rotateZ(180deg)'}">
      <p>{{firstStagePageInfo.theme}}</p>
      <img src="~@/assets/img/rt.png"
           alt="">
    </div>
    <div class="rewardpoolbox-themetxt">
      完成每日任务，拆红包纳入奖金池
    </div>
    <div class="rewardpoolbox-timeline">
      <div class="rewardpoolbox-timeline-line">
      </div>
      <div class="rewardpoolbox-timeline-top ext-border"
           v-show="!firstStagePageInfo.isend">
        <p><i class="ext-rewardnode ext-rewardnode--none"></i>明日 00:00-23:59</p>
        <span>完成7单，可获得奖金8~10元</span>
      </div>
      <div class="rewardpoolbox-timeline-content"
           :class='{"rewardpoolbox-timeline-islastcontent":index==rewardpool.length-1,"ext-border":index!==rewardpool.length-1}'
           v-for="(item,index) in rewardpool"
           :key="index">
        <p :style="{color:item.isday?'#980A06':'#999999'}"><i class="ext-rewardnode"
             :class="isNowDay(item)"></i>{{item.isday?'今日':`${new Date(item.day).getMonth()}:${new Date(item.day).getDate()}`}} 00:00-23:59</p>
        <div class="rewardpoolbox-timeline-Reward">
          <img class="ext-little"
               src="~@/assets/img/start.png"
               alt="">
          <p><span class="fillings" :style="{width:((item.completedNmm/9)*100)+'%'}"></span>
            <span class="upup"
                  :style="{left:(item.completedNmm/9*100)-1+'%'}">已接{{item.completedNmm}}单<img src="~@/assets/img/triangle.png"
                   alt=""></span>
          </p>
          <div class="rewardpoolbox-timeline-Rewardbox"
               v-for="(item1,itemindex) in item.stageAward"
               @click="receive(item1,index,itemindex)"
               :key="itemindex">
            <div v-if="item1.receive==1">
              <img :src="firstStagePageInfo.isend == false ? item.completedImg:require('@/assets/img/over-packet.png')"
                   alt="">
              <span :class="{iscompleted:!firstStagePageInfo.isend}">{{firstStagePageInfo.isend == false?'奖励':'3单'}}</span>
            </div>
            <div v-else-if="item1.receive==0">
              <img :src="item1.incompleteImg"
                   alt="">
              <span>3单</span>
            </div>
            <div v-else-if="item1.receive==2">
              <img :src="item1.src"
                   alt="">
              <span>3单</span>
            </div>
          </div>
        </div>
        <span class="rewardpoolbox-timeline-tiptxt"
              v-if="item.isday">{{todayTxt[0]}}<i>{{(item.completedNmm)%3==0?3:3-(item.completedNmm)%3}}单</i>{{todayTxt[1]}}</span>
        <span class="rewardpoolbox-timeline-tiptxt rewardpoolbox-timeline-tiptxt--notoday"
              v-if="item.isday==false">最终完成{{item.completedNmm}}单，获得X元奖金</span>
        <div class="btnbox"
             v-show="item.isday&&!firstStagePageInfo.isend">
          <div class="btn">去接单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'firstPage',
  props: {},
  data() {
    return {
      isToday: false,
      firstStagePageInfo: null,
      rewardpool: null,
      todayTxt: ['加把劲，再完成', '即可拆随机现金红包'],

    }
  },
  methods: {
    
    receive(item, index, itemindex) {
      if (this.firstStagePageInfo.isend == true) return
      if (item.receive === 1) {
        this.$parent.ShowPop()
        this.rewardpool[index].stageAward[itemindex].receive = 2
        if (Object.keys(item).indexOf('Ub') !== -1) {
          this.$emit('numChange', {
            Ub: item.Ub,
            numtype: 'U币',
          })
        } else if (Object.keys(item).indexOf('Ud') !== -1) {
          this.$emit('numChange', {
            Ud: item.Ud,
            numtype: 'U点',
          })
        } else if (Object.keys(item).indexOf('yuan') !== -1) {
          this.$emit('numChange', {
            yuan: item.yuan,
            numtype: '奖励金',
          })
        }
      }
    },
    isNowDay(item) {
      let nowDay = new Date()
      let day = new Date(item.day)
      if (
        day.getDay() == nowDay.getDay() &&
        day.getFullYear() == nowDay.getFullYear() &&
        day.getMonth() == nowDay.getMonth()
      ) {
        this.isToday = true
        return {
          'ext-rewardnode--true': true,
        }
      } else {
        this.isToday = false
        return {
          'ext-rewardnode--none': true,
        }
      }
    },
  },
  created() {
    this.firstStagePageInfo = this.$parent.firstStagePageInfo
    this.rewardpool = this.$parent.rewardpool
  },
  mounted() {},
}
</script>

<style lang="stylus" scoped>
@import './css/util.styl'
@import './css/firstPage.styl'
@import './css/ext-style.styl'
.firstPageView
  background #fff
  border-radius 0 0 16px 16px 
  margin-top -2px
</style>