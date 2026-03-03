import { Robot } from "./robot";
import { Mission } from "./mission";

const NUM_OF_ROBOTS = 5;

// timings
const ASSIGNED_TO_EN_ROUTE = 50000; // end point -> pick up point + 5 seconds pickup overhead
const EN_ROUTE_TO_DELIVERING = 45000; // pick up point -> end point
const DELIVERING_TO_COMPLETED = 5000; // hand off overhead
const COMPLETED_TO_IDLE = 2000; // delay just for visibility on the dashboard (UI)

class FleetManager {
  private robots: Robot[];
  // because of ascending mission id, FIFO is maintained naturally
  private missions: Map<number, Mission>; // key: missionId, value mission object

  constructor() {
    this.robots = Array.from({ length: NUM_OF_ROBOTS }, () => new Robot());
    this.missions = new Map();
    this.generateMissions();
  }

  getRobots(): Robot[] {
    return this.robots;
  }

  private generateMissions() {
    // create 2 new missions every minute
    setInterval(() => {
      const m1 = new Mission();
      const m2 = new Mission();
      this.missions.set(m1.id, m1);
      this.missions.set(m2.id, m2);
    }, 60000);
  }

  private progressMissions() {}

  private removeMission(missionId: number) {}

  private cancelMission(robot: Robot) {}

  private assignMissions() {}
}

export const fleetManager = new FleetManager();
