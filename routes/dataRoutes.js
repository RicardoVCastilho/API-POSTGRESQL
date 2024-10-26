const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/all-data', dataController.getAllData);
router.get('/all-people-data', dataController.getAllPeopleData);
router.get('/all-person-registers', dataController.getAllPersonRegister);
router.get('/all-pets', dataController.getAllPets);
router.post('/patients', dataController.createPatients);
router.get('/all-patients', dataController.getAllPatients);
router.put('/patients/:id', dataController.updatePatients);
router.delete('/patients/:id', dataController.deletePatients);
router.get('/all-cages', dataController.getAllCages);
router.get('/all-treatments', dataController.getAllTreatments);
router.get('/all-medications', dataController.getAllMedications);
router.get('/all-patients-daily-charts', dataController.getAllPatientDailyCharts);

module.exports = router;