import express from 'express';
import cors from 'cors';
import invoiceRoutes from './route/invoices.js'; // Correctly import invoices routes
import invoiceRoutes19 from './route/invoices19.js'; // Correctly import invoices19 routes
import dotenv from 'dotenv';
import authRoutes from './route/authRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));
app.use(express.json());

// Routes
app.use('/api/invoices', invoiceRoutes); // Mount invoices routes
app.use('/api/invoices19', invoiceRoutes19); // Mount invoices19 routes
app.use('/api', authRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
