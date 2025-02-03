import { useEffect, useState } from "react";
import { getBooks, addToCart } from "../../services/api";

const BookList = ({ userId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(res => setBooks(res.data));
  }, []);

  return (
    <div>
      <h2>Books</h2>
      {books.map(book => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>${book.price}</p>
          <button onClick={() => addToCart(userId, book._id, 1)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
