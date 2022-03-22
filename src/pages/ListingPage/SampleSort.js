import distance from '@turf/distance';

const userLocation = [37.791200, -122.396080];

const sampleSort = () => {
  let sampleData = [
    {
      "city": "Honolulu",
      "id": "5usff6HI0mIB2TTRy2Ut",
      "category": "electronics",
      "name": "iPhone 200",
      "description": "This is a description",
      "sellerInfo": "1AOjnwnoc5bxD1u3VBiaNzKYL2k1",
      "location": [21.3069, -157.8583],
      "image": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwjQ2VbM6DEt8vb5xqBAs2hn9D8EjyR9TyQ&usqp=CAU",
        "https://hips.hearstapps.com/countryliving.cdnds.net/17/47/2048x1365/gallery-1511194376-cavachon-puppy-christmas.jpg?resize=980:*",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwjQ2VbM6DEt8vb5xqBAs2hn9D8EjyR9TyQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd5TmpZHza8z0hXNozb355FtnMQHLsmVJYvA&usqp=CAU"
      ],
      "trustScore": 1,
      "sellerName": "Austin"
    },
    {
      "city": "Chicago",
      "id": "Cv2qrkWewsTABab19sAL",
      "description": "Apple made",
      "category": "electronics",
      "location": [41.8781, -87.6298],
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwjQ2VbM6DEt8vb5xqBAs2hn9D8EjyR9TyQ&usqp=CAU",
      "sellerInfo": "1AOjnwnoc5bxD1u3VBiaNzKYL2k1",
      "name": "iPhone 200",
      "trustScore": 1,
      "sellerName": "Austin"
    },
    {
      "city": "Los Angeles",
      "id": "buk9qQ26j5VtXW1daRQv",
      "name": "iPhone 201",
      "location": [34.0522, -118.2437],
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwjQ2VbM6DEt8vb5xqBAs2hn9D8EjyR9TyQ&usqp=CAU",
      "description": "This is a description",
      "category": "electronics",
      "sellerInfo": "1AOjnwnoc5bxD1u3VBiaNzKYL2k1",
      "trustScore": 1,
      "sellerName": "Austin"
    },
    {
      "city": "Tokyo",
      "id": "nr0xzxlTcyKaXt0BHPTD",
      "category": "electronics",
      "location": [35.6762, 139.6503],
      "description": "This is a description",
      "name": "iPhone 200",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwjQ2VbM6DEt8vb5xqBAs2hn9D8EjyR9TyQ&usqp=CAU",
      "sellerInfo": "1AOjnwnoc5bxD1u3VBiaNzKYL2k1",
      "trustScore": 1,
      "sellerName": "Austin"
    },
    {
      "city": "South Africa",
      "id": "ors6TpflOS41kbED8JSR",
      "description": "This is a description",
      "location": [-30.5595, 22.9375],
      "category": "automotive",
      "sellerInfo": "YYr7QsRYHRawcKrsnoICvhGbtok1",
      "isActive": true,
      "name": "Self driving car",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwjQ2VbM6DEt8vb5xqBAs2hn9D8EjyR9TyQ&usqp=CAU",
      "trustScore": 1,
      "sellerName": "Irving Soto"
    },
    {
      "city": "London",
      "id": "rJ72Ymq7bXu7bWNPBBHG",
      "itemId": "rJ72Ymq7bXu7bWNPBBHG",
      "location": [51.5072, 0.1276],
      "description": "This is a description",
      "category": "automotive",
      "isActive": false,
      "sellerInfo": "YYr7QsRYHRawcKrsnoICvhGbtok1",
      "name": "Pressure cooker",
      "image": "www.google.com",
      "trustScore": 1,
      "sellerName": "Irving Soto"
    }
  ];

  sampleData.sort((a,b) => {
    const distanceA = distance(userLocation, a.location, {units: 'miles'})
    const distanceB = distance(userLocation, b.location, {units: 'miles'})
    return distanceA - distanceB
  });
};
