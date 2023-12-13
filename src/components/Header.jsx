import { Link } from "react-router-dom";
import authToken from "../authToken";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userInformationString = localStorage.getItem("userInformation");
  const userInformation = JSON.parse(userInformationString);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token del localStorage al cerrar sesión
    localStorage.removeItem("token");
    localStorage.removeItem("userInformation");

    // Elimina el token de los headers de Axios
    authToken(null);
    // Redirige al usuario a la página de inicio de sesión u otra página deseada
    navigate("/login");
  };

  return (
    <div className="flex justify-between bg-[#844C26] w-full h-20 items-center px-10">
      <div>
        <img src="\src\assets\Imagenes Casona\Logos\LogoCasona.png" alt="" />
      </div>
      <div className="flex items-center">
        <span className="mr-4 text-white text-lg cursor-pointer" onClick={handleLogout}>{userInformation?.user?.username || ""}</span>
        <Link to="/Login">
          <img src="\src\assets\Imagenes Casona\Logos\LoginSVG.png" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
