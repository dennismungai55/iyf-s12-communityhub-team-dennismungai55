import { useState } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import Card from "../shared/Card";

export default function CreatePostForm({ onCreatePost, submitting = false }) {
  const [values, setValues] = useState({
    title: "",
    author: "",
    body: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.title.trim()) {
      nextErrors.title = "Post title is required.";
    } else if (values.title.trim().length < 4) {
      nextErrors.title = "Title should be at least 4 characters.";
    }

    if (!values.body.trim()) {
      nextErrors.body = "Post content is required.";
    } else if (values.body.trim().length < 10) {
      nextErrors.body = "Content should be at least 10 characters.";
    }
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await onCreatePost?.({
      title: values.title.trim(),
      author: values.author.trim() || "Dennis Mungai",
      body: values.body.trim(),
    });

    setValues({ title: "", author: "", body: "" });
  };

  return (
    <Card
      title="Create a New Post"
      subtitle="Publish a discussion or update to CommunityHub"
    >
      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Title"
          name="title"
          placeholder="What's on your mind?"
          value={values.title}
          onChange={handleChange}
          error={errors.title}
          required
        />

        <Input
          label="Author Name"
          name="author"
          placeholder="Optional (defaults to Dennis Mungai)"
          value={values.author}
          onChange={handleChange}
        />

        <div className="mb-4">
          <label
            htmlFor="post-body"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="post-body"
            name="body"
            rows={5}
            value={values.body}
            onChange={handleChange}
            placeholder="Write your post details..."
            className={[
              "w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2",
              errors.body
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500",
            ].join(" ")}
          />
          {errors.body && (
            <p role="alert" className="mt-1 text-sm text-red-500">
              {errors.body}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" loading={submitting}>
            Publish Post
          </Button>
        </div>
      </form>
    </Card>
  );
}
