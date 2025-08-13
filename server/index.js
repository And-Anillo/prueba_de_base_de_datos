import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './conexion_db.js';
import { loadCustomers, loadPlataforms, loadInvoices, loadTransactions } from './seeders/load_file.js';

const app = express();
const PORT = 3000;

// Configuración para __dirname en ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});


/* -------------------
   Endpoint: Cargar datos desde CSV
------------------- */
app.get('/load-data', async (req, res) => {
    try {
        await loadCustomers();
        await loadPlataforms();
        await loadInvoices();
        await loadTransactions();
        res.send('✅ Datos cargados correctamente.');
    } catch (err) {
        res.status(500).send(`❌ Error cargando datos: ${err.message}`);
    }
});

/* -------------------
   CRUD Transactions
------------------- */

// Obtener todas
app.get('/transactions', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM transactions');
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Obtener por ID
app.get('/transactions/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM transactions WHERE transaction_id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).send('No encontrada');
        res.json(rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Crear
app.post('/transactions', async (req, res) => {
    const { transaction_code, transaction_date, amount, status, transaction_type, platform_id, invoice_id } = req.body;
    try {
        await pool.query(
            'INSERT INTO transactions (transaction_code, transaction_date, amount, status, transaction_type, platform_id, invoice_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [transaction_code, transaction_date, amount, status, transaction_type, platform_id, invoice_id]
        );
        res.status(201).send('✅ Transacción creada');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Actualizar
app.put('/transactions/:id', async (req, res) => {
    const { transaction_code, transaction_date, amount, status, transaction_type, platform_id, invoice_id } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE transactions SET transaction_code=?, transaction_date=?, amount=?, status=?, transaction_type=?, platform_id=?, invoice_id=? WHERE transaction_id=?',
            [transaction_code, transaction_date, amount, status, transaction_type, platform_id, invoice_id, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).send('No encontrada');
        res.send('✅ Transacción actualizada');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Eliminar
app.delete('/transactions/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM transactions WHERE transaction_id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).send('No encontrada');
        res.send('✅ Transacción eliminada');
    } catch (err) {
        res.status(500).send(err.message);
    }
});


/* -------------------
   Servidor
------------------- */
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});