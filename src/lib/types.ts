export type RobotStatus =
  | "idle"
  | "assigned"
  | "en_route"
  | "delivering"
  | "completed";

export type MissionStatus =
  | "pending"
  | "assigned"
  | "en_route"
  | "completed"
  | "cancelled";
