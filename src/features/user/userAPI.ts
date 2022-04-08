import type { User } from "../../lib/models";
export async function fetchUserById(id: number): Promise<{ data: string }> {
  const response = await fetch(`/api/user?id=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const result = await response.json();

  return result;
}
export async function fetchUserByEmail(email: string): Promise<{ data: User }> {
  const response = await fetch(`/api/user?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return result;
}
