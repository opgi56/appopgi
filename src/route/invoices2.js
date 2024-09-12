import { Router } from 'express';
import pool from '../db.js'; // Assuming your MySQL pool setup is in db.js

const router = Router();

router.post('/', async (req, res) => {
  const { formattedItems } = req.body;

  console.log('Incoming data for invoices19:', req.body); // Debugging log

  if (!formattedItems || !Array.isArray(formattedItems) || formattedItems.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing formattedItems array' });
  }

  const invoice = formattedItems[0];
  const {
    Invoicenumber19, clientName19, clientPhone19, clientStreet19, clientCity19,
    clientstatus19, clientCountry19, selectDeliveryDate19, selectDeliveryDatefrom19,
    selectDeliveryDateto19, paymentTerms19, description19, items
  } = invoice;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing items array' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    for (const item of items) {
      await connection.query(
        `INSERT INTO invoices19 (Invoicenumber19, clientName19, clientPhone19, clientStreet19, clientCity19, clientstatus19, clientCountry19, selectDeliveryDate19, selectDeliveryDatefrom19, selectDeliveryDateto19, paymentTerms19, description19, total19, stampmoney19, TVA19, FinalP19, itemName19, months19, Delay19, price19)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [Invoicenumber19, clientName19, clientPhone19, clientStreet19, clientCity19, clientstatus19, clientCountry19, selectDeliveryDate19, selectDeliveryDatefrom19, selectDeliveryDateto19, paymentTerms19, description19, item.total19, item.stampmoney19, item.TVA19, item.FinalP19, item.itemName19, item.months19, item.Delay19, item.price19]
      );
    }

    await connection.commit();
    res.json({ success: true, message: 'Invoice and items saved successfully' });
  } catch (err) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Error saving data:', err.message);
    res.status(500).send('Server Error');
  } finally {
    if (connection) {
      connection.release();
    }
  }
});
// Routes for invoices19
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM invoices19');
    res.json(rows);
  } catch (err) {
    console.error('Error retrieving data:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.get('/api/invoices19', (req, res) => {
  const sql = 'SELECT * FROM invoices19';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.post('/api/invoices19', (req, res) => {
  const sql = 'INSERT INTO invoices19 SET ?';
  const newInvoice = req.body;
  db.query(sql, newInvoice, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: result.insertId, ...newInvoice });
  });
});

app.delete('/api/invoices19/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM invoices19 WHERE Id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Invoice deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default router;
