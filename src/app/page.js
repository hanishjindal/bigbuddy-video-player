'use client'
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VideoEditor from "@/components/VideoEditor";
import { useState } from "react";

export default function Home() {
  const [projectName, setProjectName] = useState("Untitled")
  const [cloudSave, setCloudSave] = useState(true)
  return (
    <main className="w-screen overflow-hidden h-screen flex flex-col select-none">
      <Header
        projectName={projectName}
        cloudSave={cloudSave}
      />

      <div className="flex gap-10 w-full h-full">
        <Sidebar />

        <VideoEditor />
      </div>

    </main>
  );
}
