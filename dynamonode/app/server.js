var express = require('express');
var AWS = require('aws-sdk');

var app = express();
AWS.config.update({
    "apiVersion": "2012-08-10",
    "accessKeyId": "abcde",
    "secretAccessKey": "abcde",
    "region":"us-west-2",
    "endpoint": "http://localhost:8000"
});
var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies",
    KeySchema: [
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

app.listen(3001, function () {
    console.log('started');

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });

    dynamodb.listTables(function(err, data) {
        console.log(data.TableNames);
    });
});

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

var paramsItem = {
    TableName:table,
    Item:{
        "year": year,
        "title": title,
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};


app.post('/upload', function (req, res) {

    var key = 'UNIQUE_KEY_ID';

    dynamodb.putItem(paramsItem, function(err, data) {
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