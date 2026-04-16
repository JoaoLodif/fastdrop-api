// src/controllers/pedidosController.js
import { pedidos, getProximoId } from '../data/pedidos.js';

// ── Já implementado pelo professor ────────────────────────────────────────────
export const listarPedidos = (req, res) => {
  res.status(200).json(pedidos);
};

export const criarPedido = (req, res) => {
  const { cliente, restaurante, item, total } = req.body;
  if (!cliente || !restaurante || !item) {
    return res.status(400).json({ erro: 'Os campos cliente, restaurante e item são obrigatórios.' });
  }
  const novoPedido = { id: getProximoId(), cliente, restaurante, item, status: 'pendente', total: total ?? null };
  pedidos.push(novoPedido);
  res.status(201).json(novoPedido);
};

export const excluirPedido = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ erro: 'O parâmetro id deve ser um número inteiro.' });
  const index = pedidos.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ erro: `Pedido com id ${id} não encontrado.` });
  pedidos.splice(index, 1);
  res.status(204).send();
};

// ── QUESTÃO 7: implemente buscarPedidoPorId ───────────────────────────────────
export const buscarPedidoPorId = (req, res) => {
  // TODO
};

// ── QUESTÃO 9: implemente atualizarStatus ────────────────────────────────────
export const atualizarStatus = (req, res) => {
  // TODO
};
