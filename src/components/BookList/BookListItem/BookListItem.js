/**
 * Author: T.D. Nuwan Chathuranga
 * Date: 30/10/2020
 *
 * **/

import React from 'react';
import PropTypes from 'prop-types';

//Style file
import "./BookListItem.css";

BookListItem.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
};

/**
 * This function populate the book list item with the proper data loading messages
 * @title:string
 * @list: Array
 * **/
function BookListItem({title, list}) {
    let message = "Loading...";

    list.length === 0 ?
        message = 'No content'
        :
        message = '';

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">
                {title}
                <span style={{
                    float: "right",
                    color: "#bbb",
                    fontStyle: "italic",
                    fontWeight: "normal"
                }}>#{list.length} Books</span>
            </h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {list}{message}
                </ol>
            </div>
        </div>
    );
}

export default BookListItem;