const db = require("./firestore")
// const { Firestore } = require('@google-cloud/firestore');
const fs = require('fs');
require('dotenv').config();
// const project = 'YOUR_PROJECT_ID';
// const firestore = new Firestore({ project });

// async function main() {
//     const snapshot = await db.collection('analytics_for_popular').get()
//       if (snapshot.empty) {
//         console.log('No products found.');
//         return;
//     }

    
//     const outputFile = fs.createWriteStream('products_for_popularity.jsonl', { encoding: 'utf8' });
    

//     snapshot.forEach(doc => {
//         const product = doc.data();
//         if (!product.name || !product.description || !product.category || !product.viewCount) {
//             console.warn(`Skipping document ${doc.id} in collection analytics_for_popular due to missing required fields.`);
//             return;
//         }
        
//         const outputLine = JSON.stringify({
//             id: doc.id,
//             // The 'content' field is what Vertex AI Search will primarily use for semantic matching.
//             content: `Product name: ${product.name}. Description: ${product.description}. Category: ${product.category}.`,
//             name: product.name || '',
//             description: product.description || '',
//             category: product.category || '',
//             priceInfo: {
//                 price: product.price || 0,
//                 currencyCode: 'SGD' // change if needed
//             },
//             view_count: product.viewCount || 0,
//             jsonData: JSON.stringify(product)
//         });
//         outputFile.write(outputLine + '\n');
//     })
    

//     outputFile.end();
//     console.log('Finished exporting products to products_for_popularity.jsonl');
// }


async function main() {
    const collections = (await db.listCollections()).filter(col => col.id !== 'analytics_for_popular'); // Exclude the analytics_for_popular collection
    
    const outputFile = fs.createWriteStream('products_for_popularity.jsonl', { encoding: 'utf8' });
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
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    priceInfo: {
                        price: product.price || 0,
                        currencyCode: 'SGD' // change if needed
                    },
                    view_count: product.view_count || 0,
                    rating: product.rating || 0,
                    rating_count: product.rating_count || 0,
                    rating_sum: product.rating_sum || 0,
                    jsonData: JSON.stringify(product)
                });
                outputFile.write(outputLine + '\n');
            });

    }

    outputFile.end();
    console.log('Finished exporting products to products_for_search.jsonl');
}

main().catch(console.error);


