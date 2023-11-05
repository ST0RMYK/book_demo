import React, { useState } from "react";

const App = () => {

    /*
        ------------------------
                 DATA
        ------------------------
    */

    const [books, setBooks] = useState([
        {
            id: 0,
            name: "Jak jsem strávil školní rok",
            year: "2015",
        },
        {
            id: 1,
            name: "Vychovejte si křečka!",
            year: "2009",
        },
        {
            id: 2,
            name: "Schovej se!",
            year: "2002",
        },
        {
            id: 3,
            name: "Doskoč do pole",
            year: 2006,
        },
        {
            id: 4,
            name: "Jak vyprat správně prádlo",
            year: 2023,
        },
        {
            id: 5,
            name: "Jak vychovat psy",
            year: 2020,
        },
    ]);

    /*
    ------------------------
            CREATE
    ------------------------
    */

    const [newBook, setNewBook] = useState({ name: "", year: "" });
    const [openedBook, setOpenedBook] = useState(null);
    const [editedBook, setEditedBook] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const addBook = () => {
        const id = books.length;
        const updatedBooks = [...books, { id, ...newBook }];
        setBooks(updatedBooks);
        setNewBook({ name: "", year: "" });
    };

    /*
    ------------------------
            DELETE
    ------------------------
    */

    const deleteBook = (id) => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
        if (openedBook && openedBook.id === id) {
            setOpenedBook(null);
            setEditedBook(null);
        }
    };

    /*
    ------------------------
          DETAIL OPEN
    ------------------------
    */

    const openBook = (id) => {
        const book = books.find((b) => b.id === id);
        setOpenedBook(book);
        setEditedBook(null);
    };

    /*
    ------------------------
   EDIT (JEN V DETAIL OPENED)
    ------------------------
    */

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedBook({ ...editedBook, [name]: value });
    };

    const saveEditedBook = () => {
        const updatedBooks = books.map((book) =>
            book.id === openedBook.id ? { ...book, ...editedBook } : book
        );
        setBooks(updatedBooks);
        setOpenedBook({ ...openedBook, ...editedBook });
        setEditedBook(null);
    };

    return (
        <>
            <div className="container knihy">
                <hgroup>
                    <h3>Naše knihy:</h3>
                    <p>
                        {books.map((oneBook) => (
                            <div key={oneBook.id}>
                                - {oneBook.name} ({oneBook.year})
                                <button
                                    className="buttonBook"
                                    onClick={() => deleteBook(oneBook.id)}
                                >
                                    Smazat tuto knihu
                                </button>
                                <button
                                    className="buttonBook"
                                    onClick={() => openBook(oneBook.id)}
                                >
                                    Otevřít tuto knihu
                                </button>
                            </div>
                        ))}
                    </p>
                </hgroup>
            </div>

            <div className="container">
                <h3>Přidat novou knihu:</h3>
                <div className="grid">
                    <div>
                        <label>Název knihy</label>
                        <input
                            type="text"
                            name="name"
                            value={newBook.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Rok vydání</label>
                        <input
                            type="text"
                            name="year"
                            value={newBook.year}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <button onClick={addBook}>Přidat knihu</button>
            </div>

            {openedBook ? (
                <div className="container">
                    {editedBook ? (
                        <div>
                            <h3>Editovat knihu:</h3>
                            <div className="grid">
                                <div>
                                    <label>Název knihy</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedBook.name}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Rok vydání</label>
                                    <input
                                        type="text"
                                        name="year"
                                        value={editedBook.year}
                                        onChange={handleEditInputChange}
                                    />
                                </div>
                            </div>
                            <button onClick={saveEditedBook}>Uložit</button>
                        </div>
                    ) : (
                        <div>
                            <h3>Detaily knihy:</h3>
                            <p>
                                Název: {openedBook.name}
                                <br />
                                Rok vydání: {openedBook.year}
                            </p>
                            <button onClick={() => setEditedBook({ ...openedBook })}>
                                Editovat
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="container">
                    <p>Musíte kliknout nejdřív na nějakou knížku.</p>
                </div>
            )}
        </>
    );
};

export default App;
