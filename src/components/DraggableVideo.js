
import { useDrag, useDrop } from 'react-dnd';
import ReactPlayer from 'react-player';

const DraggableVideo = ({ item, index, moveVideo, setVideoCount, videoCount }) => {
    const [, drag] = useDrag({
        type: 'VIDEO',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'VIDEO',
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveVideo(draggedItem.index, index);
                draggedItem.index = index;
                setVideoCount(index);
            }
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            key={index}
            className={`w-36 h-24 border-2 ${videoCount === index ? "outline outline-blue-500" : ""} rounded-xl bg-gray-200 overflow-hidden relative`}
            onClick={() => setVideoCount(index)}
        >
            <ReactPlayer url={item} width={144} height={96} />
        </div>
    );
};

export default DraggableVideo;