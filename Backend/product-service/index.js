const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Import your Swagger configuration
const knex = require('./dbconfig'); // Import your database configuration
const db = require('./firestore'); // Import Firestore configuration
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const streamifier = require('streamifier');
const bucket = require('./bucket.config'); // Import your GCS bucket configuration

require('dotenv').config()

const app = express();
const port = 3000;

// Serve Swagger UI at a specific route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });
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
    .catch((error) => {
        res.status(500).json({ error: 'Failed to add product', details: error.message });
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
    .then(() => {
        res.json({
            message: `Product ${id} updated successfully`,
        });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to update product', details: error.message });
    });
});

app.post('/approveProduct', (req, res) => {
    const { id, category } = req.body;
    if (!id || !category) {
        return res.status(400).json({ error: 'Product ID and category are required' });
    }
    // Here will need to update the product status to 'approved' in the database using id
    req.body.status = 'approved'; // Update status to approved
    const docRef = db.collection(category).doc(id);
    docRef.set(req.body)
    .then(() => {
        res.json({
            message: `Product ${id} approved successfully`,
        });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to approve product', details: error.message });
    });
})


app.post('/uploadCSV', upload.single('csv'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No CSV file uploaded' });
    }
    const results = [];
    const stream = req.file.buffer; // This is a Buffer
    // Parse CSV
    const readable = streamifier.createReadStream(stream);
    readable
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
        // Now `results` is an array of rows (each row is an object with column headers as keys)
            res.json({
                message: 'CSV processed successfully',
                rowCount: results.length,
                sample: results.slice(0, 5), // send back a preview
            });
        })
        .on('error', (err) => {
        res.status(500).json({ error: 'Failed to parse CSV', details: err.message });
        });
})

app.post('/uploadImagesAndStoreToBucketAndUpdateToFirestore', upload.array('images', 90), async (req, res) => {
  // req.files contains the images
  // req.body.data contains the JSON string

  let structuredData;
  try {
    structuredData = JSON.parse(JSON.parse(req.body.data)); // Parse the JSON string
    let arrayOfImages = req.files

    await Promise.all(
        structuredData.map(async (row, index) => {
            // For each row, check if the image link exists in the uploaded files
            let imageFile = row["Image_Link"];
            if (imageFile) {
            // If there is image link
                let imageIndexFromArray = arrayOfImages.findIndex(file => file.originalname === imageFile);
                // If the image link exists in the uploaded files
                if (imageIndexFromArray !== -1) {
                    const blob = bucket.file(`${row["Product_SKU"]}-${arrayOfImages[imageIndexFromArray]["originalname"]}`);
                    const stream = blob.createWriteStream({
                        metadata: {
                            contentType: arrayOfImages[imageIndexFromArray].mimetype,
                        },
                    });
                    stream.end(arrayOfImages[imageIndexFromArray].buffer);

                    row["Image_url"] = [`https://storage.googleapis.com/${bucket.name}/${blob.name}`]; // Update the image link to the GCS URL
                    try {
                        let response = await fetch(`http://localhost:3000/addProduct`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": 'application/json'
                            },
                            body: JSON.stringify({
                                "name": row["Product_Name"],
                                "sku": row["Product_SKU"],
                                "price": row["Product_Price"],
                                "image_url": row["Image_url"],
                                "description": row["Product_Description"],
                                "category": row["Product_Category"],
                                "quantity": Number(row["Quantity"]),
                                "date": row["Date"],
                            })
                        })
                        console.log(response)
                    }catch (error) {
                        console.error('Error updating product to Firestore:', error);
                    }
                    
                }                
            }
        })
    )
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: 'Invalid JSON in data field', details: e.message });
  }

  // Now you have both images and structuredData
  res.json({
    message: 'Upload successful',
    data: structuredData
  });
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
});