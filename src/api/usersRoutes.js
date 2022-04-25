const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const userRoutes = express.Router();

// ROUTES
userRoutes.get('/users', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    const resource = dbClient.db('memberships11').collection('users');
    const servicesArr = await resource.find().toArray();
    res.status(200).json(servicesArr);
  } catch (error) {
    console.error('error in get users', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

userRoutes.post('/users', async (req, res) => {
  try {
    // validation

    const newUserObj = req.body;
    newUserObj.service_id = new ObjectId(newUserObj.service_id);
    await dbClient.connect();

    const servicesColl = dbClient.db('memberships11').collection('users');
    const insertResult = await servicesColl.insertOne(newUserObj);
    if (insertResult.insertedId) {
      // jei siunciam tik status tai sendStatus()
      res.sendStatus(201);
      return;
    }
    throw new Error('insertResult.insertedId false');
  } catch (error) {
    console.error('error in posting a user', error);
    res.sendStatus(500);
  } finally {
    await dbClient.close();
  }
});

module.exports = userRoutes;
