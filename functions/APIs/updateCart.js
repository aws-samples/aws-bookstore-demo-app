"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// UpdateCart - Update quantity of a book in a customer's cart
exports.handler = (event, context, callback) => {
  
  // Return immediately if being called by warmer 
  if (event.source === "warmer") {
    return callback(null, "Lambda is warm");
  }
  
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition and sort keys of the item to be updated
    // - 'customerId': Identity Pool identity id of the authenticated user
    // - 'bookId': id for the book being updated
    Key: {
      customerId: event.requestContext.identity.cognitoIdentityId,
      bookId: data.bookId
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    // - ':quantity': defines 'quantity' to be the quantity parsed from the request body
    UpdateExpression: "SET quantity = :quantity",
    ExpressionAttributeValues: {
      ":quantity": data.quantity
    },
    ReturnValues: "ALL_NEW"
  };
 
  dynamoDb.update(params, (error, data) => {
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

    // Return status code 200 on success
    const response = {
      statusCode: 200,
      headers: headers
    };
    callback(null, response);
  });
}   
