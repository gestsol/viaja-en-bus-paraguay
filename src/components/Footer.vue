<template>
  <footer>
    <div class="footer-content">
      <div class="footer-logo">
        <img src="/static/imgs/logos/logo boletos paraguay.svg" alt="footer-logo" />
      </div>
      <div class="footer-nav">
        <h2>Nuestra empresa</h2>
        <nav>
          <ul>
            <li>Nuestras alianzas</li>
            <li>Nuestros inversionistas</li>
            <li>Trabaja con nosotros</li>
            <li>Prensa</li>
            <li>Contáctanos</li>
          </ul>
        </nav>
      </div>
      <div class="footer-nav">
        <h2>Información útil</h2>
        <nav>
          <ul>
            <li>Preguntas frecuentes</li>
            <li>Términos y condiciones</li>
            <li>Políticas de privacidad</li>
            <li>Agentes de viaje</li>
            <li>Mapa del sitio</li>
          </ul>
        </nav>
      </div>
      <div class="footer-contact">
        <form>
          <div>
            <label for="email">Suscríbite</label>
            <input
              :class="{ 'input-error': error }"
              type="text"
              @input="input"
              v-model="email"
              name="email"
              placeholder="Correo electrónico"
            />
          </div>
          <v-btn block class="white--text" @click="send">
            <span v-lang.send></span>
          </v-btn>
        </form>

        <div class="footer-rrss">
          <i class="fa fa-twitter" aria-hidden="true" />
          <i class="fa fa-facebook" aria-hidden="true" />
          <i class="fa fa-instagram" aria-hidden="true" />
          <i class="fa fa-spotify" aria-hidden="true" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import validations from '@/helpers/fieldsValidation'
export default {
  data: () => ({
    email: '',
    error: false
  }),

  methods: {
    send(e) {
      e.preventDefault()
      const result = validations.emailValidation(this.email)
      if (result === true) {
        console.log(this.email)
        return
      }

      this.error = result
      console.log(this.email, this.error)
    },
    input() {
      this.error = false
    }
  }
}
</script>

<style lang="stylus" scoped>
footer {
  padding: 57px 20px;
  background-color: #DDDBDB;
}

.footer-logo {
  img {
    width: 100%;
  }
}

.footer-content {
  display: flex;
  justify-content: center;
  gap: 3rem;
}
.footer-nav {
  color: #4B7DB8;
  h2 {
    font-weight: bold;
    font-size: 21px;
    margin-bototm: 27px;
  }
  ul {
    font-size: 15px;
    list-style: none;
    li {
      margin: 16px 0;
    }
  }
}

.footer-contact {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  form {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 1rem;
    & > div {
      max-width: 250px;
    }
    label {
      color: #FF3B33;
      font-weight: bold;
      font-size: 21px;
      display: block;
      margin-bottom: 1rem;
    }
    input {
      border: 1px solid transparent;
      background-color: white;
      border-radius: 8px;
      height: 33px;
      width: 100%;
      outline: none;
      padding: 0 1.2rem;
      box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);
      transition: all 0.3s
    }
    input.input-error {
      border-color: red;
    }
    input:focus {
      box-shadow: 1px 1px 10px -6px rgba(0,0,0,0.75);
    }
    >>> .btn.btn--block {
      background-color: #FF3B33;
      border-radius: 8px;
      color: white;
      height: 33px;
      width: 100px;
      margin: 0;
    }
  }
  .footer-rrss {
    display: flex;
    justify-content: flex-start;
    gap: 1.5rem;
    font-size: 1.8rem;
    margin-bottom: 2.5rem;
  }
}
</style>

