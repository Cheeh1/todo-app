import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Register from '../components/Register'
import Forgotten from '../components/Forgotten'

const RouterLink = () => {
    return (
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/forgotten' element={<Forgotten />}/>
          </Routes>
        </Router>
      );
};
export default RouterLink;