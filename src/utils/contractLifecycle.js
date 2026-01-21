export const CONTRACT_STATUSES = {
  CREATED: "Created",
  APPROVED: "Approved",
  SENT: "Sent",
  SIGNED: "Signed",
  LOCKED: "Locked",
  REVOKED: "Revoked",
};

export const STATUS_TRANSITIONS = {
  Created: ["Approved", "Revoked"],
  Approved: ["Sent"],
  Sent: ["Signed", "Revoked"],
  Signed: ["Locked"],
  Locked: [],
  Revoked: [],
};

export function canTransition(currentStatus, nextStatus) {
  return STATUS_TRANSITIONS[currentStatus]?.includes(nextStatus);
}
