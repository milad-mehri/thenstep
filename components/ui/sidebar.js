"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Result from "@/components/ui/result"

// 1) Import the Zustand store if you're using it:
import { useAppStore } from "@/lib/store" // example path

export default function Sidebar({ results = [] }) {
  const [search, setSearch] = useState("")

  // 2) Grab setSearchResults from your Zustand store
  const { setSearchResults } = useAppStore()

  // The function that updates `search` state
  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  // Compute filtered results (mock)
  const filteredResults = useMemo(() => {
    if (!search) return []
    // Real logic might actually filter or fetch
    return [
      {
        title: "Sample Result 1",
        description: "A short description.",
        longitude: -130,
        latitude: 49,
        date: "2024-01-01",
        image: "https://via.placeholder.com/300x200/ccc/fff?text=Result+1",
      },
      {
        title: "Sample Result 2",
        description: "Another sample result.",
        longitude: -123.12,
        latitude: 49.28,
        date: "2025-05-10",
        // no image => tests placeholder
      },
    ]
  }, [search])

  // 3) Whenever filteredResults changes, log them and store them globally
  useEffect(() => {
    console.log("Filtered results:", filteredResults)
    setSearchResults(filteredResults)
  }, [filteredResults, setSearchResults])

  return (
    <div>
      <div className="mb-4">
        <Label htmlFor="search" className="mb-2">
          Search
        </Label>
        <Input
          id="search"
          value={search}
          onChange={handleChange}
          placeholder="Search something..."
        />
      </div>

      <div className="flex flex-col gap-4">
        {search.length === 0 ? (
          <p className="text-sm text-gray-500">No search yet.</p>
        ) : filteredResults.length === 0 ? (
          <p className="text-sm text-gray-500">
            No results found for &quot;{search}&quot;.
          </p>
        ) : (
          filteredResults.map((res, i) => (
            <Result
              key={i}
              title={res.title}
              description={res.description}
              longitude={res.longitude}
              latitude={res.latitude}
              date={res.date}
              image={res.image}
            />
          ))
        )}
      </div>
    </div>
  )
}
