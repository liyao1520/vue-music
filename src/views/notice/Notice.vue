<template>
  <div class="dialog">
    <div class="main">
      <div class="close" @click="close">
        <svg
          t="1613442684954"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2145"
          width="24"
          height="24"
        >
          <path
            d="M566.97558594 521.09667969L856.8828125 231.18945312c14.63378906-14.63378906 14.63378906-38.75976563 0-53.39355468l-1.58203125-1.58203125c-14.63378906-14.63378906-38.75976563-14.63378906-53.39355469 0L512 466.51660156 222.09277344 176.21386719c-14.63378906-14.63378906-38.75976563-14.63378906-53.39355469 0l-1.58203125 1.58203125c-15.02929688 14.63378906-15.02929688 38.75976563 0 53.39355469l289.90722656 289.90722656L167.1171875 811.00390625c-14.63378906 14.63378906-14.63378906 38.75976563 0 53.39355469l1.58203125 1.58203125c14.63378906 14.63378906 38.75976563 14.63378906 53.39355469 0L512 576.07226563 801.90722656 865.97949219c14.63378906 14.63378906 38.75976563 14.63378906 53.39355469 0l1.58203125-1.58203125c14.63378906-14.63378906 14.63378906-38.75976563 0-53.39355469L566.97558594 521.09667969z"
            fill="#363F4D"
            p-id="2146"
          ></path>
        </svg>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notice",
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999999999;
  background-color: rgba(0, 0, 0, 0.7);
}
.main {
  width: 340px;
  height: 380px;
  background-color: #ffffff;
  margin: 100px auto 0;
  border-radius: 10px;
  position: relative;
  padding: 20px 10px 10px 10px;
  box-sizing: border-box;
}
.close {
  position: absolute;
  top: 1px;
  right: 3px;
  cursor: pointer;
}
</style>
