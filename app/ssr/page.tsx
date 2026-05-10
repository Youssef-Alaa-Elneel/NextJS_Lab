import React from "react";

type User = {
  id: string;
  name: string;
  email: string;
  city: string;
};

async function getSSRUsers(): Promise<User[]> {
  // استخدام no-store عشان نمنع الكاش تماماً
  const res = await fetch("http://localhost:4000/users", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function SSRPage() {
  const users = await getSSRUsers();

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-2 text-green-600">
        Server-Side Rendering (SSR)
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="border border-green-200 p-4 rounded-lg shadow-sm bg-green-50"
          >
            <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-700">{user.email}</p>
            <p className="text-gray-700">{user.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
