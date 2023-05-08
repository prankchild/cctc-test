<template>
  <div>
    <button @click="showDialog">第一种显示弹窗</button>
    <button @click="showDialog2">第二种显示弹窗</button>
    <Dialog
      v-model="show"
      @confirm="confirm"
      :callback="callback"
      confirmBtnText="测试确定"
      cancelBtnText="测试取消"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * 一共采用了两种方式
 * 第一种是采用方法的方式去调用该Vue组件进行全局显示
 * 第二种是采用调用该组件的方式通过v-model传参对该弹窗全局显示
 * 能获取插件表单内容、支持异步操作
 */
import { ref } from "vue";
import DialogApp from "./components/Dialog";
import Dialog from "./components/Dialog/Dialog.vue";
const show = ref(false);
// 1、使用办法的方式调用组件
const showDialog = () => {
  DialogApp({
    title: "测试组件1",
    confirmBtnText: "确定",
    cancelBtnText: "取消",
    callback: (value: any) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(value, "callback");
          resolve(true);
        }, 200);
      });
    },
  })
    .then((value) => {
      console.log(value);
    })
    .catch(() => {
      console.log(`取消状态`);
    });
};
// 2、使用组件的方式调用组件
const showDialog2 = () => {
  show.value = true;
};
const callback = (value: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(value, "callback");
      resolve(true);
    }, 2000);
  });
};
const confirm = (value: any) => {
  console.log(value, "value");
};
</script>

<style scoped></style>
