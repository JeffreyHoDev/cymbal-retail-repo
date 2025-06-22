const { PredictionServiceClient } = require('@google-cloud/aiplatform').v1;
const { helpers } = require('@google-cloud/aiplatform');

const client = new PredictionServiceClient({
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
    keyFilename: './vertex-ai.sa.json'
});

function extractPromptRelevantKeys(product) {
    const keys = ['name', 'brand', 'category', 'color', 'material', 'features', 'description'];
    return Object.fromEntries(Object.entries(product).filter(([key]) => keys.includes(key)));
}

async function generateMultipleImages(product) {

    const imageResponse = await fetch(product.image_url);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');

    const endpoint = `projects/${process.env.PROJECT_ID}/locations/us-central1/publishers/google/models/imagen-4.0-generate-preview-06-06`;
    // const prompt = `
    //     Generate high resolution photo, realistic texture, studio lighting of product. Based on the json data provided below. You can use the image_url to get the reference image. You can generate image that looking at the image in different angle, or changing the background color. You don't need to generate the same image as the image_url, but you can use it as a reference.
    //     The product json data is ${JSON.stringify(product)}. Realistic is a must. Image should be in jpeg format, high resolution, and suitable for e-commerce display.
    
    // `
    const relevantProductFeatures = extractPromptRelevantKeys(product);
    const productDetails = Object.entries(relevantProductFeatures)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');


    const prompt = `
        A high-resolution product photo of a${product.color || ''} ${product.category || 'product'} called "${product.name}".${product.material || ''}
        The product is shown in a clean studio setup with realistic textures and lighting. 
        Shot at an alternate angle from the reference image from ${product.image_url}. 
        Suitable for modern e-commerce display. Photo-realistic, rendered in JPEG format.${product.description}
        Below are the details of the product:
        ${productDetails}
    `
    const instances = helpers.toValue({
        prompt: prompt,
        image: { bytesBase64Encoded: base64Image },
    });
    const parameters = helpers.toValue({
        sampleCount: 1,           // 1 image per instance
        aspectRatio: "1:1",
        safetyFilterLevel: "block_medium_and_above",
        guidanceScale: 10,
        temperature: 0.1
    });


      const images = [];

    for (let i = 0; i < 1; i++) {
        const [response] = await client.predict({
        endpoint,
        instances: [instances], // only ONE instance per request
        parameters,
        });

        const base64Image = response.predictions[0].structValue.fields.bytesBase64Encoded.stringValue;
        images.push(`data:image/png;base64,${base64Image}`);
    }

    const [response] = await client.predict({
        endpoint,
        instances: [instances],
        parameters,
    });
    // return response.predictions.map(pred =>
    //     `data:image/png;base64,${
    //     pred.structValue.fields.bytesBase64Encoded.stringValue
    //     }`
    // ); 
    return images; 
}

module.exports = generateMultipleImages;
