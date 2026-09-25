import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../data/equipment.json');

async function readEquipment() {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function writeEquipment(equipment) {
  await fs.writeFile(
    filePath,
    JSON.stringify(equipment, null, 2)
  );
}

export async function findAll() {
  return readEquipment();
}

export async function findById(id) {
  const equipment = await readEquipment();

  return equipment.find((item) => item.id === id) || null;
}

export async function findBySerialNumber(serialNumber) {
  const equipment = await readEquipment();

  return (
    equipment.find(
      (item) => item.serialNumber === serialNumber
    ) || null
  );
}

export async function create(equipment) {
  const data = await readEquipment();

  data.push(equipment);

  await writeEquipment(data);

  return equipment;
}

export async function update(id, updates) {
  const data = await readEquipment();

  const index = data.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  data[index] = {
    ...data[index],
    ...updates
  };

  await writeEquipment(data);

  return data[index];
}

export async function remove(id) {
  const data = await readEquipment();

  const index = data.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  data.splice(index, 1);

  await writeEquipment(data);

  return true;
}