from __future__  import print_function  # Python 2/3 compatibility

import json
import math
from gremlin_python import statics
from gremlin_python.structure.graph import Graph
from gremlin_python.process.traversal import T
from gremlin_python.process.traversal import P
from gremlin_python.process.traversal import Order
from gremlin_python.process.graph_traversal import *
from gremlin_python.process.strategies import *
from gremlin_python.driver.driver_remote_connection import DriverRemoteConnection

import os
import json

myNeptuneEndpoint = "ws://" + os.environ["neptunedb"] + ":8182/gremlin" # Neptune cluster url

# GetRecommendationsByBook - Get list of friends who have purchased this book and how many times it was purchased by those friends
def handler(event, context):
    
    graph = Graph()
    
    g = graph.traversal().withRemote(DriverRemoteConnection(myNeptuneEndpoint,"g"))
    
    toReturn = g.V(event["pathParameters"]["bookId"]).project("friendsPurchased","purchased") \
        .by(in_("purchased").dedup().where(id().is_(P.neq(event["pathParameters"]["bookId"]))).id().fold()).by(in_("purchased").count()).toList()
    
    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True
        },
        "body": json.dumps(toReturn)
    }
    
    print(response)
    return response
