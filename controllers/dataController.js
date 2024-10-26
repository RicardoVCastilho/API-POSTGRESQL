const pool = require("../db/connection");

const getAllData = async (req, res) => {
    try {
        const peopleResult = await pool.query('SELECT * FROM person_register;');
        const addressResult = await pool.query('SELECT * FROM address;');
        const contactResult = await pool.query('SELECT * FROM contact;');
        const roleResult = await pool.query('SELECT * FROM role;');
        const petResult = await pool.query('SELECT * FROM pet;');
        const patientResult = await pool.query('SELECT * FROM patient;');
        const cageResult = await pool.query('SELECT * FROM cage;');
        const treatmentResult = await pool.query('SELECT * FROM treatment;');
        const medicationResult = await pool.query('SELECT * FROM medication;');
        const patientsDailyChartResult = await pool.query('SELECT * FROM patients_daily_chart;');

        res.json({
            people: peopleResult.rows,
            address: addressResult.rows,
            contact: contactResult.rows,
            role: roleResult.rows,
            pet: petResult.rows,
            patient: patientResult.rows,
            cage: cageResult.rows,
            treatment: treatmentResult.rows,
            medication: medicationResult.rows,
            patientsDailyChart: patientsDailyChartResult.rows,
        });
    } catch (error) {
        console.error('Erro ao executar as consultas', error);
        res.status(500).json({error: 'Erro ao buscar os dados'});
    }
};

const getAllPeopleData = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                pr.id AS person_id,
                pr.name,
                pr.cpf,
                a.address_street,
                a.address_number,
                a.city,
                a.postal_code,
                c.phone_number,
                c.email,
                r.role_type,
                r.crmv
            FROM 
                person_register pr
            LEFT JOIN 
                address a ON pr.id = a.person_register_id
            LEFT JOIN 
                contact c ON pr.id = c.person_register_id
            LEFT JOIN 
                role r ON pr.id = r.person_register_id;`);
                res.json(result.rows);
    }catch (err) {
        console.error(err);
        res.status(500).send("Erro ao consultar as pessoas registradas")
    }
};

const getAllPersonRegister = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM person_register");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao consultar os registros");
    }
};

const getAllPets = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM pet");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao consultar os pets");
    }
};

// CRUD dos Pacientes

const createPatients = async (req, res) => {
    const { admission, at_arrival_patient_status, injuries, medicated_at_arrival, contagious, pet_id, role_id } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO patient (admission, at_arrival_patient_status, injuries, medicated_at_arrival, contagious, pet_id, role_id) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING *`,
            [admission, at_arrival_patient_status, injuries, medicated_at_arrival, contagious, pet_id, role_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao criar o paciente");
    }
};

const getAllPatients = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM patient");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao consultar os pacientes");
    }
};

const updatePatients = async (req, res) => {
    const { id } = req.params;
    const { admission, at_arrival_patient_status, injuries, medicated_at_arrival, contagious, pet_id, role_id } = req.body;

    try {
        const result = await pool.query(
            `UPDATE patient 
             SET admission = $1, 
                 at_arrival_patient_status = $2, 
                 injuries = $3, 
                 medicated_at_arrival = $4, 
                 contagious = $5, 
                 pet_id = $6, 
                 role_id = $7 
             WHERE id = $8 
             RETURNING *`,
            [admission, at_arrival_patient_status, injuries, medicated_at_arrival, contagious, pet_id, role_id, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).send("Paciente não encontrado");
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao atualizar o paciente");
    }
};


const deletePatients = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM patient WHERE id= $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).send("Paciente não encontrado");
        }

        res.status(204).send();
    } catch(err) {
        console.error(err);
        res.status(500).send("Erro ao deletar o paciente");
    }
};
// Fim do CRUD dos Pacientes

const getAllCages = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM cage");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao consultar as gaiolas");
    }
};

const getAllTreatments = async (req,res) => {
    try {
        const result = await pool.query("SELECT * FROM treatment");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao consultar os tratamentos");
    }
};

const getAllMedications = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM medication");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao consultar as medicações");
    }
};

const getAllPatientDailyCharts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM patients_daily_chart");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao consultar o quadro diário dos pacientes")
    }
};

module.exports = {
    getAllData,
    getAllPeopleData,
    getAllPersonRegister,
    getAllPets,
    createPatients,
    getAllPatients,
    updatePatients,
    deletePatients,
    getAllCages,
    getAllTreatments,
    getAllMedications,
    getAllPatientDailyCharts
};