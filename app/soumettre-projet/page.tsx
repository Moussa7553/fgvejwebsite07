"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// Removed unused Select components
// Removed unused Alert components
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Download, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
// Re-import the backend action
import { soumettreProjet } from "@/app/actions/projet"

// Données de démonstration pour les templates
const demoTemplates = [
  {
    id: "1",
    name: "Plan d'Affaires - Projet Vert",
    description: "Template complet pour structurer votre plan d'affaires écologique",
    file_type: "PPTX",
    file_size: 2457600,
    file_path: "/templates/plan-affaires-projet-vert.pptx",
  },
  {
    id: "2",
    name: "Analyse d'Impact Environnemental",
    description: "Document pour évaluer l'impact écologique de votre projet",
    file_type: "PDF",
    file_size: 1887436,
    file_path: "/templates/analyse-impact-environnemental.pdf",
  },
  {
    id: "3",
    name: "Prévisions Financières - Projet Durable",
    description: "Tableur pour calculer les coûts et revenus de votre projet",
    file_type: "XLSX",
    file_size: 1258291,
    file_path: "/templates/previsions-financieres-projet-durable.xlsx",
  },
  {
    id: "4",
    name: "Présentation de Projet - FGVEJ",
    description: "Template de présentation pour soumettre votre projet à FGVEJ",
    file_type: "PPTX",
    file_size: 3670016,
    file_path: "/templates/presentation-projet-fgvej.pptx",
  },
]

