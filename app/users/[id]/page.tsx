import User from "@/types/User";
import Image from "next/image";
import React from "react";
import { Metadata } from "next";

// get user details from dummyjson.com by id
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const user = await fetchUser(id);

  return {
    title: `${user.firstName} ${user.lastName} `,
    description: `${user.firstName} ${user.lastName}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await fetchUser(id);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="flex items-center space-x-4">
        <Image
          src={user.image}
          alt={user.firstName}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
