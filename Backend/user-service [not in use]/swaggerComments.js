const swaggerComments = {
    userLogin: `
    /**
     * @swagger
     * /login:
     *  post:
     *    summary: User login
     *    tags: [User]
     *    requestBody:
     *     required: true
     *     content:
     *      application/json:
     *        schema:
     *          type: object
     *          properties:
     *            username:
     *              type: string
     *            password:
     *              type: string
     *    responses:
     *      200:
     *       description: Login successful
     */
    `
}

module.exports = swaggerComments;