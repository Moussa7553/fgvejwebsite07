"use client"

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calendar, DollarSign, Clock, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Image from "next/image"
import { getProjects } from "@/app/actions/projet"
import { useAuth } from "@/contexts/auth-context"
import UserStatsCharts from "@/app/components/UserStatsCharts"

interface Projet {
  _id: string;
  titre: string;
  description: string;
  dateSoumission: string;
  statut: string;
  fichiers: any[]; // Adjust type if file metadata structure is known
}

const statusColors: Record<string, string> = {
  en_attente: "bg-yellow-100 text-yellow-800",
  approuve: "bg-green-100 text-green-800",
  rejete: "bg-red-100 text-red-800",
  en_cours: "bg-blue-100 text-blue-800",
  termine: "bg-purple-100 text-purple-800",
}

const statusLabels: Record<string, string> = {
  en_attente: "En attente",
  approuve: "Approuvé",
  rejete: "Rejeté",
  en_cours: "En cours",
  termine: "Terminé",
}

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Projet[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadProjects = async () => {
      setLoadingProjects(true);
      try {
        const resultat = await getProjects();
        
        // Vérifier si la requête a réussi et si des projets ont été renvoyés
        if (resultat.succes && Array.isArray(resultat.projets)) {
          setProjects(resultat.projets);
          console.log("Projets récupérés:", resultat.projets);
        } else {
          // Gérer le cas où la requête échoue ou ne renvoie pas de tableau de projets
          console.error("Erreur ou format inattendu lors de la récupération des projets:", resultat.message || resultat);
          setProjects([]); // S'assurer que l'état est un tableau vide en cas d'erreur
          toast.error(resultat.message || "Erreur lors du chargement des projets.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
        toast.error("Erreur lors du chargement des projets.");
      } finally {
        setLoadingProjects(false);
      }
    };

    loadProjects();
  }, []);

  const handleSoumettreProjetClick = () => {
    console.log("Button clicked, attempting navigation...");
    window.location.href = '/soumettre-projet';
  };

  if (loadingProjects) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Chargement des projets...</span>
      </div>
    );
  }

  if (!loadingProjects && projects.length === 0) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <FileText className="h-6 w-6" />
              <span className="sr-only">Project Dashboard</span>
            </Link>
            <Link
              href="#"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Tableau de bord
            </Link>
          </nav>

          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto flex-1 md:grow-0">
            </div>

            <button
              onClick={handleSoumettreProjetClick}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-9 rounded-md px-3 bg-primary text-primary-foreground"
            >
              Soumettre un Nouveau Projet
            </button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">Vous n'avez aucun projet</h3>
                <p className="text-sm text-muted-foreground">
                  Vous pouvez commencer à soumettre votre premier projet ici.
                </p>
                {/* Temporarily remove Image component to resolve ReferenceError */}
                {/* <div className="flex items-center justify-center h-32 bg-green-50 rounded-lg mb-4">
                  <Image
                    src="/placeholder.svg"
                    alt="Guide"
                    width={80}
                    height={80}
                  />
                </div> */}
                <button
                  onClick={handleSoumettreProjetClick}
                  className="mt-4 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-9 rounded-md px-3 bg-primary text-primary-foreground"
                >
                  Soumettre un Projet
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <FileText className="h-6 w-6" />
            <span className="sr-only">Project Dashboard</span>
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Tableau de bord
          </Link>
        </nav>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 md:grow-0">
          </div>

          <button
            onClick={handleSoumettreProjetClick}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-9 rounded-md px-3 bg-primary text-primary-foreground"
          >
            Soumettre un Nouveau Projet
          </button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {projects.length > 0 && (
          <div className="grid gap-4 md:gap-8">
            <div className="rounded-md border shadow-sm">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Titre</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Date de soumission</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Statut</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Fichiers</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {projects.map((projet: Projet) => (
                      <tr key={projet._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{projet.titre}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{new Date(projet.dateSoumission).toLocaleDateString()}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{projet.statut}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          {projet.fichiers.length > 0 ? (
                            <ul>
                              {projet.fichiers.map((fichier, index) => (
                                <li key={index}>{fichier.nom}</li>
                              ))}
                            </ul>
                          ) : (
                            "Aucun fichier"
                          )}
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <Link href={`/projects/${projet._id}`}>
                            <ArrowRight className="h-5 w-5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
      <UserStatsCharts />
    </div>
  )
}
