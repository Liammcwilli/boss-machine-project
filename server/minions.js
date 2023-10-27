const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

// param function that helps reduce duplicate code for finding minion ID
minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next()
  } else {
    res.status(404).send();
  }
})

// gets all the minions from the database
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
  });

  // creates a new minion and adds it to the database then sends 201 code to alert you a new minion has been created
minionsRouter.post('/', (req, res, next) => { 
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// get a specific minion by Id
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion)

});

// update a minions information
minionsRouter.put('/:minionId', (req, res, next) => {
  let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinionInstance);
})

// delete a minion using an Id
minionsRouter.delete('/:minionId', (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deletedMinion) {
    res.status(204)
  } else {
    res.status(500)
  }
  res.send()
})