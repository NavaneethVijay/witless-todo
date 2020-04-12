<template>
  <v-app dark>
    <div class="layout-main">
      <Loader />
      <Header class="header" />
      <nuxt class="nuxt-content-main" />
      <BottomSheet />
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '@/components/Header'
import Loader from '@/components/Loader'
import BottomSheet from '@/components/BottomSheet'
export default {
  components: {
    Header,
    Loader,
    BottomSheet
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/getUserStatus'
    })
  }
}
</script>

<style>
.layout-main {
  margin-bottom: 50px;
}
.nuxt-content-main {
  position: relative;
  padding: 10px;
  margin: 10px;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
