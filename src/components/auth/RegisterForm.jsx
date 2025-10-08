import { useState } from "react";
import { useNavigate } from "react-router";
import { LoaderCircle } from "lucide-react";
import { supabase, formActionDefault } from "../../utils/supabase";

const RegisterForm = () => {
  const formDataDefault = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  // Dont destruct if  passing a data into a state
  const [formData, setFormData] = useState(formDataDefault);
  const [formAction, setFormAction] = useState(formActionDefault);

  const navigate = useNavigate();

  //For input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormAction({ ...formActionDefault, formProcess: true });

    if (formData.password !== formData.password_confirmation) {
      setFormAction({
        ...formAction,
        formErrorMessage: "Passwords do not match",
        errorStatus: true,
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
      },
    });

    if (error) {
      setFormAction({
        ...formAction,
        formErrorMessage: error.message,
        errorStatus: true,
      });
    } else if (data) {
      setFormAction({
        ...formAction,
        formSuccessMessage: "Register Successfully ",
      });
      setFormData(formDataDefault);

      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="w-full text-center">
        {formAction.formSuccessMessage ? (
          <p className="text-green-400">{formAction.formSuccessMessage}</p>
        ) : (
          <p className="text-red-400">{formAction.formErrorMessage}</p>
        )}
      </div>

      <input
        name="first_name"
        className="border-2 border-blue-800  font-semibold my-3  rounded-lg  w-full p-2  focus:ring-2 focus:ring-blue-400   focus:border-transparent outline-none transition"
        placeholder="First Name"
        type="text"
        value={formData.first_name}
        onChange={handleChange}
      />
      <input
        name="last_name"
        type="text"
        placeholder="Last Name"
        className="border-2 border-blue-800 my-3   font-semibold rounded-lg w-full p-2  focus:ring-2 focus:ring-blue-400   focus:border-transparent outline-none transition"
        value={formData.last_name}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border-2 border-blue-800 my-3   font-semibold rounded-lg w-full p-2  focus:ring-2 focus:ring-blue-400   focus:border-transparent outline-none transition"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border-2 border-blue-800 my-3  font-semibold rounded-lg w-full p-2  focus:ring-2 focus:ring-blue-400   focus:border-transparent outline-none transition"
        value={formData.password}
        onChange={handleChange}
      />

      <input
        name="password_confirmation"
        type="password"
        placeholder="Confirm Password"
        className="border-2 border-blue-800 my-3   font-semibold rounded-lg w-full p-2  focus:ring-2 focus:ring-blue-400   focus:border-transparent outline-none transition"
        value={formData.password_confirmation}
        onChange={handleChange}
      />
      <button
        type="submit"
        className=" p-1 bg-blue-700 text-white text-1xl rounded-lg font-medium cursor-pointer w-full hover:bg-blue-500  flex justify-center align-center"
      >
        {" "}
        {formAction.formProcess === true ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <span>Register</span>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
