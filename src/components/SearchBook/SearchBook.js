/**
 * =================================================================================================
 *
 * Author: T.D. Nuwan Chathuranga
 * Date: 30/10/2020
 * SearchBook: This component executes the searching functionality of the app
 * Functions: searchForBooks(), handleOnSearch(event), handleMoveToShelf(event, book),handleOnKeyUp()
 * =================================================================================================
 * **/

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import * as BooksAPI from "./../../BooksAPI";
import * as Utils from "./../../utils/Utils";

// Constants
import {GLOBAL_CONSTANTS} from "./../../constants/GLOBAL_CONSTANTS";

//Styles
import "./SearchBook.css";

class SearchBook extends Component {

    //Prop validation
    static propTypes = {
        changeBookShelf: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            booksList: [],
            bookShelf: ''
        };
        this.getSearchData = Utils.debounce(this.searchForBooks, GLOBAL_CONSTANTS.DEBOUNCE_TIME);
    }

    /**
     * This function calls to the search API endpoint and stores the search results into
     * a internal state
     */
    searchForBooks = () => {
        if (this.state.searchQuery !== '') {
            BooksAPI.search(this.state.searchQuery).then(books => {
                if (!(typeof books === 'object' && books.hasOwnProperty('error'))) {
                    this.setState({
                        booksList: Utils.filterUsefulBookInfo(books)
                    })
                }

            });
        } else {
            this.setState({
                searchQuery: '',
                booksList: [],
            })
        }

    };

    /**
     * This function handles the search functionality with a debounce time
     * @param event
     */
    handleOnSearch = (event) => {
        this.setState({
            searchQuery: event.target.value
        });
    };

    /**
     * This function control the book shelf assigning functionality
     * @param event
     * @param book
     * */
    handleMoveToShelf = (event, book) => {
        this.props.changeBookShelf(event.target.value, book);
    };

    /**
     * This function control showing the relevant shelf type by calling the API call
     * @param event
     * @param book
     * */
    handleBookShelf = (event, book) => {
        BooksAPI.get(book.id).then((book) => {
            this.setState({
                bookShelf: book.shelf
            })
        });
    };

    /**
     * This function calls the debounce method when user typed in to the search box
     */
    handleOnKeyUp = () => {
        this.getSearchData();
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search"/>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.handleOnSearch(event)}
                            onKeyUp={this.handleOnKeyUp}
                            value={this.state.searchQuery}
                        />
                    </div>
                </div>
                <div className="search-books-results">

                    <ol className="books-grid">
                        {this.state.booksList.map(book => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover"
                                             style={{
                                                 width: 128,
                                                 height: 193,
                                                 backgroundImage: `url(${book.smallThumbnail})`
                                             }}></div>
                                        <div className="book-shelf-changer">
                                            <select defaultValue="move"
                                                    onClick={(event) => this.handleBookShelf(event, book)}
                                                    onChange={(event) => this.handleMoveToShelf(event, book)}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">
                                                    {this.state.bookShelf === "currentlyReading" ? "✓" : " "}Currently
                                                    Reading
                                                </option>
                                                <option value="wantToRead">
                                                    {this.state.bookShelf === "wantToRead" ? "✓" : " "} Want to Read
                                                </option>
                                                <option value="read">
                                                    {this.state.bookShelf === "read" ? "✓" : " "} Read
                                                </option>
                                                <option value="none">
                                                    {this.state.bookShelf === "none" ? "✓" : " "} None
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">
                                        {(book && book.authors) && book.authors.toString()}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>


                </div>
            </div>
        );
    }
}

export default SearchBook;