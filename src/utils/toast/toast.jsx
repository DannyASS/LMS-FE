// src/utils/toast.js
let toastRef = null;

export const setToast = (toast) => {
  toastRef = toast;
};

export const showToast = (options) => {
  if (toastRef) {
    toastRef.add(options);
  } else {
    console.warn("Toast belum siap — pastikan ToastProvider terpasang di root");
  }
};
