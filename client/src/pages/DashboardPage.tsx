import { Link } from "react-router-dom";
import Button from "../components/common/Button"
import { useAuth } from "../context/AuthContext"


function DashboardPage()
{
  const auth = useAuth();
  return (
    <>
      <div className="container">
        <p>{auth?.userdata?.name}<br /></p>
        <p>{auth?.userdata?.email}<br /></p>
        <p className="break-words">{auth?.userdata?.token}<br /></p>
        <Button onClick={auth?.APIFunctions.SignOut} type="text">SIGN OUT</Button>
        <Link to='/scales'><Button type="text">Scales</Button></Link>
      </div>
    </>
  )
}

export default DashboardPage