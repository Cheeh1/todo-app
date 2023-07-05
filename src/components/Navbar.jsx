import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="nav">
                <h1 className="nav-title">TODO APP</h1>
                <ul className="nav-item">
                    <Link className='nav-sign-in' to="/">Sign In</Link>
                    <Link className='nav-sign-up' to="/register">Sign Up</Link>
                </ul>
            </nav>
        </>
    )
}

export default Navbar