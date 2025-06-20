const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Import your Swagger configuration
const knex = require('./dbconfig'); // Import your database configuration
require('dotenv').config();
// Initialize the Express application
const app = express();
const port = 3000;


// Serve Swagger UI at a specific route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.post('/getCart', (req, res) => {
    const { user_id } = req.body;

    knex.raw('SELECT * FROM carts WHERE user_id = ?', [user_id])
        .then((response) => {
            res.json(response[0]); // Assuming response[0] contains the cart items
        })
        .catch((err) => {
            console.error('Error fetching cart:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
})

app.post('/addToCart', (req, res) => {
    try {
        const { user_id, product_id, product_name, product_price, product_image, product_brand, product_category, quantity, attributes } = req.body;
        // Here you would typically add the product to the user's cart in the database
        knex.raw('INSERT INTO carts (user_id, product_id, product_name, product_price, product_image, product_brand, product_category, quantity, attributes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, product_id, product_name, product_price, JSON.stringify(product_image), product_brand, product_category, quantity, JSON.stringify(attributes)]
        )
        .then((response) => {
            res.json({ message: 'Product added to cart successfully', data: response[0]})
        })
    }catch (err) {
        console.error('AddToCart error:', err); 
    }
})

app.post('/updateCartItem', (req, res) => {
    try {
        const { user_id, product_id, product_name, product_price, product_image, product_brand, product_category, quantity, attributes } = req.body;
        // Here you would typically update the quantity of the product in the user's cart in the database

        knex.raw('UPDATE carts SET product_name = ?, product_price = ?, product_image = ?, product_brand = ?, product_category = ?, quantity = ?, attributes = ? WHERE user_id = ? AND product_id = ?',
            [product_name, product_price, JSON.stringify(product_image), product_brand, product_category, quantity, JSON.stringify(attributes), user_id, product_id]
        )
        .then((response) => {
            res.json({ message: 'Cart item updated successfully', data: response[0]})
        })
    } catch (err) {
        console.error('UpdateCartItem error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/removeCartItem', (req, res) => {
    try {
        const { id, user_id, product_id } = req.body;
        // Here you would typically update the quantity of the product in the user's cart in the database

        knex.raw('DELETE FROM carts WHERE user_id = ? AND product_id = ? AND id = ?',
            [user_id, product_id, id]
        )
        .then((response) => {
            res.json({message: 'Cart item removed successfully', data: response[0]})
        })
    } catch (err) {
        console.error('RemoveCartItem error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
});

/*
    schema in cart table
    id          | int(11)      | NO   | PRI | NULL    | auto_increment |
    user_id     | int(11)      | NO   |     | NULL    |                |
    product_id  | int(11)      | NO   |     | NULL    |                |
    product_name| varchar(255) | NO   |     | NULL    |                |
    product_price | decimal(10,2) | NO   |     | NULL    |                |
    product_image| varchar(255) | NO   |     | NULL    |                |
    product_brand| varchar(255) | NO   |     | NULL    |                |
    product_category| varchar(255) | NO   |     | NULL    |                |
    quantity    | int(11)      | NO   |     | NULL    |                |
    created_at  | datetime     | NO   |     | CURRENT_TIMESTAMP |        |
    updated_at  | datetime     | NO   |     | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |
    attributes  | json         | YES  |     | NULL    |                |
*/