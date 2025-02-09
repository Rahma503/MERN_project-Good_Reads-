import React, { useState, useEffect } from 'react';
import "./Popular.css";
import axios from "axios";
import Card from '../BookCard/Card';
import Loader from '../Loader/Loader';

export default function Popular() {
    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/books");
                setData(response.data.books); 
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='recent d-flex flex-column align-items-center'>
            <h1 className='title text-start m-5 fw-bold'>Popular Books</h1>

            <div className="row align-self-start mx-5">
                {Data.length > 0 ? Data.filter(book => book.averageRating >= 3).map((book) => (
                    <Card key={book._id} book={book} /> 
                )) : <Loader />}
            </div>
        </div>
    );
}
