<template>
  <teleport to="body" :disabled="!toBody">
    <transition name="dialog-fade">
      <div class="dialog" v-show="state.visible">
        <div class="wrapper">
          <div class="dialog-container">
            <header>
              <div class="title">
                {{ title }}
              </div>
              <div class="close">
                <span>X</span>
              </div>
            </header>
            <div class="content">
              <form action="">
                <div class="item">
                  <label for="">邮箱：</label>
                  <input type="text" v-model="state.data.email" />
                </div>
                <div class="item">
                  <label for="">密码：</label>
                  <input type="password" v-model="state.data.password" />
                </div>
              </form>
            </div>
            <footer>
              <div class="footer-btn">
                <button class="btn primary" @click="confirm">
                  {{ confirmBtnText }}
                </button>
                <button
                  class="btn default"
                  @click="cancel"
                  v-if="showCancelBtn"
                >
                  {{ cancelBtnText }}
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "弹窗组件",
  },
  confirmBtnText: {
    type: String,
    default: "确定",
  },
  cancelBtnText: {
    type: String,
    default: "取消",
  },
  showCancelBtn: {
    type: Boolean,
    default: true,
  },
  toBody: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  callback: {
    type: Function,
    default: () => {},
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const state = reactive({
  visible: false,
  type: "",
  data: {
    email: "",
    password: "",
  },
});

watch(
  () => props.modelValue,
  (value) => {
    state.visible = value;
  }
);
watch(
  () => state.visible,
  (value) => {
    emit("update:modelValue", value);
  }
);

const setVisible = (visibleValue: boolean) => {
  state.visible = visibleValue;
};

const cancel = () => {
  state.type = "cancel";
  setVisible(false);
};
const confirm = async () => {
  await props.callback(state.data);
  state.type = "confirm";
  emit("confirm", state.data);
  setVisible(false);
};
defineExpose({
  state,
  setVisible,
  confirm,
  cancel,
});
</script>
<style scoped lang="scss">
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-fade-enter-active {
  transition: opacity 0.2s ease-in;
}

.dialog-fade-leave-active {
  transition: opacity 0.2s ease-out;
}
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 450px;
  margin: -100px 0 0 -210px;
  background-color: #fff;
  border-radius: 3px;
  header {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    .close {
      cursor: pointer;
      position: absolute;
      right: 10px;
    }
  }
  .content {
    padding: 10px;
    display: flex;
    flex-direction: column;
    .item {
      padding: 5px 0;
      display: flex;
      height: 26px;
      label {
        margin: 0 0px 0 10px;
        width: 50px;
      }
      input {
        margin: 0 20px;
        flex: 1;
        height: 20px;
      }
    }
  }
  footer {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: end;
    button {
      margin: 0 3px;
      padding: 4px 10px;
      border: none;
      outline: none;
      cursor: pointer;
      border-radius: 3px;
      &.primary {
        background-color: #409eff;
        color: #fff;
      }
      &.default {
        background-color: #eee;
        color: #000;
      }
    }
  }
}
</style>
