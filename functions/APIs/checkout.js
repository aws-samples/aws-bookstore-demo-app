"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Checkout - Process a customer's cart into an order
exports.handler = (event, context, callback) => {
    
  // Return immediately if being called by warmer 
  if (event.source === "warmer") {
    return callback(null, "Lambda is warm");
  }
  
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.ORDERS_TABLE, // [ProjectName]-Orders
    // 'Item' contains the attributes of the item to be created
    // - 'customerId': user identities are federated through the
    //                 Cognito Identity Pool, we will use the identity id
    //                 as the user id of the authenticated user
    // - 'orderId': a unique uuid
    // - 'orderDate': current date
    // - 'books': list of books parsed from request body
    Item: {
      customerId: event.requestContext.identity.cognitoIdentityId,
      orderId: context.awsRequestId,
      orderDate: Date.now(),
      books: data.books,
    }
  };
 
  dynamoDb.put(params, (error, data) => {
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

    // Return status code 200 on success
    const response = {
      statusCode: 200,
      headers: headers
    };
    callback(null, response);
  });
 
  // Delete books from cart as they have been processed
  let deleteParam = {}
  data.books.forEach( function(item) {
    deleteParam = {
      TableName: process.env.CART_TABLE, // [ProjectName]-Cart
      // 'Key' defines the partition key and sort key of the item to be deleted
      // - 'customerId': user identities are federated through the
      //                 Cognito Identity Pool, we will use the identity id
      //                 as the user id of the authenticated user
      // - 'bookId': a unique identifier for the book (uuid)
      Key: {
        customerId: event.requestContext.identity.cognitoIdentityId,
        bookId: item.bookId
      }
    }
 
    dynamoDb.delete(deleteParam, (error, data) => {
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

      // Return status code 200 on success
      const response = {
        statusCode: 200,
        headers: headers
      };
      callback(null, response);
    });
  });      
}
