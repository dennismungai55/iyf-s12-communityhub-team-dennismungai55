import { useState } from "react";
import { Button, Input, Card, Modal, Avatar } from "../../components/shared";

export default function Task18_3ComponentLibrary() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      setEmail("");
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Task 18.3: Shared Component Library
      </h2>

      <Card
        title="Buttons & Sizes"
        subtitle="Variants, sizes, fullWidth, and loading states"
      >
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
          <Button loading>Saving</Button>
        </div>

        <Button fullWidth onClick={() => setIsModalOpen(true)}>
          Open Modal Demo
        </Button>
      </Card>

      <Card title="Avatars & Inputs">
        <div className="flex items-center gap-4 mb-6">
          <Avatar name="Dennis Mungai" size="small" />
          <Avatar name="Community Member" size="medium" />
          <Avatar
            src="https://invalid-url.example/avatar.png"
            name="Fallback User"
            size="large"
          />
        </div>

        <Input
          label="Email Address"
          name="demoEmail"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          required
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Quick Invite"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="modal-invite-form"
              loading={isSubmitting}
            >
              Send Invite
            </Button>
          </>
        }
      >
        <form id="modal-invite-form" onSubmit={handleDemoSubmit}>
          <Input
            label="Member Email"
            name="modalEmail"
            type="email"
            placeholder="member@communityhub.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            required
          />
        </form>
      </Modal>
    </div>
  );
}
