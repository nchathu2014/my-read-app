import React from 'react';
import './BookList.css';
import BookListItem from "./BookListItem/BookListItem";
import PropTypes from "prop-types";

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
                                    <select onChange={(event) => handleShelfChange(event, book)}>
                                        <option value="move" selected disabled>Move to...</option>
                                        <option value="currentlyReading" hidden={shelf === "currentlyReading"}>Currently
                                            Reading
                                        </option>
                                        <option value="wantToRead" hidden={shelf === "wantToRead"}>Want to Read</option>
                                        <option value="read" hidden={shelf === "read"}>Read</option>
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

                {/*<div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            <li>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")' }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">1776</div>
                                    <div className="book-authors">David McCullough</div>
                                </div>
                            </li>
                            <li>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")' }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">Harry Potter and the Sorcerer's Stone</div>
                                    <div className="book-authors">J.K. Rowling</div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            <li>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">The Hobbit</div>
                                    <div className="book-authors">J.R.R. Tolkien</div>
                                </div>
                            </li>
                            <li>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")' }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">Oh, the Places You'll Go!</div>
                                    <div className="book-authors">Seuss</div>
                                </div>
                            </li>
                            <li>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">The Adventures of Tom Sawyer</div>
                                    <div className="book-authors">Mark Twain</div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>*/}
            </div>
        </div>
    );
}

export default BookList;