import { useState } from "react";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue((previous) => !previous);
  }

  function turnOn() {
    setValue(true);
  }

  function turnOff() {
    setValue(false);
  }

  return {
    value,
    toggle,
    turnOn,
    turnOff,
  };
}

export default useToggle;