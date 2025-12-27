import { Link } from "react-router";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="shadow-lg bg-gray-100 dark:bg-gray-600 rounded-lg border-1 border-gray-300 my-10 p-5  mx-auto md:w-100">
      <div className="text-center  mb-5">
        <h1 className="text-2xl font-extrabold dark:text-white">Log In</h1>
      </div>
      <LoginForm />

      <div className="text-end mt-4 border-t border-gray-400">
        <p className="mt-2 dark:text-white">
          Click here to{" "}
          <Link className="text-blue-400 font-bold " to="/register">
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
