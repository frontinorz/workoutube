<template lang="pug">

.container
  .search
    .search__bar
      input.search__input(type="text" placeholder="搜尋部位、動作......" v-model="searchInput" @keyup.enter="searchCard")
      button.search__btnok(@click.prevent="searchCard")
        i.fas.fa-search
    .search__fail(v-show="searchResualt.length === 0") 找不到有關 "{{searchKeyword}}" 的結果

  ul.card__wrapper
    li.card__content.card__content-holder
      button.btn.btn__done(@click.prevent="addWorkout" :disabled="!checkCardInput")
        i.fas.fa-check
      button.btn.btn__cancel(@click.prevent="cancelAddWorkout")
        i.fas.fa-times
      .card__main
          input.card__main__title.card__title-input(type="text" list="muscleList" v-model="tempMuscle" placeholder="訓練部位")
          datalist(id="muscleList")
            option(v-for="d in muscleList" :value="d")
          input.card__subtitle-input(type="text" v-model="tempExercises" placeholder="訓練動作")
      .card__content-overlay(v-show="!isAdd")
          button.btn__add(@click.prevent="addCard")
            i.fas.fa-plus-circle
    li.card__content(v-for="(d,i) in searchResualt")
      .card__main
          .card__main__title {{d.muscle}}
          .card__main__subtitle {{d.exercises}}
      button.btn.btn__more(@click.prevent="overlayOpen(d)")
          i.fas.fa-angle-down
  transition(name="fade")
    CardOverlay(v-show="isOverlay", :overlay="datanow",  ref="overlay",
                v-on:close="closeOverlay",
                v-on:deleteCard="deleteWorkout",
                v-on:addVideo="dataAddVideo")

</template>

<script>
import CardOverlay from '@/components/cardOverlay';

