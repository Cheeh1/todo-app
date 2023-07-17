import { useState } from "react"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const useForgotten = () => {

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

    return {
        formData,
        resetEmailSent,
        resetEmailError,
        handleChange,
        handleForgotPassword
    }
}

export default useForgotten