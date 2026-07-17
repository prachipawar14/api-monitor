import {useNavigate} from "react-router-dom";
import API from "../services/api";


function Navbar(){

const navigate = useNavigate();


const logout= async ()=>{
 try {
    await API.post("/auth/logout");
    localStorage.removeItem("token");
    navigate("/");
 } catch(error){
    console.error("Logout error:", error);
    localStorage.removeItem("token");
    navigate("/");
 }
};


return(

<nav>

<h2>
API Monitor
</h2>


<button onClick={logout}>
Logout
</button>


</nav>


)

}


export default Navbar;