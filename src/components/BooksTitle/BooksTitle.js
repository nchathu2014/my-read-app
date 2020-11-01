/**
 * =================================================================================================
 *
 * Author: T.D. Nuwan Chathuranga
 * Date: 30/10/2020
 * BookTitle: This component is a place holder for a menu bar in future enhancement
 * Functions: BookTitle(title, totalBooks)*
 *
 * =================================================================================================
 * **/

import React from "react";
import "./BooksTitle.css";
import PropTypes from "prop-types";

//Styles
import "./BooksTitle.css";

//Prop Validation
BookTitle.propTypes = {
    title: PropTypes.string.isRequired,
    totalBooks: PropTypes.number.isRequired
};

function BookTitle({title, totalBooks}) {
    return (
        <div className="list-books-title">
            <h1>{title}
                <span
                    style={{float: "right", color: "yellow"}}
                >Shelves books: #{totalBooks}
            </span>
            </h1>
        </div>
    );
}

export default BookTitle;