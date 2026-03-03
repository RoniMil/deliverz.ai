import { NextResponse } from "next/server";
import { fleetManager } from "@/lib/fleetManager";

export async function GET() {
  const robots = fleetManager.getRobots();
  return NextResponse.json(robots);
}
