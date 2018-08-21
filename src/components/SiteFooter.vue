<template lang="pug">
.footer
    .right
        //img.logo(src="../assets/img/logo.png")
        .right__text Designed and built with love & muscle  by Brice Wen
    .mail iori252715@gmail.com

</template>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.footer{
    position: relative;
    margin-top: 2rem;
    min-height: 10vh;
    padding: 0px $pd-desktop-lg;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(224, 224, 224);
    @include breakpoint(desktop) {
        padding: 0px $pd-desktop;
    }
    @include breakpoint(tablet){
        padding: 0px $pd-tablet;
        font-size: 14px;
    }
    @include breakpoint(phone){
        padding: 0px $pd-phone;
        flex-direction: column;
        justify-content: center;
        font-size: 12px;
    }
}
.right{
    display: flex;
    align-items: center;
    &__text{
        // margin-left: 1rem;
    }
    @include breakpoint(phone){
        margin-bottom: 1rem;
    }

}
.logo{
    width:3rem;
    height:3rem;
    @include breakpoint(phone){
        display: none;
    }
}
</style>