"use client";

import { useEffect, useState } from "react";

type Robot = {
  id: number;
  status: string;
  missionId: number | null;
};

const CANCELLABLE_STATES = ["assigned", "en_route", "delivering"];

export default function Home() {
  const [robots, setRobots] = useState<Robot[]>([]);

  useEffect(() => {
    const fetchRobots = async () => {
      const res = await fetch("/api/robots");
      const data = await res.json();
      setRobots(data);
    };

    fetchRobots();
    // poll page every second to update info
    const interval = setInterval(fetchRobots, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCancel = async (robotId: number) => {
    await fetch(`/api/robots/${robotId}/cancel`, { method: "POST" });
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">FleetOps Dashboard</h1>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-8">Robot ID</th>
            <th className="py-2 pr-8">Status</th>
            <th className="py-2 pr-8">Mission ID</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {robots.map((robot) => (
            <tr key={robot.id} className="border-b">
              <td className="py-2 pr-8">{robot.id}</td>
              <td className="py-2 pr-8">{robot.status}</td>
              <td className="py-2 pr-8">{robot.missionId ?? "-"}</td>
              <td className="py-2">
                <button
                  onClick={() => handleCancel(robot.id)}
                  disabled={!CANCELLABLE_STATES.includes(robot.status)}
                  className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
