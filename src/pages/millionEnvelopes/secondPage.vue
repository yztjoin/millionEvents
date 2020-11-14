<template>
  <div class="secondPage">
    <div class="rewardpoolbox-theme">
      <img src="~@/assets/img/rt.png"
           alt=""
           :style="{transform: 'rotateZ(180deg)'}">
      <p>{{'第二阶段'}}</p>
      <img src="~@/assets/img/rt.png"
           alt="">
    </div>
    <div class="rewardpoolbox-themetxt">
      {{secondInfo.timerange}}，接单解锁奖励
    </div>
    <div class="rewardpoolbox-timeline-Reward">
      <img class="ext-little"
           src="~@/assets/img/start.png"
           alt="">
      <p><span :style="{width:(secondInfo.completedNmm/secondInfo.countNum)*100+'%'}"></span>
      </p>
      <div class="rewardpoolbox-timeline-Rewardbox">
        <div v-for="(item,index) in secondInfo.stageAward"
             :key="index">
          <img :src="require('@/assets/img/open-p1.png')"
               alt="">
          <span class="upuptxt"
                :class="{'upuptxt--before' :canExtract==item.id&&canExtract!==4,'upuptxt--next':(canExtract==item.id-1)||(canExtract==4&&item.id==4),'upuptxt--none':(canExtract!==item.id-1)}">提现{{item.Withdrawal*100}}%
          </span>
          <span>{{item.num}}单</span>
        </div>
      </div>
    </div>
    <p class="bottomtxt"
       v-if="secondInfo.completedNmm<20"> 再接<i class="ext-Highlight">{{5-secondInfo.completedNmm%5}}单</i>，就能提现<i
         class="ext-Highlight">{{canExtract == 0 ? secondInfo.stageAward[canExtract].Withdrawal*100:secondInfo.stageAward[canExtract-1].Withdrawal*100}}%</i>奖金池内奖励快去接单吧！ </p>
    <p class="bottomtxt"
       v-else-if="secondInfo.completedNmm==20"> 太棒了，您已经完成本次活动所有任务 可<i class="ext-Highlight">提现100%</i>奖金池内奖励！</p>
  </div>
</template>

<script>
export default {
  name: 'secondPage',
  data() {
    return {
      secondInfo: null,
      
    }
  },
  computed: {
    /**
     * @description: 计算现在的完成单数到达下一个节点需要的单数
     * @return {Number}
     */
    canExtract() {
      return Math.floor(this.secondInfo.completedNmm / 5)
    },
  },
  methods: {
    
  },
  created() {
    this.secondInfo = this.$parent.secondInfo
  },
  mounted() {
    console.log(this.canExtract)
  },
}
</script>

<style lang="stylus" scoped>
@import './css/util.styl'
@import './css/secondPage.styl'
</style>