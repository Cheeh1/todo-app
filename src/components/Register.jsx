import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import image from '../assets/trip.png';
import {
    Email_Regex_Validation,
    Password_Regex_Validation
} from "../lib";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    // const onSubmit = data => console.log(data);

    const auth = getAuth(); 

    const onSubmit = async (data) => {
        try {
          const { email, password } = data;
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User registered successfully!');
        } catch (error) {
          console.log('Error registering user:', error.message);
          setError(error.message)
        }
      };


    return (
        <>
            <section className='register-page'>
                <div>
                    <img className='register-img' src={image} alt='home-img' />
                </div>

                <div className='register-form'>
                    <form onSubmit={handleSubmit(onSubmit)} className='register'>
                    {error && <p className="email-error">Email already in use</p>}
                        <div className='register-item'>
                            <label className='register-label'>First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder='first name'
                                className='register-field'
                                defaultValue={formData.firstName}
                                onChange={handleChange}
                                {...register("firstName", { required: true, minLength: 3 })}
                            />
                            {errors.firstName && (
                                <p className="register-error">Minimum of 3 characters</p>
                            )}
                        </div>

                        <div className='register-item'>
                            <label className='register-label'>Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder='last name'
                                className='register-field'
                                defaultValue={formData.lastName}
                                onChange={handleChange}
                                {...register("lastName", { required: true, minLength: 3 })}
                            />
                            {errors.lastName && (
                                <p className="register-error">Minimum of 3 characters</p>
                            )}
                        </div>

                        <div className='register-item'>
                            <label className='register-label'>Email:</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder='yourname@gmail.com'
                                className='register-field'
                                defaultValue={formData.email}
                                onChange={handleChange}
                                {...register("email", {
                                    required: true,
                                    pattern: Email_Regex_Validation,
                                })}
                            />
                            {errors.email && <p className="register-error">Not a valid email format</p>}
                        </div>

                        <div className='register-item'>
                            <label className='register-label'>Password:</label>
                            <input
                                type="text"
                                name="password"
                                id="password"
                                placeholder='********'
                                className='register-field'
                                defaultValue={formData.password}
                                onChange={handleChange}
                                {...register("password", {
                                    required: true,
                                    pattern: Password_Regex_Validation,
                                })}
                            />
                            {errors.password && (
                                <p className="register-error">
                                    Password must contain at least a digit, special symbol, Uppercase,
                                    Lowercase and 8-10 characters long.
                                </p>
                            )}
                        </div>

                        <input type="submit" className='register-btn' value="Sign Up" />

                    </form>

                    <div>
                        <p className='sign-in'>I already have an account. <Link to='/'>Sign In</Link></p>
                    </div>
                </div>

            </section>

        </>
    )
}

export default Register