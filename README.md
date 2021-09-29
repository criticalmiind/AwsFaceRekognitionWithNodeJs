# Aws Face Rekognition With NodeJs

In this project i am using NodeJs and Amazon Rekognition APIs to Index new faces, delete existing faces and functionality for facial recognition.

## Before Starting

you must have an AWS account, it is necessary to create collection and perform calls to APIs rekognition.

1. create Collection in your terminal using the folow command 

***Make sure AWS CLI is configured with your keys in your terminal***

```
aws rekognition create-collection --collection-id <your collection name>
```

2. Install Node JS in your system.


3. Clone this repo

```
git clone https://github.com/criticalmiind/AwsFaceRekognitionWithNodeJs.git
```

4. Run command to install node_modules(dependencies).

```
npm install
```

5. In file **resource/config/aws-config.js** add your collectionName and region that you create your collection and port on which your api exposed (default port is set 3000).
```
module.exports.collectionName = "COLLECTION NAME";
module.exports.region = "COLLECTION REGION";
module.exports.port = 3000; //default
```

like:
```
module.exports.collectionName = "MyCollection";
module.exports.region = "us-east-2";
module.exports.port = 3000;
```

6. Finally run one of follow command to start your server

```
npm start or node server
```

The application running at port 3000 (your set port, default is 3000) 

## Calling Apis 
Postman Requests

* **POST /detect-face**
headers:
```
POST /detect-face HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
```
json body:
```json
{
    "photo":"/9j/4AAQSkZJRgABAQABLAEsAAD/4QL...."
}
```
response success:
```json
    {
        "found": true,
        "resultAWS": {
            "SearchedFaceBoundingBox": {
                "Width": 0.18744982779026031,
                "Height": 0.3335077166557312,
                "Left": 0.45743700861930847,
                "Top": 0.1989414542913437
            },
            "SearchedFaceConfidence": 99.9959945678711,
            "FaceMatches": [
                {
                    "Similarity": 100,
                    "Face": {
                        "FaceId": "17d11d4d-5670-4744-b983-8af29da337fb",
                        "BoundingBox": {
                            "Width": 0.18745000660419464,
                            "Height": 0.3335080146789551,
                            "Left": 0.45743700861930847,
                            "Top": 0.19894100725650787
                        },
                        "ImageId": "f5619d8b-6352-32ef-a02a-f0da3a430a41",
                        "Confidence": 99.99600219726562
                    }
                }
            ],
            "FaceModelVersion": "5.0"
        }
    }
```

response failed:
```json
    {
        "found": false,
        "resultAWS": {}
    }
```

* **POST /index-new-face**
headers:
```
POST /index-new-face HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
```

json body:
```json
{
    "photo":"/9j/4AAQSkZJRgABAQABLAEsAAD/4QL....",
    "id_user":"new_user0001" //optional
}
```

response success:
```json
    {
        "found": true,
        "resultAWS": { ... }
    }
```

response failed:
```json
    {
        "found": false,
        "resultAWS": {}
    }
```

* **POST /delete-face**
headers:
```
POST /delete-face HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
```

json body:
```json
{
    "face_id":"17d11d4d-5670-4744-b983-8af29da337fb",
}
```

response success:
```json
    {
        "success": true,
        "resultAWS": { ... }
    }
```

response failed:
```json
    {
        "success": false,
        "resultAWS": {}
    }
```

***photo params must be whitout "image/png;base64,"***

## References

* [AWS Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/getting-started.html) - API's Rekognition
* [AWS CLI](https://docs.aws.amazon.com/rekognition/latest/dg/setup-awscli-sdk.html) - create collections
* [Node JS](https://nodejs.org/en/) - developer base


## Author

* **GitHub** - [Shawal Ahmad Mohmand](https://github.com/criticalmiind)
* **YouTube** - [Shawal Ahmad Mohmand Official](https://www.youtube.com/c/ShawalAhmadMohmandOfficail)
* **LinkedIn** - [Shawal Ahmad Mohmand](https://www.linkedin.com/in/shawalahmad/)
* **Facebook Page** - [Shawal Ahmad Mohmand Official](https://web.facebook.com/ShawalAhmadOfficialPage)

## License

This project is Open source.

Thank You.