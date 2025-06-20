/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
const {Storage} = require('@google-cloud/storage');
const bucketName = 'cymbal-retail-bucket-test';

// Imports the Google Cloud client library

// Creates a client
const storage = new Storage({ keyFilename: './bucket-key.sa.json' });
const bucket = storage.bucket(bucketName);

module.exports = bucket