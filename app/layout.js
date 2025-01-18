// app/layout.js
import './globals.css'

export const metadata = {
  title: 'Pins Demo',
  description: 'Display search results as pins on a Leaflet map',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
