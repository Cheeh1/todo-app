import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Forgotten from '../pages/Forgotten'

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