import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function SearchPage() {
  const [books, setBooks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    if (query) {
      axios
        .get(`http://localhost:3000/api/search?query=${query}`)
        .then((response) => {
          //console.log("API Response:", response.data);
          setBooks(response.data.results || []);
        })
        .catch((error) => {
          toast.error("Error fetching books:", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        });
      //console.error("Error fetching books:", error));
    }
  }, [location.search]);
  //console.log(books);

  return (
    <div className="container mt-4">
      <h2>Search Results for ..</h2>
      {books.length > 0 ? (
        <div className="row">
          {books.map((book) => (
            <div key={book._id} className="col-md-4">
              <div className="card mb-4">
                <img
                  src={book.coverImage}
                  className="card-img-top"
                  alt={book.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>

                  <p>
                    <strong>Author:</strong>{" "}
                    {book?.authors?.map((author) => author.name).join(", ") ||
                      "Unknown"}
                  </p>
                  <p>
                    <strong>Categories:</strong>{" "}
                    {book.categories?.length
                      ? book.categories
                          .map((category) => category.name)
                          .join(", ")
                      : "No categories available"}
                  </p>
                  <Link className="details-btn" to={`/BookDetails/${book._id}`}>
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}
