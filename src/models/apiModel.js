const pool = require('../config/database');
const schema = require('../config/schemaConfig');

const { tableName, primaryKey, columns } = schema;

// Aseguramos que la PK siempre esté incluida en las consultas
const allColumns = columns.includes(primaryKey) 
  ? columns 
  : [primaryKey, ...columns];

const getPlaceholders = (arr, start = 1) => arr.map((_, i) => `$${i + start}`).join(', ');

// Crear un nuevo item
const createItem = async (data) => {
  const vals = columns.map(col => data[col]);
  const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${getPlaceholders(columns)})`;
  return pool.query(query, vals);
};

// Obtener todos los items (incluye siempre la PK)
const getItems = async () => {
  return (await pool.query(`SELECT ${allColumns.join(', ')} FROM ${tableName}`)).rows;
};

// Obtener item por ID
const getItemById = async (id) => {
  const result = await pool.query(
    `SELECT ${allColumns.join(', ')} FROM ${tableName} WHERE ${primaryKey} = $1`,
    [id]
  );
  return result.rows[0] || null;
};

// Actualizar item por ID
const updateItemById = async (id, data) => {
  const setClauses = columns.map((col, i) => `${col} = COALESCE($${i + 1}, ${col})`).join(', ');
  const values = columns.map(col => data[col]);
  values.push(id);

  return pool.query(
    `UPDATE ${tableName} SET ${setClauses} WHERE ${primaryKey} = $${columns.length + 1}`,
    values
  );
};

// Eliminar item por ID
const deleteItemById = async (id) => {
  return pool.query(`DELETE FROM ${tableName} WHERE ${primaryKey} = $1`, [id]);
};

module.exports = { createItem, getItems, getItemById, updateItemById, deleteItemById };
