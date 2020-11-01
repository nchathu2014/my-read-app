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
            const {id, title, authors, shelf, imageLinks: {thumbnail={},smallThumbnail={}}={}} = book;
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

/**
 * This function improves the performance of the application in the search page
 * @param fn
 * @param delay
 * @returns {Function}
 */
export const debounce = (fn,delay) => {
    let timer;
    return ()=> {
        clearTimeout(timer);
        timer = setTimeout(()=>fn(),delay)
    }
};