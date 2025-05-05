/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
    return res.json()
  }
  catch (error: any) {
    return Error(error)
  }
}
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.token);
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Something went wrong',
    };
  }
};

export const getCurrentUser = async () => {
  const accessTokenCookie = (await cookies()).get("accessToken");

  if (!accessTokenCookie) return null;

  const accessToken = accessTokenCookie.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
export const logoutUser = async () => {
  try {
    (await cookies()).delete("accessToken");
    return { success: true, message: "Logout successful" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return {
      success: false,
      message: "Logout failed",
    };
  }
};