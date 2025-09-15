import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { connect } from 'mongoose';
import dotenv from 'dotenv';

// Routes
import chatRoutes from './routes/chat.js';
import sessionRoutes from './routes/session.js';
import healthRoutes from './routes/health.js';
import errorHandler from './middlewere/errorHandler.js';


// Setup dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// MongoDB connection
connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthchat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));



app.use('/api/chat', chatRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/health', healthRoutes);

// Error handler
app.use(errorHandler);

// 404 fallback (must be last middleware)
app.use(/.*/, (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
