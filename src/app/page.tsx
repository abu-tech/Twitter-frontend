import { SiTwitter } from "react-icons/si";
import { HiMiniHome } from "react-icons/hi2";
import { PiHashBold } from "react-icons/pi";
import { BsBellFill } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";
import { MdBookmarks } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import FeedCard from "@/components/FeedCard";

interface twitterSideBarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarLinks: twitterSideBarButton[] = [
  {
    title: 'Home',
    icon: <HiMiniHome />
  },
  {
    title: 'Explore',
    icon: <PiHashBold />
  },
  {
    title: 'Notifications',
    icon: <BsBellFill />
  },
  {
    title: 'Messages',
    icon: <RiMessage3Fill />
  },
  {
    title: 'Bookmarks',
    icon: <MdBookmarks />
  },
  {
    title: 'Profile',
    icon: <FaUserLarge />
  }
]

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 px-6">
          <div className="text-4xl hover:bg-gray-800 h-fit w-fit rounded-full p-2 mt-4 cursor-pointer transition-all">
            <SiTwitter />
          </div>
          <div className="mt-4 text-lg font-semibold pr-4">
            <ul>
              {sideBarLinks.map((item) => (
                <li className="flex justify-start items-center gap-2 px-6 py-3 my-4 w-fit hover:bg-gray-800 rounded-full transition-all cursor-pointer">
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <button className="bg-[#1d9bf0] text-base w-full rounded-full p-3 mt-2 hover:bg-[#1d9cf0e3] transition-all">
              Tweet
            </button>
          </div>
        </div>
        <div className="col-span-6 border-x-[0.5px] border-gray-800 h-screen overflow-scroll">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
