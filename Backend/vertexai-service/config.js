require('dotenv').config();

const keyPath = './vertex-ai-sa.json'; // Path to your service account JSON
const projectId = process.env.PROJECT_ID
const location = process.env.LOCATION; // or your preferred region

module.exports = { keyPath, projectId, location };