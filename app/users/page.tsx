import React from "react";
import User from "@/types/User";
import Link from "next/link";
import Image from "next/image";

async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch("https://dummyjson.com/users", {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

async function Users() {
  const users = await fetchUsers();

  return (
    <div className="p-8">
      {users.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {users.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id} className="block">
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm break-all">
                    {user.email}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
