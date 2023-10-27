const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

// importing function
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// to reduce duplicate code by using one function for all ideaId clauses
ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next()
    } else {
        res.status(404).send()
    }
});

// get all ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
  });

// post new idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    // 201 code meaning a new element has been created
    res.status(201).send(newIdea)
});

// get idea by Id
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

// update an idea by Id
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body)
    res.send(updatedIdea)
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedIdea) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send()
})