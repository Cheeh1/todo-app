import { useState } from "react";
import { useForm } from "react-hook-form";

const useFormInput = () => {

  // password visibilty
  const [showPassword, setShowPassword] = useState(false);

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // form validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // const onSubmit = data => console.log(data);

  return {
    showPassword,
    passwordVisibility,
    register,
    handleSubmit,
    errors
  }
};

export default useFormInput;
