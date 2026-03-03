export class Mission {
  readonly id: number;
  // auto increment id's, starting id is 0
  private static currentId = 0;

  constructor() {
    // assign currentId as id and then increment (post increment)
    this.id = Mission.currentId++;
  }
}
