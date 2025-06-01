import ImageKit from 'imagekit'
import { NextResponse } from 'next/server'

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKITIO!,
    privateKey: process.env.NEXT_PRIVATE_IMAGEKITIO!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT_IMAGEKITIO!
})

export async function GET(request: Request) {
    return NextResponse.json(imagekit.getAuthenticationParameters())
}