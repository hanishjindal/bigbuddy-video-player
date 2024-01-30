'use client'
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VideoEditor from "@/components/VideoEditor";
import { useState, useRef } from "react";

export default function Home() {
  const [projectName, setProjectName] = useState("Untitled")
  const [cloudSave, setCloudSave] = useState(true);
  const [video, setVideo] = useState([]);
  const fileInputRef = useRef(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setVideo((prevVideo) => [...prevVideo, URL.createObjectURL(file)]);
    }

    // Reset the input value to allow selecting the same file again
    event.target.value = null;
  };

  const triggerImport = () => {
    // Trigger click on the hidden file input
    fileInputRef.current.click();
  };

  async function mergeBlobUrls(blobUrls) {
    try {
      const blobPromises = blobUrls.map(async (blobUrl) => {
        const response = await fetch(blobUrl);
        const blobData = await response.blob();
        return blobData;
      });

      const blobs = await Promise.all(blobPromises);

      // Concatenate the blobs into a single Blob
      const mergedBlob = new Blob(blobs, { type: blobs[0].type });

      // Create a Blob URL from the merged Blob
      const mergedBlobUrl = URL.createObjectURL(mergedBlob);

      return mergedBlobUrl;
    } catch (error) {
      console.error('Error merging Blob URLs:', error);
      return null;
    }
  }

  const triggerExport = () => {
    mergeBlobUrls(video).then((mergedBlobUrl) => {
      if (mergedBlobUrl) {
        console.log('Merged Blob URL:', mergedBlobUrl);
        const downloadLink = document.createElement('a');
        downloadLink.href = mergedBlobUrl; // Corrected here
        downloadLink.download = projectName || 'merged-video.webm';

        // Append the link to the document
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Clean up
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(mergedBlobUrl); // Revoke the correct URL
      } else {
        console.log('Failed to merge Blob URLs');
      }
    });
  };


  return (
    <main className="w-screen overflow-hidden h-screen flex flex-col select-none">
      <Header
        projectName={projectName}
        cloudSave={cloudSave}
        setProjectName={setProjectName}
        triggerImport={triggerImport}
        triggerExport={triggerExport}
      />

      <div className="flex w-full h-full">
        <Sidebar />

        <VideoEditor
          video={video}
          setVideo={setVideo}
          triggerImport={triggerImport}
        />
      </div>

      {/* Hidden input field - For import video purpose only */}
      <input
        type="file"
        ref={fileInputRef}
        accept="video/*"
        style={{ display: 'none' }}
        onChange={handleVideoChange}
      />
    </main>
  );
}
