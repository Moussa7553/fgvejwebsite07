import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Link from "next/link"

interface NewsCardProps {
  title: string
  description: string
  date: string
  href: string
}

export default function NewsCard({ title, description, date, href }: NewsCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t flex justify-between items-center">
        <div className="flex items-center text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{date}</span>
        </div>
        <Link href={href} className="text-green-600 hover:text-green-700 text-sm font-medium">
          En savoir plus
        </Link>
      </CardFooter>
    </Card>
  )
}
