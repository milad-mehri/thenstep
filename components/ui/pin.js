// components/ui/pin.jsx
"use client"

import React from "react"
import { Marker, Popup } from "react-leaflet"

export default function Pin({ lat, lng, title, description }) {
  return (
    <Marker
      position={[lat, lng]}
      // optional eventHandlers for hover popup
    >
      <Popup>
        <h3>{title}</h3>
        <p>{description}</p>
      </Popup>
    </Marker>
  )
}
