const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Import your Swagger configuration
const knex = require('./dbconfig'); // Import your database configuration
const db = require('./firestore'); // Import Firestore configuration

require('dotenv').config()

const app = express();
const port = 3000;

// Serve Swagger UI at a specific route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.get('/getProducts', async (req, res) => {
    // Here will need to fetch the products from the database
    try {
        const collections = await db.listCollections();
        const products = {};

        await Promise.all(collections.map(async (collection) => {
            const snapshot = await collection.get();
            const data = [];
            snapshot.forEach(doc => data.push(doc.data()));
            products[collection.id] = data;
        }));

        res.json({
            message: 'List of all products',
            items: products
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/getApprovedProducts', async (req, res) => {
    // Here will need to fetch the products from the database that have been approved
    // Use Firestore query to get all products in all collections where status is 'approved'
        try {
            const collections = await db.listCollections();
            const approvedProducts = {};

        await Promise.all(
            collections.map(async (collection) => {
                const querySnapshot = await collection.where('status', '==', 'approved').get();
                const data = [];
                querySnapshot.forEach(doc => {
                    let docData = doc.data();
                    docData.id = doc.id; // Add document ID to the data
                    data.push(docData)
                });
                if (data.length > 0) {
                    approvedProducts[collection.id] = data;
                }
            })
        );

        res.json({
            message: "List of all products with status 'approved'",
            items: approvedProducts
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/getHaventApprovedProducts', async (req, res) => {
    // Here will need to fetch the products from the database that haven't been approved yet
    // Use Firestore query to get all products in all collections where status is 'pending approval'
        try {
            const collections = await db.listCollections();
            const pendingProducts = {};

        await Promise.all(
            collections.map(async (collection) => {
                const querySnapshot = await collection.where('status', '==', 'pending approval').get();
                const data = [];
                querySnapshot.forEach(doc => {
                    let docData = doc.data();
                    docData.id = doc.id; // Add document ID to the data
                    data.push(docData)
                });
                if (data.length > 0) {
                    pendingProducts[collection.id] = data;
                }
            })
        );

        res.json({
            message: "List of all products with status 'pending approval'",
            items: pendingProducts
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/getSpecificProduct/:category/:productid', async (req, res) => {
    const {category, productid} = req.params;

    // Here will need to fetch the product from the database using productId and it is approved
    try {
        const docRef = db.collection(category).doc(productid);
        const data = await docRef.get();
        if (!data.exists) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const productData = data.data();
        productData.id = productid; // Add document ID to the data 
        res.json({
            message: `Product ${productid} details`,
            item: productData
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post('/addProduct', (req, res) => {
    const { category } = req.body;
    req.body.status = 'pending approval'; // Default status for new products
    // Here will need to add the product to the database, default status is 'pending approval'
    const docRef = db.collection(category).doc(); // No argument = auto-ID
    docRef.set(req.body)
    .then((response) => {
        res.json({
            message: `Product added successfully`,
        })
    })
})

app.post('/updateProduct', (req, res) => {
    const { id, category } = req.body;
    // Here will need to update the product in the database using id
    const docRef = db.collection(category).doc(id); 
    docRef.set(req.body)    
    res.json({
        message: `Product ${id} updated successfully`,
    })
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
});