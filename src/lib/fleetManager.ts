import { Robot } from "./robot";
import { Mission } from "./mission";

const NUM_OF_ROBOTS = 5;

// timings
const ASSIGNED_TO_EN_ROUTE = 5000; // route plan overhead
const EN_ROUTE_TO_DELIVERING = 50000; // end point -> pick up point + 5 seconds pickup overhead
const DELIVERING_TO_COMPLETED = 45000; // pick up point -> end point
const COMPLETED_TO_IDLE = 5000; // hand off overhead

class FleetManager {
  // because of ascending id's, FIFO is maintained naturally
  private robots: Map<number, Robot>; // key: missionId, value mission object

  private missions: Map<number, Mission>; // key: missionId, value mission object

  constructor() {
    this.robots = this.initializeRobots();
    this.missions = new Map();
    this.generateMissions();
    this.assignMissions();
    this.progressMissions();
  }

  getRobots(): Robot[] {
    return Array.from(this.robots.values());
  }

  private initializeRobots(): Map<number, Robot> {
    const map = new Map<number, Robot>();
    for (let i = 0; i < NUM_OF_ROBOTS; i++) {
      const robot = new Robot();
      map.set(robot.id, robot);
    }
    return map;
  }

  private generateMissions() {
    const addTwo = () => {
      const m1 = new Mission();
      const m2 = new Mission();
      this.missions.set(m1.id, m1);
      this.missions.set(m2.id, m2);
    };
    // add 2 missions shortly after start then every minute add two more
    setTimeout(addTwo, 2000);
    setInterval(addTwo, 60000);
  }

  private assignMissions() {
    setInterval(() => {
      for (const [missionId, mission] of this.missions) {
        if (mission.getStatus() !== "pending") continue;

        const firstIdleRobot = Array.from(this.robots.values()).find(
          (r) => r.getStatus() === "idle",
        );
        if (!firstIdleRobot) break; // no idle robots - stop checking

        mission.setStatus("in_progress");
        firstIdleRobot.assignMission(missionId);
      }
    }, 1000);
  }

  private progressMissions() {
    // poll every second to check if any robot is ready to advance to the next state
    setInterval(() => {
      const now = Date.now();
      for (const robot of this.robots.values()) {
        // how long has the robot been in its current state
        const elapsed = now - robot.getStatusChangedAt();

        // advance through each state once the required delay has passed
        if (robot.getStatus() === "assigned" && elapsed >= ASSIGNED_TO_EN_ROUTE)
          robot.advanceState("en_route");
        else if (
          robot.getStatus() === "en_route" &&
          elapsed >= EN_ROUTE_TO_DELIVERING
        )
          robot.advanceState("delivering");
        else if (
          robot.getStatus() === "delivering" &&
          elapsed >= DELIVERING_TO_COMPLETED
        )
          robot.advanceState("completed");
        else if (
          robot.getStatus() === "completed" &&
          elapsed >= COMPLETED_TO_IDLE
        ) {
          this.missions.delete(robot.getMissionId()!);
          robot.advanceState("idle");
        }
      }
    }, 1000);
  }

  getRobotById(robotId: number): Robot | undefined {
    return this.robots.get(robotId);
  }

  cancelMission(robot: Robot) {
    const cancellableStates = ["assigned", "en_route", "delivering"];
    if (!cancellableStates.includes(robot.getStatus())) {
      return;
    }
    const missionId = robot.getMissionId()!;
    robot.advanceState("idle");
    this.missions.delete(missionId);
  }
}

export const fleetManager = new FleetManager();
