import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useToggle } from "../../hooks/useToggle";
import { useForm } from "../../hooks/useForm";

function SettingsDemo() {
  const [theme, setTheme] = useLocalStorage("communityhub-theme", "light");
  const [fontSize, setFontSize] = useLocalStorage("communityhub-font-size", 16);

  return (
    <section>
      <h3>1. useLocalStorage — Settings</h3>
      <label>
        Theme:{" "}
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>

      <div style={{ marginTop: "0.5rem" }}>
        <label>
          Font Size ({fontSize}px):{" "}
          <input
            type="range"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            min="12"
            max="24"
          />
        </label>
      </div>
    </section>
  );
}

function ModalDemo() {
  const [isOpen, { toggle, setFalse }] = useToggle(false);

  return (
    <section>
      <h3>2. useToggle — Modal</h3>
      <button type="button" onClick={toggle}>
        {isOpen ? "Close Modal" : "Open Modal"}
      </button>

      {isOpen && (
        <div role="dialog" aria-label="Example modal" className="modal">
          <p>Modal Content</p>
          <button type="button" onClick={setFalse}>
            Close
          </button>
        </div>
      )}
    </section>
  );
}

function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "Name is required";
  }
  if (!values.email.includes("@")) {
    errors.email = "Invalid email";
  }
  return errors;
}

function ContactFormDemo() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  } = useForm({ name: "", email: "" }, validateContact);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) return;

    console.log("Submitted contact form:", values);
    reset();
  };

  return (
    <section>
      <h3>3. useForm — Contact Form</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>
            Name:{" "}
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {touched.name && errors.name && (
            <span className="error">{errors.name}</span>
          )}
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <label>
            Email:{" "}
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          {touched.email && errors.email && (
            <span className="error">{errors.email}</span>
          )}
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <button type="submit">Submit</button>
          <button
            type="button"
            onClick={reset}
            style={{ marginLeft: "0.5rem" }}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default function Task18_1CustomHooks() {
  return (
    <div>
      <h2>Task 18.1: Custom Hooks</h2>
      <SettingsDemo />
      <hr />
      <ModalDemo />
      <hr />
      <ContactFormDemo />
    </div>
  );
}
