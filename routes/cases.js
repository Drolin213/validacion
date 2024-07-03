var express = require('express');
var router = express.Router();

/* conexión a la base de datos */
var service = require("../models/cases");

/* consulta que vas a llamar controlar all */
const list = (req, res) => {
    service.list()
    .then((response) => res.json({ success: true, data: response }))
    .catch((e) => res.status(500).json({ success: false, error: e.message }));
};

/* consulta que vas a llamar controlar por id */
const single = (req, res) => {
    service.list({ id: req.params.id })
    .then((response) => {
        if (response) {
            res.json({ success: true, data: response });
        } else {
            res.status(404).json({ success: false, message: 'Case not found' });
        }
    })
    .catch((e) => res.status(500).json({ success: false, error: e.message }));
};

/* consulta que vas a llamar controlar por crear */
const createCase = (req, res) => {
    const { nombre, descripcion, aparicion } = req.body;
    const cases = { nombre, descripcion, aparicion };
    return service
    .create(cases)
    .then((response) => res.status(201).json({ success: true, data: response }))
    .catch((e) => res.status(500).json({ success: false, error: e.message }));
};

// para llamar la ruta     
router.get("/all", list);
router.get("/:id", single);
router.post("/create", createCase);

module.exports = router;
