import { getUserToken } from "./session";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL


const authHeader = async (): Promise<Record<string, string>> => {
    const token = await getUserToken();
    return token ? { authorization: `Bearer ${token}` } : {};
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