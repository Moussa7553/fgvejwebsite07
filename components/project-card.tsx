'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { MapPin } from "lucide-react"

interface ProjectCardProps {
  title: string
  location: string
  category: string
  description: string
  impact: string[]
  imageSrc: string
}

export default function ProjectCard({ title, location, category, description, impact, imageSrc }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative h-48">
        <Image 
          src={imageSrc} 
          alt={title} 
          width={400}
          height={192}
          priority
          className="object-cover w-full h-full" 
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3EFGVEJ%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-green-600">{category}</Badge>
        </div>
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="mt-auto">
          <h4 className="font-semibold mb-2">Impact :</h4>
          <ul className="space-y-1">
            {impact.map((item, index) => (
              <li key={index} className="flex text-sm text-gray-600">
                <span className="text-green-600 font-bold mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
} 