import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('School ERP Node.js Backend API');
});

// Gemini AI integration route
app.post('/api/explain-topic', async (req, res) => {
  try {
    const { topic, language } = req.body;
    
    // Here you would integrate with Gemini API
    // This is a placeholder response
    const explanation = `This is an explanation of ${topic} in ${language}`;
    
    res.json({ explanation });
  } catch (error) {
    console.error('Error explaining topic:', error);
    res.status(500).json({ error: 'Failed to generate explanation' });
  }
});

// Socket.io for real-time features
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });
  
  socket.on('send-message', (message, roomId) => {
    socket.to(roomId).emit('receive-message', message);
  });
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});