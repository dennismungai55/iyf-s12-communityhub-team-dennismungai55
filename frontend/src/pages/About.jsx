import { Link } from "react-router-dom";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";

export default function About() {
  return (
    <div className="space-y-6">
      <Card title="About CommunityHub">
        <p className="text-gray-600 leading-relaxed mb-4">
          CommunityHub is a modular React frontend built with React Router,
          custom hooks, a reusable shared component library, and Tailwind CSS
          utility styling.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Posts are fetched from JSONPlaceholder and combined with locally
          created posts, live search/filtering, and persisted likes so you can
          test the full workflow seamlessly.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link to="/posts">
            <Button variant="primary">Browse Posts</Button>
          </Link>
          <Link to="/create">
            <Button variant="outline">Write a Post</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
