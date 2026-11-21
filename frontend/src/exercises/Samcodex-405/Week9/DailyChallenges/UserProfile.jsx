import { useState } from "react";

function UserProfile() {
  const [user, setUser] = useState({
    name: "Shaniz Ann Mumbua",
    role: "Web Development Learner",
    bio: "Learning React and building projects with CommunityHub.",
  });

  const [editing, setEditing] = useState(false);

  return (
    <section>
      <h2>User Profile</h2>

      {editing ? (
        <>
          <label htmlFor="profile-name">Name</label>

          <input
            id="profile-name"
            value={user.name}
            onChange={(event) =>
              setUser({ ...user, name: event.target.value })
            }
          />

          <label htmlFor="profile-role">Role</label>

          <input
            id="profile-role"
            value={user.role}
            onChange={(event) =>
              setUser({ ...user, role: event.target.value })
            }
          />

          <label htmlFor="profile-bio">Bio</label>

          <textarea
            id="profile-bio"
            value={user.bio}
            onChange={(event) =>
              setUser({ ...user, bio: event.target.value })
            }
          />

          <button onClick={() => setEditing(false)}>
            Save Profile
          </button>
        </>
      ) : (
        <>
          <h3>{user.name}</h3>
          <p>{user.role}</p>
          <p>{user.bio}</p>

          <button onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </>
      )}
    </section>
  );
}

export default UserProfile;
