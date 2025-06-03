'use client'
import type { Prisma } from '@prisma/client'
import React from 'react'
import { Card, CardFooter } from '../ui/card'
import { IKVideo, ImageKitProvider } from 'imagekitio-next'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT_IMAGEKITIO as string
console.log('url end point -> ', urlEndPoint)

type VideoCardProps = {
  video: Prisma.VideosGetPayload<{
    include: {
      user: {
        select: {
          name: true
          email: true
        }
      }
    }
  }>
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  console.log(video)

  return (
    <Card className='p-0 w-[300px] h-[600px] flex flex-col items-center justify-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative'>
      <ImageKitProvider urlEndpoint={urlEndPoint}>
        <IKVideo
          path={video.url.replace(urlEndPoint, '')}
          transformation={[{ height: '640', width: '360', format: 'mp4' }]}
          controls
          autoPlay={false}
          className='absolute inset-0 w-full h-full object-cover'
        />
      </ImageKitProvider>

      {/* Channel Information  */}
      <CardFooter className='absolute bottom-20 -left-2 text-white'>
        <div>
          <div className='flex items-center space-x-2'>
            <Avatar>
              <AvatarImage src='' alt='channel owner photo' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <h3 className='font-semibold'>{video.title}</h3>
              <span className='text-sm'>{video.user.name}</span>
            </div>
          </div>

          <div className='text-sm mt-2'>
            <p>{video.description}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default VideoCard