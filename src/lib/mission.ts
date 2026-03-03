type MissionStatus = "pending" | "in_progress";

export class Mission {
  readonly id: number;
  private status: MissionStatus;
  // auto increment id's. starting id is 0
  private static currentId = 0;

  constructor() {
    // assign currentId as id and then increment (post increment)
    this.id = Mission.currentId++;
    this.status = "pending";
  }

  getStatus(): MissionStatus {
    return this.status;
  }

  setStatus(status: MissionStatus) {
    this.status = status;
  }
}