export default function SubmitProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  // Updated formData keys to match backend action
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    titre: "",
    description: "",
    montant: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Removed handleSelectChange as category field was removed

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const validFiles = newFiles.filter((file) => {
        const fileType = file.name.split(".").pop()?.toLowerCase()
        // Ensure only allowed file types are added
        return (
          fileType === "pdf" || fileType === "ppt" || fileType === "pptx" || fileType === "doc" || fileType === "docx"
        )
      })

      if (validFiles.length !== newFiles.length) {
        alert("Seuls les fichiers PDF, PowerPoint (PPT/PPTX) et Word (DOC/DOCX) sont acceptés.")
      }

      setFiles((prev) => [...prev, ...validFiles])
    } else {
      // Clear files if the user cancels the file picker
      setFiles([]);
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleTemplateDownload = (templatePath: string) => {
    // Téléchargement direct du fichier
    window.open(templatePath, "_blank")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionSuccess(false); // Ensure success message is hidden on new submission attempt

    try {
      const formDataToSend = new FormData()
      
      // Append form data using the correct backend keys
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      // Append files to the FormData under the 'fichiers' key
      files.forEach((file) => {
        formDataToSend.append("fichiers", file)
      })

      // Call the backend action
      const resultat = await soumettreProjet(formDataToSend)

      if (resultat.succes) {
        // Reset the form on success
        setFormData({
          nom: "",
          email: "",
          telephone: "",
          titre: "",
          description: "",
          montant: "",
        })
        setFiles([])
        setSubmissionSuccess(true)
        alert("Projet soumis avec succès ! Notre équipe l'examinera dans les plus brefs délais.")
      } else {
        // Display error message from backend
        alert(`Erreur lors de la soumission du projet: ${resultat.message || "Une erreur inconnue est survenue."}`)
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du projet:", error)
      alert("Une erreur est survenue lors de la soumission du projet. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Soumettre un Projet</h1>
          <p className="text-xl max-w-3xl">
            Présentez votre projet écologique et durable pour bénéficier du soutien de FGVEJ. Nous vous accompagnerons
            dans toutes les étapes de sa réalisation.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {submissionSuccess ? (
            // Success message section (using simple div and h2 as Alert component was removed)
            <div className="max-w-3xl mx-auto text-center bg-green-50 border border-green-200 text-green-800 p-8 rounded-lg">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Projet soumis avec succès !</h2>
              <p className="mb-6">
                Votre projet a été soumis avec succès. Notre équipe l'examinera dans les plus brefs délais et vous
                contactera pour les prochaines étapes.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/">Retour à l'accueil</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => setSubmissionSuccess(false)}
                >
                  Soumettre un autre projet
                </Button>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="submit" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="submit">Soumettre un Projet</TabsTrigger>
                  <TabsTrigger value="templates">Télécharger des Templates</TabsTrigger>
                </TabsList>
              </div>

              {/* Submit Project Tab */}
              <TabsContent value="submit" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <h2 className="text-2xl font-bold mb-6">Informations sur le Projet</h2>

                          <div className="space-y-2">
                            <Label htmlFor="titre">Titre du Projet</Label>
                            <Input
                              id="titre"
                              name="titre"
                              value={formData.titre}
                              onChange={handleChange}
                              placeholder="Ex: Recyclage des Déchets Plastiques"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Description du Projet</Label>
                            <Textarea
                              id="description"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              placeholder="Décrivez votre projet, ses objectifs et sa mise en œuvre..."
                              rows={5}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="montant">Montant du Financement Demandé (FCFA)</Label>
                            <Input
                              id="montant"
                              name="montant"
                              type="number"
                              value={formData.montant}
                              onChange={handleChange}
                              placeholder="Ex: 15000000"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="fileUpload">Documents du Projet (PDF, PPT, PPTX, DOC, DOCX)</Label>
                            <div
                              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={triggerFileInput}
                            >
                              <Input
                                id="fileUpload"
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf,.ppt,.pptx,.doc,.docx"
                                multiple
                                className="hidden"
                              />
                              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500 mb-1">
                                Cliquez pour sélectionner des fichiers ou glissez-déposez ici
                              </p>
                              <p className="text-xs text-gray-400">
                                Formats acceptés: PDF, PPT, PPTX, DOC, DOCX (Max: 10MB par fichier)
                              </p>
                            </div>

                            {files.length > 0 && (
                              <div className="mt-4 space-y-2">
                                <p className="font-medium">Fichiers sélectionnés:</p>
                                <ul className="space-y-2">
                                  {files.map((file, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                                    >
                                      <div className="flex items-center">
                                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                                        <span className="text-sm truncate max-w-[200px] md:max-w-md">{file.name}</span>
                                        <span className="text-xs text-gray-500 ml-2">
                                          ({(file.size / 1024 / 1024).toFixed(2)} MB) a
                                        </span>
                                      </div>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFile(index)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        Supprimer
                                      </Button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          <h2 className="text-2xl font-bold mb-6 pt-4">Informations Personnelles</h2>

                          <div className="space-y-2">
                            <Label htmlFor="nom">Nom Complet</Label>
                            <Input
                              id="nom"
                              name="nom"
                              value={formData.nom}
                              onChange={handleChange}
                              placeholder="Votre nom et prénom"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Adresse E-mail</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="votre.email@exemple.com"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="telephone">Numéro de Téléphone</Label>
                            <Input
                              id="telephone"
                              name="telephone"
                              value={formData.telephone}
                              onChange={handleChange}
                              placeholder="+223 XX XX XX XX"
                              required
                            />
                          </div>

                          <div className="pt-4">
                            <Button
                              type="submit"
                              className="w-full bg-green-600 hover:bg-green-700"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Soumission en cours...
                                </>
                              ) : (
                                "Soumettre le Projet"
                              )}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Guide de Soumission</h2>

                        <div className="space-y-6">
                          <div className="flex">
                            <div className="bg-green-100 p-2 rounded-full mr-4 h-8 w-8 flex items-center justify-center shrink-0">
                              <span className="text-green-600 font-bold">1</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-1">Préparez votre Projet</h3>
                              <p className="text-gray-600 text-sm">
                                Assurez-vous que votre projet répond aux critères d'éligibilité de FGVEJ et qu'il a un
                                impact écologique mesurable.
                              </p>
                            </div>
                          </div>

                          <div className="flex">
                            <div className="bg-green-100 p-2 rounded-full mr-4 h-8 w-8 flex items-center justify-center shrink-0">
                              <span className="text-green-600 font-bold">2</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-1">Complétez le Formulaire</h3>
                              <p className="text-gray-600 text-sm">
                                Remplissez tous les champs du formulaire avec des informations précises et détaillées
                                sur votre projet.
                              </p>
                            </div>
                          </div>

                          <div className="flex">
                            <div className="bg-green-100 p-2 rounded-full mr-4 h-8 w-8 flex items-center justify-center shrink-0">
                              <span className="text-green-600 font-bold">3</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-1">Joignez vos Documents</h3>
                              <p className="text-gray-600 text-sm">
                                Téléchargez votre plan d'affaires, vos prévisions financières et tout autre document
                                pertinent pour votre projet.
                              </p>
                            </div>
                          </div>

                          <div className="flex">
                            <div className="bg-green-100 p-2 rounded-full mr-4 h-8 w-8 flex items-center justify-center shrink-0">
                              <span className="text-green-600 font-bold">4</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-1">Soumettez et Attendez</h3>
                              <p className="text-gray-600 text-sm">
                                Après soumission, notre équipe examinera votre projet et vous contactera dans un délai
                                de 10 jours ouvrables.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 bg-green-50 p-4 rounded-lg">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                            <div>
                              <h3 className="font-semibold mb-1">Besoin d'aide ?</h3>
                              <p className="text-sm text-gray-600">
                                Si vous avez des questions ou besoin d'assistance pour préparer votre soumission,
                                n'hésitez pas à{" "}
                                <Link href="/contact" className="text-green-600 hover:underline">
                                  nous contacter
                                </Link>
                                .
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="mt-6">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4">Critères d'Éligibilité</h3>
                          <ul className="space-y-2">
                            <li className="flex">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0" />
                              <span className="text-sm">Âge: entre 18 et 35 ans</span>
                            </li>
                            <li className="flex">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0" />
                              <span className="text-sm">Projet à impact écologique positif</span>
                            </li>
                            <li className="flex">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0" />
                              <span className="text-sm">Financement entre 10 et 100 millions FCFA</span>
                            </li>
                            <li className="flex">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0" />
                              <span className="text-sm">Viabilité économique démontrée</span>
                            </li>
                            <li className="flex">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2 shrink-0" />
                              <span className="text-sm">Création d'emplois locaux</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Templates Tab */}
              <TabsContent value="templates" className="mt-0">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-4">Templates pour votre Projet</h2>
                    <p className="text-gray-600">
                      Téléchargez ces modèles pour vous aider à structurer votre projet et à préparer votre soumission.
                      Ces templates sont conçus pour répondre aux critères d'évaluation de FGVEJ.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {demoTemplates.map((template, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="bg-gray-100 p-4">
                          <div className="flex items-center justify-center h-32">
                            <FileText className="h-16 w-16 text-gray-500" />
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                          <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              {template.file_type} • {(template.file_size / 1024 / 1024).toFixed(1)} MB
                            </div>
                            <Button
                              variant="outline"
                              className="text-green-600 border-green-600"
                              onClick={() => handleTemplateDownload(template.file_path)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-10 bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Comment utiliser ces templates ?</h3>
                    <ol className="space-y-4">
                      <li className="flex">
                        <div className="bg-green-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <span className="text-green-600 text-sm font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-gray-700">
                            <span className="font-semibold">Téléchargez le template</span> qui correspond à vos besoins.
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="bg-green-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <span className="text-green-600 text-sm font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-gray-700">
                            <span className="font-semibold">Personnalisez le contenu</span> avec les informations
                            spécifiques à votre projet.
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="bg-green-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <span className="text-green-600 text-sm font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-gray-700">
                            <span className="font-semibold">Suivez les instructions</span> incluses dans chaque template
                            pour compléter toutes les sections.
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="bg-green-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <span className="text-green-600 text-sm font-bold">4</span>
                        </div>
                        <div>
                          <p className="text-gray-700">
                            <span className="font-semibold">Joignez le document complété</span> à votre soumission de
                            projet.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </div>
  )
}
