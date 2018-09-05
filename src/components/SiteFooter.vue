<template lang="pug">
.footer
    .right
        .right__text © Brice Wen 2018
    a.mail(href="mailto:frontinorz@gmail.com") frontinorz@gmail.com

</template>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.footer{
    position: relative;
    font-size: 1.2rem;
    margin-top: 2rem;
    min-height: 10vh;
    padding: 1rem $pd-desktop-lg;
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
    @include breakpoint(phone){
        margin-bottom: 0.5rem;
    }
}
.mail{
    position: relative;
    &:hover{
        &::after{
            width: 100%;
        }
    }
    &:after{
        content: '';
        position: absolute;
        width: 0%;
        height: 1px;
        background: #000;
        left: 0;
        bottom: -0.2rem;
        transition: width 0.3s;
    }
}
</style>