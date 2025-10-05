/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth";

const Layout = () => {
  const [theme, setTheme] = useState("light");
  const { signOutUser, fetchSession, userData } = useAuthStore();
  const navigate = useNavigate();
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  //Fetch current logged user
  useEffect(() => {
    fetchSession; // ensures metadata loaded
  }, []);

  const onSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch {
      console.log("Error loggig out");
    }
  };

  return (
    <>
      <header className="shadow-2xl py-5 px-2 bg-blue-400 dark:bg-blue-700">
        <nav className="flex items-center justify-between">
          <h1 className="font-bold font-mono text-2xl dark:text-white ">
            Task Manager
          </h1>

          <div className="mx-10 flex  items-center gap-5">
            {userData && (
              <p
                className="font-semibold text-lg cursor-pointer hover:"
                onClick={onSignOut}
              >
                Sign Out
              </p>
            )}

            <button
              onClick={toggleTheme}
              className=" rounded-full p-2 shadow-md bg-white cursor-pointer text-gray-600 hover:text-blue-800  transition-all ease-in-out"
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </button>
          </div>
        </nav>
      </header>

      <main className="py-8 px-2 ">
        <Outlet />
      </main>

      <footer className="shadow-lg text-1xl text-center font-bold dark:text-white bg-blue-400 dark:bg-blue-700 p-3 fixed bottom-0 left-0 right-0">
        All rights reserve 2025
      </footer>
    </>
  );
};
export default Layout;
