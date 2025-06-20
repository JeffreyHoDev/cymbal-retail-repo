const swaggerComments = {
    getCart: `
    /**
     * @swagger
     * /getCart:
     *   post:
     *     summary: Retrieve a list of cart items. User- Customer
     *     tags: [Cart]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               user_id:
     *                 type: integer
     *     responses:
     *       '200':
     *         description: A list of cart items
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   user_id:
     *                     type: integer
     *                   product_id:
     *                     type: string
     *                   product_price:
     *                     type: float
     *                   product_name:
     *                     type: string
     *                   product_image:
     *                     type: array
     *                     items:
     *                       type: string
     *                   product_category:
     *                     type: string
     *                   product_brand:
     *                     type: string
     *                   quantity:
     *                     type: integer
     *                   attributes:
     *                     type: object
     *                     additionalProperties: true
     */
    `,
    updateCartItem: `
    /**
     * @swagger
     * /updateCartItem:
     *   post:
     *     summary: Update specific cart item. User- Customer
     *     tags: [Cart]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               user_id:
     *                 type: integer
     *               product_id:
     *                 type: string
     *               product_price:
     *                 type: float
     *               product_image:
     *                 type: float
     *               product_brand:
     *                 type: string
     *               product_category:
     *                 type: string
     *               quantity:
     *                 type: integer
     *               attributes:
     *                 type: object
     *                 additionalProperties: true
     *     responses:
     *       '200':
     *         description: A list of cart items
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                  message:
     *                    type: string
     */
    `,
    removeCartItem: `
    /**
     * @swagger
     * /removeCartItem:
     *   post:
     *     summary: Delete specific cart item. User- Customer
     *     tags: [Cart]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: integer
     *               user_id:
     *                 type: integer
     *               product_id:
     *                 type: string
     *     responses:
     *       '200':
     *         description: A list of cart items
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                  message:
     *                    type: string
     */
    `,
    addToCart: `
    /**
     * @swagger
     * /addToCart::
     *   post:
     *     summary: Retrieve a list of cart items. User- Customer
     *     tags: [Cart]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               user_id:
     *                 type: integer
     *               product_id:
     *                 type: string
     *               product_price:
     *                 type: float
     *               product_image:
     *                 type: float
     *               product_brand:
     *                 type: string
     *               product_category:
     *                 type: string
     *               quantity:
     *                 type: integer
     *               attributes:
     *                 type: object
     *                 additionalProperties: true
     *     responses:
     *       '200':
     *         description: A list of cart items
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                  message:
     *                    type: string
     */
    `,    
}

module.exports = swaggerComments;