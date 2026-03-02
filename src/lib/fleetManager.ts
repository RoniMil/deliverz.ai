import { Robot } from "./robot";
import { Mission } from "./mission";

const NUM_OF_ROBOTS = 5;

class FleetManager {
  private robots: Robot[];
  private missions: Mission[]; // missions is a queue DS

  constructor() {
    this.robots = Array.from({ length: NUM_OF_ROBOTS }, () => new Robot());
    this.missions = [];
    this.missionSimulation();
  }

  private missionSimulation() {
    setInterval(() => {
      this.missions.push(new Mission("pending"), new Mission("pending"));
    }, 60000);
  }

  private dequeue(): Mission {
    if (this.missions.length === 0) throw new Error("Queue is empty");
    return this.missions.shift()!; // ! tells TS we know it's not undefined
  }
}
