import { useState } from "react";

function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetForm() {
    setValues(initialValues);
  }

  function handleSubmit(callback) {
    return (event) => {
      event.preventDefault();
      callback(values);
    };
  }

  return {
    values,
    handleChange,
    resetForm,
    handleSubmit,
  };
}

export default useForm;