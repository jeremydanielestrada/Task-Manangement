import { useState } from "react";
import { supabase, formActionDefault } from "../../utils/supabase";
import { useNavigate } from "react-router";
import { LoaderCircle } from "lucide-react";

const LoginForm = () => {
  const formDataDefault = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(formDataDefault);
  const [formAction, setFormAction] = useState(formActionDefault);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormAction({ ...formAction, formProcess: true });
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setFormAction({
        ...formAction,
        formErrorMessage: error.message,
        errorStatus: true,
      });

      return false;
    } else if (data) {
      setFormAction({ ...formAction, formProcess: false });
      setForm("");
      navigate("/dashboard");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        className="border-2 border-blue-800  font-semibold rounded-lg  w-full p-2  focus:ring-2 focus:ring-blue-400   focus:border-transparent outline-none transition"
        placeholder="Enter Email"
        type="email"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border-2 font-semibold  border-blue-800 my-5 rounded-lg w-full p-2  focus:ring-2 focus:ring-blue-400   focus:border-transparent outline-none transition"
        onChange={handleChange}
      />
      <button
        type="submit"
        className=" p-1 bg-blue-700 text-white text-1xl rounded-lg font-medium cursor-pointer w-full hover:bg-blue-500  flex justify-center align-center"
      >
        {formAction.formProcess === true ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <span>Submit</span>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
