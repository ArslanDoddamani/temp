const express = require('express');
const bodyParser = require('body-parser');
const translate = require('translate-google');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Route to handle translation
app.post('/translate', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'No text provided' });
    }

    try {
        const result = await translate(text, { to: 'en' });
        res.json({ translated_text: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Translation error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});