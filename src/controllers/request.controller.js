import * as requestService
from '../services/request.service.js';

export async function getRequests(req,res){
  const requests =
    await requestService.getRequests(
      req.query
    );
  res.status(200).json({
    data:requests,
    total:requests.length
  });
}

export async function getRequestById(req,res){
  const request =
    await requestService.getRequestById(
      req.params.id
    );
  if(!request){
    return res.status(404).json({
      error:'Request not found'
    });
  }
  res.json({
    data:request
  });
}

export async function getEquipmentRequests(req,res){
 const requests =
   await requestService.getEquipmentRequests(
     req.params.id
   );

 res.json({
   data:requests
 });
}

export async function createRequest(req,res){
 try{

  const request =
    await requestService.createRequest(
      req.body
    );

  res
  .status(201)
  .location(
    `/api/requests/${request.id}`
  )
  .json({
    data:request
  });

 }
 catch(error){
  if(error.code === 'EQUIPMENT_NOT_FOUND'){
    return res.status(404).json({
      error:error.message
    });
  }
  throw error;
 }
}
export async function updateRequest(req,res){
 const request =
 await requestService.updateRequest(
   req.params.id,
   req.body
 );

 if(!request){
  return res.status(404).json({
    error:'Request not found'
  });
 }

 res.json({
  data:request
 });
}

export async function changeStatus(req,res){
 try{

 const request =
 await requestService.changeStatus(
   req.params.id,
   req.body.status
 );

 if(!request){
  return res.status(404).json({
    error:'Request not found'
  });
 }

 res.json({
   data:request
 });

 }
 catch(error){

  if(
    error.code ===
    'INVALID_STATUS_TRANSITION'
  ){
    return res.status(409).json({
      error:error.message

    });
  }
  throw error;
 }
}

export async function deleteRequest(req,res){
 const result =
 await requestService.deleteRequest(
   req.params.id
 );

 if(!result){
  return res.status(404).json({
    error:'Request not found'
  });

 }
 res.status(204).send();
}