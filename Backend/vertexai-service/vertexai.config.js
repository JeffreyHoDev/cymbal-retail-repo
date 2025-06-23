const {VertexAI, HarmCategory, HarmBlockThreshold} = require('@google-cloud/vertexai');
require('dotenv').config();
const project = process.env.PROJECT_ID;
const location = process.env.LOCATION;
const keyPath = './vertex-ai.sa.json'; // Path to your service account JSON

const vertex_ai = new VertexAI({
  project: project, 
  location: location, 
  googleAuthOptions: {
    keyFile: keyPath
  }
});

// Instantiate models
const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: 'gemini-2.5-pro',
    // The following parameters are optional
    // They can also be passed to individual content generation requests
    safety_settings: [{category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE}],
    generation_config: {max_output_tokens: 256},
    systemInstruction: {
      role: 'system',
      parts: [
        { text: `
          You are an e-commerce assistant. You will receive the product information and image url. Info such as below but not limited to:
          Product name, Description, Category, image_url
          You will also receive information such as quantity, price, etc. You should not change those information and must keep them in the response

          Review the product image and info. Suggest:
          1. Improved description. Good for marketing.
          2. No need to suggest new category, but you can suggest sub-category. If there are multiple values, put it as new key called "suggested_subcategory" with array value.
          3. Suggest product attributes that currently might be missing but good to have. If the added attribute might be same type but has value different, put it inside an array. Example: "color": ["red", "blue"]. The attributes doesn't neccessarily to only be single value.
          4. Suggested attributes must make sense/reasonable, for example you are not required to suggest quantity as you don't have the context.

          Respond in JSON format. For your response, you should keep the original data including quantity, price etc. For any of the suggested key, it should have prefix "suggested_" to avoid overwritting the original data.

          Example:
          {
              "category": "Electronics",
              "suggested_category": "New category",
              "name": "Product Name",
              "suggested_name": "Improved Product Name",
              "description": "Product description",
              "suggested_description": "Improved product description",
              "suggested_color": "Red",
              "quantity": 10
          }
          ` 
      }
      ]
    }
  });


const reasoningGenerativeModel = vertex_ai.preview.getGenerativeModel({
    model: 'gemini-2.5-pro',
    // The following parameters are optional
    // They can also be passed to individual content generation requests
    safety_settings: [{category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE}],
    generation_config: {max_output_tokens: 256},
    systemInstruction: {
      role: 'system',
      parts: [
        { text: `
          You are an e-commerce assistant.
          You will receive the information from discovery engine which its response is based on the user query. Then you can provide the insights on that result.
          You will also receive the user query.
          Only answer with knowledge from out product datastore. 
          Do not answer unrelated topics. Use the datastore to identify trends or product info.
        ` 
      }
      ]
    },
    keyFilename: './vertex-ai.sa.json'
  });

module.exports = {generativeModel, reasoningGenerativeModel}