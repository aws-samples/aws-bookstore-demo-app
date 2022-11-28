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

myNeptuneEndpoint = "wss://" + os.environ["neptunedb"] + ":8182/gremlin" # Neptune cluster URL

# GetRecommendations - Get list of recommended books based on the purchase history of a user's friends
def handler(event, context):
    
    graph = Graph()
    
    g = graph.traversal().withRemote(DriverRemoteConnection(myNeptuneEndpoint,"g"))
    
    toReturn = (
        g.V('us-east-1:09048fa7-0587-4963-a17e-593196775c4a').
            out('friendOf').aggregate('friends').barrier().
            out('purchased').dedup().
            project('bookId','purchases','friendsPurchased').
                by(id_()).
                by(in_('purchased').where(P.within('friends')).count()).
                by(in_('purchased').where(P.within('friends')).id_().fold()).
            order().by('purchases',Order.desc).
            limit(5).
            toList()
    )
    
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
