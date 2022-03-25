# Voluntary - Donations Made Easy
Looking to donate locally? Voluntary brings together those looking to donate, as well as those looking to receive.

Create an account using Google or Facebook, post some items, or browse local listings in your area.

![gif](https://user-images.githubusercontent.com/43115008/160202295-33ec901d-75e4-4380-aabc-d747c91e1892.gif)

## :heavy_check_mark: Features

### Voluntary Overview

* Real-time Chat
* Firebase Firestore
* Facebook and Google Authentication
* AWS S3 Image Uploading

### Technologies Used

* Firebase
* React - Persistant storage
* AWS - Raspberry Pi-hosted local network server
* Others TBD...

## :heavy_check_mark: Setup
* .env file in root folder:
```
REACT_APP_AWS_ACCESS_KEY_ID=         your-aws-s3-id
REACT_APP_AWS_SECRET_ACCESS_KEY=     your-aws-s3-key
REACT_APP_MAPBOX_TOKEN=              your-mapbox-token
```
S3 installation guide [here](https://jimboslice.hashnode.dev/react-and-aws-s3-easy-image-uploading-quick-guide).

MapBox API guide [here](https://docs.mapbox.com/api/overview/).

* `npm install` ~ install all dependencies
* `npm run server` ~ start Express server locally
* `npm run start` ~ start React/Webpack server locally

## :heavy_check_mark: RESTful API

## CRUD items ~

#### Request: `POST /item/`
```
//Request body

{
    category: string,
    description: string,
    image: [array of string URLs],
    location: [string, string], //latitude, longitude
    name: string,
    sellerInfo: string, //user id
    isActive: boolean
}
```
```
    //Response

    HTTP/1.1 201 Created
    Date: Thu, 23 Mar 2022 12:36:30 GMT
    Status: 201 Created
```

#### Request: `GET /item/:id`
```
//Request body

n/a
```
```
//Response

[
  {
      "id": "1241sdaklja124",
      "category": "electronics",
      "sellerInfo": "1AOjnwnoc5bxD1u3VBiaNzKYL2k1",
      "location": "San Francisco, California",
      "isActive": true,
      "image": [
          "https://imageurl.gstatic.com./images?q=tbn:ANd9GcRJwjQ2VbM6DEt8vb5xqBAs2hn9D8EjyR9TyQ&usqp=CAU",
          "https://imageurl.gstatic.com./images?q=tbn:ANd9GcRJwjQ2VbM6DEt8vb5xqBAs2hn9D8EjyR9TyQ&usqp=CAU",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwjQ2VbM6DEt8vb5xqBAs2hn9D8EjyR9TyQ&usqp=CAU",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwjQ2VbM6DEt8vb5xqBAs2hn9D8EjyR9TyQ&usqp=CAU"
      ],
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      "name": "iPhone 15s Pro"
  },
  {
      "category": "electronics",
      "sellerInfo": "1AOjnwnoc5bxD1u3VBiaNzKYL2k1",
      ...
  }
]
```

#### Request: `PUT /item/:id`
```
//Request body

{
      "category": string,
      "location": string,
      "isActive": boolean,
      "image": [
          string,
          string,
          string
      ],
      "description": string,
      "name": string
}

```
```
//Response

    HTTP/1.1 202 Accepted
    Date: Thu, 23 Mar 2022 12:36:30 GMT
    Status: 202 Accepted
```
#### Request: `DELETE /item/:id`
```
//Request body

{
      "id": string
}
```
```
//Response

    HTTP/1.1 202 Accepted
    Date: Thu, 23 Mar 2022 12:36:30 GMT
    Status: 202 Accepted
```









## CRUD users ~
#### Request: `POST /user/` (on register)
```
//Request body

{
    uid: string,
    name: string,
    trustScore: number,
    authProvider: 'facebook' || 'google',
    email: string,
    photo: string,
    type: string,
    location: [],
    transactionCount: number,
    ratingsScore: number,
    ratingsCount: number,
    active: boolean,
}
```
```
    //Response
    HTTP/1.1 201 Created
    Date: Thu, 23 Mar 2022 12:36:30 GMT
    Status: 201 Created
```
#### Request: `GET /user/:id`
```
{
    "uid": string
}
```
```
//Response

[
    {
        "id": "YSTI1VKEsiRyyFXhdejmN6b4lU22",
        "trustScore": 1,
        "photo": "https://lh3.googleusercontent.com/a-/AOh14GiB-6iVoyoBkvkXMv0XLrHsBTmI7TIFxqqpytGpa_8=s96-c",
        "location": [23.12314, -122.124123],
        "type": "Individual",
        "ratingsCount": 0,
        "transactionCount": 0,
        "active": true,
        "name": "Jimmy",
        "uid": "YSTI1VKEsiRyyFXhdejmN6b4lU22",
        "ratingsScore": 0,
        "authProvider": "google",
        "email": "jdhogerty@gmail.com",
        "userItems": [
            {
                "id": "3GZf7jdY8tJtqSZnpkYE",
                "isActive": true,
                "name": "Car",
                "category": "Automotive",
                "description": "Its a car",
                "sellerInfo": "YSTI1VKEsiRyyFXhdejmN6b4lU22",
                "image": [
                    "https://voluntaryhackreactorbucket.s3.amazonaws.com/image_number_624.0451854178452"
                ]
            }
        ]
    }
]
```

#### Request: `PUT /user/:id`
```
//Request body
//Add keys that you would like to update (all are optional - min of 1 is required)

{
    "trustScore": number,
    "photo": string,
    "location": [string, string],
    "type": "string",
    "ratingsCount": number,
    "transactionCount": number,
    "active": boolean,
    "name": string,
    "uid": string,
    "ratingsScore": number,
    "authProvider": string,
    "email": string,
}
```
```
//Response

    HTTP/1.1 202 Accepted
    Date: Thu, 23 Mar 2022 12:36:30 GMT
    Status: 202 Accepted
```
#### Request: `DELETE /user/:id`
```
//Request body

{
      "id": string
}
```
```
//Response

    HTTP/1.1 202 Accepted
    Date: Thu, 23 Mar 2022 12:36:30 GMT
    Status: 202 Accepted
```
