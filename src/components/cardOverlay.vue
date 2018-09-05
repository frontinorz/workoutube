<template lang="pug">
.container__overlay
    h1 {{overlay.title}}
    .more
        .more__header
            .more__btngroup
                button.btn.more__btn__delete(@click="deleteCard")
                    i.far.fa-trash-alt
                button.btn.more__btn__close(@click="close")
                    i.fas.fa-times
            .more__title {{overlay.muscle}}
            .more__subtitle {{overlay.exercises}}
            .more__hr

        .more__content(v-bind:class="{'more__content__novideo' : !overlay.isVideo}")
            .more__video__inputwrap
                .more__video__input Youtube分享連結
                    input(type="text" placeholder="https://youtu.be/......" v-model="temp.videoId" v-bind:class="{'more__video__input-error' : !checkVideoId}")
                .more__video__input 開始時間
                    input.input-2num(type="number" pattern="[0-9]*" placeholder="00" v-model="temp.startMin" min="0" max="59")
                    |分
                    input.input-2num(type="number" pattern="[0-9]*" placeholder="00" v-model="temp.startSec" min="0" max="59")
                    |秒
                    button.more__video__input__btnok(@click.prevent="addVideo" , :class="{'more__video__input__btnok-disable' : !checkVideoId}" :disabled="!checkVideoId") 加入影片
            .more__player__wrapper(v-show="overlay.isVideo")
                youtube(ref="youtube",width="100%", height="100%")
            .more__content__note
                textarea(placeholder="輸入筆記......" v-model="overlay.note")
</template>

<script>
export default {
    name: 'cardoverlay',
    props: {
        overlay: {
            type: Object,
            default:{},
            required: true,
        },
    },
    data() {
        return {
            temp:{
                videoId: '',
                startMin: '',
                startSec: '',
            }
        };
    },
    computed:{
        checkVideoId() {
            return /^(https\:\/\/youtu\.be\/)/.test(this.temp.videoId);
        },
        player () {
            return this.$refs.youtube.player;
        },
    },
    methods: {
        playerSet(id, startSec) {
            this.player.cueVideoById(id, startSec);
        },
        close() {
            //從子元件向上層註冊事件
            this.$emit('close')
            this.player.stopVideo();
        },
        deleteCard() {
            this.$emit('deleteCard');
            this.player.stopVideo();
        },
        dataTimeTrans() {
            this.temp.startSec = parseInt(this.temp.startSec) || 0;
            this.temp.startMin = parseInt(this.temp.startMin) || 0;
            if (this.temp.startSec > 59 || this.temp.startSec < 0) this.temp.startSec = 0;
            if (this.temp.startMin > 59 || this.temp.startMin < 0 ) this.temp.startMin = 0;
            return this.temp.startSec + this.temp.startMin * 60;
        },
        dataVideoIdTrans() {
            return this.temp.videoId.replace('https://youtu.be/', '');
        },
        addVideo() {
            this.temp.videoId = this.dataVideoIdTrans();
            this.temp.startSec = this.dataTimeTrans();
            this.$emit('addVideo', this.temp);

            this.playerSet(this.temp.videoId, this.temp.startSec);
            this.temp.videoId = '';
            this.temp.startSec = '';
            this.temp.startMin = '';
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/style/_buttons.scss";

.container__overlay{
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.6);
    left: 0;
    top: 0;
    z-index: 50;
    @include breakpoint(tablet){
        font-size: 14px;
    }
    @include breakpoint(phone){
        font-size: 12px;
    }
}
.input-2num{
    width: 2.5rem;
}
.more {
    width: 70%;
    height: 90%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background: white;
    border-radius: 15px;
    padding: 30px;
    z-index: 30;
    @include breakpoint(desktop) {
        width: 90%;
    }
    @include breakpoint(tablet) {
        width: 95%;
        height: 70%;
        padding: $pd-phone;
    }
    &__header {
        width: 100%;
        text-align: center;
        display: grid;
    }
    &__btngroup{
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    &__btn__close {
        font-size: 1.5rem;
    }
    &__btn__delete {
        font-size: 1.2rem;
        @include breakpoint(phone){
            font-size: 1.4rem;
        }
    }
    &__title {
        font-size: 1.5rem;
        font-weight: 900;
    }
    &__subtitle {
        font-size: 1.2rem;
    }
    &__hr {
        margin-top: 10px;
        margin-bottom: 20px;
        width: 100%;
        height: 2px;
        background: #aaaaaa;
    }
    &__note {
        height: 100%;
        width: 100%;
        padding: 20px 0px;
        position: relative;
        display: grid;
        align-items: center;
        justify-content: center;
        grid-gap: 20px;
        overflow-y: scroll;
    }
    &__content {
        width: 100%;
        height: 100%;
        padding-top: 0;
        display: grid;
        grid-template-rows: 1fr minmax(90%, 1fr) minmax(320px, 1fr);
        grid-gap: 20px;
        padding-right: 5px;
        align-items: start;
        align-content: start;
        overflow-y: scroll;
        @include breakpoint(tablet) {
            grid-template-rows: 1fr minmax(90%, 1fr) minmax(250px, 1fr);
            grid-gap: $pd-phone;
        }
    }
    &__content__novideo {
        grid-template-rows: 1fr minmax(90%, 1fr);
        overflow-y: auto;
        @include breakpoint(tablet) {
            grid-template-rows: 100px calc(100% - 120px);
        }
    }
    &__player__wrapper {
        width: 100%;
        height: 100%;
    }
    &__video__inputwrap {
        display: grid;
        grid-gap: 10px;
        grid-auto-flow: column;
        justify-items: center;
        justify-content: center;
        input {
            display: inline;
            border: 1px solid #aaaaaa;
            border-radius: 5px;
            padding: 5px 10px;
            @include breakpoint(tablet) {
                padding: 2px 5px;
            }
        }
        @include breakpoint(tablet) {
            grid-auto-flow: row;
            justify-items: start;
        }
    }
    &__video__input{
        text-align: left;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
    }
    &__video__input-error {
        color: red;
    }
    &__video__input__btnok {
        cursor: pointer;
        background: $color_editing;
        padding: 2px 10px;
        border-radius: 5px;
        color: white;
        letter-spacing: 2px;
        margin-left: 10px;
        @include breakpoint(tablet) {
            letter-spacing: 1px;
            margin-left: 5px;
        }
    }
    &__video__input__btnok-disable {
        cursor: initial;
        background: lighten($color_editing, 10%);
    }
    &__content__note {
        width: 100%;
        height: 100%;
        textarea {
            font-size: 1rem;
            line-height: 1.5rem;
            width: 100%;
            height: 100%;
            resize: none;
            outline: none;
            padding: 10px;
            overflow: auto;
        }
    }
    &__content__btn {
        font-size: 1.5rem;
    }
}
</style>
