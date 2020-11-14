<template>
  <div class="upop-maskbox">
    <div class="upop-mask"></div>
    <div class="upop">
      <p class="upop-title">恭喜你拆得</p>
      <slot></slot>
      <div class="upop-btn"
           @click="btndown">
        <p>知道了</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'redEnvelopesPop',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    btndown() {
      this.$emit('btndown')
    },
  },
  mounted() {
    console.log(this.isShow)
  },
  watch: {
  
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/pages/millionEnvelopes/css/util.styl'
.topmask
  height 100vh
  overflow hidden
  padding 0px
.upop-mask
  pst(fixed, 0px, 0px, 0px, 0px)
  z-index 98
  background #000000
  opacity 0.7
.upop
  pst(fixed, 0px, 0px, 0px, 0px)
  margin auto
  z-index 99
  width 504px
  height 598px
  background #FFF9E8
  background url('~@/assets/img/on.png') no-repeat
  background-size 100% 100%
.upop-title
  wh(100%)
  flexPst(center, center)
  padding 58px 0 0 0
  font-size 36px
  font-family PingFang SC
  font-weight 600
  color #9D1612
.upop-content
  padding-top 37px
  wh(100%, 51px)
  flexPst(center, flex-end)
  font-size 32px
  font-family PingFang SC
  font-weight 600
  color #F94322
  .cost
    height 51px
    display inline-block
    font-weight 600
    color #F94322
    line-height 42px
    font-size 68px
  .numtype
    margin-left 9px
.upop-txt
  // flexPst(center, center)
  text-align center
  padding-top 52px
  font-size 24px
  font-family PingFang SC
  font-weight 400
  color #999999
  padding 50px 100px
.upop-btn
  position absolute
  flexPst(center, center)
  bottom 62px
  width 100%
  p
    width 260px
    height 88px
    font-size 36px
    flexPst(center, center)
    font-weight 600
    color #9D1612
    background #FFD42D
    border-radius 44px
.upop-mask
  pst(fixed, 0px, 0px, 0px, 0px)
  z-index 98
  background #000000
  opacity 0.7
</style>