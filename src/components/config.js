import { LuLayout, LuSlidersHorizontal, LuImage, LuShapes, LuVideo, LuUploadCloud } from "react-icons/lu";
import { PiTextTBold } from "react-icons/pi";
import { GiElectric } from "react-icons/gi";
import { SiExpertsexchange } from "react-icons/si";

export const SIDENAV_ITEMS = [
    {
        name: "Templates",
        icon: <LuLayout />,
    },
    {
        name: "Customize",
        icon: <LuSlidersHorizontal />,
    },
    {
        name: "Elements",
        icon: <LuShapes />,
    },
    {
        name: "Images",
        icon: <LuImage />,
    },
    {
        name: "Videos",
        icon: <LuVideo />,
    },
    {
        name: "Upload",
        icon: <LuUploadCloud />,
    },
    {
        name: "Text",
        icon: <PiTextTBold />,
    },
    {
        name: "Graphics",
        icon: <GiElectric />,
    },
    {
        name: "Pixabay",
        icon: <SiExpertsexchange />,
    }
]

export const DATA_SIDENAV = ["/img.jpg", "/img.jpg", "/img.jpg"]