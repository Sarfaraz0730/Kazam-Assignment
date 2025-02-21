import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";

interface FormData {
  username: string;
  name: string;
  email: string;
  password: string;
}

const schema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
  }),
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Enter a valid email",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

const Registration = () => {
  const navigate = useNavigate(); // For redirecting to login page
  const [formData, setFormData] = useState<FormData>({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) return true;

    const newErrors: Record<string, string> = {};
    error.details.forEach((err) => {
      newErrors[err.path[0] as string] = err.message;
    });

    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/Registration", formData);
      alert("🎉 Registration successful! Redirecting to login...");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = Object.values(formData).every((value) => value.trim() !== "");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-left">Create an Account</h2>

        {errors.general && <p className="text-red-600 text-left text-sm">{errors.general}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {["username", "name", "email", "password"].map((field) => (
            <div key={field} className="text-left">
              <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          <button
            type="submit"
            disabled={!isFormComplete || loading}
            className={`w-full text-sm p-2 rounded-md transition duration-300 ${
              isFormComplete
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-left text-gray-500 mt-4">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
