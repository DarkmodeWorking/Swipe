import Navbar from "@/components/header/navbar";
import { Button } from "@/components/ui/button";
import VideoCard from "@/components/videos/video-card";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser()

  if (!user) {
    return null
  }

  const loggedInUser = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id
    }
  })

  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        name: user.fullName || 'No Name',
        email: user.emailAddresses[0].emailAddress,
        clerkUserId: user.id
      }
    })
  }

  const videos = await prisma.videos.findMany({
    where: { userId: loggedInUser?.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy:{
      createdAt:'desc'
    }
  });

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      <div className="flex flex-col items-center">
        {videos.map((video) => (
          <div key={video.id} className="snap-start flex justify-center items-center h-screen">
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </div>
  );
}
