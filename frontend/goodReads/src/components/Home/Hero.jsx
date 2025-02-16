import React, { useState, useEffect } from 'react';
import "./Hero.css";
import { Link } from 'react-router-dom';

const images = [
    "https://m.media-amazon.com/images/I/81eB+7+CkUL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/91bYsX41DVL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/71aFt4+OTOL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81-QB7nDh4L._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81t2CVWEsUL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81YOuOGFCJL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/71KilybDOoL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/91HHqVTAJQL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/91cwOSS4sDL._SL1500_.jpg"
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true);
            }, 1000);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='hero'>
            <div className='word'>
                <h1>Discover Your Next Favorite <span style={{color:"#fbb02d"}}>Books</span></h1>
                <Link className='books-btn' to="/allbooks">Read Now</Link>
            </div>
            <div className='image'>
                <img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt="Book cover"
                    className={fade ? "fade-in" : "fade-out"}
                />
            </div>
        </div>
    );
}
