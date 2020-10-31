/**
 * Author: T.D. Nuwan Chathuranga
 * Date: 30/10/2020
 *
 * **/

import React from 'react';
import {Link, Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import * as Utils from './utils/Utils';
import BookTitle from "./components/BooksTitle/BooksTitle";
import BookList from "./components/BookList/BookList";
import SearchBook from "./components/SearchBook/SearchBook";

//Style files
import './App.css';

class BooksApp extends React.Component {
    //App state
    state = {
        bookList: [],
        showSearchPage: false
    };

    /**
     * This function handles the shelf book by calling the update API call
     * @toShelf: string
     * @book: Object
     * */
    handleChangeBookShelf = (toShelf, book) => {

        //const {shelf} = this.state.bookList.filter(bookItem => bookItem.id === book.id)[0];

        //Prevent the API call when shifting within the same shelves
       // if (shelf !== toShelf) {
            BooksAPI.update(book, toShelf).then(() => {
                BooksAPI.getAll().then(books => {
                    this.setState(() => ({
                        bookList: Utils.filterUsefulBookInfo(books)
                    }));
                });
            });
        //}
    };

    componentDidMount() {
        //Call for all books for initial data population
        BooksAPI.getAll().then((books) => {
            this.setState(() => ({
                bookList: Utils.filterUsefulBookInfo(books)
            }));
        });
    }

    render() {
        return (
            <div className="app">
                <Route
                    path="/search"
                    render={() => (
                        <SearchBook
                            changeBookShelf={this.handleChangeBookShelf}
                        />)}
                />


                <div className="list-books">
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div>
                                <BookTitle
                                    title="My Reads"
                                    totalBooks={this.state.bookList.length}
                                />
                                <BookList
                                    books={this.state.bookList}
                                    changeBookShelf={this.handleChangeBookShelf}
                                />
                                <div className="open-search">
                                    <Link
                                        className="open-search"
                                        to="/search">Add a book
                                    </Link>
                                </div>
                            </div>
                        )}
                    />

                </div>

            </div>
        )
    }
}

export default BooksApp
