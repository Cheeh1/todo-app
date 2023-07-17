import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../../config/firebase.js";

const useRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // onChange function
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const [error, setError] = useState("");

  const auth = getAuth();
  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully!");
    } catch (error) {
      console.log("Error registering user:", error.message);
      setError(error.message);
    }
  };

  return {
    formData,
    error,
    handleChange,
    onSubmit
  };
};

export default useRegister;
