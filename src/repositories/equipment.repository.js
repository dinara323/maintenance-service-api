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

  return equipment.find((item) => item.id === id);
}

export async function findBySerialNumber(serialNumber) {
  const equipment = await readEquipment();

  return equipment.find(
    (item) => item.serialNumber === serialNumber
  );
}

export async function create(item) {
  const equipment = await readEquipment();

  equipment.push(item);

  await writeEquipment(equipment);

  return item;
}

export async function update(id, updates) {
  const equipment = await readEquipment();

  const index = equipment.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return null;
  }

  equipment[index] = {
    ...equipment[index],
    ...updates
  };

  await writeEquipment(equipment);

  return equipment[index];
}

export async function remove(id) {
  const equipment = await readEquipment();

  const index = equipment.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return false;
  }

  equipment.splice(index, 1);

  await writeEquipment(equipment);

  return true;
}