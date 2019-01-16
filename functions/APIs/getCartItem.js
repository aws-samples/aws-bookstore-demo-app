"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// GetCartItem - Get information for a specific item in a customer's cart 
exports.handler = (event, context, callback) => {
  
  // Return immediately if being called by warmer 
  if (event.source === "warmer") {
    return callback(null, "Lambda is warm");
  }

  const params = {
    TableName: process.env.TABLE_NAME, // [ProjectName]-Cart
    // 'Key' defines the partition and sort keys of the item to be retrieved
    // - 'customerId': user identities are federated through the
    //                 Cognito Identity Pool, we will use the identity id
    //                 as the user id of the authenticated user
    // - 'bookId': a unique identifier for the book (uuid)
    Key: {
      customerId: event.requestContext.identity.cognitoIdentityId,
      bookId: event.pathParameters.bookId
    }
  };

  dynamoDb.get(params, (error, data) => {
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials" : true
    };

    // Return status code 500 on error
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: error
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the retrieved item on success
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(data.Item)
    };
    callback(null, response);
  });
}
