const mongodb = require('../db/connect');
const path = require('path');
const ObjectId = require('mongodb').ObjectId;

const baseController = {}

// baseController.index = (req, res) => {
//   res.sendFile(path.join(__dirname, '../views', 'index.html'));
// };

baseController.index = (req, res) => {
  res.send("Hello World");
};

baseController.getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

baseController.getSingle = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
  result.toArray().then((contact) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact[0]);
  });
};

baseController.addContact = async (req, res, next) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (result.acknowledged > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

baseController.updateContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: contactId }, contact);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

baseController.deleteContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

module.exports = baseController;