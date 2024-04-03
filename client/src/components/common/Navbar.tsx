import { Link } from 'react-router-dom';
import Button from './Button';
import { useAuth} from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import icon from '/icon.png'

function Navbar()
{
    const auth = useAuth();
    const location = useLocation();

    return (
        <nav className="md:container md:mx-auto flex justify-between p-8">
            <div className="flex items-center invert"><Link to='/' className='h-10'><img className='w-full h-full object-contain' src={icon}/></Link></div>
            <div className="flex gap-1 md:gap-4">
                {
                    auth?.isAuthorized?(
                        (location.pathname == '/')?(
                            <Link to='/dashboard'><Button type="filled">Dashboard</Button></Link>
                        ):(
                            (location.pathname == '/dashboard')?(<>
                                <Link to='/menu'>
                                    <Button type="filled">Training Modules</Button>
                                </Link> 
                                <Link to='/community'>
                                    <Button type="filled">Community</Button>
                                </Link> 
                            </>):(<Link to='/dashboard'><Button type="filled">Dashboard</Button></Link>)
                        )
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