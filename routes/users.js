const express = require('express');
const router = express.Router();
const { connectDB, addPurchase } = require('../database');
const { ObjectId } = require('mongodb');

// POST /signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
      const db = await connectDB();
      const usersCollection = db.collection('users');

      // Check if the user already exists
      const existingUser = await usersCollection.findOne({ $or: [{ name }, { email }] });
      if (existingUser) {
          return res.status(400).json({ message: 'User account already exists!' });
      }

      // Insert the new user with plain-text password
      const result = await usersCollection.insertOne({ name, email, password });
      
      res.json({ message: 'Sign-up successful!', userId: result.insertedId });
  } catch (error) {
      console.error('Error during sign-up:', error);
      res.status(500).json({ message: 'Failed to sign up user', error });
  }
});

// POST /login
router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const db = await connectDB();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ name });

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        if (user.password === password) {
            res.json({ success: true, message: 'Login successful!', userId: user._id });
        } else {
            res.status(401).json({ success: false, message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'An error occurred during login', error });
    }
});


// POST /purchase to save a purchased book
router.post('/purchase', async (req, res) => {
    const { userId, bookId, purchasePrice, bookTitle, bookImageUrl } = req.body;
    console.log('Received data for purchase:', { userId, bookId, purchasePrice, bookTitle, bookImageUrl });

    // Validate fields
    if (!userId || !bookId || !purchasePrice || !bookTitle || !bookImageUrl) {
        return res.status(400).json({ message: 'Missing required data.' });
    }

    try {
        const result = await addPurchase(userId, bookId, purchasePrice, bookTitle, bookImageUrl);
        console.log('Purchase result:', result); // Log successful insertion result
        res.status(200).json({ message: 'Purchase saved successfully', purchaseId: result.insertedId });
    } catch (error) {
        console.error('Error saving purchase in route:', error);
        res.status(500).json({ message: 'Failed to save purchase', error: error.toString() });
    }
});



// GET /:userId/purchases to retrieve purchased books for a user
router.get('/:userId/purchases', async (req, res) => {
    const userId = req.params.userId;

    // Validate userId as a valid ObjectId
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    try {
        const db = await connectDB();
        const purchasesCollection = db.collection('purchases');
        
        // Use new ObjectId(userId) to correctly instantiate ObjectId
        const purchases = await purchasesCollection.find({ userId: new ObjectId(userId) }).toArray();
        
        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error retrieving purchases:', error);
        res.status(500).json({ message: 'Failed to retrieve purchases', error });
    }
});


module.exports = router;
