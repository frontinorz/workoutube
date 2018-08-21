<template lang="pug">
  #app
    SiteHeader
    //transition(name="slide-fade")
    router-view(:exercisedata="exercisedata", :scheduledata="scheduleList")
    SiteFooter
</template>

<script>
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const data = [
  {
    muscle: '背肌',
    exercises: '啞鈴划船',
    isVideo: true,
    video: {
      id: 'N3z3DjxXpE4',
      startSec: '184',
    },
    note: '',
  },
  {
    muscle: '胸肌',
    exercises: '平躺臥推',
    isVideo: true,
    video: {
      id: 'Mub2i2BoHpM',
      startSec: '50',
    },
    note: '筆記一',
  },
  {
    muscle: '肩膀',
    exercises: '啞鈴側舉',
    isVideo: false,
  },
];

const scheduleList = [
  {
    schedule: '背肌Day',
    isEdit: false,
    list: [
      {
        exercises: '啞鈴硬舉',
        weight: 20,
        set: 3,
        rep: 4,
        time: 0,
      },
      {
        exercises: '啞鈴划船',
        weight: 10,
        set: 3,
        rep: 12,
        time: 0,
      },
      {
        exercises: '啞鈴飛鳥',
        weight: 10,
        set: 3,
        rep: 12,
        time: 0,
      },
    ],
  },
  {
    schedule: '胸肌Day',
    isEdit: false,
    list: [
      {
        exercises: '平躺啞鈴推舉',
        weight: 20,
        set: 3,
        rep: 4,
        time: 0,
      },
      {
        exercises: '平躺啞鈴飛鳥',
        weight: 10,
        set: 3,
        rep: 12,
        time: 0,
      },
      {
        exercises: '槓片夾心',
        weight: 4,
        set: 3,
        rep: 15,
        time: 0,
      },
    ],
  },
];
export default {
  name: 'App',
  components: {
    SiteHeader,
    SiteFooter,
  },
  data() {
    return {
      exercisedata: JSON.parse(localStorage.getItem('exercisedata')) || data,
      scheduleList: JSON.parse(localStorage.getItem('scheduledata')) || scheduleList,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";

#app {
  font-family: 'Avenir','微軟正黑體', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100%;
  font-size: 16px;
  padding-top: calc(10vh + 2rem);
  @include breakpoint(tablet){
    font-size: 14px;
  }
  @include breakpoint(phone){
    font-size: 12px;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}

</style>
