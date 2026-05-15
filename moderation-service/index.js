const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const moderationRoutes = require('./src/routes/moderation.routes');
const authRoutes = require('./src/routes/auth.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/moderations', moderationRoutes);

// Swagger
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    service: 'moderation-service',
    status: 'running',
    swagger: `http://localhost:${PORT}/swagger-ui`
  });
});

app.listen(PORT, () => {
  console.log(`moderation-service démarré sur http://localhost:${PORT}`);
  console.log(`Swagger UI : http://localhost:${PORT}/swagger-ui`);
});