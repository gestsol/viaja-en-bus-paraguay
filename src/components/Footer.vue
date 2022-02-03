<template>
  <v-footer class="font size px-3">
    <v-layout row wrap align-center justify-center>
      <v-flex xs12>
        <h3 class="white--text d-inline-flex" style="text-align: left">
          Desarrollada por Wit innovación y tecnología spa
        </h3>

        <h3 class="white--text d-inline-flex">
          <a class="email" href="mailto:contacto@viajaenbus.cl" target="_blank" rel="noopener noreferrer">
            Correo: contacto@viajaenbus.cl
          </a>
        </h3>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {}
</script>

<style scoped>
.email {
  color: white;
  text-decoration: none;
}

.footer {
  background-color: var(--var-dark-blue) !important;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

.font {
  font-family: Poppins;
}

.size {
  height: 45px;
}

.head {
  color: #8dcae2
}

h3 {
  font-weight: 400;
  font-size: 14px;
}

h3:nth-child(2) {
  float: right;
}

@media (max-width: 512px) {
  h3 {
    font-size: 10px;
  }
  h3:nth-child(2) {
    float: none;
    text-align: left;
  }
}
</style>
