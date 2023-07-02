import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
    Email_Regex_Validation,
    Password_Regex_Validation
} from "../lib";
import image from '../assets/trip.png'

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [userNotFoundError, setUserNotFoundError] = useState("");
    const [wrongPasswordError, setWrongPasswordError] = useState("");

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
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully!');
        } catch (error) {
            console.log('Error logging user:', error.message);
            if (error.code === "auth/user-not-found") {
                setUserNotFoundError("User not found.");
            } else if (error.code === "auth/wrong-password") {
                setWrongPasswordError("Wrong password.");
            } else {
                setError(error.message)
            }
        }
    };

    return (
        <>
            <section className='homepage'>
                <div>
                    <img className='login-img' src={image} alt='home-img' />
                </div>

                <section className='login-form'>
                    <form onSubmit={handleSubmit(onSubmit)} className='login'>
                        {userNotFoundError && <p className="login-error">{userNotFoundError}</p>}
                        {wrongPasswordError && <p className="login-error">{wrongPasswordError}</p>}
                        <div className='login-item'>
                            <label>Email:</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder='yourname@gmail.com'
                                className='login-field'
                                defaultValue={formData.email}
                                onChange={handleChange}
                                {...register("email", {
                                    required: true,
                                    pattern: Email_Regex_Validation,
                                })}
                            />
                        </div>
                        <div className='login-item'>
                            <label>Password:</label>
                            <input
                                type="text"
                                name="password"
                                id="password"
                                placeholder='******'
                                className='login-field'
                                defaultValue={formData.password}
                                onChange={handleChange}
                                {...register("password", {
                                    required: true,
                                    pattern: Password_Regex_Validation,
                                })}
                            />
                            <a href='#forgotten'>forgotten password?</a>
                        </div>

                        <input type="submit" className='login-btn' value="Login" />

                    </form>

                    <div>
                        <p className='sign-up'>Don't have an account? <Link to='/register'>Sign Up</Link></p>
                    </div>
                </section>

            </section>
        </>
    )
}

export default Login