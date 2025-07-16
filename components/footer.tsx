import Link from "next/link"
import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  // Footer component with contact information
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img src="/Logo1.png" alt="FGVEJ Logo" className="mb-4 h-16" />
            <h3 className="text-xl font-bold mb-4">FGVEJ</h3>
            <p className="text-green-100 mb-4">Fonds de Garantie Verte pour les Jeunes Entrepreneurs</p>
            <p className="text-green-100">
              Soutenir les jeunes entrepreneurs engagés dans des projets écologiques et durables.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-100 hover:text-white transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/qui-sommes-nous" className="text-green-100 hover:text-white transition">
                  Qui Sommes-Nous ?
                </Link>
              </li>
              <li>
                <Link href="/nos-services" className="text-green-100 hover:text-white transition">
                  Nos Services
                </Link>
              </li>
              <li>
                <Link href="/projets-finances" className="text-green-100 hover:text-white transition">
                  Projets Financés
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ressources" className="text-green-100 hover:text-white transition">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/ressources/guides" className="text-green-100 hover:text-white transition">
                  Guides Pratiques
                </Link>
              </li>
              <li>
                <Link href="/ressources/faq" className="text-green-100 hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="text-green-100 hover:text-white transition">
                  Actualités
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-green-100">
              <p>Siège de FGVEJ</p>
              <p>Bamako, Mali</p>
              <div className="mt-4 space-y-2">
                <a 
                  href="mailto:FGVEJ@gmail.com" 
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Mail className="h-5 w-5" />
                  <span>FGVEJ@gmail.com</span>
                </a>
                <a 
                  href="tel:0022366757011" 
                  className="flex items-center gap-2 hover:text-white transition"
                >
                  <Phone className="h-5 w-5" />
                  <span>0022366757011</span>
                </a>
              </div>
            </address>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link 
                href="https://www.facebook.com/profile.php?id=61558478945678" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-green-100 hover:text-white transition"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link 
                href="https://twitter.com/FGVEJ_Official" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-green-100 hover:text-white transition"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link 
                href="https://www.linkedin.com/search/results/companies/?keywords=FGVEJ%20Mali" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-green-100 hover:text-white transition"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link 
                href="https://instagram.com/fgvej_official" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-green-100 hover:text-white transition"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link 
                href="https://wa.me/22374038383" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-green-100 hover:text-white transition"
              >
                <span className="sr-only">WhatsApp</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </Link>
              <a 
                href="mailto:FGVEJ@gmail.com" 
                className="text-green-100 hover:text-white transition"
              >
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-100">
          <p>&copy; {new Date().getFullYear()} FGVEJ. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
