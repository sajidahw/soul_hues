// communication
import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password }); // data sent: email, pw

  if (res.status !== 200) {
    //unsuccessful status
    throw new Error("Unable to login");
  }
  const data = await res.data; // received data
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password }); // data sent: email, pw

  if (res.status !== 201) {
    //unsuccessful status
    throw new Error("Unable to Signup");
  }
  const data = await res.data; // received data
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status"); // no data sent

  if (res.status !== 200) {
    //unsuccessful status
    throw new Error("Unable to authenticate you...");
  }
  const data = await res.data; // received data
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });

  if (res.status !== 200) {
    //unsuccessful status
    throw new Error("Unable to send chat.");
  }
  const data = await res.data; // received full list of chats
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");

  if (res.status !== 200) {
    //unsuccessful status
    throw new Error("Unable to send chat.");
  }
  const data = await res.data; // received full list of chats
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");

  if (res.status !== 200) {
    //unsuccessful status
    throw new Error("Unable to delete chats.");
  }
  const data = await res.data; // received full list of chats
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");

  if (res.status !== 200) {
    //unsuccessful status
    throw new Error("Unable to logout.");
  }
  const data = await res.data; // received full list of chats
  return data;
};
