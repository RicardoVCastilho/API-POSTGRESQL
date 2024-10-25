const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/all-data', dataController.getAllData);
router.get('/all-people-data', dataController.getAllPeopleData);
router.get('/all-person-registers', dataController.getAllPersonRegister);
router.get('/all-pets', dataController.getAllPets);
router.get('/all-patients', dataController.getAllPatients);
router.get('/all-cages', dataController.getAllCages);
router.get('/all-treatments', dataController.getAllTreatments);
router.get('/all-medications', dataController.getAllMedications);
router.get('/all-patients-daily-charts', dataController.getAllPatientDailyCharts);

module.exports = router;