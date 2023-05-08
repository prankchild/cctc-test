import { createApp, watch } from "vue";
import Dialog from "./Dialog.vue";

const DialogApp = (options: any) => {
  const DialogComponent = createApp(Dialog, options);

  return new Promise((resolve, reject) => {
    showDialog(DialogComponent, { resolve, reject });
  });
};
const showDialog = <T>(
  app: any,
  {
    resolve,
    reject,
  }: {
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
  }
) => {
  const fragment = document.createDocumentFragment();
  const dialog = app.mount(fragment);
  document.body.appendChild(fragment);
  dialog.setVisible(true);

  watch(dialog.state, async (state) => {
    if (!state.visible) {
      if (state.type === "cancel") {
        reject();
      } else if (state.type === "confirm") {
        resolve(state.data);
      }
      hideDialog(app);
    }
  });
};

const hideDialog = (app: any) => {
  app.unmount();
};

export default DialogApp;
