import React from 'react';
import './BooksTitle.css';

function BookTitle({title, totalBooks}) {
    return (
        <div className="list-books-title">
            <h1>{title}
                <span
                    style={{float: "right", color: 'yellow'}}
                >Shelves books: #{totalBooks}
            </span>
            </h1>
        </div>
    );
}

export default BookTitle;