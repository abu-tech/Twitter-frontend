import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { LuBookmark } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { FaRetweet } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
    data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    const { data } = props
    return (
        <div className="border-t-[1px] border-gray-800 px-4 py-2 hover:bg-[#260f0f85] transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-1">
                    <Image className="rounded-full" src={data.author?.profileImage || ""} alt="profile" height={50} width={50} />
                </div>
                <div className="col-span-11">
                    <div className="font-semibold p-1">
                        <Link href={`/${data.author?.id}`}>
                            <h1 className="hover:underline transition-all">{data.author?.firstName} {data.author?.lastName}</h1>
                        </Link>
                    </div>
                    <div className="text-sm p-1">
                        <p>{data.content}</p>
                    </div>
                    <div className="flex justify-between mt-2 text-base items-center pr-10">
                        <div className="hover:bg-gray-800 hover:text-blue-400 rounded-full p-2 cursor-pointer transition-all">
                            <FaRegComment />
                        </div>
                        <div className="hover:bg-gray-800 hover:text-blue-400 rounded-full p-2 cursor-pointer transition-all">
                            <FaRetweet />
                        </div>
                        <div className="hover:bg-gray-800 hover:text-blue-400 rounded-full p-2 cursor-pointer transition-all">
                            <FaRegHeart />
                        </div>
                        <div className="hover:bg-gray-800 hover:text-blue-400 rounded-full p-2 cursor-pointer transition-all">
                            <LuBookmark />
                        </div>
                        <div className="hover:bg-gray-800 hover:text-blue-400 rounded-full p-2 cursor-pointer transition-all">
                            <FiShare />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedCard