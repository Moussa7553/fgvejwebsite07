import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="mt-4 text-lg">Page non trouvée</p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
} 