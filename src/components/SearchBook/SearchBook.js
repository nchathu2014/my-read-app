/**
 * Author: T.D. Nuwan Chathuranga
 * Date: 30/10/2020
 *
 * **/
import React, {Component} from "react";
import {Link} from 'react-router-dom';
import * as BooksAPI from './../../BooksAPI';
import * as Utils from "./../../utils/Utils";

//Style file
import "./SearchBook.css";

class SearchBook extends Component {

    state = {
        searchQuery: '',
        booksList: [],
        bookShelf: ''
    };

    /**
     * This function handles the search functionality with a debounce time
     * @param event
     */
    handleOnSearch = (event) => {

        this.setState({
            searchQuery: event.target.value
        }, () => {
            setTimeout(() => {
                BooksAPI.search(this.state.searchQuery)
                    .then(books => {
                        if (!(typeof (books) === 'object' && books.hasOwnProperty('error')) || books === 'undefined') {
                            this.setState({
                                booksList: Utils.filterUsefulBookInfo(books)
                            })
                        } else {
                            this.setState({
                                booksList: []
                            })
                        }

                    })
            }, 200);
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
                            value={this.state.searchQuery}
                        />
                    </div>
                </div>
                <div className="search-books-results">

                    <ol className="books-grid">
                        {this.state.booksList.map(book => (
                            <li>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover"
                                             style={{
                                                 width: 128,
                                                 height: 193,
                                                 backgroundImage: `url(${book.smallThumbnail})`
                                             }}></div>
                                        <div className="book-shelf-changer">
                                            <select
                                                onClick={(event) => this.handleBookShelf(event, book)}
                                                onChange={(event) => this.handleMoveToShelf(event, book)}>
                                                <option value="move" selected disabled>Move to...</option>
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