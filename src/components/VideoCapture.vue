<template lang="pug">
    .videocapture
        .videocapture__input__wrapper
            .videocapture__video__input Youtube分享連結
                input(type="text" placeholder="https://youtu.be/......" v-model="temp.videoId" v-bind:class="{'videocapture__video__input-error' : !checkVideoId}")
            button.videocapture__btn__ok(@click.prevent="videoCaptureInput" :disabled="!checkVideoId" v-bind:class="{'videocapture__btn__disable' : !checkVideoId}") 確認
        .videocapture__main
            .videocapture__videowrap
                youtube(ref="youtube",width="100%", height="100%")
            .videocapture__main__input
                input.videocapture__main__input__muscle(type="text" list="muscleList" v-model="temp.muscle" placeholder="訓練部位")
                datalist(id="muscleList")
                    option(v-for="d in muscleList" :value="d")
                input.videocapture__main__input__exercise(type="text" v-model="temp.exercises" placeholder="訓練動作")
                textarea.videocapture__main__input__note(placeholder="輸入筆記......" v-model="temp.note")
                button.videocapture__btn__ok(@click.prevent="videoCaptureAddExercise" :disabled="!checkCardInput" v-bind:class="{'videocapture__btn__disable' : !checkCardInput}") 新增動作卡片
        .info(v-bind:class="{'card__animate' : cardAnimate}")
            .info__card
                .info__title {{temp.muscle}}
                .info__subtitle {{cardExercise}}
            .info__done 已加入卡片



</template>

<script>
export default {
    name: 'VideoPlayer',
    props: {
        exercisedata: {
            type: Array,
            default: [],
            required: true,
        },
    },
    data () {
        return {
            temp: {
                videoId: '',
                muscle: '',
                exercises: '',
                note: '',
            },
            cardAnimate: false,
            cardExercise: '',
        }
    },
    computed: {
        player () {
            return this.$refs.youtube.player;
        },
        checkVideoId() {
            return /^(https\:\/\/youtu\.be\/)/.test(this.temp.videoId);
        },
        checkCardInput() {
            return (this.temp.muscle !== '' && this.temp.exercises !== '' && this.checkVideoId);
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
    },
    methods: {
        dataVideoIdTrans() {
            return this.temp.videoId.replace('https://youtu.be/', '');
        },
        videoCaptureInput() {
            this.player.cueVideoById(this.dataVideoIdTrans(), 0);
        },
        videoCaptureAddExercise() {
            const videoid = this.dataVideoIdTrans();
            const getTime = this.player.getCurrentTime();
            const self = this;

            getTime.then(function (result) {
                const work = {
                    muscle: self.temp.muscle,
                    exercises: self.temp.exercises,
                    isVideo: true,
                    video: {
                        id: videoid ,
                        startSec: parseInt(result),
                    },
                    note: self.tempNote
                };
                self.cardAnimation();
                self.exercisedata.push(work);
                self.temp.exercises = '';
                self.temp.note = '';
                localStorage.setItem('exercisedata', JSON.stringify(self.exercisedata));
            })
        },
        cardAnimation() {
            this.cardAnimate = true;
            this.cardExercise = this.temp.exercises;
            setTimeout(() => {
                this.cardAnimate = false;
                this.cardExercise = '';
            }, 2000);
        }
    },
}
</script>

<style scoped lang="scss">
@import "@/assets/style/_buttons.scss";


.videocapture {
    position: relative;
    display: grid;
    grid-gap: 20px;
    grid-template-rows: auto 1fr;
    justify-items: center;
    align-content: start;
    border-radius: 20px;
    padding: 0px $pd-desktop-lg;
    width: 100%;
    height: calc(100% - 10vh - 2rem);
    min-height: 500px;
    @include breakpoint(desktop) {
        padding: 0px $pd-desktop;
        height: 100vh;
    }
    @include breakpoint(tablet){
        font-size: 14px;
        padding: 0px $pd-tablet;
    }
    @include breakpoint(phone){
        font-size: 12px;
        padding: 0px $pd-phone;
        grid-template-rows: 4rem 1fr;
    }
    &__btn__close {
        position: absolute;
        right: 30px;
        top: 20px;
        font-size: 1.5rem;
    }
    &__btn__ok {
        background: $color_editing;
        padding: 2px 10px;
        border-radius: 5px;
        margin-left: 10px;
        color: #eeeeee;
        letter-spacing: 2px;
        font-weight: 900;
        &:hover {
            background: lighten($color_editing, 10);
        }
        @include breakpoint(phone){
            margin-left: 0;
        }
    }
    &__btn__disable {
        background: lighten($color_editing, 10);
        cursor: initial;
    }
    &__input__wrapper {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-auto-flow: column;
        justify-content: center;
        @include breakpoint(phone) {
            grid-gap: 5px;
            grid-auto-flow: row;
        }
        input {
            margin-left: 10px;
            border: 1px solid #aaaaaa;
            padding: 5px 10px;
            @include breakpoint(tablet) {
                padding: 2px 5px;
            }
        }
    }
    &__video__input {
        display: flex;
        align-items: center;
        font-size: 1.1rem;
    }
    &__video__input-error {
        color: red;
    }
    &__title {
        font-size: 2rem;
        font-weight: bold;
    }
    &__main {
        width: 100%;
        display: grid;
        justify-content: center;
        grid-gap: 20px;
        grid-template-columns: 2fr 1fr;
        @include breakpoint(desktop) {
            grid-template-columns: 1fr;
            grid-template-rows: 1.5fr 1fr;
        }
        @include breakpoint(tablet) {
            grid-gap: $pd-phone;
        }
    }
    &__main__input {
        display: grid;
        grid-gap: 20px;
        grid-template-rows: 1.5rem 1.2rem 1fr 1.5rem;
        align-items: start;
        @include breakpoint(tablet) {
            grid-gap: $pd-phone;
        }
        &__muscle {
            padding-left: 2rem;
            font-size: 1.5rem;
        }
        &__exercise {
            font-size: 1.2rem;
        }
        input {
            border: none;
            outline: none;
            text-align: center;
        }
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
    &__videowrap{
        background: #000;
    }

}

.info{
    position: fixed;
    bottom: 5vh;
    right: 50%;
    transform: translateX(50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0.5rem 2rem;
    background: #fff;
    box-shadow: 0px 0px 10px rgba(#000,.2);
    border-radius: 0.5rem;
    opacity: 0;
    z-index: 100;
    &__card{
        display: flex;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }
    &__title{
        font-weight: 900;
        margin-right: 1rem;
    }
}
.card__animate{
    animation: cardpop 2s both;
}
@keyframes cardpop {
    0%   {opacity: 0; bottom:2vh}
    25% {opacity: 1; bottom:5vh}
    75% {opacity: 1; bottom:5vh}
    100% {opacity: 0; bottom:2vh}
}
</style>