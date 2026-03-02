import { MissionStatus } from "./types";

export class Mission {
  readonly id: number;
  private status: MissionStatus;
  // auto increment id's, starting id is 0
  private static currentId = 0;

  constructor(status: MissionStatus) {
    // assign currentId as id and then increment (post increment)
    this.id = Mission.currentId++;
    this.status = status;
  }
}
