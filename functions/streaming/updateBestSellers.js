"use strict";

var redis = require("redis");

// UpdateBestSellers - Updates best sellers list as orders are placed
exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  var redisClient = redis.createClient(6379, process.env.URL, {no_ready_check: true}); // ElastiCache Redis cluster URL
  console.log("Client created.");

  redisClient.on("error", function (err) {
    console.log("Redis error encountered", err);
  });

  redisClient.on("end", function() {
    console.log("Redis connection closed");
  });

  event.Records && event.Records.forEach((record) => {         
    const booksList = record.dynamodb.NewImage.books.L;
    for (var i = 0; i < booksList.length; i++) {
      var book = record.dynamodb.NewImage.books.L[i];
      console.log("book: " + JSON.stringify(book));
            
      var itemsSold = book.M.quantity.N;
      var value = book.M.bookId.S; // bookId
      var key = "TopBooks:AllTime";

      // Increment the score of the member (bookId) in the sorted set stored at key (TopBooks:AllTime) by increment (itemsSold)
      // If the bookId does not exist in the sorted set, it is added with increment as its score
      redisClient.zincrby(key, itemsSold, JSON.stringify(value), (error, reply) => {
        if(error) {
          console.log("error: " + error);
          callback(null, error);
        }
        console.log("reply: " + reply);
        callback(null, reply);
      });
      console.log("Value inserted.");
    }
  });
}
