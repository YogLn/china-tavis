<template>
  <div class="loginFooter">
    <span class="copyright">
      <a href="https://beian.miit.gov.cn">Copyright © 2020|蜀ICP备20002299号</a>
    </span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.loginFooter {
  width: 100%;
  height: 25px;
  position: fixed;
  display: flex;
  background-color: #e8eaed;
  bottom: 0;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  .copyright {
    color: gray;
  }
  a {
    text-decoration: none;
  }
}
</style>