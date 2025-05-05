const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

// Connect to the database (singleton pattern)
const connectDB = async () => {
  if (!db) {
    try {
      await client.connect();
      db = client.db('accountsdatabase');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }
  return db;
};

// Add a purchase to the database
const addPurchase = async (userId, bookId, purchasePrice, bookTitle, bookImageUrl) => {
  if (!ObjectId.isValid(userId)) throw new Error(`Invalid userId: ${userId}`);

  try {
    const db = await connectDB();
    const result = await db.collection('purchases').insertOne({
      userId: new ObjectId(userId),
      bookId,
      purchasePrice,
      purchasedAt: new Date(),
      bookTitle,
      bookImageUrl,
    });
    return result;
  } catch (error) {
    console.error('Error adding purchase:', error);
    throw error;
  }
};

module.exports = { connectDB, addPurchase };
