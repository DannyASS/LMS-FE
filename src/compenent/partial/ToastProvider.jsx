// src/components/ToastProvider.jsx
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { setToast } from "../utils/toast";

const ToastContext = createContext();

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const add = useCallback(({ type = "info", title = "", description = "", duration = 4000 }) => {
    const id = ++idCounter;
    setToasts((t) => [{ id, type, title, description, duration }, ...t]);

    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, duration);

    return id;
  }, []);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  // Register global reference
  useEffect(() => {
    setToast({ add });
  }, [add]);

  return (
    <ToastContext.Provider value={{ add, remove }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={remove} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onRemove={() => onRemove(toast.id)} />
      ))}
    </div>
  );
};

const Toast = ({ id, type, title, description, onRemove }) => {
  const color =
    type === "success"
      ? "bg-green-100 text-green-800 border-green-300"
      : type === "error"
      ? "bg-red-100 text-red-800 border-red-300"
      : "bg-blue-100 text-blue-800 border-blue-300";

  return (
    <div
      className={`border rounded-lg shadow-md p-4 w-80 animate-slide-in ${color}`}
      onClick={onRemove}
    >
      <div className="font-semibold">{title}</div>
      {description && <div className="text-sm mt-1">{description}</div>}
    </div>
  );
};
