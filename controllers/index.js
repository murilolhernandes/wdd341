const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const baseController = {}

baseController.getAll = async (req, res, next) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  }).catch((err) => {
    res.status(400).json({ message: err });
  });
};

baseController.getSingle = async (req, res, next) => {
  //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
  result.toArray().then((contact) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact[0]);
  }).catch((err) => {
    res.status(400).json({ message: err });
  });
};

baseController.addContact = async (req, res, next) => {
  //#swagger.tags=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (result.acknowledged > 0) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }
};

baseController.updateContact = async (req, res, next) => {
  //#swagger.tags=['Contacts']
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
    res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  }
};

baseController.deleteContact = async (req, res, next) => {
  //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = baseController;