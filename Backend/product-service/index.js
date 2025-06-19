const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Import your Swagger configuration


const app = express();
const port = 3000;

// Serve Swagger UI at a specific route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.get('/getProducts', (req, res) => {
    // Here will need to fetch the products from the database
    res.json({
        message: 'List of all products',
        items: [
            { id: 1, name: 'Product 1', price: 19.99, brand: 'Brand A', category: 'Category X' },
            { id: 2, name: 'Product 2', price: 29.99, brand: 'Brand B', category: 'Category Y' }
        ]
    })
})

app.get('/getApprovedProducts', (req, res) => {
    // Here will need to fetch the products from the database that have been approved
    res.json({
        message: 'List of all products that have been approved',
        items: [
            { id: 1, name: 'Product 1', price: 19.99, brand: 'Brand A', category: 'Category X' },
            { id: 2, name: 'Product 2', price: 29.99, brand: 'Brand B', category: 'Category Y' }
        ]
    })
})

app.get('/getHaventApprovedProducts', (req, res) => {
    // Here will need to fetch the products from the database that haven't been approved yet
    res.json({
        message: 'List of products that haven\'t been approved yet',
        items: [
            { id: 1, name: 'Product 1', price: 19.99, brand: 'Brand A', category: 'Category X' },
            { id: 2, name: 'Product 2', price: 29.99, brand: 'Brand B', category: 'Category Y' }
        ]
    })
})

app.get('/getSpecificProduct/:productid', (req, res) => {
    const productId = req.params.productid;
    // Here will need to fetch the product from the database using productId and it is approved
    
    res.json({
        message: 'Specific product',
        item: {
            id: productId,
            name: 'Sample Product',
            price: 29.99,
            brand: 'Sample Brand',
            category: 'Sample Category'
        }
    })
})

app.post('/addProduct', (req, res) => {
    const { name, price, brand, category } = req.body;

    // Here will need to add the product to the database, default status is 'pending approval'

    res.json({
        message: `Product ${name} added successfully`,
    })
})

app.post('/updateProduct', (req, res) => {
    const { id, name, price, brand, category } = req.body;
    // Here will need to update the product in the database using id

    res.json({
        message: `Product ${id}: ${name} updated successfully`,
    })
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
});