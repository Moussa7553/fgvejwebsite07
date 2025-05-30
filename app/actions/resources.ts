"use server"

import { connectToDatabase } from "@/lib/mongodb"
import Template from "@/models/Template"
import Resource from "@/models/Resource"
import Faq from "@/models/Faq"
import Testimonial from "@/models/Testimonial"
import Event from "@/models/Event"

// Action pour récupérer les templates
export async function getTemplates() {
  try {
    await connectToDatabase()
    const templates = await Template.find().sort({ created_at: -1 })

    return { success: true, templates }
  } catch (error) {
    console.error("Erreur lors de la récupération des templates:", error)
    return { success: false, message: "Une erreur est survenue lors de la récupération des templates" }
  }
}

// Action pour incrémenter le compteur de téléchargement d'un template
export async function incrementTemplateDownloadCount(templateId: string) {
  try {
    await connectToDatabase()
    await Template.findByIdAndUpdate(templateId, { $inc: { download_count: 1 } })

    return { success: true }
  } catch (error) {
    console.error("Erreur lors de l'incrémentation du compteur de téléchargement:", error)
    return { success: false }
  }
}

// Action pour récupérer les ressources par type
export async function getResourcesByType(type: "guide" | "video" | "faq") {
  try {
    await connectToDatabase()
    const resources = await Resource.find({ type }).sort({ created_at: -1 })

    return { success: true, resources }
  } catch (error) {
    console.error("Erreur lors de la récupération des ressources:", error)
    return { success: false, message: "Une erreur est survenue lors de la récupération des ressources" }
  }
}

// Action pour récupérer les FAQ
export async function getFaqs(category = "all") {
  try {
    await connectToDatabase()
    let faqs

    if (category !== "all") {
      faqs = await Faq.find({ category }).sort({ order_index: 1 })
    } else {
      faqs = await Faq.find().sort({ category: 1, order_index: 1 })
    }

    return { success: true, faqs }
  } catch (error) {
    console.error("Erreur lors de la récupération des FAQ:", error)
    return { success: false, message: "Une erreur est survenue lors de la récupération des FAQ" }
  }
}

// Action pour récupérer les témoignages
export async function getTestimonials() {
  try {
    await connectToDatabase()
    const testimonials = await Testimonial.find({ is_published: true }).sort({ created_at: -1 })

    return { success: true, testimonials }
  } catch (error) {
    console.error("Erreur lors de la récupération des témoignages:", error)
    return { success: false, message: "Une erreur est survenue lors de la récupération des témoignages" }
  }
}

// Action pour récupérer les événements
export async function getEvents() {
  try {
    await connectToDatabase()
    const events = await Event.find().sort({ created_at: -1 })

    return { success: true, events }
  } catch (error) {
    console.error("Erreur lors de la récupération des événements:", error)
    return { success: false, message: "Une erreur est survenue lors de la récupération des événements" }
  }
}
