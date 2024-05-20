import toast from 'react-hot-toast';
import { SiTwitter } from "react-icons/si";
import { HiMiniHome } from "react-icons/hi2";
import { PiHashBold } from "react-icons/pi";
import { BsBellFill } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";
import { MdBookmarks } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import Image from "next/image"
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { graphqlClient } from "@/clients/api";
import { verifyGoogleTokenQuery } from "@/graphql/query/user";

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

function TwitterLayout({ children }: { children: React.ReactNode }) {
    const { user } = useCurrentUser()
    const queryClient = useQueryClient()

    const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
        const authToken = cred.credential

        if (!authToken) {
            return toast.error("Authentication Error")
        }

        const { verifyGoogleToken } = await graphqlClient.request(verifyGoogleTokenQuery, { token: authToken })

        if (verifyGoogleToken) {
            window.localStorage.setItem("__twitter__token", verifyGoogleToken)
        }

        await queryClient.invalidateQueries({ queryKey: ["current-user"] })

        toast.success("Welcome!")
    }, [queryClient])


    return (
        <div>
            <div className="grid grid-cols-12 h-screen w-screen sm:px-56 relative">
                <div className="col-span-2 sm:col-span-3 pr-6 flex sm:justify-end relative">
                    <div>
                        <div className="text-4xl hover:bg-gray-800 h-fit w-fit rounded-full p-2 ml-2 mt-4 cursor-pointer transition-all">
                            <SiTwitter />
                        </div>
                        <div className="mt-4 text-lg font-semibold pr-4">
                            <ul>
                                {sideBarLinks.map((item) => (
                                    <li key={item.title} className="flex justify-start items-center gap-2 px-6 py-3 my-4 w-fit hover:bg-gray-800 rounded-full transition-all cursor-pointer">
                                        <span>{item.icon}</span>
                                        <span className="hidden sm:inline">{item.title}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="hidden sm:block bg-[#1d9bf0] text-base w-full rounded-full p-3 mt-2 hover:bg-[#1d9cf0e3] transition-all">
                                Tweet
                            </button>
                            <button className="block sm:hidden bg-[#1d9bf0] text-base w-fit rounded-full p-3 mx-auto mt-2 hover:bg-[#1d9cf0e3] transition-all">
                                <SiTwitter />
                            </button>
                        </div>
                    </div>
                    {user &&
                        <div className="absolute bottom-5 py-2 px-5 flex gap-2 items-center rounded-full hover:bg-[#260f0f85] transition-all cursor-pointer">
                            <Image className="rounded-full" src={user?.profileImage || ""} width={50} height={50} alt="image" />
                            <div>
                                <h1 className="hidden sm:block px-1 font-semibold">{user?.firstName} {user?.lastName}</h1>
                                <p className="hidden sm:block px-1 text-sm text-gray-600 mb-3 font-medium">{user.email.split("@")[0]}</p>
                            </div>
                        </div>}
                </div>
                <div className="col-span-10 sm:col-span-6 border-x-[0.5px] border-gray-800 h-screen overflow-scroll">
                    {children}
                </div>
                <div className="hidden sm:col-span-3 p-5">
                    {!user &&
                        <div className="border-2 p-4 rounded-lg border-gray-800 h-[10rem] w-[20rem]">
                            <h1 className="mb-2 text-xl font-semibold">New to Twitter ?</h1>
                            <p className="text-xs text-gray-600 mb-3 font-medium">Signup now to get your own personalize timeline</p>
                            <GoogleLogin onSuccess={handleLoginWithGoogle} />
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default TwitterLayout