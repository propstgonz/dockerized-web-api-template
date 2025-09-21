/**
 * schemaConfig.js
 * Loads table and column configuration from environment variables
 */

require('dotenv').config();

const tableName = process.env.TABLE_NAME;
const primaryKey = process.env.PRIMARY_KEY;
const columns = process.env.COLUMNS ? process.env.COLUMNS.split(',') : [];

if (!tableName || !primaryKey || columns.length === 0) {
  throw new Error('Please set TABLE_NAME, PRIMARY_KEY, and COLUMNS in your .env file.');
}

module.exports = { tableName, primaryKey, columns };
