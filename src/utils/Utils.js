/**
 * Author: T.D. Nuwan Chathuranga
 * Date: 30/10/2020
 *
 * **/


/**
 * This function filter-down the bare minimum information from the books array
 * @param books
 * @returns {*}
 */
export const filterUsefulBookInfo = (books) => {
    return books.map(book => {
            const {id, title, authors, shelf, imageLinks: {thumbnail,smallThumbnail}} = book;
            return {
                id,
                title,
                authors,
                shelf,
                thumbnail,
                smallThumbnail
            }
        }
    );
};