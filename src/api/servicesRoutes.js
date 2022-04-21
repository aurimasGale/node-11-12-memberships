const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const servicesRoutes = express.Router();

servicesRoutes.get('/services', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connected');
    const resource = dbClient.db('memberships11').collection('services');
    const servicesArr = await resource.find().toArray();
    res.status(200).json(servicesArr);
  } catch (error) {
    console.error('error in get services', error);
    res.status(500).json('something is wrong with getting services');
  } finally {
    await dbClient.close();
  }
});

servicesRoutes.post('/services', async (req, res) => {
  try {
    await dbClient.connect();
    console.log('connected');
    console.log(req.body);

    const newService = req.body;

    const servicesColl = dbClient.db('memberships11').collection('services');
    const insertResult = await servicesColl.insertOne(newService);
    res.status(201).json(insertResult);
  } catch (error) {
    console.error('error in creating a service', error);
    res.status(500).json('something is wrong');
  } finally {
    await dbClient.close();
  }
});

servicesRoutes.delete('/services/:delServiceId', async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const { delServiceId } = req.params;
  console.log(delServiceId);
  try {
    await dbClient.connect();
    console.log('connected');

    const collection = dbClient.db('memberships11').collection('services');
    const deleteResult = await collection.deleteOne({ _id: ObjectId(delServiceId) });
    console.log('foundBook ===', deleteResult);
    res.status(200).json(deleteResult);
  } catch (error) {
    console.error('error in deleting specific book', error);
    res.status(500).json('something is wrong');
  } finally {
    await dbClient.close();
  }
});

module.exports = servicesRoutes;
