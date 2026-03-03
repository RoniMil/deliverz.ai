import { NextResponse } from "next/server";
import { fleetManager } from "@/lib/fleetManager";
// API GET endpoint for retrieving robots from server

export async function GET() {
  const robots = fleetManager.getRobots();
  return NextResponse.json(robots);
}
