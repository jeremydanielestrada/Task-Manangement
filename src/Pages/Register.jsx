import RegisterForm from "../components/auth/RegisterForm";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="shadow-lg bg-gray-100  dark:bg-gray-600 rounded-lg border-1 border-gray-300 my-10 p-5  mx-auto  md:w-100">
      <div className="text-center  mb-5">
        <h1 className="text-2xl font-extrabold dark:text-white">Register</h1>
      </div>
      <RegisterForm />

      <div className="text-end mt-4  border-t border-gray-400">
        <p className="mt-2 dark:text-white">
          Click here to{" "}
          <Link className="text-blue-400 font-bold" to="/">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
