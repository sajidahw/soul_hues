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

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status"); // no data sent

  if (res.status !== 200) {
    //unsuccessful status
    throw new Error("Unable to authenticate you...");
  }
  const data = await res.data; // received data
  return data;
};
