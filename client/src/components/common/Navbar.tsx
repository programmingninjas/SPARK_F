import { Link } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';

function Navbar()
{
    const auth = useAuth();

    return (
        <nav className="md:container md:mx-auto flex justify-between p-8">
            <div className="flex items-center">LOGO HERE</div>
            <div className="flex gap-1 md:gap-4">
                {
                    auth?.isAuthorized?(
                        <Link to='/dashboard'><Button type="filled">Dashboard</Button></Link>
                    ):(
                        <>
                            <Link to='/login'><Button type="text">LOGIN</Button></Link>
                            <Link to='/signup'><Button type="filled">SIGN UP</Button></Link>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;