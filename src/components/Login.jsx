import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
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
    const onSubmit = data => console.log(data);

    return (
        <>
            <section className='homepage'>
                <div>
                    <img className='login-img' src={image} alt='home-img' />
                </div>

                <section className='login-form'>
                    <form onSubmit={handleSubmit(onSubmit)} className='login'>
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
                            {errors.email && <p className="login-error">Not a valid email format</p>}
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
                            {errors.password && (
                                <p className="login-error">
                                    Wrong password format
                                </p>
                            )}
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