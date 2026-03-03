type RobotStatus =
  | "idle"
  | "assigned"
  | "en_route"
  | "delivering"
  | "completed";

export class Robot {
  readonly id: number;
  private status: RobotStatus;
  private missionId: number | null;
  private static currentId = 0;

  constructor() {
    // assign currentId as id and then increment (post increment)
    this.id = Robot.currentId++;
    this.status = "idle";
    this.missionId = null;
  }

  cancelMission() {
    // shouldn't be possible as button shouldn't be enabled but validate for safety
    if (!this.missionId) {
      return;
    }
    this.missionId = null;
    this.status = "idle";
  }

  toJSON() {
    return {
      id: this.id,
      status: this.status,
      missionId: this.missionId,
    };
  }
}
