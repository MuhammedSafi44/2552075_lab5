const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];

app.get('/whoami', (req, res) => {
    res.json({ studentNumber: '2552075' });
});


app.get('/books', (req, res) => {
    res.json(books);
});


app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});


app.post('/books', (req, res) => {
    const { id, title, details } = req.body;

    if (!id || !title || !Array.isArray(details)) {
        return res.status(400).json({ error: 'Missing required book details' });
    }

    const book = { id, title, details };
    books.push(book);
    res.status(201).json(book);
});


app.put('/books/:id', (req, res) => {
    const { title, details } = req.body;
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    if (title) book.title = title;
    if (Array.isArray(details)) book.details = details;

    res.json(book);
});



app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    books.splice(bookIndex, 1);
    res.status(204).send();
});



app.post('/books/:id/details', (req, res) => {
    const { id, author, genre, publicationYear } = req.body;
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    if (!id || !author || !genre || !publicationYear) {
        return res.status(400).json({ error: 'Missing required detail fields' });
    }

    const detail = { id, author, genre, publicationYear };
    book.details.push(detail);

    res.status(201).json(detail);
});


app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const detailIndex = book.details.findIndex(d => d.id === req.params.detailId);

    if (detailIndex === -1) {
        return res.status(404).json({ error: 'Detail not found' });
    }

    book.details.splice(detailIndex, 1);
    res.status(204).send();
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