export default {
  name: 'card',
  components: {
    CardOverlay,
  },
  props: {
    exercisedata: {
      type: Array,
      default: [],
      required: true,
    },
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      isAdd: false,
      isOverlay: false,
      datanow: {},
      tempMuscle: '',
      tempExercises: '',
      searchInput: '',
      searchKeyword: '',
    };
  },
  created() {
    //console.log(this.exercisedata);
  },
  computed: {
    checkCardInput() {
      return (this.tempMuscle !== '' && this.tempExercises !== '');
    },
    muscleList() {
      let obj = this.exercisedata.reduce((sum, d) => {
        if (!sum[d.muscle]) sum[d.muscle] = 0;
        return sum;
      }, {});
      let arr = [];
      if(obj.length !== 0 ){
        for (let i in obj) {
          arr.push(i);
        }
      }
      return arr;
    },
    searchResualt() {
      if (this.searchKeyword === '') {
        return this.dataSort(this.exercisedata);
      }
      else{
        let temp = this.exercisedata.filter(d => d.muscle.toLowerCase().indexOf(this.searchKeyword) > -1 ||
                                            d.exercises.toLowerCase().indexOf(this.searchKeyword) > -1 );
        if(temp.length === 0){
            this.isSearchResult = false;
        }else{
            this.isSearchResult = true;
            return this.dataSort(temp);
        }
      }
    }
  },
  methods: {
    addCard() {
      this.isAdd = true;
    },
    addWorkout() {
      const work = {
        muscle: this.tempMuscle,
        exercises: this.tempExercises,
      };
      this.exercisedata.push(work);
      this.isAdd = false;
      this.resetCardInput();
      localStorage.setItem('exercisedata', JSON.stringify(this.exercisedata));
    },
    cancelAddWorkout() {
      this.isAdd = false;
      this.resetCardInput();
    },
    deleteWorkout() {
      this.exercisedata.splice(this.exercisedata.indexOf(this.datanow), 1);
      localStorage.setItem('exercisedata', JSON.stringify(this.exercisedata));
      this.isOverlay = false;
    },
    dataAddVideo(temp) {
      this.datanow.isVideo = true;
      if (!this.datanow.video) this.datanow.video = {};
      this.datanow.video.id = temp.videoId;
      this.datanow.video.startSec = temp.startSec;

      localStorage.setItem('exercisedata', JSON.stringify(this.exercisedata));
    },
    resetCardInput() {
      this.tempMuscle = '';
      this.tempExercises = '';
    },
    searchCard() {
      this.searchKeyword = this.searchInput.trim();
    },
    dataSort(data) {
      return data.sort((a, b) => a.muscle.localeCompare(b.muscle, 'zh-Hans-CN', {
                  sensitivity: 'accent'
                }));
    },
    overlayOpen(d){
      this.isOverlay = true;
      this.datanow = d;
      if(d.isVideo) this.$refs.overlay.playerSet(d.video.id, d.video.startSec);
    },
    closeOverlay() {
      this.isOverlay = false;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/style/_buttons.scss";

.container{
  width: 100%;
  min-height: calc(100% - 10vh - 2rem);
  position: relative;
  padding: 0px $pd-desktop-lg;
  @include breakpoint(desktop) {
    padding: 0px $pd-desktop;
  }
  @include breakpoint(tablet){
    padding: 0px $pd-tablet;
    font-size: 14px;
  }
  @include breakpoint(phone){
    padding: 0px $pd-phone;
    font-size: 12px;
  }
}
.card{
  &__wrapper{
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(150px,1fr));
      @include breakpoint(tablet){
      grid-template-columns: 1fr 1fr;
    }
    @include breakpoint(phone){
      grid-template-columns: 1fr;
    }
  }
  &__content{
    position: relative;
    display: grid;
    grid-gap: 20px;
    align-content: center;
    justify-items: center;
    padding: 30px 10px;
    padding-bottom: 20px;
    color: #000;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(#000,.2);
    transition: 0.3s;
    @include breakpoint(tablet){
      padding: $pd-tablet/2;
      grid-gap: $pd-tablet/2;
    }
    @include breakpoint(phone){
      padding: $pd-phone;
      grid-gap: $pd-phone/2;
      padding: $pd-phone;
      padding-bottom: 0;
    }
  }
  &__content-holder{
    overflow: hidden;
    background: $color_editing;
  }
  &__content-overlay{
    display: grid;
    align-items: center;
    justify-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background: $color_default;
    z-index: 10
  }
  &__main{
    position: relative;
    justify-self: center;
    text-align: center;
    letter-spacing: 1px;
    width: 80%;
  }
  &__main__title{
    width: 100%;
    text-align: center;
    color: #000;
    font-weight: 900;
    font-size: 1.5rem;
    margin-bottom: 5px;
    border: none;
    &::placeholder{
      color: #ccc;
    }
  }
  &__title-input{
    color: #eee;
    padding-left: 2rem;
  }
  &__main__subtitle{
    width: 100%;
    text-align: center;
    color: #000;
    font-size: 1.2rem;
    border: none;
  }
  &__subtitle-input{
    width: 100%;
    text-align: center;
    color: #eee;
    border: none;
    font-size: 1.2rem;
    &::placeholder{
      color: #ccc;
    }
  }
}
.search{
  width: 50%;
  margin: 0px auto;
  margin-bottom: 3.5rem;
  text-align: center;
  @include breakpoint(tablet){
    width: 80%;
  }
  &__bar{
    padding: 0.75rem 1.5rem;
    margin-bottom: 2rem;
    background: #fff;
    display: grid;
    grid-auto-flow: column;
    align-content: center;
    border-radius: 9999px;
  }
  &__input{
    width: calc(100% - 1.2rem);
    border: none;
    font-size: 1.1rem;
  }
  &__btnok{
    font-size: 1.2rem;
    justify-self: end;
    &:hover{
      color: $color_editing;
    }
  }
  &__fail{
    color: #aaa;
    font-size: 1.1rem;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
