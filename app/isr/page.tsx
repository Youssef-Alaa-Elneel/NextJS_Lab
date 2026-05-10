import React from "react";

type User = {
  id: string;
  name: string;
  email: string;
  city: string;
};

async function getISRUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:4000/users", {
    next: { revalidate: 10 },
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function ISRPage() {
  const users = await getISRUsers();

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-2 text-purple-600">
        Incremental Static Regeneration (ISR)
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="border border-purple-200 p-4 rounded-lg shadow-sm bg-purple-50"
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
