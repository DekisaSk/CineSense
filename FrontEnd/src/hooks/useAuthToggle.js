import { useState } from "react";

export default function useAuthToggle(
  initialLogin = true,
  initialRegister = true
) {
  const [enableLogin, setEnableLogin] = useState(initialLogin);
  const [enableRegister, setEnableRegister] = useState(initialRegister);

  const toggleLogin = () => setEnableLogin((prev) => !prev);
  const toggleRegister = () => setEnableRegister((prev) => !prev);

  return { enableLogin, toggleLogin, enableRegister, toggleRegister };
}
