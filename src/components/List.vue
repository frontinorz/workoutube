<template lang="pug">
  .wrapper(v-bind:class="{'wrapper__edit' : isScheduleAdd || isScheduleEdit}")
    ul.schedule__wrapper(v-bind:class="{'schedule__wrapper__edit' : isScheduleAdd || isScheduleEdit}")
      li.schedule.schedule__holder(v-bind:class="{'schedule__editing__hide' : isScheduleEdit }")
        input.schedule__title(placeholder="課表名稱" v-model="tempScheduleName")
        .schedule__btn__wrap
          button.btn.schedule__btn-delete(@click.prevent="scheduleCancel")
            i.fas.fa-times
          button.btn.schedule__btn-edit(@click.prevent="scheduleAdd" :disabled="!checkScheduleInput" v-bind:class="{'schedule__btn-op1' :　isScheduleAdd}")
            i.fas.fa-check
        .schedule__notice 點選動作卡片以加入課表
        .schedule__list__wrapper
          .schedule__list.schedule__list__edit(v-for="(a,i) in tempScheduleData")
            .btn.schedule__list__btn-delete(@click.prevent="tempScheduleItemsDelete(a)")
              i.fas.fa-times
            .schedule__list__exercise {{i+1}}. {{a.exercises}}
            .schedule__list__info
              .schedule__list__weight
                i.fas.fa-dumbbell
                input.schedule__list__input(type="number" pattern="[0-9]*" min="0" v-model="a.weight" placeholder="重量")
              .schedule__list__cycle
                i.fas.fa-sync-alt
                input.schedule__list__input(type="number" pattern="[0-9]*" min="0" v-model="a.set" placeholder="組數")
              .schedule__list__rep
                i.fas.fa-redo-alt
                input.schedule__list__input(type="number" pattern="[0-9]*" min="0" v-model="a.rep" placeholder="次數")
              .schedule__list__time
                i.fas.fa-stopwatch
                input.schedule__list__input(type="number" pattern="[0-9]*" min="0" v-model="a.time" placeholder="時間")
        .schedule__holder__overlay(v-show="!isScheduleAdd")
          button.btn__add(@click.prevent="scheduleNew")
            i.fas.fa-plus-circle

      li.schedule(v-for="(s, si) in scheduledata" v-bind:class="{'schedule__editing' : s.isEdit, 'schedule__editing__hide' : (!s.isEdit && isScheduleEdit) || isScheduleAdd }")
        input.schedule__title(type="text" v-model="s.schedule" :readonly="!s.isEdit")
        .schedule__btn__wrap
          button.btn.schedule__btn-delete(@click.prevent="scheduleDelete(s)" v-show="s.isEdit")
            i.far.fa-trash-alt
          button.btn.schedule__btn-edit(@click.prevent="scheduleEdit(s)" :disabled="s.schedule.trim() === '' || s.list.length === 0" v-show="!isScheduleAdd" v-bind:class="{'schedule__btn-op1' : s.isEdit}")
            i.fas(:class="{'fa-edit' : !s.isEdit, 'fa-check': s.isEdit}")
        .schedule__notice(v-show="s.isEdit") 點選動作卡片以加入課表
        .schedule__list__wrapper
          .schedule__list(v-for="(a,i) in s.list" :class="{'schedule__list__edit' : s.isEdit }")
            .btn.schedule__list__btn-delete(@click.prevent="scheduleItemsDelete(si,a)" v-show="s.isEdit")
                i.fas.fa-times
            .schedule__list__exercise {{i+1}}. {{a.exercises}}
            .schedule__list__info
              .schedule__list__item
                i.fas.fa-dumbbell
                input.schedule__list__input(type="number" pattern="[0-9]*" v-model="a.weight" placeholder="重量" :readonly="!s.isEdit")
              .schedule__list__item
                i.fas.fa-sync-alt
                input.schedule__list__input(type="number" pattern="[0-9]*" v-model="a.set" placeholder="組數" :readonly="!s.isEdit")
              .schedule__list__item
                i.fas.fa-redo-alt
                input.schedule__list__input(type="number" pattern="[0-9]*" v-model="a.rep" placeholder="次數" :readonly="!s.isEdit")
              .schedule__list__item
                i.fas.fa-stopwatch
                input.schedule__list__input(type="number" pattern="[0-9]*" v-model="a.time" placeholder="時間" :readonly="!s.isEdit")
    transition(name="fade")
      .card__wrapper(v-if="isScheduleAdd || isScheduleEdit")
        .search
          .search__bar
            input.search__input(type="text" placeholder="搜尋部位、動作......" v-model="searchKeyword")
        ul.card__list
          li.card__content(v-for="(d,i) in searchResualt", @click="scheduleItemsAdd(d)")
            .card__main
              .card__main__title {{d.muscle}}
              .card__main__subtitle {{d.exercises}}
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    exercisedata: {
      type: Array,
      default: [],
      required: true,
    },
    scheduledata: {
      type: Array,
      default: [],
      required: true,
    },
  },
  data() {
    return {
      scheduleNow: {},
      isScheduleAdd: false,
      isScheduleEdit: false,
      tempScheduleName: '',
      tempScheduleData: [],
      searchKeyword: '',
    };
  },
  computed: {
    searchResualt() {
      if (this.searchKeyword === '') {
        return this.exercisedata;
      }
      else{
        let temp = this.exercisedata.filter(d => d.muscle.toLowerCase().indexOf(this.searchKeyword) > -1 ||
                                            d.exercises.toLowerCase().indexOf(this.searchKeyword) > -1 );
        return temp;
      }
    },
    checkScheduleInput() {
      return (this.tempScheduleName !== '' && this.tempScheduleData.length !== 0);
    },
    // isEditing(){
    //   return this.isScheduleAdd || this.isScheduleEdit;
    // }
  },
  methods: {
    scheduleEdit(d) {
      this.scheduledata.forEach(data => { if (data !== d) data.isEdit = false; });
      d.isEdit = !d.isEdit;
      this.isScheduleEdit = !this.isScheduleEdit;
      this.isScheduleAdd = false;
      this.scheduleNow = d;
      localStorage.setItem('scheduledata', JSON.stringify(this.scheduledata));
    },
    scheduleDelete(d) {
      this.scheduledata.splice(this.scheduledata.indexOf(d), 1);
      this.isScheduleEdit = !this.isScheduleEdit;
      localStorage.setItem('scheduledata', JSON.stringify(this.scheduledata));
    },
    scheduleItemsAdd(d) {
      //console.log("Add : "+!this.isScheduleAdd +" Edit : "+!this.isScheduleEdit);
      if (this.isScheduleAdd || this.isScheduleEdit){
          let data = {
              exercises: d.exercises,
              weight: '',
              set: '',
              rep: '',
              time: ''
          };
          if (this.isScheduleAdd) this.tempScheduleData.push(data);
          if (this.isScheduleEdit) this.scheduleNow.list.push(data);
      }
    },
    scheduleItemsDelete(s, a) {
      this.scheduledata[s].list.splice(this.scheduledata[s].list.indexOf(a), 1);
      localStorage.setItem('scheduledata', JSON.stringify(this.scheduledata));
    },
    scheduleNew() {
      this.isScheduleAdd = true;
      this.isScheduleEdit = false;
      this.scheduledata.forEach(data => data.isEdit = false);
    },
    scheduleAdd() {
      //if (!this.checkScheduleInput) return;
      this.scheduledata.push({
          schedule: this.tempScheduleName,
          isEdit: false,
          list: this.tempScheduleData
      });
      localStorage.setItem('scheduledata', JSON.stringify(this.scheduledata));
      this.tempScheduleName = '';
      this.tempScheduleData = [];
      this.isScheduleAdd = false;
    },
    scheduleCancel() {
      this.tempScheduleName = '';
      this.tempScheduleData = [];
      this.isScheduleAdd = false;
    },
    tempScheduleItemsDelete(a) {
      this.tempScheduleData.splice(this.tempScheduleData.indexOf(a), 1);
    },
    resetData() {
      this.scheduledata.forEach(data => data.isEdit = false);
      this.tempScheduleName = '';
      this.tempScheduleData = [];
      this.isScheduleAdd = false;
      this.isScheduleEdit = false;
      this.$emit('resetData');
    },
  },
  beforeRouteLeave (to, from, next) {
    this.resetData();
    next();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_buttons.scss";

.wrapper{
  position: relative;
  width: 100%;
  //min-height: 100%;
  min-height: calc(100% - 10vh - 2rem);
  padding: 0px $pd-desktop-lg;
  @include breakpoint(desktop) {
    padding: 0px $pd-desktop;
  }
  @include breakpoint(tablet){
    padding: 0px $pd-tablet;
  }
  @include breakpoint(phone){
    padding: 0px $pd-phone/2;
  }
  &__edit{
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 2rem;
    @include breakpoint(tablet){
      grid-gap: 1rem;
    }
    @include breakpoint(phone){
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 2fr;

    }
  }
}
.schedule {
  position: relative;
  width: 100%;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 0px 20px rgba(black, 0.1);
  border-radius: 10px;
  text-align-last: left;
  transition: background 0.3s;
  @include breakpoint(phone){
    padding: $pd-phone;
  }
  &:hover {
    .schedule__btn-edit {
      opacity: 1;
    }
  }
  &__editing {
    background: lighten($color_editing, 20);
  }
  &__editing__hide{
    display: none;
  }
  &__wrapper {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    align-content: start;
    justify-items: center;
    color: black;
    @include breakpoint(desktop){
      grid-template-columns: 1fr;
    }
  }
  &__wrapper__edit{
    grid-template-columns: 1fr;
    @include breakpoint(phone){
      padding: 0.5rem;
    }
  }
  &__btn__wrap {
    position: absolute;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    font-size: 1.2rem;
    right: 20px;
    top: 15px;
  }
  &__btn-add {
    margin-top: 10px;
    text-align: center;
    font-size: 1.5rem;
  }
  &__btn-edit {
    opacity: 0;
    transition: opacity 0s;
    font-size: 1.2rem;
    @include breakpoint(tablet){
      opacity: 1;
    }
  }
  &__btn-delete {
    font-size: 1.2rem;
  }
  &__btn-op1 {
    opacity: 1;
  }
  &__title {
    width: 80%;
    border: none;
    font-size: 1.2rem;
    font-weight: 900;
    margin-bottom: 10px;
  }
  &__notice {
    color: #666666;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  &__holder {
    min-height: 150px;
    overflow: hidden;
    background: lighten($color_editing, 20);
  }
  &__holder__overlay {
    position: absolute;
    background: $color_default;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.schedule__list {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 10px 0px;
  border-bottom: 1px solid #eeeeee;
  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
  &__edit {
    grid-template-columns: 1.2rem 1fr 1fr;
  }
  &__btn-delete {
    color: $color_editing;
    i{
      margin-right: 1rem;
    }
  }
  &__exercise {
    justify-self: start;
    font-size: 1rem;
    min-width: 4rem;
    margin-right: 1rem;
  }
  &__info {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    grid-auto-flow: column;
  }
  &__item{
    display: grid;
    grid-auto-flow: column;
    justify-items: end;
    align-items: center;
  }
  &__input {
    max-width: 2rem;
    margin-left: 0.5rem;
    text-align: center;
    border: 1px solid #eeeeee;
    padding: 5px 0px;
    border: none;
    color: black;
    font-size: 1rem;
    &::placeholder {
      color: #dddddd;
    }
  }
}

.search {
  width: 100%;
  margin: 3.5rem auto;
  text-align: center;
  @include breakpoint(phone) {
    width: 100%;
  }

  &__bar {
    padding: 0.75rem 1.5rem;
    margin-bottom: 2rem;
    background: #fff;
    display: grid;
    grid-auto-flow: column;
    align-content: center;
    border-radius: 9999px;
  }
  &__input {
    width: calc(100% - 1.2rem);
    border: none;
    font-size: 1.1rem;
  }
  &__btnok {
    font-size: 1.2rem;
    justify-self: end;
    &:hover {
      color: $color_editing;
    }
  }
  &__fail {
    color: #aaaaaa;
    font-size: 1.1rem;
  }
}
.card__wrapper{
  height: 70vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 1rem 1rem;
  border: 1px solid #aaa;
  @include  breakpoint(phone) {
    max-height: 50vh;
    padding: 0.5rem;
  }
}
.card{
  &__list{
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr;
    @include  breakpoint(phone) {
      grid-gap: 0.5rem;
    }
  }
  &__content{
    position: relative;
    display: grid;
    grid-gap: 10px;
    align-content: center;
    justify-items: center;
    padding: 10px;
    color: #000;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(#000,.2);
  }
  &__main__title{
    font-weight: 900;
    font-size: 1.5rem;
  }
  &__main__subtitle{
    color: #000;
    font-size: 1.2rem;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
