// src/data/pedidos.js
// QUESTÃO 4 / QUESTÃO 5a: O array deve ser inicializado com 3 pedidos.
// Use a sintaxe correta para ESM ("type": "module").

export let pedidos = [
    { id: 1, cliente: 'Ana Lima', restaurante: 'Hamburgão Express', item: 'X-Bacon', status: 'pendente', total: 42.90 },
    { id: 2, cliente: 'Bruno Silva', restaurante: 'Sushi do Bairro', item: 'Combo Salmão', status: 'em_preparo', total: 78.00 },
    { id: 3, cliente: 'Carla Mota', restaurante: 'Hamburgão Express', item: 'Batata Suprema', status: 'entregue', total: 19.50 }
];  // ← modifique esta linha

let proximoId = 4;
export const getProximoId = () => proximoId++;
