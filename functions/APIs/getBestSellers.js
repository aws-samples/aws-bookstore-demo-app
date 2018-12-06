"use strict";

const redis = require("redis");

// GetBestSellers - Get a list of the top 20 best selling books
exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    console.log("Creating client.");
    var redisClient = redis.createClient(6379, process.env.URL, {no_ready_check: true}); // URL of Redis cluster
    console.log("Client created.");
    
    redisClient.on("error", function (err) {
      console.log("Redis error encountered", err);
    });
    
    redisClient.on("end", function() {
      console.log("Redis connection closed");
    });
    
    var key = "TopBooks:AllTime"

    // Return the first 20 elements in the sorted set stored at key 'TopBooks:AllTime'
    // The elements are ordered from the highest to lowest scores
    redisClient.zrevrange(key, 0, 19, (error, members) => {
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
      
      // Return status code 200 and the top books on success
      const response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(members)
      };
      callback(null, response);
    });
}
