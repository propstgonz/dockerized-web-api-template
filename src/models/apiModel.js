const pool = require('../config/database');
const schema = require('../config/schemaConfig');

const { tableName, primaryKey, columns } = schema;

// Ensure the primary key is always included in queries
const allColumns = columns.includes(primaryKey) 
  ? columns 
  : [primaryKey, ...columns];

// Helper to generate PostgreSQL placeholders ($1, $2, ...)
const getPlaceholders = (arr, start = 1) => arr.map((_, i) => `$${i + start}`).join(', ');

// Create a new item
const createItem = async (data) => {
  const vals = columns.map(col => data[col]);
  const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${getPlaceholders(columns)})`;
  return pool.query(query, vals);
};

// Get all items
const getItems = async () => {
  return (await pool.query(`SELECT ${allColumns.join(', ')} FROM ${tableName}`)).rows;
};

// Get an item by ID
const getItemById = async (id) => {
  const result = await pool.query(
    `SELECT ${allColumns.join(', ')} FROM ${tableName} WHERE ${primaryKey} = $1`,
    [id]
  );
  return result.rows[0] || null;
};

// Update an item by ID
const updateItemById = async (id, data) => {
  const setClauses = columns.map((col, i) => `${col} = COALESCE($${i + 1}, ${col})`).join(', ');
  const values = columns.map(col => data[col]);
  values.push(id);

  return pool.query(
    `UPDATE ${tableName} SET ${setClauses} WHERE ${primaryKey} = $${columns.length + 1}`,
    values
  );
};

// Delete an item by ID
const deleteItemById = async (id) => {
  return pool.query(`DELETE FROM ${tableName} WHERE ${primaryKey} = $1`, [id]);
};

module.exports = { createItem, getItems, getItemById, updateItemById, deleteItemById };
