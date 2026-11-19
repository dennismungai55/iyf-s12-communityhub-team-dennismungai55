import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({
  children,
  postCount = 0,
  likedCount = 0,
  searchQuery,
  onSearchChange,
  showSidebar = true,
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header postCount={postCount} />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSidebar ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <main className="lg:col-span-8 min-w-0">{children}</main>
            <div className="lg:col-span-4">
              <Sidebar
                totalPosts={postCount}
                likedCount={likedCount}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
              />
            </div>
          </div>
        ) : (
          <main className="min-w-0">{children}</main>
        )}
      </div>

      <Footer />
    </div>
  );
}
