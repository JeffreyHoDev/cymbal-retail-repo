const express = require('express');

const db = require('./firestore'); // Import Firestore configuration
const enhanceWithImage = require('./vertexai.util'); // Import the image enhancement utility
const { SearchServiceClient } = require('@google-cloud/discoveryengine').v1;
const generateMultipleImages = require('./image_gen'); // Import the image generation utility
require('dotenv').config()

const app = express();
const port = 3000;

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


app.post('/search', async (req, res) => {
    const { query } = req.body;
    const client = new SearchServiceClient({
        keyFilename: './vertex-ai.sa.json'
    });
    if (!query) {
        return res.status(400).send({ error: 'Query is required.' });
    }

    const servingConfig = client.projectLocationDataStoreServingConfigPath(
        process.env.PROJECT_ID,
        process.env.SEARCH_APP_LOCATION,
        process.env.DATASTORE_ID,
        'default_config' // Use the default serving config
    );

    try {
        const [response] = await client.search({
            servingConfig: servingConfig,
            query: query,
            queryExpansionSpec: {
                condition: 'AUTO',
            },
            spellCorrectionSpec: {
                mode: 'AUTO',
            },
        });

        // Extract the original product JSON from the results
        const results = response.map(result => {
            const doc = result.document;
            // The original product data is in the 'jsonData' field created.
            return {
                id: doc.id,
                ...JSON.parse(doc.structData.fields.jsonData.stringValue)
            };
        });

        res.json(results);

    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).send({ error: 'An error occurred during the search.' });
    }
});


app.post('/generateImage', async (req, res) => {

    const { product } = req.body;

    if (!product || !product.name || !product.description) {
        return res.status(400).send({ error: 'Product name and description are required.' });
    }

    try {
        const images = await generateMultipleImages(product);
        if (!images || images.length === 0) {
            return res.status(500).send({ error: 'Failed to generate images.' });
        }
        res.json({ images });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).send({ error: 'An error occurred while generating the image.' });
    }

})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});