<template>
  <v-app>
    <v-content>
      <parallax-slogan subHeader="¿Donde comprar?" :logo="true" img="/static/imgs/background/02.jpg" :blue="true"></parallax-slogan>
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
  .subheading ol {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  ol {
    list-style: none;
    padding: 0;
    list-style-type: none;
    counter-reset: where-counter;
  }

  ol li {
    counter-increment: where-counter;
  }

  ol li span {
    position: relative;
    margin-left: -30px;
    font-weight: bold;
  }

  ol li::before {
    position: relative;
    display: inline-block;
    margin-right: 0px;
    content: counter(where-counter);
    color: white;
    font-size: 1.5rem;
    --size: 32px;
    left: calc(-1 * var(--size) - 10px);
    line-height: var(--size);
    width: var(--size);
    height: var(--size);
    top: 0;
    font-weight: bold;
    background: var(--var-dark-blue);
    border-radius: 50%;
    text-align: center;
  }

  .subheading ol li {
    width: 25%;
  }

  .webpayImage {
    width: 100%;
    max-width: 400px;
  }
</style>
