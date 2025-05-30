import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { QuoteIcon } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  imageSrc: string
}

export default function TestimonialCard({ quote, author, role, imageSrc }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <QuoteIcon className="h-8 w-8 text-green-600 mb-4" />
        <p className="text-gray-700 mb-6 flex-grow">{quote}</p>
        <div className="flex items-center mt-auto">
          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
            <Image 
              src={imageSrc || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3EFGVEJ%3C/text%3E%3C/svg%3E"} 
              alt={author} 
              width={48}
              height={48}
              priority
              className="object-cover rounded-full" 
            />
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
