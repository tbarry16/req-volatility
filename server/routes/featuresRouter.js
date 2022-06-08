
const express = require('express');
const db = require('../db');
const router = express.Router();
const featuresController = require('../controllers/featuresController')
const requirementsController = require('../controllers/requirementsController')

router.get('/', featuresController.getAllFeatures, (req,res,next) => {
    return next();
})

router.get('/:email', featuresController.getUserFeatures, (req, res, next) => {
    return next();
})

router.get('/:email/:feature', featuresController.subscribeUserToFeature, (req, res, next) => {
    return next();
})

router.post('/', featuresController.createNewFeature, requirementsController.addRequirementsToFeature, (req, res, next) => {
    return res.status(200).send('Feature created successfully!')
})

router.put('/', requirementsController.updateRequirements, requirementsController.addRequirementsToFeature, (req, res, next) => {
    return res.status(200).send('Feature updated successfully!')
})



module.exports = router;