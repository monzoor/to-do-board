#!/bin/bash

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to start..."
sleep 10

# Use MongoDB shell commands to create a collection and insert a document
mongo --eval 'db = db.getSiblingDB("todo_board"); db.createCollection("initialCollection"); db.initialCollection.insertOne({ "initialized": true });'
