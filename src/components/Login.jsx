import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
    Email_Regex_Validation,
    Password_Regex_Validation
} from "../lib";
import image from '../assets/trip.png'

// const provider = new GoogleAuthProvider();

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [userNotFoundError, setUserNotFoundError] = useState("");
    const [wrongPasswordError, setWrongPasswordError] = useState("");

    // password visibilty
    const [showPassword, setShowPassword] = useState(false)

    const passwordVisibility = () => {
        setShowPassword(!showPassword)
    }

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

    // function for google authentication
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                console.log(user);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.error(error);
            });
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
                                    {showPassword ? <i class="fa-solid fa-eye"></i> : <i class="fa-solid fa-eye-slash"></i>}
                                </span>
                            </div>

                            <a className='forgotten' href='#forgotten'>forgotten password?</a>
                        </div>

                        <input type="submit" className='login-btn' value="Login" />

                        <div className='google'>
                            <p className='google-text'>Sign in with:</p>
                            <div className='google-item'>
                                <hr className='google-line' />
                                <div onClick={signInWithGoogle}>
                                    <i className="fa-brands fa-google google-logo"></i>
                                </div>
                                <hr />
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