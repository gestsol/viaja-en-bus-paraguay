<template>
   <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500px"
      persistent
    >
      <div class="container-form">
        <v-layout row wrap>
          <v-flex xs12 md12 sm6 class="mt-2" style="text-align: center">
            <div class="title-form">
              <h2>Contacto</h2>
              <i
                class="fa fa-times-circle"
                aria-hidden="true"
                @click="$parent.openDialog = false">
              </i>
            </div>

            <div id="hubspotForm" class="text-center"></div>
          </v-flex>
        </v-layout>
      </div>

      <!-- TODO: activar este footer mas adelante -->
      <!-- <div class="footer-form">
        <img src="/static/imgs/logos/name-cybermonday.png" alt="Nombre de cybermonday" />
        <v-btn
          color="primary"
          text
          @click="$parent.dialog = false"
        >
          Cerrar
        </v-btn>
      </div> -->
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'contact-hubspot',

  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },

  mounted () {
    /* eslint-disable */
    hbspt.forms.create({
      portalId: '7535855',
      formId: '6543d628-b515-4c6b-b08e-6737dd389689',
      target: '#hubspotForm'
    })
  }
}
</script>

<style>
.container-form {
  background-color: #194E8E;
  width: 100%;
  border-radius: 15px;
  padding: 10px 25px;
}

.title-form {
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.title-form h2 {
  width: 90%;
  margin-left: 40px;
  font-size: 2.5rem;
  font-weight: 200;
  color: white;
}

.title-form i {
  width: 10%;
}

.footer-form {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 4px;
}

.footer-form button {
  border-radius: 15px;
  margin-left: auto;
}

.footer-form img {
  height: 100%;
  width: 35%;
}

.fa.fa-times-circle {
  color: #f94343;
  font-size: 30px;
}

.fa.fa-times-circle:hover {
  cursor: pointer;
}

/************************************** RESPONSICE **************************************/

@media (max-width: 759px) {
  .title-form h2 {
    font-size: 2.3rem;
  }

  .container-form {
    padding: 0 27px;
  }
}
</style>
