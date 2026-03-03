type RobotStatus =
  | "idle"
  | "assigned"
  | "en_route"
  | "delivering"
  | "completed";

export class Robot {
  readonly id: number;
  private status: RobotStatus;
  private statusChangedAt: number;
  private missionId: number | null;
  // auto increment id's, starting id is 0
  private static currentId = 0;

  constructor() {
    // assign currentId as id and then increment (post increment)
    this.id = Robot.currentId++;
    this.status = "idle";
    this.statusChangedAt = Date.now();
    this.missionId = null;
  }

  getMissionId(): number | null {
    return this.missionId;
  }

  getStatus(): RobotStatus {
    return this.status;
  }

  getStatusChangedAt() {
    return this.statusChangedAt;
  }

  assignMission(missionId: number) {
    this.missionId = missionId;
    this.advanceState("assigned");
  }

  advanceState(status: RobotStatus) {
    this.status = status;
    this.statusChangedAt = Date.now();
    if (status === "idle") this.missionId = null;
  }

  toJSON() {
    return {
      id: this.id,
      status: this.status,
      missionId: this.missionId,
    };
  }

  cancelMission() {
    // shouldn't be possible as button shouldn't be enabled but validate for safety
    if (!this.missionId) {
      return;
    }

    this.missionId = null;
    this.status = "idle";
  }
}
