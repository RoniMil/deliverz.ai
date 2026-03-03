"use client";

import { useEffect, useState } from "react";

type Robot = {
  id: number;
  status: string;
  missionId: number | null;
};

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

  return (
    <main>
      <pre>{JSON.stringify(robots, null, 2)}</pre>
    </main>
  );
}
