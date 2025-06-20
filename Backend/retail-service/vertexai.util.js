const generativeModel = require('./vertexai.config'); // Import the Vertex AI model

async function enhanceWithImage(product) {
  const prompt = `
        You are an e-commerce assistant.
        Product name: ${product.name}
        Description: ${product.description}
        Category: ${product.category}
        Image URL: ${product.image_url}
`;

  const result = await generativeModel.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          { text: `![product image](${product.image_url})` } 
        ]
      }
    ]
  });

  const textResponse = result.response.candidates[0].content.parts[0].text;
  let formattedResponse = textResponse.replace(/```json\s*|```/g, '').trim();
  return formattedResponse;
}



// async function multiPartContent(product) {
//     const filePart = {file_data: {file_uri: `${product.image_url}`, mime_type: "image/jpeg"}};
//     const textPart = {text: `
//         You are an e-commerce assistant.
//         Product name: ${product.name}
//         Description: ${product.description}
//         Category: ${product.category}

//         Review the product image and info. Suggest:
//         1. Improved description. Good for marketing.
//         2. Best-fit category
//         3. Suggest product attributes that currently might be missing but good to have. If the added attribute might be same type but has value different, put it inside an array. Example: "color": ["red", "blue"]. The attributes doesn't neccessarily to only be single value.
//         4. Suggested attributes must make sense/reasonable, for example you are not required to suggest quantity as you don't have the context.

//         Respond in JSON format. For your response, you should keep the original data including quantity, price etc. For any of the suggested key, it should have prefix "suggested_" to avoid overwritting the original data.

//         Example:
//         {
//             "category": "Electronics",
//             "suggested_category": "New category",
//             "name": "Product Name",
//             "suggested_name": "Improved Product Name",
//             "description": "Product description",
//             "suggested_description": "Improved product description",
//             "suggested_color": "Red",
//             "quantity": 10
//         }        
//     `};
//     const request = {
//         contents: [{role: 'user', parts: [textPart, filePart]}],
//       };
//     const streamingResp = await generativeModel.generateContentStream(request);
//     for await (const item of streamingResp.stream) {
//       console.log('stream chunk: ', JSON.stringify(item));
//     }
//     const aggregatedResponse = await streamingResp.response;
//     console.log(aggregatedResponse.candidates[0].content);
// }



module.exports = enhanceWithImage;