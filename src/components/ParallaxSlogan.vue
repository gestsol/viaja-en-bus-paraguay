<template>
  <section class="terms">
    <div v-if="blue" class="background-parallax-blue"/>
    <img :src="img" class="image-terms">
    <v-layout
      column
      align-center
      justify-center
      class="white--text image-description"
      v-if="logo || subHeader "
    >
      <h1 v-if="subHeader" class="white--text mb-2 display-3 text-xs-center text-title-parallax">
        <b>
          {{subHeader}}
        </b>
      </h1>
    </v-layout>
  </section>
</template>

<script>
  export default {
    props: ['subHeader', 'logo', 'img', 'blue']
  }
</script>
<style>
  .terms {
    position: relative;
    height: 50vh;
    overflow: hidden;
  }

  .image-terms {
    position: absolute;
    object-fit: fill;
    top: -30vh;
    width: 100vw;
    height: 60vw;
  }

  
  @media (max-width: 650px) {
    .image-terms {
      top: 0;
      height: 100%;
    }
  }

  .image-description {
    position: absolute;
    top: 45%;
    left: 0;
    right: 0;
  }
  .informationLogo {
    height: 100%;
    width: 100%;
    max-height: 200px;
    max-width: 500px;
  }

  .background-parallax-blue {
    position: absolute;
    background-color: var(--var-dark-blue);
    opacity: 0.2;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .text-title-parallax {
    z-index: 2
  }
</style>
