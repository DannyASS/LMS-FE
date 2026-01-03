import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "./Input";

export function PasswordInput({ value, onChange, placeholder, className}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />

      {/* BUTTON ICON */}
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {show ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}
