import { initData } from "@telegram-apps/sdk";

const DEFAULT_URL = "https://c5b33d01-9142-46a1-b475-bcd31672639d.tunnel4.com/path";

async function request(endpoint: string, method: string = "get", data?: any) {
  const options: RequestInit = {
    method: method,
    headers: {
      Authorization: `${initData.raw()}`,
      ContentType: "application/json",
      Accept: "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(`${DEFAULT_URL}/api/${endpoint}`, options);
  const jsonData = await response.json();

  if (response.ok) return jsonData;
}

export default request;
