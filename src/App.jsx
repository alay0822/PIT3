import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import lightBg from "./assets/background_image.jpg"; // Light mode background
import darkBg from "./assets/image.jpg"; // Dark mode background
import axios from "axios";

// LOGIN FUNCTION OUTSIDE COMPONENT
export const login = async (username, password) => {
  try {
    const response = await axios.post("https://backend-6un2.onrender.com/api-token-auth/", {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div
      style={{
        backgroundImage: `url(${darkMode ? darkBg : lightBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <h1>TaskAhead App</h1>
      <TodoList darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
