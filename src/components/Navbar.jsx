import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
    const [user, setUser] = useState(null);

    const auth = getAuth();

    useEffect(() => {
        // Add the AuthStateChanged observer
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsAuthChecked(true);
        });

        // Clean up the observer when the component unmounts
        return () => unsubscribe();
    }, [auth]);



    return (
        <>
            <nav className="nav">
                <h1 className="nav-title">TODO APP</h1>
                <ul className="nav-item">
                    {user ? (
                        // User is logged in, show the logout button
                        <p>Hi, email</p>
                    ) : (
                        // User is not logged in, show the Sign Up and Sign In links
                        <>
                            <Link className='nav-sign-in' to="/">Sign In</Link>
                            <Link className='nav-sign-up' to="/register">Sign Up</Link>
                        </>
                    )}
                </ul>
            </nav>
        </>
    )
}

export default Navbar