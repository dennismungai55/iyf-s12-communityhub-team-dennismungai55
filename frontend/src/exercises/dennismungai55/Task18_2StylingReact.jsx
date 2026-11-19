import Button from "../../components/Button";

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}

function TailwindButton({ variant = "primary", children, ...props }) {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={props.type || "button"}
      className={`${baseClasses} ${variants[variant] || variants.primary}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Task18_2StylingReact() {
  return (
    <div className="space-y-8 p-4">
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Task 18.2: Styling React Applications
        </h2>

        <h3 className="text-lg font-semibold mb-2">
          Exercise 1: CSS Modules Button
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Exercise 2: Tailwind CSS</h3>
        <Card title="CommunityHub Card">
          <p className="mb-4">
            Styled with Tailwind CSS utility classes and smooth hover
            transitions.
          </p>
          <div className="flex flex-wrap gap-2">
            <TailwindButton variant="primary">Primary</TailwindButton>
            <TailwindButton variant="secondary">Secondary</TailwindButton>
            <TailwindButton variant="danger">Danger</TailwindButton>
          </div>
        </Card>
      </section>
    </div>
  );
}
