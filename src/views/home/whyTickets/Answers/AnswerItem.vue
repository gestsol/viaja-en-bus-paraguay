<template>
  <div class="answer">
    <img :src="$props.image" :alt="`answer-${$vnode.key + 1}`" />
    <strong>{{ $props.title }}</strong>
    <p>{{ $props.description }}</p>
  </div>
</template>
<script>
export default {
  props: {
    image: String,
    title: String,
    description: String,
    key: Number
  }
}
</script>
<style lang="stylus" scoped>
.answer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  img {
    width: 185px;
    height: 185px;
  }

  strong {
    font-size: 21px;
    font-weight: bold;
    color: #4b7db8;
  }

  p {
    color: #FC5E64;
    font-size: 17px;
    width: 180px;
  }
}
</style>

