import axios from "axios";

export const isAuthenticated = async () => {
  try {
    const response = await axios.get("http://localhost:5000/auth/isauthenticated", {
      withCredentials: true,
    });
    console.log("User data:", response.data.user);
    return response.data.user
  } catch (err) {
    console.error("Error fetching user:", err);
    return false;
  }
};
