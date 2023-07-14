import { useState } from "react"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Forgotten = () => {

    const [formData, setFormData] = useState({
        email: ""
    });

    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [resetEmailError, setResetEmailError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };

    // function for password reset
    const handleForgotPassword = async (email) => {
        const auth = getAuth();
        try {
            if (!email) {
                setResetEmailError("Please provide a valid email address.");
                return;
            }
            await sendPasswordResetEmail(auth, email);
            setResetEmailSent(true);
            setResetEmailError("");
            console.log('Password reset email sent successfully!');
        } catch (error) {
            setResetEmailSent(false);
            setResetEmailError("User Not Found");
            console.log('Error sending password reset email:', error.message);
        }
    };

    return (
        <>
            <section className="forgotten-container">
                <h1 className="forgotten-text">Enter your email</h1>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="yourname@gmail.com"
                    className="forgotten-field"
                    defaultValue={FormData.email}
                    onChange={handleChange}
                />
                {resetEmailSent ? (
                    <p className="forgot-error-1">Password reset email sent successfully! Check your email.</p>
                ) : (
                    <>
                        <button className="forgotten-btn" onClick={() => handleForgotPassword(formData.email)}>Reset Password</button>
                        {resetEmailError && <p className="forgot-error-2">{resetEmailError}</p>}
                    </>
                )}
            </section>
        </>
    )
}

export default Forgotten