import { RobotStatus } from "./types";

export class Robot {
  readonly id: number;
  private status: RobotStatus;
  private missionId: number | null;
  // auto increment id's, starting id is 0
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
}
