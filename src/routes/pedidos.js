// src/routes/pedidos.js
import { Router } from 'express';
import { listarPedidos, buscarPedidoPorId, criarPedido, atualizarStatus, excluirPedido }
  from '../controllers/pedidosController.js';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       required: [id, cliente, restaurante, item, status]
 *       properties:
 *         id:          { type: integer, example: 1 }
 *         cliente:     { type: string,  example: Ana Lima }
 *         restaurante: { type: string,  example: Hamburgão Express }
 *         item:        { type: string,  example: X-Bacon Duplo }
 *         status:
 *           type: string
 *           enum: [pendente, em_preparo, entregue]
 *           example: pendente
 *         total:       { type: number, nullable: true, example: 42.90 }
 *     Erro:
 *       type: object
 *       required: [erro]
 *       properties:
 *         erro: { type: string, example: Mensagem de erro. }
 *     StatusInput:
 *       type: object
 *       required: [status]
 *       properties:
 *         status:
 *           type: string
 *           enum: [pendente, em_preparo, entregue]
 *           example: em_preparo
 */

/**
 * @openapi
 * /pedidos:
 *   get:
 *     summary: Listar todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       "200":
 *         description: Lista de pedidos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Pedido"
 */
router.get('/', listarPedidos);

/**
 * @openapi
 * /pedidos/{id}:
 *   get:
 *     summary: Buscar pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 1 }
 *     responses:
 *       "200":
 *         description: Pedido encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Pedido"
 *       "400":
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Erro"
 *       "404":
 *         description: Pedido não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Erro"
 */
router.get('/:id', buscarPedidoPorId);

/**
 * @openapi
 * /pedidos:
 *   post:
 *     summary: Criar novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               # QUESTÃO 8: complete aqui com os campos obrigatórios
 *             properties:
 *               cliente:     { type: string, example: Ana Lima }
 *               restaurante: { type: string, example: Hamburgão Express }
 *               item:        { type: string, example: X-Bacon Duplo }
 *               total:       { type: number, example: 42.90 }
 *     responses:
 *       "201":
 *         description: Pedido criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               # QUESTÃO 8: complete aqui com $ref correto
 *       # QUESTÃO 8: adicione aqui a resposta de erro adequada
 */
router.post('/', criarPedido);

/**
 * @openapi
 * /pedidos/{id}/status:
 *   patch:
 *     summary: Atualizar status do pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 1 }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Status atualizado com sucesso.
 *       # QUESTÃO 8 / complemento: adicione as respostas de erro 400, 404 e 422
 */
router.patch('/:id/status', atualizarStatus);

/**
 * @openapi
 * /pedidos/{id}:
 *   delete:
 *     summary: Excluir pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer, example: 1 }
 *     responses:
 *       "204":
 *         description: Pedido excluído com sucesso.
 *       "400":
 *         description: ID inválido.
 *       "404":
 *         description: Pedido não encontrado.
 */
router.delete('/:id', excluirPedido);

export default router;
