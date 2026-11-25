import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue !== null
        ? JSON.parse(savedValue)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  function updateValue(newValue) {
    setValue(newValue);

    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Could not save to localStorage:", error);
    }
  }

  return [value, updateValue];
}

export default useLocalStorage;