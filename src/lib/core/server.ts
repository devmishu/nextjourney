import { getUserToken } from "./session";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL


const authHeader = async (): Promise<Record<string, string>> => {
    const token = await getUserToken();
    return token ? { authorization: `Bearer ${token}` } : {};
};

export const serverFetch = async <T>(path: string): Promise<T> => {
  try {
    const res = await fetch(`${baseurl}${path}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Something went wrong");
    }

    return data.data as T;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Server Fetch Error:", error.message);
      throw error;
    }

    throw new Error("Unknown error occurred");
  }
};

export const protectedFetch = async <T>(path: string): Promise<T> => {
  try {
    const res = await fetch(`${baseurl}${path}`,{
      headers: await authHeader(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Something went wrong");
    }

    return data.data as T;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Server Fetch Error:", error.message);
      throw error;
    }

    throw new Error("Unknown error occurred");
  }
};

export const serverMutation = async <T>(
    path: string,
    apiData: T,
    method: "POST"
) => {
    const res = await fetch(`${baseurl}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...await authHeader(),
        },
        body: JSON.stringify(apiData),
    });

    return res.json();
};


export const serverDelete = async (path: string) => {
    const res = await fetch(`${baseurl}${path}`, {
        method: 'DELETE',
        headers: await authHeader(),
    });

    return res.json();
}