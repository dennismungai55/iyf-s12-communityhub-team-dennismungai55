import Timer from "./Timer";
import UserSearch from "./UserSearch";
import Tabs from "./Tabs";
import {
  AuthHeader,
  AuthProvider,
  LoginPage,
  ProtectedRoute,
} from "./AuthContext";
import UserProfile from "./UserProfile";
import UserExplorer from "./UserExplorer";

export default function ExercisesPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen space-y-10 bg-slate-50 p-6">
        <AuthHeader />

        <section className="mx-auto max-w-4xl space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Day 1: Timer</h2>
          <Timer />
        </section>

        <section className="mx-auto max-w-4xl space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            Day 2: API Search
          </h2>
          <UserSearch />
        </section>

        <section className="mx-auto max-w-4xl space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Day 3: Tabs</h2>
          <Tabs
            tabs={[
              {
                id: "tab1",
                label: "First Tab",
                content: <p>Content for tab 1.</p>,
              },
              {
                id: "tab2",
                label: "Second Tab",
                content: <p>Content for tab 2.</p>,
              },
            ]}
          />
        </section>

        <section className="mx-auto max-w-4xl space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            Day 4: Auth & Protected Profile
          </h2>
          <LoginPage />
          <ProtectedRoute>
            <UserProfile userId={1} />
          </ProtectedRoute>
        </section>

        <section className="mx-auto max-w-5xl space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            Day 5 & Bonus: User Explorer
          </h2>
          <UserExplorer />
        </section>
      </div>
    </AuthProvider>
  );
}
