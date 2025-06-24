const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.get('/getProducts', async (req, res) => {
    try {
        let response = await fetch(`${process.env.PRODUCT_SERVICE_URL}/getProducts`)
        let data = await response.json();
        res.json(data);

    }catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products', details: err.message });
    }
});

app.get('/getSpecificProduct/:category/:productid', async (req, res) => {
    const {category, productid} = req.params;
    try {
        let response = await fetch(`${process.env.PRODUCT_SERVICE_URL}/getSpecificProduct/${category}/${productid}`)
        let data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch product', details: err.message });
    }
});

app.post('/chat', async (req, res) => {
    try {
        
        let response = await fetch(`${process.env.VERTEX_AI_SERVICE_API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        let data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to chat', details: err.message });
    }
});

app.post('/search', async (req, res) => {

    try {
        let response = await fetch(`${process.env.VERTEX_AI_SERVICE_API_URL}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        let data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to search', details: err.message });
    }
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(80);