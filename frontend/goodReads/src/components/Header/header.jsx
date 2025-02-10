import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo3.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../Header/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import { faSearch, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "../../context/fav";
=======
import { faSearch, faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "../../context/fav"; // استيراد الكونتكست
import { useCart } from "../../context/CartContext";
>>>>>>> d3bcb0c (---)

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
<<<<<<< HEAD
  const { favorites } = useFavorites();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);


  const links = [
    { title: "Home", link: "/" },
    { title: "Books", link: "/allbooks" },
=======
  const { favorites } = useFavorites(); 
  const { cartItemCount } = useCart(); // Get cart count
  
  const links = [
    { title: "Home", link: "/" },
    { title: "Books", link: "/allbooks" },
    { title: "Profile", link: "/profile" },
>>>>>>> d3bcb0c (---)
    { title: "Authors", link: "/authors" },
  ];

  if (isLoggedIn) {
    links.push({ title: "Profile", link: "/profile" });
    if (role === "user")
      links.push({ title: "Cart", link: "/cart" });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" style={{ width: "100px", height: "100px", marginLeft: "20px" }} />
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex bg-light" role="search" onSubmit={handleSearch} style={{ width: "100%" }}>
            <div style={{ position: "relative", width: "60%", display: "flex", backgroundColor: "#f8f9fa" }}>
              <input
                className="form-control"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  marginRight: "-1px",
                  height:"2.5em",
                  margin: "0px" 

                }}
              />

              <button type="submit" style={{
                backgroundColor: "#fbb02d",
                border: "none",
                cursor: "pointer",
                height:"3.4em",
                padding: "0px 13px", 
                borderTopRightRadius:"1em",
                borderBottomRightRadius:"1em",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                margin: "0px" 
              }}>
                <FontAwesomeIcon icon={faSearch} style={{ color: "#111111", fontSize: "15px" }} />
              </button>
<<<<<<< HEAD
=======
            </div>
          </form>

          <ul className="navbar-nav ms-auto">
            {links.map((item, i) => (
              <li key={i} className="nav-item">
                <Link to={item.link} className="nav-link">{item.title}</Link>
              </li>
            ))}

            <li className="nav-item">
              <FontAwesomeIcon icon={faHeart} style={{cursor: 'pointer', color: "red", fontSize: "20px", marginRight: "5px" }} />
              {favorites.length>0 && <span>{favorites.length}</span> }
            </li>

            <li className="nav-item cart-link" onClick={()=>navigate('/cart')}>
              <FontAwesomeIcon icon={faShoppingCart} style={{cursor: 'pointer', color: "black", fontSize: "20px", marginRight: "5px" }} />
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </li>

            <li className="nav-item">
              <Link className="btn sign-btn" to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
>>>>>>> d3bcb0c (---)
        </div>
      </form>

      <ul className="navbar-nav ms-auto">
        {links.map((item, i) => (
          <li key={i} className="nav-item">
            <Link to={item.link} className="nav-link">{item.title}</Link>
          </li>
        ))}

        {isLoggedIn&& role === "user" &&   <li className="nav-item">
          <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: "20px", marginRight: "5px" }} />
          <span>{favorites.length}</span>
        </li>}
      

        {!isLoggedIn && (
          <li className="nav-item">
            <Link className="btn sign-btn" to="/signup">
              Sign Up
            </Link>
          </li>
        )}
      </ul>
    </div>
      </div >
    </nav >
  );
}
