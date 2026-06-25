import 'dotenv/config';

import { pool } from '../helper.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execMigrations = async () => {
  const client = await pool.connect();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  try {
    const filePath = path.join(__dirname, './01-init.sql');
    const script = fs.readFileSync(filePath, 'utf-8');

    await client.query(script);

    console.log('Migrations executada com sucesso!');
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};

execMigrations();
