const db = require("./firestore")
// const { Firestore } = require('@google-cloud/firestore');
const fs = require('fs');
require('dotenv').config();
// const project = 'YOUR_PROJECT_ID';
// const firestore = new Firestore({ project });

async function main() {
    const collections = (await db.listCollections()).filter(col => col.id !== 'analytics_for_popular'); // Exclude the analytics_for_popular collection
    
    const outputFile = fs.createWriteStream('products_for_search.jsonl', { encoding: 'utf8' });
    for (const collection of collections) {

            const snapshot = await collection.get()
    
            snapshot.forEach(doc => {
                const product = doc.data();
                if (!product.name || !product.description || !product.category) {
                    console.warn(`Skipping document ${doc.id} in collection ${collection.id} due to missing required fields.`);
                    return;
                }
                product.product_id = doc.id; // Add the document ID to the product data
                
                const outputLine = JSON.stringify({
                    product_id: doc.id,
                    // The 'content' field is what Vertex AI Search will primarily use for semantic matching.
                    content: `Product ID: ${doc.id}. Product name: ${product.name}. Description: ${product.description}. Category: ${product.category}.`,
                    // You can also include structured data for filtering.
                    jsonData: JSON.stringify(product)
                });
                outputFile.write(outputLine + '\n');
            });

    }

    outputFile.end();
    console.log('Finished exporting products to products_for_search.jsonl');
}

main().catch(console.error);