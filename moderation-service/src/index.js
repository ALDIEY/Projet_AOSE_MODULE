const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const moderationRoutes = require('./routes/moderation.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
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