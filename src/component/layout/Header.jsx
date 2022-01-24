import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import animations from "../../constant/animations";
import { BsFillCircleFill } from "react-icons/bs";

function Header({ theme, setTheme, saveTodoTheme }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const time = useMemo(() => {
    return new Date().toLocaleDateString("en-GB", options);
  }, []);

  const handleChangeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {
    saveTodoTheme(theme);
  }, [theme, saveTodoTheme]);

  return (
    <motion.div
      variants={animations.header}
      initial="initial"
      animate="animate"
      transition="transition"
      className="bg-gradient w-full px-8 md:px-16 py-4"
    >
      <div className="flex justify-between items-center mx-auto max-w-screen-xl">
        <div
          className={`text-lg md:text-xl font-semibold transition-colors ${
            theme === "dark" ? "text-slate-900" : "text-slate-100"
          }`}
        >
          {time}
        </div>
        <div>
          <div
            className={`w-16 h-8 p-1 flex items-center rounded-full cursor-pointer ${
              theme === "dark" ? "bg-gray-600" : "bg-slate-100"
            }`}
            onClick={handleChangeTheme}
          >
            <BsFillCircleFill
              className={`text-2xl rounded-full duration-200 ${
                theme === "dark"
                  ? "text-slate-100 ml-auto "
                  : "text-gray-600 mr-auto"
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
