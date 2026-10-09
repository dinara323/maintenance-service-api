import MaintenanceRequest from '../models/maintenanceRequest.js';
import RequestAssignee from '../models/requestAssignee.js';

const requireAssignedRequest = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'Authentication required',
      });
    }

    if (req.user.role === 'admin') {
      return next();
    }

    if (req.user.role !== 'technician' || !req.user.technicianId) {
      return res.status(403).json({
        message: 'Insufficient permissions',
      });
    }

    const request = await MaintenanceRequest.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: 'Request not found',
      });
    }

    const assignment = await RequestAssignee.findOne({
      where: {
        requestId: request.id,
        technicianId: req.user.technicianId,
      },
    });

    if (!assignment) {
      return res.status(403).json({
        message: 'You are not assigned to this request',
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

export default requireAssignedRequest;