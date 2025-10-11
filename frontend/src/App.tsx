import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  // download all users
  useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, [apiUrl]);

  // create new user
  const handleAddUser = async () => {
  if (!name || !email) return;
  try {
    const res = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      const updatedUsers = await res.json();
      setUsers(updatedUsers); // update frontend immediately
      setName("");
      setEmail("");
    } else {
      const error = await res.json();
      console.error("Failed to add user:", error.error);
    }
  } catch (err) {
    console.error("Network error:", err);
  }
};


  const handleDeleteUser = async (id: number) => {
    const res = await fetch(`${apiUrl}/users/${id}`, {method: "DELETE"});
    if (res.ok) {
      const updatedUsers = await res.json();
      setUsers(updatedUsers);
    } else {
      console.log("Faild to delete user");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9fafb",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "white",
          padding: "2rem",
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          FlowBoard Users
        </h1>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              flex: 1,
              padding: "0.5rem 0.75rem",
              border: "1px solid #ddd",
              borderRadius: 8,
              fontSize: 14,
            }}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              flex: 1,
              padding: "0.5rem 0.75rem",
              border: "1px solid #ddd",
              borderRadius: 8,
              fontSize: 14,
            }}
          />
          <button
            onClick={handleAddUser}
            style={{
              background: "#2563eb",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Add
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {users.length === 0 && (
            <p style={{ textAlign: "center", color: "#999" }}>
              No users yet. Add one above 👆
            </p>
          )}
          {users.map(u => (
            <li
              key={u.id}
              style={{
                background: "#f3f4f6",
                padding: "0.75rem 1rem",
                borderRadius: 8,
                marginBottom: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <strong>{u.name}</strong>
                <div style={{ fontSize: 13, color: "#555" }}>{u.email}</div>
              </span>
              <button
              onClick={() => handleDeleteUser(u.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontSize: 14,
                }}
                
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
