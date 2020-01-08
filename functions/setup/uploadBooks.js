"use strict"; 

const https = require("https"); 
const url = require("url");

var AWS = require("aws-sdk"),
documentClient = new AWS.DynamoDB.DocumentClient(),
s3Client = new AWS.S3;

// UploadBooks - Upload sample set of books to DynamoDB
exports.handler = function(event, context, callback) {
  console.log("Received event:", JSON.stringify(event, null, 2));
  
  if (event.RequestType === "Create") {
    getBooksData().then(function(data) {
      var booksString = data.Body.toString("utf-8"); 
      var booksList = JSON.parse(booksString);
      uploadBooksData(booksList);
    }).catch(function(err) {
      console.log(err);
      var responseData = { Error: "Upload books failed" };
      console.log(responseData.Error);
      sendResponse(event, callback, context.logStreamName, "FAILED", responseData);
    });
    sendResponse(event, callback, context.logStreamName, "SUCCESS");
    return;
  } else {
    sendResponse(event, callback, context.logStreamName, "SUCCESS");
    return;
  }
};
function uploadBooksData(book_items) {
  var items_array = [];
  for (var i in book_items) {
    var book = book_items[i];
    console.log(book.id)
    var item = {
      PutRequest: {
       Item: book
      }
    };
    items_array.push(item);
  }

  // Batch items into arrays of 25 for BatchWriteItem limit
  var split_arrays = [], size = 25;
    while (items_array.length > 0) {
        split_arrays.push(items_array.splice(0, size));
    } 
  
  split_arrays.forEach( function(item_data) {
    putItem(item_data)
  });
}

// Retrieve sample books from aws-bookstore-demo S3 Bucket
function getBooksData() {
  var params = {
    Bucket: process.env.S3_BUCKET, // aws-bookstore-demo
    Key: process.env.FILE_NAME // data/books.json
 };
 return s3Client.getObject(params).promise();
}

// Batch write books to DynamoDB
function putItem(items_array) {
  var tableName = process.env.TABLE_NAME; // [ProjectName]-Books
  var params = {
    RequestItems: { 
      [tableName]: items_array
    }
  };
  var batchWritePromise = documentClient.batchWrite(params).promise();
  batchWritePromise.then(function(data) {
    console.log("Books imported");
  }).catch(function(err) {
    console.log(err);
  });
}

// Send response back to CloudFormation template runner
function sendResponse(event, callback, logStreamName, responseStatus, responseData) {
  const responseBody = JSON.stringify({
    Status: responseStatus,
    Reason: `See the details in CloudWatch Log Stream: ${logStreamName}`,
    PhysicalResourceId: logStreamName,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: responseData,
  });

  console.log("RESPONSE BODY:\n", responseBody);

  const parsedUrl = url.parse(event.ResponseURL);
  const options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: "PUT",
    headers: {
      "Content-Type": "",
      "Content-Length": responseBody.length,
    },
  };

  const req = https.request(options, (res) => {
    console.log("STATUS:", res.statusCode);
    console.log("HEADERS:", JSON.stringify(res.headers));
    callback(null, "Successfully sent stack response!");
  });

  req.on("error", (err) => {
    console.log("sendResponse Error:\n", err);
    callback(err);
  });

  req.write(responseBody);
  req.end();
}
