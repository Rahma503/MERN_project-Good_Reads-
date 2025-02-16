import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";
import StarRating from "../StarRate";
import authorimage from "../../assets/author.jpeg";
import { useFavorites } from "../../context/fav";
import { useCart } from "../../context/CartContext";

export default function Card({ book, author }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  if (!book && !author) {
    return <div>Loading...</div>;
  }

  const posterURL = book?.coverImage || "placeholder.jpg";
  const bookTitle = book?.title || "Unknown Title";
  const bookAuthors =
    book?.authors?.map((author) => author.name).join(", ") || "Unknown";
  const authorName = author?.name || "Unknown Author";
  const authorBio = author?.bio || "No biography available";
  const authorImage = author?.image || authorimage;

  const isFavourite = book
    ? favorites.some((fav) => fav._id === book._id)
    : false;

  return (
    <div className="card mx-3 my-4 py-4" style={{ width: "18rem" }}>
      {book && (
        <>
          <img
            src={posterURL}
            className="card-img-top"
            alt={bookTitle}
            style={{ height: "250px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{bookTitle}</h5>
            <p className="card-text">
              <strong>Authors:</strong> {bookAuthors}
            </p>
            <div className="card-text mb-3">
              <strong>Rating:</strong>{" "}
              <StarRating rating={book.averageRating} />
            </div>

            <Link
              className="details-btn"
              to={`/BookDetails/${book._id}`}
              state={{ book }}
            >
              More Details
            </Link>

            {isLoggedIn === true && role === "user" && (
              <div className="btn-group">
                {book && (
                  <button
                    className="like-button"
                    onClick={() => toggleFavorite(book._id)}
                    style={{ background: "none", border: "none" }}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{
                        fontSize: "20px",
                        color: isFavourite ? "red" : "gray",
                      }}
                    />
                  </button>
                )}
                <button
                  className="cart-button"
                  onClick={() => addToCart(book._id)}
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ fontSize: "20px", color: "#000000" }}
                  />
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {author && (
        <div className="card-body">
          <img
            src={authorImage}
            className="card-img-top"
            alt={authorName}
            style={{ height: "300px", objectFit: "cover" }}
          />
          <h5 className="card-title m-3">{authorName}</h5>
          {/* <p className="card-text">{authorBio}</p> */}
          <Link
            className="details-btn"
            to={`/AuthorDetails/${author._id}`}
            state={{ author }}
          >
            More Details
          </Link>
        </div>
      )}
    </div>
  );
}