<template lang="pug">
  #app
    SiteHeader
    transition(name="slide-fade" mode="out-in")
      router-view(:exercisedata="exercisedata", :scheduledata="scheduleList")
    SiteFooter
</template>

<script>
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const data = [
  {
    muscle: '背肌',
    exercises: '啞鈴三腳架划船',
    isVideo: true,
    video: {
      id: 'QZE80tfwy-c',
      startSec: '441',
    },
    note: '取站立姿勢，一手支撐，一手握啞鈴，雙腳約與肩同寬，膝蓋微蹲。划船時保持身體中立，收肩夾背。',
  },
  {
    muscle: '胸肌',
    exercises: '地板啞鈴飛鳥',
    isVideo: true,
    video: {
      id: 'NZSC43eLKnA',
      startSec: '274',
    },
    note: '用地板支撐可以使用更大的重量並加強離心作用，免除在握推椅上對肩膀施加壓力的風險',
  },
  {
    muscle: '肩膀',
    exercises: '站姿啞鈴肩推',
    isVideo: true,
    video: {
      id: 'NqfoCdw0gpE',
      startSec: '208',
    },
    note: '採用站姿，並用雙手同時進行以啟動更多的核心肌群。可以透過手臂以弧形的行程進行來加強肌肉收縮',
  },
];

const scheduleList = [
  {
    schedule: '大肌群訓練',
    isEdit: false,
    list: [
      {
        exercises: '啞鈴三腳架划船',
        weight: 10,
        set: 3,
        rep: 10,
        time: 0,
      },
      {
        exercises: '地板啞鈴飛鳥',
        weight: 16,
        set: 3,
        rep: 8,
        time: 0,
      },
      {
        exercises: '站姿啞鈴肩推',
        weight: 20,
        set: 3,
        rep: 6,
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
  font-family: 'Microsoft JhengHei', Helvetica, Arial, sans-serif;
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
  transition: all .1s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-to {
  //transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-enter {
  //transform: translateX(10px);
  opacity: 0;
}

</style>
