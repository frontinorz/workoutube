<template lang="pug">
.header(v-bind:class="{'header__scroll' : isScroll}")
    .header__maintitle
        img.logo(src="../assets/img/logo.png")
        .apptitle  Workoutube
    .pointerblock(v-show="isListOpen",  @click="isListOpen = !isListOpen")
    .header__nav(v-bind:class="{'header__nav__active' : isListOpen}")
        router-link.link(:to="'/'", @click.native="linkClick('card')", v-bind:class="{'link__active' : linkNow === 'card' }") 卡片
        router-link.link(:to="'List'", @click.native="linkClick('list')", v-bind:class="{'link__active' : linkNow === 'list' }") 課表
        router-link.link(:to="'VideoCapture'", @click.native="linkClick('capture')", v-bind:class="{'link__active' : linkNow === 'capture' }") 影片快截
    .bergerlist(@click="isListOpen = !isListOpen", v-bind:class="{'bergerlist__active' : isListOpen}")
        .bergerlist__bar
        .bergerlist__bar
        .bergerlist__bar
</template>

<script>
export default {
    name: 'SiteHeader',
    data() {
        return {
            isListOpen: false,
            linkNow: '',
            isScroll: false,
        };
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        linkClick(route){
            this.isListOpen = false;
            this.linkNow = route;
            console.log(this.linkNow );
        },
        handleScroll () {
            this.isScroll = window.scrollY > 0;
        }
    },
};
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.header{
    width: 100%;
    min-height: 10vh;
    padding: 10px $pd-desktop-lg;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    transition: background 0.3s;
    z-index: 50;
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
    &__scroll{
        background: #fff;
        box-shadow: 0px 0px 10px rgba(#000,.2);
    }
    &__maintitle{
        display: flex;
        align-items: center;
        color: rgb(87, 87, 87);
        @include breakpoint(phone){
            justify-content: center;
            width: 100%;
            color: #b62121;
            text-align: center;
        }
    }
    &__nav{
        position: relative;
        display: flex;
        opacity: 1;
        transition: 0.5s;
        @include breakpoint(phone){
            position: fixed;
            width: 60vw;
            height: 100vh;
            right: -50vh;
            top: 0;
            background: rgba(255,255,255,0.98);
            flex-direction: column;
            padding: 10vh 0;
            z-index: 100;
            opacity: 0;
        }
    }
    &__nav__active{
        @include breakpoint(phone){
            right: 0;
            opacity: 1;
        }
    }
}

.bergerlist{
    //align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;
    position: relative;
    flex-direction: column;
    width: 2rem;
    height: 2rem;
    transition: .5s;
    cursor: pointer;
    z-index: 500;
    @include breakpoint(phone){
        display: flex;
    }
    &__active{
        .bergerlist__bar{
            &:first-child{
                transform: translateY(0.47rem) rotate(45deg);
            }
            &:nth-child(2){
                opacity: 0;
            }
            &:last-child{
                transform: translateY(-0.47rem) rotate(-45deg);
            }
        }
    }
    &__bar{
        position: relative;
        width: 100%;
        height: 0.2rem;
        border-radius: 1.5px;
        background-color: #aaa;
        transition: .3s;
        &:nth-child(2){
            margin: 0.3rem 0px;
        }
    }
}

.pointerblock{
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 20;
    background: rgba(0,0,0,0.3);
}
.link{
    position: relative;
    color:rgb(85, 85, 85);
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: 900;
    margin-left: 1.5rem;
    &:hover{
        color:rgb(150, 150, 150);
    }
    @include breakpoint(phone){
        font-size: 2rem;
        margin-left: 0;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    &:after{
        content: '';
        position: absolute;
        width: 0;
        height: 0.2rem;
        background:$color_editing;
        left: 0;
        bottom: -0.3rem;
        transition: width 0.3s;
    }
    &__active{
        &:after{
            width: 100%;
            @include breakpoint(phone){
                height: 0.3rem;
                bottom: -0.5rem;
                width: 50%;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
}
.apptitle{
    margin-left: 1rem;
    font-size: 1.7rem;
    font-family: 'Kanit', sans-serif;
    @include breakpoint(phone){
        font-size: 2rem;
    }
}
.title{
    color:aquamarine;
}
.logo{
    width: 3.5rem;
    height: 3.5rem;
}
</style>
