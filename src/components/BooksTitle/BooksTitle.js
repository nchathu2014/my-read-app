import React from 'react';
import './BooksTitle.css';

function BookTitle({title}){
    return(
        <div className="list-books-title">
            <h1>{title}</h1>
        </div>
    );
}

export default BookTitle;