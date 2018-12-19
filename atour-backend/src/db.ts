import { MongoClient } from "mongodb";
import { Tour, User } from "./domain/types";

//TODO: create proper config file

// Connection URL
const url = "mongodb://db:27017";

// Database Name
const dbName = "atour";

// Create a new MongoClient
export async function initMongo() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const tour: Tour = {
      tourId: "123456",
      tourName: "tourName1",
      minimumSize: 5,
      maximumSize: 10,
      detail: "published",
      price: 5000,
      userId: "123456",
      isPublished: true,
      imageUrl:
        "https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547"
    };
    const tour2: Tour = {
      tourId: "1234567",
      tourName: "tourName2",
      minimumSize: 5,
      maximumSize: 10,
      detail: "unPublished",
      price: 5000,
      userId: "123456",
      isPublished: false,
      imageUrl:
        "https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547"
    };
    const tour3: Tour = {
      tourId: "12345678",
      tourName: "tourName3",
      minimumSize: 5,
      maximumSize: 10,
      detail: "Published",
      price: 5000,
      userId: "123456",
      isPublished: true,
      imageUrl:
        "https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547"
    };
    const user: User = {
      userId: "123456",
      firstName: "test",
      lastName: "test2",
      profileImageUrl:
        "https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547",
      publishedTour: [tour, tour2, tour3],
      gender: "Male",
      age: 21,
      facebookUrl: "https://www.facebook.com/K0tinus",
      instagramUrl: "https://www.instagram.com/kongnut_s/",
      phoneNumber: "0817776720",
      token: ""
    };
    await db.collection("userSaveTour").deleteMany({});
    await db.collection("user").deleteMany({});
    await db.collection("tour").deleteMany({});
    await db.collection("user").insertOne(user);
    await db.collection("tour").insertOne(tour);
    await db.collection("tour").insertOne(tour2);
    await db.collection("tour").insertOne(tour3);
    return {
      client,
      db
    };
  } catch (e) {
    console.log("Cannot connect to MongoDB. Will retry in 10 seconds ...");
    await new Promise(resolve => {
      setTimeout(() => resolve(), 10000);
    });
    console.log("Retrying...");
    return await initMongo();
  }
}
