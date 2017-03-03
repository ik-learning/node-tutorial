#!/bin/bash


#### SETUP
# 1.) Create a simple point layer
curl -X POST -d '{"layer":"geom","lat":"lat","lon":"lon"}' --header "Content-Type:application/json" http://localhost:7474/db/data/ext/SpatialPlugin/graphdb/addSimplePointLayer

# 2.) Add a spatial index
curl -X POST -d '{"name":"geom","config":{"provider":"spatial","geometry_type":"point","lat":"lat","lon":"lon"}}' --header "Content-Type:application/json" http://172.16.11.5:7474/db/data/index/node/



#### CREATE DATA
# 3.) Create a sample node with lat and lon data (you can change the name of the properties in step 2)
curl -v -X POST -d '{"query":"CREATE (n {name:\"Strandbar Hermann 2\",lon:16.385539770126344,lat:48.21198395790515}) RETURN n;"}' --header "Content-Type:application/json" http://localhost:7474/db/data/cypher

# 4.) Add this node to the previously created "geom" index (step 2)
# This should be done by an auto indexer: https://github.com/neo4j/neo4j/issues/2048
curl -X POST -d '{"key":"name","value":"Strandbar Hermann 2","uri":"http://localhost:7575/db/data/node/5"}' --header "Content-Type:application/json" http://localhost:7474/db/data/index/node/geom

# 5.) Add the node to the PointLayer (This is not necessary. Adding it to the spatial index will handle this too)
#curl -X POST -d '{"layer":"geom","node":"http://localhost:7575/db/data/node/5"}' --header "Content-Type:application/json" http://localhost:7474/db/data/ext/SpatialPlugin/graphdb/addNodeToLayer



#### QUERY FOR DATA
# 6.) Get nodes within distance via REST API
curl -v -X POST -d '{"layer":"geom","pointX":16.3,"pointY":48.2,"distanceInKm":100.0}' --header "Content-Type:application/json" http://localhost:7474/db/data/ext/SpatialPlugin/graphdb/findGeometriesWithinDistance
## Returns the "Strandbar Hermann" node

# 7.) Get nodes within Distance via cypher
curl -X POST -d "{\"query\":\"START node=node:geom('withinDistance:[48.2,16.3,100.0]') return node\"}" --header "Content-Type:application/json" http://lcalhost:7474/db/data/cypher
## Returns the "Strandbar Hermann" node

