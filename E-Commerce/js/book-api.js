class BookAPI {
    constructor() {
        this.BASEurl = "https://www.googleapis.com/books/v1/volumes?q=";
        this.urlID = "https://www.googleapis.com/books/v1/volumes/";
    }


    async fetchBooks(searchTerm) {
        const response = await fetch(this.BASEurl + searchTerm);
        const data = await response.json();
        const books = data.items;
        return await books;
    }

    async fetchBookByID(id) {
        const response = await fetch(this.urlID + id);
        const data = await response.json();
        return await data;
    }
}

