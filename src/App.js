import { useState, useEffect } from "react";
import Header from "./component/layout/Header";
import TodoList from "./component/layout/TodoList";
import BounceLoader from "react-spinners/BounceLoader";

const TODO_THEME_KEY = "todo_theme";
const saveTodoTheme = (theme) => {
  const newTheme = JSON.stringify(theme);
  localStorage.setItem(TODO_THEME_KEY, newTheme);
};

function App() {
  const [theme, setTheme] = useState(() => {
    return JSON.parse(localStorage.getItem(TODO_THEME_KEY)) || "light";
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const x = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(x);
    };
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl">
      {loading ? (
        <div
          className={`flex w-full min-h-screen items-center justify-center ${
            theme === "dark" ? "bg-gray-600" : "bg-secondary-100"
          }`}
        >
          <BounceLoader color="#B993D6" loading={loading} size={60} />
        </div>
      ) : (
        <div className="w-full h-full">
          <Header
            theme={theme}
            setTheme={setTheme}
            saveTodoTheme={saveTodoTheme}
          />
          <TodoList theme={theme} />
        </div>
      )}
    </div>
  );
}

export default App;
