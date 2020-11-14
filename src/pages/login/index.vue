<template>
  <div class="loginTop">
    <p class="bigtitletxt">UU新商业合伙人</p>
    <p class="titletxt">十亿寻找稀缺合伙人</p>
    <main>
      <div class="header">
        <div class="header-userregistbtn"
             @click="isUser"
             :class="{'ext-active':isState==0,'ext-static':!isState==0}">
          用户注册
        </div>
        <div class="header-runregistben"
             @click="isRun"
             :class="{'ext-static':!isState==1,'ext-active':isState==1}">
          跑男注册
        </div>
      </div>
      <div class="content">
        <div class='fill-itme'>
          <p></p>
          <p></p>
          <p></p>
        </div>
        <div class="fill"
             :class="{'fill--user':isState==0,'fill--run':isState==1}">
          <div class="cnetnet-runregist ext-border"
               v-show="isState==1">
            <div class="cnetnet-runregist-title">密码<i>(用于跑男注册)</i></div>
            <div class="cnetnet-runregist-input"><input type="text"
                     placeholder="6-22位，数字+字母组合，需字母开头"
                     ref="input"
                     v-model="inputxt"
                     maxlength="22">
              <img src="~@/assets/loginimg/clear.png"
                   alt=""
                   v-show="inputxt!==''"
                   @click="clearinput">
            </div>
          </div>
          <div class="content-numberregist"
               :class="{'content-numberregist--user':isState==0,'content-numberregist--run':isState==1}">
            <p class="content-numberregist-btn"
               :class="{'content-numberregist-btn--yes':inputxt.length>=6||isState==0,'content-numberregist-btn--none':inputxt.length<6&&isState==1}">
              本机号码一键注册
            </p>
          </div>
          <div class="content-agreementtxt">
            登录成功即同意<i>《注册协议》</i>和<i>《隐私政策》</i>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      isState: 0,
      showClearBtn: false,
      inputxt: '',
    }
  },
  methods: {
    isUser() {
      this.isState = 0
    },
    isRun() {
      this.isState = 1
    },
    clearinput() {
      this.inputxt = ''
    },
  },
  mounted() {
    const requireAll = (context) => context.keys().map(context)

    const component = require.context(
      '@/pages/millionEnvelopes',
      false,
      /\.vue$/
    )
    console.log(component(component.keys()[0]))
  },
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>