import useForgotten from "../hooks/auth/useForgotten";

const Forgotten = () => {

    const {
        formData,
        resetEmailSent,
        resetEmailError,
        handleChange,
        handleForgotPassword
    } = useForgotten();

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