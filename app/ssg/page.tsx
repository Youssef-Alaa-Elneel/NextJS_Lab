import React from "react";

// تعريف نوع البيانات
type User = {
  id: string;
  name: string;
  email: string;
  city: string;
};

// دالة جلب البيانات
async function getSSGUsers(): Promise<User[]> {
  // استخدام force-cache عشان نجبر Next.js يعمل كاش دائم
  const res = await fetch("http://localhost:4000/users", {
    cache: "force-cache",
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function SSGPage() {
  const users = await getSSGUsers();

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-2 text-blue-600">
        Static Site Generation (SSG)
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="border border-gray-200 p-4 rounded-lg shadow-sm"
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
