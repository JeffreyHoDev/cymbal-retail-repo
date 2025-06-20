const express = require('express');

const db = require('./firestore'); // Import Firestore configuration
const enhanceWithImage = require('./vertexai.util'); // Import the image enhancement utility

require('dotenv').config()

const app = express();
const port = 3000;

// Serve Swagger UI at a specific route

app.use(express.json());



app.post('/getSuggestions', async (req, res) => {
    const { category, id } = req.body;
    
    try {
        const collection = db.collection(category);
        const docRef = collection.doc(id);
        const data = await docRef.get();
        if (!data.exists) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const productData = data.data();
        productData.id = data.id; // Add the document ID to the product data
        const responseFromAI = await enhanceWithImage(productData);
        res.json({message: "Suggestions from AI", suggested_data: JSON.parse(responseFromAI), original_data: productData});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});







app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});