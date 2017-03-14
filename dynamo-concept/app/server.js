var express = require('express');
var AWS = require('aws-sdk');

var app = express();
AWS.config.update({
    "apiVersion": "2012-08-10",
    "accessKeyId": "abcde",
    "secretAccessKey": "abcde",
    "region": "us-west-2",
    "endpoint": "http://172.16.11.12:8000"
});
var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "ParcelShop",
    KeySchema: [
        {AttributeName: "hash", KeyType: "HASH"},  //Partition Key
        {AttributeName: "id", KeyType: "RANGE"} // Range Key
    ],
    AttributeDefinitions: [
        {AttributeName: "hash", AttributeType: "S"},
        {AttributeName: "id", AttributeType: "S"},
        {AttributeName: "geohash", AttributeType: "S"}
    ],
    LocalSecondaryIndexes: [
        {
            IndexName: 'index.geohash',
            KeySchema: [
                {AttributeName: 'hash', KeyType: "HASH"},
                {AttributeName: 'geohash', KeyType: "RANGE"}
            ],
            Projection: {
                ProjectionType: 'ALL'
            }
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

app.listen(3001, function () {
    console.log('started');

    dynamodb.createTable(params, function (err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });

    dynamodb.listTables(function (err, data) {
        console.log(data.TableNames);
    });
});

var table = "ParcelShop";

var paramsItem = {
    TableName: table,
    Item: {
        id: 'd',
        name: 'Rowntree Montessori Schools',
        address: {
            street: '60/62 Northgate Road',
            city: 'New Basford',
            postCode: 'NG7 7FY'
        },
        Location: {
            lat: 43.7091270,
            lng: -79.7841510
        }
    }
};


app.post('/upload', function (req, res) {

    var key = 'UNIQUE_KEY_ID';

    dynamodb.putItem(paramsItem, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
        // Read the item from the table

        // dynamodb.getItem({Key: {id: {S: key}}}, function(err, data) {
        //
        //     console.log(data.Item); // print the item data
        // });
    });
    res.end('END');
});

app.get('/load', function (req, res, next) {

});