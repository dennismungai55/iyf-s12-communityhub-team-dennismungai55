import { useState, useCallback } from "react";

export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const nextValue = type === "checkbox" ? checked : value;
    setValues((prev) => ({ ...prev, [name]: nextValue }));
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => {
        const nextTouched = { ...prev, [name]: true };
        if (validate) {
          setValues((currentValues) => {
            setErrors(validate(currentValues, nextTouched));
            return currentValues;
          });
        }
        return nextTouched;
      });
    },
    [validate],
  );

  const validateAll = useCallback(() => {
    const allTouched = Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (!validate) {
      setErrors({});
      return {};
    }

    const validationErrors = validate(values, allTouched);
    setErrors(validationErrors);
    return validationErrors;
  }, [initialValues, validate, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  };
}
