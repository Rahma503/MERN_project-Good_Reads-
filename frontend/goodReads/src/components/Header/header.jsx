import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo3.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../Header/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { use } from "react";
import { useSelector } from "react-redux";
export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Books",
      link: "/allbooks",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title:"Authors"
      ,link:"/authors"
    }
  ];
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    } else {
      navigate("/");
    }
  };
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("logeinState: ", isLoggedIn);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100px", height: "100px", marginLeft: "20px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <form
            className="d-flex"
            role="search"
            style={{
              backgroundColor: "#f8f9fa",
              justifyContent: "center",
              position: "relative",
              width: "100%",
            }}
            onSubmit={handleSearch}
          >
            <div style={{ position: "relative", width: "60%" }}>
              <input
                className="form-control"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingRight: "40px" }} // Space for the button
              />
              <button
                type="submit"
                style={{
                  position: "absolute",
                  right: "-30px", // Slightly closer to the edge
                  top: "13%",
                  transform: "translateY(-50%)",
                  backgroundColor: "#fbb02d",
                  border: "none",
                  cursor: "pointer",
                  padding: "5px",
                }}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ color: "#111111", fontSize: "20px" }}
                />
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto">
            {links.map((item, i) => (
              <li key={i} className="nav-item">
                <Link to={item.link} className="nav-link">
                  {item.title}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <Link className="btn sign-btn" to="/signup">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
