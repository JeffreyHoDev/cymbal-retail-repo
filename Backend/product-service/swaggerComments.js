const swaggerComments = {
    getProducts: `
    /**
     * @swagger
     * /getProducts:
     *   get:
     *     summary: Retrieve a list of products. User- Owner
     *     tags: [Products]
     *     responses:
     *       '200':
     *         description: A list of products
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     *                   price:
     *                     type: number
     *                   brand:
     *                     type: string
     *                   category:
     *                     type: string
     */
    `,
    getApprovedProducts: `
    /**
     * @swagger
     * /getApprovedProducts:
     *   get:
     *     summary: Retrieve a list of products that has been approved. User- Owner, Customer
     *     tags: [Products]
     *     responses:
     *       '200':
     *         description: A list of products
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     *                   price:
     *                     type: number
     *                   brand:
     *                     type: string
     *                   category:
     *                     type: string
     */
    `,
    getAllProductsThatHaventApproved: `
    /**
     * @swagger
     * /getHaventApprovedProducts:
     *   get:
     *     summary: Retrieve a list of products that haven't been approved yet. User- Owner
     *     tags: [Products]
     *     responses:
     *       '200':
     *         description: A list of products that haven't been approved yet
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     *                   price:
     *                     type: number
     *                   brand:
     *                     type: string
     *                   category:
     *                     type: string
     */
    `,
    getSpecificProduct: `
    /**
     * @swagger
     * /getSpecificProduct/{productid}:
     *   get:
     *     summary: Retrieve details of a specific product. User- Owner, Customer
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: productid
     *         required: true
     *         schema:
     *           type: integer
     *         description: The ID of the product to retrieve
     *     responses:
     *       '200':
     *         description: A list of products
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                   id:
     *                     type: integer
     *                     value: productid 
     *                   name:
     *                     type: string
     *                   price:
     *                     type: number
     *                   brand:
     *                     type: string
     *                   category:
     *                     type: string
     */
    `,
    addProduct: `
    /**
     * @swagger
     * /addProduct:
     *   post:
     *     summary: Add a new product. User- Supplier, Owner
     *     tags: [Products]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               price:
     *                 type: number
     *               brand:
     *                 type: string
     *               category:
     *                 type: string
     *     responses:
     *       200:
     *         description: Product name added successfully
     */
    `,
    updateProduct: `
    /**
     * @swagger
     * /updateProduct:
     *  post:
     *    summary: Update an existing product. User- Owner
     *    tags: [Products]
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *        schema:
     *          type: object
     *          properties:
     *            id:
     *              type: integer
     *            name:
     *              type: string
     *            price:
     *              type: number
     *            brand:
     *              type: string
     *            category:
     *              type: string
     *    responses:
     *      200:
     *       description: Product id name updated successfully
     * */
    `
}

module.exports = swaggerComments;