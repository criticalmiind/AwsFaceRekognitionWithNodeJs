const config = require('./../config/aws-config');

var AWS = require('aws-sdk');
AWS.config.region = config.region;

var uuid = require('node-uuid');
var fs = require('fs-extra');
var path = require('path');

var rekognition = new AWS.Rekognition({ "region": config.region });

//set defaut obj to return results data
var objReturn = { "found": false, "resultAWS":{} }

module.exports.search_face = function(obj, callback){
	rekognition.searchFacesByImage(
		{
			"CollectionId": config.collectionName,
			"FaceMatchThreshold": 70, //set minumum match in image send
			"Image": { 'Bytes': new Buffer(obj.photo, 'base64') },
			"MaxFaces": 1 // set the number face detect in image send
		},
		function(err, data) {
			if (err) {
				objReturn.found = false
				objReturn.resultAWS = err
				callback(objReturn);
			} else { 
				if(data.FaceMatches && data.FaceMatches.length > 0) {
					objReturn = { "found": true, "resultAWS": data }
					callback (objReturn);	
				} else {
					objReturn = { "found": false, "resultAWS": {} }
					callback (objReturn);	
				}
			}
		}
	);
}

module.exports.indexFaces = function (obj, callback){
	rekognition.indexFaces(
		{
			"CollectionId": config.collectionName,
			"DetectionAttributes": [ "ALL" ], // set detect all atributes on image send.
			"ExternalImageId": obj.id_user, 
			"Image": { 'Bytes': new Buffer(obj.photo, 'base64') }
		},
		function(err, data) {
			if (err) {
				objReturn = { "found": false, "resultAWS": err.stack }
				callback(objReturn)
			} else {
				objReturn = { "found": true, "resultAWS": data }
				callback(objReturn)
			}
		}
	);
}

module.exports.deleteFace = function (obj,callback){
	//prepare params to delete face index.
	var params_deletion = { "CollectionId": config.collectionName, "FaceIds": [obj.face_id]};
	rekognition.deleteFaces(params_deletion, function(err, data) {
		if (err) {
			let obj = { "success": false, "resultAWS": err.stack }
			callback(obj)
		} else {
			let obj = { "success": true, "resultAWS": data }
			callback(obj)
		}
	});
}