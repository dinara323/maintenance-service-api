import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/equipment.json');
async function readEquipment() {
  const data = await fs.readFile(filePath, 'utf-8');

  return JSON.parse(data);
}

export async function findAll() {
  return readEquipment();
}