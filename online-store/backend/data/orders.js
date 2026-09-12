/**
 * In-memory orders store.
 * Orders are pushed here at runtime via POST /api/orders.
 * Data resets on every server restart (in-memory only).
 */

const orders = [];

module.exports = orders;
