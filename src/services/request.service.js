import { v4 as uuidv4 } from 'uuid';

import * as requestRepository
from '../repositories/request.repository.js';

import * as equipmentRepository
from '../repositories/request.repository.js';

const statusTransitions = {
  new:[
    'in_progress',
    'rejected'
  ],

  in_progress:[
    'done',
    'rejected'
  ],
  done:[],
  rejected:[]
};
export async function getRequests(filters={}) {
  let requests =
    await requestRepository.findAll();
  if(filters.status){
    requests =
      requests.filter(
        request =>
        request.status === filters.status
      );
  }
  if(filters.priority){
    requests =
      requests.filter(
        request =>
        request.priority === filters.priority
      );
  }
  if(filters.equipmentId){
    requests =
      requests.filter(
        request =>
        request.equipmentId === filters.equipmentId
      );
  }
  return requests;
}
export async function getRequestById(id){
  return requestRepository.findById(id);
}
export async function getEquipmentRequests(equipmentId){
  return requestRepository.findByEquipmentId(
    equipmentId
  );

}

export async function createRequest(data){
  const equipment =
    await equipmentRepository.findById(
      data.equipmentId
    );
  if(!equipment){
    const error =
      new Error(
        'Equipment not found'
      );
    error.code =
      'EQUIPMENT_NOT_FOUND';
    throw error;
  }

  const request={
    id:uuidv4(),
    equipmentId:data.equipmentId,
    title:data.title,
    description:data.description || '',
    priority:data.priority,
    status:'new',
    plannedAt:data.plannedAt || null,
    createdAt:
      new Date().toISOString(),
    updatedAt:
      new Date().toISOString()
  };
  return requestRepository.create(request);
}
export async function updateRequest(id,data){
  const request =
    await requestRepository.findById(id);

  if(!request){
    return null;
  }
  const updates={};
  if(data.title !== undefined){
    updates.title=data.title;
  }

  if(data.description !== undefined){
    updates.description=data.description;
  }

  if(data.priority !== undefined){
    updates.priority=data.priority;

  }
  if(data.plannedAt !== undefined){
    updates.plannedAt=data.plannedAt;
  }
  updates.updatedAt =
    new Date().toISOString();

  return requestRepository.update(
    id,
    updates
  );
}

export async function changeStatus(id,newStatus){
  const request =
    await requestRepository.findById(id);
  if(!request){
    return null;
  }
  const allowed =
    statusTransitions[
      request.status
    ];

  if(!allowed.includes(newStatus)){


    const error =
      new Error(
        'Status transition is forbidden'
      );
    error.code =
      'INVALID_STATUS_TRANSITION';
    throw error;
  }

  return requestRepository.update(
    id,
    {
      status:newStatus,
      updatedAt:
        new Date().toISOString()

    }
  );

}

export async function deleteRequest(id){
  return requestRepository.remove(id);
}