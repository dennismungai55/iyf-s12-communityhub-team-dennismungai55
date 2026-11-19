import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePostForm from "../components/Post/CreatePostForm";

export default function CreatePost({ onAddPost }) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (formData) => {
    setSubmitting(true);
    try {
      await onAddPost?.(formData);
      navigate("/posts");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Post</h1>
        <p className="text-sm text-gray-500 mt-1">
          Add a new post to the community feed
        </p>
      </div>

      <CreatePostForm onCreatePost={handleCreate} submitting={submitting} />
    </div>
  );
}
