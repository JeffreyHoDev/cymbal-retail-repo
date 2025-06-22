const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Import your Swagger configuration

require('dotenv').config()
// Initialize the Express application
const app = express();
const port = 3000;
console.log(process.env.AIVEN_MYSQL_CONNECTION_STRING);
// Serve Swagger UI at a specific route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.get('/login', (req, res) => {
    const { username, password } = req.body;
    // Here you would typically handle user authentication with database
    
    res.json({
      message: 'Login successful',
    })
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
});