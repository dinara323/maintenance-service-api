import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../data/requests.json');

async function readRequests() {
  const data = await fs.readFile(filePath, 'utf-8');

  return JSON.parse(data);
}

async function writeRequests(requests) {
  await fs.writeFile(
    filePath,
    JSON.stringify(requests, null, 2)
  );
}

export async function findAll() {
  return readRequests();
}

export async function findById(id) {
  const requests = await readRequests();

  return requests.find((item) => item.id === id);
}

export async function findByEquipmentId(equipmentId) {
  const requests = await readRequests();

  return requests.filter(
    (item) => item.equipmentId === equipmentId
  );
}

export async function create(request) {
  const requests = await readRequests();

  requests.push(request);

  await writeRequests(requests);

  return request;
}

export async function update(id, updates) {
  const requests = await readRequests();

  const index = requests.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return null;
  }

  requests[index] = {
    ...requests[index],
    ...updates
  };

  await writeRequests(requests);

  return requests[index];
}

export async function remove(id) {
  const requests = await readRequests();

  const index = requests.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return false;
  }

  requests.splice(index, 1);

  await writeRequests(requests);

  return true;
}