// app/page.js
"use client"

import dynamic from 'next/dynamic'
import React from 'react'
import Sidebar from '@/components/ui/sidebar'

// Dynamically import the Map to avoid SSR issues with Leaflet
const MapNoSSR = dynamic(() => import('@/components/ui/map'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="flex h-screen w-screen">
      {/* LEFT: Sidebar at 1/4 width */}
      <div className="w-1/4 border-r p-4">
        <Sidebar />
      </div>

      {/* RIGHT: Map, fills remaining space */}
      <div className="flex-1">
        <MapNoSSR />
      </div>
    </main>
  )
}
