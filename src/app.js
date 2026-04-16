// src/app.js
import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pedidosRouter from './routes/pedidos.js';
import { uptime } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: { title: 'FastDrop API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000/api/v1' }],
  },
  apis: [join(__dirname, 'routes', '*.js')],
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);

const app  = express();
const PORT = 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/pedidos', pedidosRouter);

// QUESTÃO 6b: implemente o endpoint GET /health aqui
export const healthCheck = (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    versao: '1.0.0'
  });
}
app.get('/health', healthCheck);

app.listen(PORT, () => {
  console.log(`🚀 FastDrop API rodando em http://localhost:${PORT}`);
  console.log(`📄 Swagger UI em http://localhost:${PORT}/api-docs`);
});
