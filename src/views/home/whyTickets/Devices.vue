<template>
  <div class="devices">
    <div class="center-banner">
      <div class="banner-img">
        <img src="/static/imgs/home/devices.png" alt="devices" />
      </div>
      <div class="banner-info">
        <span class="banner-title">
          <span>¡ Desde cualquier</span>
          <span>dispositivo móvil ¡</span>
        </span>
        <p class="banner-description">Crea tu cuenta para tener beneficios</p>
      </div>
    </div>
    <img class="bottom-banner" src="/static/imgs/home/bottom.png" alt="devices" />
  </div>
</template>

<style lang="stylus" scoped>
.devices {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.center-banner {
  margin: 3rem 0;
  .banner-img {
    display: none;
  }
  .banner-info {
    text-align: center;
    margin-top: 2rem;
    .banner-title {
      padding: 60px 0;
    }
    .banner-title span:nth-child(1), .banner-title span:nth-child(2) {
      font-size: 2rem;
      color: #FC5E64;
      line-height: 3;
    }

    p {
      font-size: 1.8rem;
      color: #4B7DB8;
    }
  }
}

.bottom-banner {
  width: 100%;
  max-height: 350px;
  margin-top: 0px;
}

@media (min-width: 720px) {
  .center-banner {
    display: flex;
    justify-content: center;
    gap: clamp(1.5rem, 2vw, 53px);
    .banner-img {
      display: flex;
      flex: 2 1 auto;
      img {
        display: block;
        margin-left: auto
        width: 100%;
        max-width: 554px;
      }
    }

    .banner-info {
      flex-grow: 3;
      display: flex;
      flex-direction: column;
      text-align: left;
      .banner-title {
        padding: 60px 0;
      }
      .banner-title span:nth-child(1), .banner-title span:nth-child(2) {
        display: block;
        font-size: clamp(2rem, 2vw, 40px);
        line-height: 1.3;
      }

      .banner-title span:nth-child(2) {
        margin-left: clamp(50px, 10vw, 210px);
      }

      p {
        font-size: clamp(1.9rem, 1.8vw, 35px);
        margin-left: clamp(60px, 12vw, 245px);
      }
    }
  }

  .bottom-banner {
    margin-top: -60px
  }
}
</style>

