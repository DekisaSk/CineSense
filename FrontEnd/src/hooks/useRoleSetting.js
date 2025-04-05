import { useState, useEffect } from "react";

export function useRoleSetting() {
  const [roleSetting, setRoleSetting] = useState("guest");
  console.log(roleSetting + " updated");
  return { roleSetting, setRoleSetting };
}
