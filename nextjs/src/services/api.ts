import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MESSAGE_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postWeConnectMessage = async (postData: unknown) => {
  try {
    console.log(postData);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MESSAGE_API}/api/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getWeConnectMessages = async (
  page: number = 1,
  limit: number = 10
) => {
  try {
    const response = await api.get(`/api/message?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
