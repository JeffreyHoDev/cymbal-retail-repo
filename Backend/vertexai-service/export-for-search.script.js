const db = require("./firestore")
// const { Firestore } = require('@google-cloud/firestore');
const fs = require('fs');
require('dotenv').config();
// const project = 'YOUR_PROJECT_ID';
// const firestore = new Firestore({ project });

async function main() {
    const collections = await db.listCollections();
    
    const outputFile = fs.createWriteStream('products_for_search.jsonl', { encoding: 'utf8' });
    for (const collection of collections) {
        const snapshot = await collection.get()

        snapshot.forEach(doc => {
            const product = doc.data();
            if (!product.name || !product.description || !product.category) {
                console.warn(`Skipping document ${doc.id} in collection ${collection.id} due to missing required fields.`);
                return;
            }
            
            const outputLine = JSON.stringify({
                id: doc.id,
                // The 'content' field is what Vertex AI Search will primarily use for semantic matching.
                content: `Product name: ${product.name}. Description: ${product.description}. Category: ${product.category}.`,
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