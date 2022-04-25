const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const servicesRoutes = express.Router();

servicesRoutes.get('/services', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connected');
    const resource = dbClient.db('memberships11').collection('services');
    // aggreguot su useriais
    const agg = [
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'service_id',
          as: 'userArr',
        },
      },
    ];
    const allArr = await resource.aggregate(agg).toArray();
    const servicesWithUserCount = allArr.map((sObj) => {
      const rez = {
        ...sObj,
        userCount: sObj.userArr.length,
      };
      delete rez.userArr;
      return rez;
    });
    res.json(servicesWithUserCount);
  } catch (error) {
    console.error('error in get services', error);
    res.status(500).json('something is wrong with getting services');
  } finally {
    await dbClient.close();
  }
});

servicesRoutes.post('/services', async (req, res) => {
  try {
    // validation
    await dbClient.connect();

    const newService = req.body;

    const servicesColl = dbClient.db('memberships11').collection('services');
    const insertResult = await servicesColl.insertOne(newService);
    if (insertResult.insertedId) {
      // jei siunciam tik status tai sendStatus()
      res.sendStatus(201);
      return;
    }
    throw new Error('insertResult.insertedId false');
  } catch (error) {
    console.error('error in get in users', error);
    res.sendStatus(500);
  } finally {
    await dbClient.close();
  }
});

servicesRoutes.delete('/services/:serId', async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  // pasitikrinti ar service turi useriu.
  // jei turi, netrinam ir apie tai pranesam
  try {
    const stringId = req.params.serId;
    const mongoObjId = new ObjectId(stringId);
    await dbClient.connect();

    const collection = dbClient.db('memberships11').collection('services');
    const deleteResult = await collection.deleteOne({ _id: mongoObjId });
    console.log('deleteResult ===', deleteResult);
    if (deleteResult.deletedCount === 1) {
      res.json({ succes: true });
      return;
    }
    if (deleteResult.deletedCount === 0) {
      res.status(400).json({ err: 'nothing was deleted' });
      return;
    }
    throw 'something is wrong';
  } catch (error) {
    console.error('error in deleting a service', error);
    res.status(500).json('something is wrong');
  } finally {
    await dbClient.close();
  }
});

module.exports = servicesRoutes;
