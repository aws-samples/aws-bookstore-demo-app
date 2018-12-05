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

myNeptuneEndpoint = 'ws://' + os.environ['neptunedb'] +':8182/gremlin' # Neptune cluster URL

# GetRecommendations - Get list of recommended books based on the purchase history of a user's friends
def lambda_handler(event, context):

    graph = Graph()

    g = graph.traversal().withRemote(DriverRemoteConnection(myNeptuneEndpoint,'g'))

    toReturn = g.V().hasLabel('book').where(inE('purchased').count().is_(P.gt(0))).project('bookId','purchases','friendsPurchased') \
        .by(id()).by(inE('purchased').count()).by(in_().id().fold()).order().by(select('purchases'),Order.decr).limit(5).toList()

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
