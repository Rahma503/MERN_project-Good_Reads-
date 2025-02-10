import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo3.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../Header/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart, faBars } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "../../context/fav";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const links = [
    { title: "Home", link: "/" },
    { title: "Books", link: "/allbooks" },
    { title: "Authors", link: "/authors" },
  ];

  if (isLoggedIn) {
    links.push({ title: "Profile", link: "/profile" });
    if (role === "user") links.push({ title: "Cart", link: "/cart" });
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
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" style={{ width: "100px", height: "100px", marginLeft: "20px" }} />
        </Link>

        {/* Toggler Button for Small Screens */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        
        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
          <form className="d-flex bg-light w-100" role="search" onSubmit={handleSearch}>
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
                  height: "2.5em",
                  margin: "0px"
                }}
              />

              <button type="submit" style={{
                backgroundColor: "#fbb02d",
                border: "none",
                cursor: "pointer",
                height: "3.4em",
                padding: "0px 13px",
                borderTopRightRadius: "1em",
                borderBottomRightRadius: "1em",
                margin: "0px"
              }}>
                <FontAwesomeIcon icon={faSearch} style={{ color: "#111111", fontSize: "15px" }} />
              </button>
            </div>
          </form>

          {/* Links */}
          <ul className="navbar-nav ms-auto">
            {links.map((item, i) => (
              <li key={i} className="nav-item">
                <Link to={item.link} className="nav-link">{item.title}</Link>
              </li>
            ))}

            {isLoggedIn && role === "user" && (
              <li className="nav-item">
                <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: "20px", marginRight: "5px" }} />
                <span>{favorites.length}</span>
              </li>
            )}

            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="btn sign-btn" to="/signup">
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
