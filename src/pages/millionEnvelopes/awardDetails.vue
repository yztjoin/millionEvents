<template>
  <div class="scrollTopbox">
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll"
                   :options="options"
                   @pulling-down="onPullingDown"
                   @pulling-up="onPullingUp">
        <div class="awardetailsbox"
             v-for="(i,index) in awardInfo"
             :key="index">
          <div>
            <p>{{i.typeTxt}}</p>
            <span>{{i.time}}</span>
          </div>
          <div class="getnum">
            ¥{{i.count}}
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import rem from '@/tools/tools.js'
export default {
  name: 'awardDeails',
  data() {
    return {
      pullDownRefreshObj: {
        threshold: 60,
        stop: 40,
        txt: '更新成功',
      },
      pullUpLoadObj: {
        threshold: 60,
        stop: 40,
      },
      awardInfo: [
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
      ],
      addInfo: [
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
        {
          typeTxt: '获得奖励金',
          time: '2019-11-28 13:01',
          count: '10.00',
        },
      ],
    }
  },
  methods: {
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        this.$refs.scroll.forceUpdate()
      }, 1000)
    },
    onPullingUp() {
      // 模拟更新数据
      this.$refs.scroll.refresh()
      setTimeout(() => {
        // 如果没有新数据
        console.log('加载完成')
        setTimeout(() => {
          this.awardInfo.push(...this.addInfo)
          console.log(this.awardInfo.length)
          this.$refs.scroll.refresh()
        })
        this.$refs.scroll.forceUpdate()
      }, 1000)
    },
  },
  computed: {
    options() {
      return {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: false,
      }
    },
  },
  mounted() {
    this.$refs.scroll.$el.getElementsByClassName(
      'cube-pulldown-loaded'
    )[0].style.fontSize = `${rem(28)}rem`
  },
}
</script>

<style lang="stylus" scoped>
@import './css/util.styl'
.scrollTopbox
  background #F8F8F8
  padding 30px 30px 0px 30px
  box-sizing border-box
  width 100%
  height 100%
.scroll-list-wrap
  background #fff
  height 100%
.awardetailsbox
  flexPst(space-between, center)
  padding 53px 30px 0 30px
  background #fff
  div
    font-size 30px
    font-weight 400
    color #444444
  p
    margin-bottom 8px
  span
    font-size 24px
    font-weight 400
    color #999999
  .getnum
    font-size 32px
    font-weight 500
    color #EF4C3C
.cube-pulldown-loaded span
  font-size 20px
</style>