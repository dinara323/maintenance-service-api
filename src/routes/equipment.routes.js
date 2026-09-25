import { Router } from 'express';


import {

getRequests,
getRequestById,
createRequest,
updateRequest,
changeStatus,
deleteRequest

}
from '../controllers/request.controller.js';



const router = Router();



router.get(
 '/',
 getRequests
);



router.post(
 '/',
 createRequest
);



router.get(
 '/:id',
 getRequestById
);



router.patch(
 '/:id',
 updateRequest
);



router.patch(
 '/:id/status',
 changeStatus
);



router.delete(
 '/:id',
 deleteRequest
);



export default router;