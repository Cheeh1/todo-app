import { Link } from 'react-router-dom'
import {
    Email_Regex_Validation,
    Password_Regex_Validation
} from "../utils/regexValidation";
import image from '../assets/Images/trip.png'
import useFormInput from '../hooks/useForm';
import useLogin from '../hooks/auth/useLogin';

const Login = () => {

    const {
        showPassword,
        passwordVisibility,
        register,
        handleSubmit
    } = useFormInput();

   const {
    formData,
    handleChange,
    userNotFoundError,
    wrongPasswordError,
    onSubmit,
    signInWithGoogle
   } = useLogin();

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
                            <label className='login-label'>Email:</label>
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
                            <label className='login-label'>Password:</label>
                            <div className='password-field-container'>
                                <input
                                    type={showPassword ? "text" : 'password'}
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
                                <span className='toggle-password' onClick={passwordVisibility}>
                                    {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                                </span>
                            </div>

                            <Link to="/forgotten" className='forgotten'>Forgot password?</Link>
                        </div>

                        <input type="submit" className='login-btn' value="Login" />

                        <div className='google-auth'>
                            <div className='google-line'>
                                <hr className='line' />
                                <p className='line-text'>OR</p>
                                <hr className='line' />
                            </div>
                            <div onClick={signInWithGoogle} className='google-1'>
                                <i className="fa-brands fa-google google-logo"></i>
                                <p className='google-text'>Continue with google</p>
                            </div>
                        </div>
                    </form>

                    <div>
                        <p className='sign-up'>Don't have an account? <Link className='sign-up-link' to='/register'>Sign Up</Link></p>
                    </div>
                </section>

            </section>
        </>
    )
}
export default Login