import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="flex gap-8 justify-start bg-[#F0D4C4] w-full h-12 items-center px-10 text-lg">
            <Link to="/Inicio/Principal" className="font-medium">INICIO</Link>    
            <Link to="/Inicio/Nosotros" className="font-medium">NOSOTROS</Link>    
            <Link to="/Inicio/Menu" className="font-medium">MENU</Link>    
            <Link to="/Inicio/Pedidos" className="font-medium">PEDIDOS</Link>    
        </div>
    );
};

export default NavBar;