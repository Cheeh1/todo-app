import { Link } from 'react-router-dom';
import image from '../assets/Images/trip.png';
import {
    Email_Regex_Validation,
    Password_Regex_Validation
} from "../utils/regexValidation.js";
import useRegister from '../hooks/auth/useRegister';
import useFormInput from '../hooks/useForm';

const Register = () => {

    const {
        formData,
        error,
        onSubmit
    } = useRegister();

    const {
        showPassword,
        passwordVisibility,
        handleChange,
        register,
        handleSubmit,
        errors
    } = useFormInput();

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
                                autoComplete='firstName'
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
                                autoComplete='lastName'
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
                                autoComplete='email'
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
                            <div className='password-field-container'>
                                <input
                                    type={showPassword ? "text" : 'password'}
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
                                <span className='toggle-password' onClick={passwordVisibility}>
                                    {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                                </span>
                            </div>
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
                        <p className='sign-in'>I already have an account. <Link className='sign-in-link' to='/'>Sign In</Link></p>
                    </div>
                </div>

            </section>

        </>
    )
}

export default Register