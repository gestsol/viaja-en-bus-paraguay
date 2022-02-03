<template>
  <v-app>
    <template>
      <v-content>
        <parallax-slogan subHeader="¿Como comprar?" :logo="true" img="/static/imgs/background/02.jpg" :blue="true"></parallax-slogan>
        <section class="mt-5">
          <v-container class="subheading justifyText">
            <ol>
              <li>
               <span>Primer paso:</span> <br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero totam velit earum ipsa inventore ut asperiores minima, dolor, fuga quia ipsam, officiis odio! Laudantium distinctio reiciendis nam, labore cum corrupti!
              </li>
              <li>
                <span>Segundo paso:</span> <br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas rem fugiat omnis, voluptate asperiores expedita nam earum voluptatibus corporis at eaque dolorem eos temporibus maiores cupiditate necessitatibus, delectus explicabo illum.
              </li>
              <li>
                <span>Tercer paso:</span> <br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati non unde dolore quia perspiciatis? Eum in sapiente pariatur praesentium voluptatibus labore? Rem possimus voluptate optio facere est obcaecati iure voluptatum!
              </li>
            </ol>
          </v-container>
        </section>

        <section>
          <parallax-slogan></parallax-slogan>
        </section>
      </v-content>
    </template>
  </v-app>
</template>

<script>
  import ParallaxSlogan from '@c/ParallaxSlogan'

  export default {
    components: {
      ParallaxSlogan
    }
  }
</script>

<style>
  .webpayImage {
    width: 100%;
    max-width: 400px;
  }
</style>
