/**
 * @param {array} video - The array of video file of the project.
 * @param {function} triggerExport - A function to export project.
 */


import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaPlay, FaPlus, FaPause } from 'react-icons/fa';
import { RiStackLine } from 'react-icons/ri';
import { PiClockCounterClockwiseFill } from 'react-icons/pi';
import { HiArrowUturnLeft, HiArrowUturnRight, HiArrowPath } from 'react-icons/hi2';
import ReactPlayer from 'react-player';
import DraggableVideo from './DraggableVideo';

const VideoEditor = ({ video, triggerImport, setVideo }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null)
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [duration, setDuration] = useState(0);
    const [videoCount, setVideoCount] = useState(0)
    const [scrubberPosition, setScrubberPosition] = useState(0);
    const [isScrubbing, setIsScrubbing] = useState(false);

    const handleScrubberMouseDown = (event) => {
        setIsScrubbing(true);
        handleScrub(event);
    };

    const handleScrub = (event) => {
        if (isScrubbing) {
            const timelineWidth = event.currentTarget.offsetWidth;
            const clickPosition = event.clientX - event.currentTarget.getBoundingClientRect().left;
            const newPosition = (clickPosition / timelineWidth) * video.length;

            setScrubberPosition(newPosition);
            setVideoCount(Math.floor(newPosition));
        }
    };

    const handleScrubberMouseUp = () => {
        setIsScrubbing(false);
    };

    const handleProgress = (progress) => {
        getTotalVideoTime(video.slice(0, videoCount)).then((totalDuration) => {
            let playedSeconds = progress.playedSeconds;
            // let loadedSeconds = progress.loadedSeconds;
            let playedSecondsTotal = totalDuration + playedSeconds;

            setPlayedSeconds((totalDuration + playedSecondsTotal));
        });
        getTotalVideoTime(video).then((totalDuration) => {
            setDuration(totalDuration)
        });

    };

    async function getTotalVideoTime(videoUrls) {
        let totalDuration = 0;

        // Iterate through each video URL
        for (const videoUrl of videoUrls) {
            // Create a video element to get duration
            const video = document.createElement('video');
            video.src = videoUrl;

            // Create a promise that resolves when the metadata is loaded
            const metadataLoaded = new Promise((resolve) => {
                video.addEventListener('loadedmetadata', () => {
                    resolve();
                });
            });

            // Wait for metadata to be loaded
            await metadataLoaded;

            // Add the duration to the total
            totalDuration += video.duration;

            // Remove the video element
            video.remove();
        }

        // Return the total duration
        return totalDuration;
    }


    const handleEnd = () => {
        if (videoCount < video.length - 1) {
            setTimeout(() => {
                setVideoCount(e => e + 1);
                setIsPlaying(true);
                // setScrubberPosition(0.32 * (1 + videoCount))
            }, 1000);
        } else {
            setVideoCount(0)
            setIsPlaying(false);
            setScrubberPosition(0);
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handlePlayPause = () => {
        if (!video.length) return;
        setIsPlaying(!isPlaying);
    };

    const moveVideo = (fromIndex, toIndex) => {
        const updatedVideo = [...video];
        const [movedVideo] = updatedVideo.splice(fromIndex, 1);
        updatedVideo.splice(toIndex, 0, movedVideo);
        // Update the state with the new video order
        setVideo(updatedVideo);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='w-full flex flex-col'>
                <div className='w-full h-[8%]'>
                </div>

                <div className='w-full bg-gray-100 h-[70%] flex justify-center items-center'>
                    {video.length ?
                        <div className="aspect-video">
                            <ReactPlayer
                                url={video[videoCount]}
                                playing={isPlaying}
                                controls
                                ref={playerRef}
                                onProgress={handleProgress}
                                onEnded={handleEnd}
                            />
                        </div>
                        :
                        <div className='w-96 h-96 bg-white'>
                        </div>
                    }
                </div>

                <div className='w-full h-[22%] px-5 py-3 flex flex-col justify-between'>
                    <div className='flex items-start gap-4 py-1'>
                        <div
                            className='rounded-full border shadow-md w-fit p-4 flex justify-center items-center cursor-pointer'
                            onClick={handlePlayPause}
                        >
                            {!isPlaying ?
                                <FaPlay size={20} />
                                :
                                <FaPause size={20} />
                            }
                        </div>
                        <div className="flex gap-2 relative">
                            <div
                                className="timeline flex gap-2"
                                onMouseMove={handleScrub}
                                onMouseUp={handleScrubberMouseUp}
                            >
                                {video.length > 0 &&
                                    video.map((item, index) => (
                                        <DraggableVideo
                                            key={index}
                                            item={item}
                                            index={index}
                                            moveVideo={moveVideo}
                                            setVideoCount={setVideoCount}
                                            videoCount={videoCount}
                                        />
                                    ))}
                                <div
                                    className="flex justify-center items-center bg-gray-200 w-36 h-24 rounded-xl cursor-pointer"
                                    onClick={triggerImport}
                                >
                                    <FaPlus />
                                </div>
                                <div
                                    className="scrubber absolute bg-black w-[3px] h-[130%] top-[-20%] cursor-pointer"
                                    style={{ left: `calc(${(scrubberPosition / video.length) * 100}%)` }}
                                    onMouseDown={handleScrubberMouseDown}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3 font-medium'>
                            <RiStackLine size={20} />

                            <div className='text-sm'>
                                <span>{formatTime(playedSeconds)}</span>
                                <span>/</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-5 font-medium'>
                            <span>33</span>
                            <HiArrowPath size={20} />
                            <HiArrowUturnLeft size={20} />
                            <HiArrowUturnRight size={20} />
                            <PiClockCounterClockwiseFill size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    )
}

export default VideoEditor