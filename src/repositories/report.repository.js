import sequelize from '../config/database.js';

const reportRepository = {
  async getSiteSummary(siteId) {
    const [rows] = await sequelize.query(
      `
      SELECT
        e.site_id,
        COUNT(mr.id) AS total_requests,
        COUNT(*) FILTER (WHERE mr.status = 'new') AS new_requests,
        COUNT(*) FILTER (WHERE mr.status = 'in_progress') AS in_progress_requests,
        COUNT(*) FILTER (WHERE mr.status = 'done') AS done_requests,
        COUNT(*) FILTER (WHERE mr.status = 'rejected') AS rejected_requests,
        COUNT(*) FILTER (WHERE mr.priority = 'low') AS low_priority,
        COUNT(*) FILTER (WHERE mr.priority = 'medium') AS medium_priority,
        COUNT(*) FILTER (WHERE mr.priority = 'high') AS high_priority,
        COUNT(*) FILTER (WHERE mr.priority = 'critical') AS critical_priority,
        AVG(
          CASE
            WHEN mr.status = 'done'
            THEN EXTRACT(
              EPOCH FROM (mr.updated_at - mr.created_at)
            ) / 3600
          END
        ) AS average_closure_hours
      FROM equipment e
      LEFT JOIN maintenance_requests mr
        ON mr.equipment_id = e.id
      WHERE e.site_id = :siteId
      GROUP BY e.site_id
      `,
      {
        replacements: { siteId },
      },
    );

    return rows[0] ?? null;
  },

  async getEquipmentLoad({ from, to, minRequests = 1 }) {
    const [rows] = await sequelize.query(
      `
      SELECT
        e.id,
        e.name,
        e.type,
        e.status,
        COUNT(mr.id) AS request_count,
        COUNT(*) FILTER (
          WHERE mr.status = 'done'
        ) AS closed_request_count,
        COALESCE(
          SUM(
            CASE
              WHEN ra.hours IS NOT NULL THEN ra.hours
              ELSE 0
            END
          ),
          0
        ) AS total_hours,
        MAX(mr.updated_at) AS latest_service
      FROM equipment e
      LEFT JOIN maintenance_requests mr
        ON mr.equipment_id = e.id
        AND (
          :from IS NULL
          OR mr.created_at >= :from
        )
        AND (
          :to IS NULL
          OR mr.created_at <= :to
        )
      LEFT JOIN request_assignees ra
        ON ra.request_id = mr.id
      GROUP BY
        e.id,
        e.name,
        e.type,
        e.status
      HAVING COUNT(mr.id) >= :minRequests
      ORDER BY request_count DESC
      `,
      {
        replacements: {
          from: from ?? null,
          to: to ?? null,
          minRequests: Number(minRequests),
        },
      },
    );

    return rows;
  },
};

export default reportRepository;