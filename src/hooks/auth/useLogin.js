import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const useLogin = () => {
    
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
    const [userNotFoundError, setUserNotFoundError] = useState("");
    const [wrongPasswordError, setWrongPasswordError] = useState("");

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
    const provider = new GoogleAuthProvider();
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

    return {
        formData,
        handleChange,
        userNotFoundError,
        wrongPasswordError,
        onSubmit,
        signInWithGoogle
    }
}

export default useLogin;