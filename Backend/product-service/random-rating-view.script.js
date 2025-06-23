const db = require('./firestore'); // Import Firestore configuration

async function main() {
    try {
        const collections = (await db.listCollections()).filter(col => col.id !== 'analytics_for_popular');; // Exclude the analytics_for_popular collection
        // Loop through each collection
        await Promise.all(collections.map(async collection => {
            const snapshot = await collection.get();
            snapshot.forEach(async doc => {
                const productData = doc.data();
                productData.id = doc.id; // Add the document ID to the product data
                // Generate random count between 10 and 500
                let ratingCount = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
                console.log(`Random rating count for ${doc.id}:`, ratingCount);
                // Generate random rating sum between 50 and 2500
                let minSum = ratingCount * 3;
                let maxSum = ratingCount * 5;
                let ratingSum = Math.floor(Math.random() * (maxSum - minSum + 1)) + minSum;
                console.log(`Random rating sum for ${doc.id}:`, ratingSum);
        
                let rating = parseFloat((ratingSum / ratingCount).toFixed(1));
                // Generate random integer for view count between 1000 and 6000
                let viewCount = Math.floor(Math.random() * (6000 - 1000 + 1)) + 1000;
                console.log(`Random view count for ${doc.id}:`, viewCount);
                // add rating, rating_count and rating_sum to productData
                productData.rating = rating;
                productData.rating_count = ratingCount;
                productData.rating_sum = ratingSum;
                productData.view_count = viewCount;
                // Update the document with the new rating data
                await collection.doc(doc.id).update({
                    rating: productData.rating,
                    rating_count: productData.rating_count,
                    rating_sum: productData.rating_sum,
                    view_count: productData.view_count
                });
            });

        }));

    }catch (error) {
        console.error('Error updating documents:', error);
    }

}

main()
