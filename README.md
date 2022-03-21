# Voluntary - Donations Made Easy
Looking to donate locally? Voluntary brings together those looking to donate, as well as those looking to receive. 

Create an account using Google or Facebook, post some items, or browse local listings in your area.

<PLACEHOLDER GIF>
![gif](https://user-images.githubusercontent.com/43115008/158876469-321675e3-2c08-406d-ba8b-f98c7012cc3c.gif)


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
* .env file in root folder ~ example:
```
REACT_APP_YELP_API=''
REACT_APP_YELP_API_SECRET=''
REACT_APP_MONGO_URI=''
```
* `npm install` to install all dependencies
* `npm run server` to start Node.js server locally
* `npm run start` to start React/Webpack server locally

## :heavy_check_mark: RESTful API
  
## Create a New Listing

### Request

`POST /item/`

http://localhost:3000/item/

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json

### Request

`GET /item/:id`

http://localhost:3000/item/:id

### Response
```  
[  
  {
      "category": "electronics",
      "sellerInfo": "1AOjnwnoc5bxD1u3VBiaNzKYL2k1",
      "location": "San Francisco, California",
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
```

### Request

`GET /user/profile/:id`

http://localhost:3000/item/:id

### Response
```  
[  
   {
        "id": "YYr7QsRYHRawcKrsnoICvhGbtok1",
        "email": "irving.sotocastillo@gmail.com",
        "authProvider": "google",
        "photo": "https://lh3.googleusercontent.com/a/AATXAJyH3URZvK3YldpTIpaP1fPJ7KNG0DwgfHrQvqe2=s96-c",
        "uid": "YYr7QsRYHRawcKrsnoICvhGbtok1",
        "name": "Irving Soto",
        "userItems": [
            {
                "id": "ors6TpflOS41kbED8JSR",
                "description": "This is a description",
                "category": "automotive",
                "name": "Self driving car",
                "sellerInfo": "YYr7QsRYHRawcKrsnoICvhGbtok1",
                "location": "California",
                "isActive": true,
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwjQ2VbM6DEt8vb5xqBAs2hn9D8EjyR9TyQ&usqp=CAU"
            }
        ]
    }
]
```

### Request

`PUT /ratings/transactionCount/:id`

http://localhost:3000/ratings/ratingCount/:id

### Response
```  
// If positive transaction:
{
  "message": "Increased transaction count by 1"
}
// If negative transaction:
{
  "message": "Decremented transaction count by 1"
}
```

### Request

`PUT /ratings/ratingCount/:id`

http://localhost:3000/ratings/ratingCount/:id

### Response
```  
{
  "message": "ratings adjusted for user",
  "userId": "sda31120fsjkl",
  "updatedInformation": {
    "ratingsCount": 5,
    "ratingsScore": 4.5,
    "trustScore": 2
  }
}
```
