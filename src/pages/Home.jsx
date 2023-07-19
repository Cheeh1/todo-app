import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Home = () => {

    const auth = getAuth();
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('Logged Out Successfully')
            navigate('/')
        } catch (error) {
            console.log('Error logging out:', error.message);
        }
    };

    return (
        <div>
            {/* Display content for logged-in user */}
            <h1>Welcome name!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
