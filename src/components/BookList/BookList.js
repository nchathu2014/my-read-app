/**
 * Author: T.D. Nuwan Chathuranga
 * Date: 30/10/2020
 *
 * **/

import React from 'react';
import BookListItem from "./BookListItem/BookListItem";
import PropTypes from "prop-types";

//Style file
import './BookList.css';

BookList.propTypes = {
    books: PropTypes.array.isRequired,
};

function BookList({books, changeBookShelf}) {

    /**
     * This function pass the callback to the parent with the shelf change value and
     * the corresponding book object
     * @book:Object
     * @event:Object
     * */
    const handleShelfChange = (event, book) => {
        changeBookShelf(event.target.value, book)
    };

    /**
     * This function get the shelf and returns the books with the
     * corresponding shelf type
     *@shelf: string
     * **/
    const getBookShelf = (shelf) => {
        return books
            .filter(book => book.shelf === shelf)
            .map(book => {
                const {id, title, thumbnail, authors, shelf} = book;
                return (
                    <li key={id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover"
                                     style={{width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}></div>
                                <div className="book-shelf-changer">
                                    <select  defaultValue="move"
                                             onChange={(event) => handleShelfChange(event, book)}>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">
                                            {shelf === "currentlyReading" ? "✓" : " "}Currently Reading
                                        </option>
                                        <option value="wantToRead">
                                            {shelf === "wantToRead" ? "✓" : " "} Want to Read
                                        </option>
                                        <option value="read">
                                            {shelf === "read" ? "✓" : " "} Read
                                        </option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{title}</div>
                            <div className="book-authors">
                                {authors.toString()}
                            </div>
                        </div>
                    </li>
                );
            });
    };

    return (
        <div className="list-books-content">
            <div>
                <BookListItem
                    title={'Currently Reading'}
                    list={getBookShelf('currentlyReading')}
                />

                <BookListItem
                    title={'Want to Read'}
                    list={getBookShelf('wantToRead')}
                />

                <BookListItem
                    title={'Read'}
                    list={getBookShelf('read')}
                />
            </div>
        </div>
    );
}

export default BookList;