"use client"

import FeedCard from "@/components/FeedCard";
import { useCallback, useState } from "react";
import { useCurrentUser } from "@/hooks/user";
import { FiImage } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Image from "next/image";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/components/TwitterLayout";
import { graphqlClient } from "@/clients/api";
import { getSignedUrlQuery } from "@/graphql/query/tweet";
import toast from "react-hot-toast";
import axios from "axios";
import { deleteImageMutation } from "@/graphql/mutation/tweet";


export default function Home() {

  const { user } = useCurrentUser()
  const { tweets } = useGetAllTweets()
  const { mutate } = useCreateTweet()
  const [content, setcontent] = useState("")
  const [tweetImageURL, setTweetImageURL] = useState("")

  const handleImageUpload = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault()

      const file: File | null | undefined = input.files?.item(0)

      if (!file) return

      const { getPresignedURL } = await graphqlClient.request(getSignedUrlQuery, { imageType: file.type.split("/")[1] })

      if (getPresignedURL) {
        toast.loading("Uploading...", { id: "2" })

        await axios.put(getPresignedURL, file, {
          headers: {
            "Content-Type": file.type.split("/")[1]
          }
        })

        const url = new URL(getPresignedURL)
        setTweetImageURL(`${url.origin}${url.pathname}`)

        toast.success("Image Uploaded!", { id: "2" })
      }
    }
  }, [graphqlClient, getSignedUrlQuery])

  const handleSelectImage = useCallback(() => {
    if (!user) {
      toast.error("Please Login First!")
      return
    }

    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')

    input.addEventListener("change", handleImageUpload(input))

    input.click()
  }, [user, handleImageUpload])

  const handleDeleteImage = useCallback(async () => {
    try {
      const url = new URL(tweetImageURL)
      const imageKey = url.pathname.substring(1)    // Remove the leading '/'

      await graphqlClient.request(deleteImageMutation, { imageKey })
      setTweetImageURL("")
      toast.success("Image Deleted!")
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong!")
    }
  }, [tweetImageURL, graphqlClient, deleteImageMutation])

  const handleCreateTweet = useCallback(() => {
    if (!user) {
      toast.error("Please Login First!")
      return
    }

    if (content === "") {
      toast.error("Can't Create Empty tweeet!")
      return
    }

    mutate({
      content: content,
      imageURL: tweetImageURL
    })

    setcontent("")
    setTweetImageURL("")
  }, [mutate, content, tweetImageURL])


  return (
    <TwitterLayout>
      <div className="border-t-[1px] border-gray-800 px-4 py-2 cursor-pointer">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-1">
            <Image className="rounded-full" src={user?.profileImage || "https://samir-twitter-app.s3.ap-south-1.amazonaws.com/resources/pngwing.com.png"} alt="profile" height={50} width={50} />
          </div>
          <div className="col-span-11">
            <textarea value={content} onChange={(e) => setcontent(e.target.value)} className="w-full bg-transparent text-xl px-3 border-b border-gray-800" rows={4} placeholder="What is Happening?!"></textarea>
            {
              tweetImageURL && (
                <Image className="my-2 mx-auto rounded-md" src={tweetImageURL} alt="tweet-image" width={300} height={300} />
              )
            }
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-8">
                <div className="text-lg hover:bg-gray-800 hover:text-blue-400 rounded-full p-2 cursor-pointer transition-all">
                  <FiImage onClick={handleSelectImage} />
                </div>
                {
                  tweetImageURL &&
                  <div className="text-lg hover:bg-gray-800 hover:text-red-700 rounded-full p-2 cursor-pointer transition-all">
                    <RiDeleteBin5Line onClick={handleDeleteImage} />
                  </div>
                }
              </div>
              <button onClick={handleCreateTweet} className="bg-[#1d9bf0] text-base font-medium rounded-full py-1 px-4 hover:bg-[#1d9cf0e3] transition-all">
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
      {tweets?.map((tweet) => (
        <FeedCard key={tweet?.id} data={tweet as Tweet} />
      ))}
    </TwitterLayout>
  );
}
