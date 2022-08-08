import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BsArrowBarUp,
  BsDashLg,
  BsFillCheckCircleFill,
  BsFillCircleFill,
  BsFillPenFill,
  BsPlusCircleFill,
  BsPlusLg,
} from "react-icons/bs";
import { v4 } from "uuid";
import animations from "../../constant/animations";

const TODO_LIST_KEY = "todo_list";
const saveTodoList = (todoList) => {
  const newTodoList = JSON.stringify(todoList);
  localStorage.setItem(TODO_LIST_KEY, newTodoList);
};

function TodoList({ theme }) {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [todoList, setTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem(TODO_LIST_KEY)) || [];
  });

  const [todo, setTodo] = useState({
    id: undefined,
    title: "",
    completed: false,
  });

  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);
  const [filter, setFilter] = useState("all");

  const inputRef = useRef();
  const btnAddRef = useRef();

  const handleToggleAdd = () => {
    setToggleAdd(!toggleAdd);
    setEditing(false);
    setTodo({ ...todo, title: "" });
  };

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.keyCode === 13) {
        btnAddRef.current.click();
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const setAndSaveTodoList = (todoList) => {
    setTodoList(todoList);
    saveTodoList(todoList);
  };

  const handleChangeTodo = (e) => setTodo({ ...todo, title: e.target.value });

  const handleAddTodo = () => {
    if (todo.title.trim()) {
      const newTodoList = [
        ...todoList,
        {
          title: todo.title,
          completed: false,
          id: v4(),
        },
      ];

      setAndSaveTodoList(newTodoList);
      setTodo({ ...todo, title: "" });

      inputRef.current.focus();
    }
  };

  const handleDelTodo = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);

    setAndSaveTodoList(newTodoList);
  };

  const handleEditingTodo = (id, title) => {
    setToggleAdd(true);
    setEditing(true);
    setEditingIndex(id);
    setTodo({ ...todo, title });
  };

  const handleUpdateTodo = () => {
    const newTodoList = [...todoList];
    const updateTodo = newTodoList.find((todo) => todo.id === editingIndex);

    updateTodo.title = todo.title;

    setAndSaveTodoList(newTodoList);
    setEditing(false);
    setTodo({ ...todo, title: "" });

    inputRef.current.focus();
  };

  const handleCancelUpdateTodo = () => {
    setEditing(false);
    setTodo({ ...todo, title: "" });

    inputRef.current.focus();
  };

  const handleCheckCompleted = (id) => {
    const newTodoList = [...todoList];
    const checkingTodo = newTodoList.find((todo) => todo.id === id);

    checkingTodo.completed = !checkingTodo.completed;

    setAndSaveTodoList(newTodoList);
  };

  const renderedTodoList = useMemo(() => {
    return todoList.filter(
      (item) => filter === "all" || item.completed === filter
    );
  }, [todoList, filter]);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={animations.page}
        initial="initial"
        animate="animate"
        transition="transition"
        className={`px-5 md:px-16 py-8 w-full min-h-screen transition-colors ${
          theme === "dark" ? "bg-gray-600" : "bg-secondary-100"
        } `}
      >
        <div className="mx-auto max-w-screen-xl">
          <div className="w-full text-center">
            <h3
              className={`text-4xl  font-semibold transition-colors ${
                theme === "dark" ? "text-slate-100" : "text-slate-800"
              } `}
            >
              BodoiTodo
            </h3>
          </div>
          <div className="flex mt-5">
            <button
              className="p-4 rounded-full bg-gradient mx-auto shadow-lg"
              onClick={handleToggleAdd}
              title="click to enter the title"
            >
              <BsPlusLg
                className={`text-white ${
                  toggleAdd === true ? "icon-rotate" : "icon-not-rotate"
                }`}
              />
            </button>
          </div>
          {toggleAdd && (
            <motion.div
              className="flex w-full"
              variants={animations.item}
              initial="initial"
              animate="animate"
              transition="transition"
              exit="exit"
            >
              <div className="flex items-center justify-center gap-3 mt-5 w-full mx-auto">
                <input
                  type="text"
                  ref={inputRef}
                  value={todo.title}
                  onChange={handleChangeTodo}
                  placeholder="Enter todo..."
                  className={`outline-none border px-5 py-2 rounded-lg shadow-md w-full md:w-5/12 transition-colors ${
                    theme === "dark" ? "bg-gray-700 text-slate-100" : "bg-white"
                  }`}
                />
                <div className="flex items-center justify-between gap-2">
                  <button
                    className="p-3 rounded-full bg-gradient shadow-lg cursor-pointer"
                    onClick={(editing && handleUpdateTodo) || handleAddTodo}
                    ref={btnAddRef}
                    title={(editing && "update todo") || "add todo"}
                  >
                    {(editing && <BsArrowBarUp className="text-white" />) || (
                      <BsPlusCircleFill className="text-white" />
                    )}
                  </button>
                  {editing && (
                    <button
                      className="p-3 rounded-full bg-gradient shadow-lg cursor-pointer"
                      title="cancel update"
                      onClick={handleCancelUpdateTodo}
                    >
                      <BsDashLg className="text-white" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
          <div className="flex items-center justify-center mt-8">
            {todoList.length >= 1 && (
              <motion.ul
                variants={animations.item}
                initial="initial"
                animate="animate"
                transition="transition"
                exit="exit"
                className={`flex flex-col gap-5 p-5 rounded-lg drop-shadow-lg w-full md:w-7/12 text-lg transition-colors ${
                  theme === "dark" ? "bg-gray-700 text-slate-100" : "bg-white"
                }`}
              >
                {filter !== "all" && renderedTodoList.length <= 0 && (
                  <li>
                    <h4 className="text-center text-xl">Nothing to show</h4>
                  </li>
                )}
                {renderedTodoList.map((item) => {
                  return (
                    <motion.li
                      variants={animations.todoItem}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition="transition"
                      key={item.id}
                      className="flex items-center gap-3 ease-in duration-200"
                    >
                      <div
                        className={`flex justify-between items-center gap-1 w-full border rounded-lg px-5 py-2 transition-colors`}
                      >
                        <span
                          className={`break-all ${
                            item.completed &&
                            "line-through italic text-slate-400"
                          }`}
                        >
                          {item.title}
                        </span>
                        <div
                          onClick={() => handleCheckCompleted(item.id)}
                          title="check completed"
                        >
                          {(item.completed && (
                            <BsFillCheckCircleFill className="text-lg text-primary border-2 rounded-full cursor-pointer" />
                          )) || (
                            <BsFillCircleFill className="text-lg text-white border-2 rounded-full cursor-pointer" />
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <BsFillPenFill
                          className="text-primary text-md md:text-2xl cursor-pointer"
                          onClick={() => handleEditingTodo(item.id, item.title)}
                          title="edit todo"
                        />
                        <BsPlusLg
                          className="text-primary text-md md:text-2xl rotate-45 cursor-pointer"
                          onClick={() => handleDelTodo(item.id)}
                          title="delete todo"
                        />
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </div>
          <div className="flex items-center justify-center mt-8">
            {todoList.length >= 1 && (
              <motion.div
                variants={animations.item}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`flex items-center justify-between gap-3 px-5 py-3 w-full md:w-7/12 rounded-lg drop-shadow-lg transition-colors ${
                  theme === "dark" ? "bg-gray-700 text-slate-100" : "bg-white"
                }`}
              >
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-2 border rounded-lg w-full transition-colors ${
                    filter === "all"
                      ? (theme === "dark" && "bg-slate-800 border-none") ||
                        "bg-slate-200"
                      : "bg-transparent"
                  }`}
                  title="show all"
                >
                  All
                </button>
                <button
                  onClick={() => setFilter(false)}
                  className={`px-3 py-2 border rounded-lg w-full transition-colors ${
                    filter === false
                      ? (theme === "dark" && "bg-slate-800 border-none") ||
                        "bg-slate-200"
                      : "bg-transparent"
                  }`}
                  title="show new"
                >
                  New
                </button>
                <button
                  onClick={() => setFilter(true)}
                  className={`px-3 py-2 border rounded-lg w-full transition-colors ${
                    filter === true
                      ? (theme === "dark" && "bg-slate-800 border-none") ||
                        "bg-slate-200"
                      : "bg-transparent"
                  }`}
                  title="show completed"
                >
                  Completed
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TodoList;
