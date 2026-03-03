import { NextResponse } from "next/server";
import { fleetManager } from "@/lib/fleetManager";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ robotId: string }> },
) {
  const { robotId: robotIdStr } = await params;
  const robotId = parseInt(robotIdStr);
  const robot = fleetManager.getRobotById(robotId);

  if (!robot) {
    return NextResponse.json({ error: "Robot not found" }, { status: 404 });
  }

  fleetManager.cancelMission(robot);
  return NextResponse.json({ success: true });
}
