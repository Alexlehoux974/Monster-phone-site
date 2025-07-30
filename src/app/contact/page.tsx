'use client';

import { useState, useEffect } from 'react';
import './contact.css';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  User,
  Building,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Navigation,
  Calendar
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi (à remplacer par vraie logique)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  useEffect(() => {
    document.title = 'Contact Monster Phone Boutique La Réunion | Téléphones Gaming 974';
    
    // Ajouter les métadonnées SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contactez Monster Phone Boutique à La Réunion. Spécialiste smartphones gaming HONOR, accessoires MUVIT. Zone Industrielle Sainte-Marie 97438. Tel: 0262 XX XX XX');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Contactez Monster Phone Boutique à La Réunion. Spécialiste smartphones gaming HONOR, accessoires MUVIT. Zone Industrielle Sainte-Marie 97438. Tel: 0262 XX XX XX';
      document.head.appendChild(meta);
    }

    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      keywords.setAttribute('content', 'contact monster phone, téléphone gaming réunion, boutique smartphone 974, sainte marie réunion, honor réunion, réparation téléphone réunion');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'contact monster phone, téléphone gaming réunion, boutique smartphone 974, sainte marie réunion, honor réunion, réparation téléphone réunion';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <div className="pt-24">
          <Header />
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                CONTACT RÉUNION
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Contactez-nous
                <span className="flex items-center justify-center gap-2 mt-2">
                  🇷🇪
                </span>
              </h1>
              <p className="text-2xl text-gray-900 max-w-3xl mx-auto">
                Notre équipe d'experts est à votre écoute pour vous conseiller sur nos produits gaming 
                et vous accompagner dans vos projets high-tech.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              
              {/* Formulaire de contact */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm border p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Envoyez-nous un message</h2>
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center gap-2 text-green-900">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Message envoyé avec succès !</span>
                    </div>
                    <p className="text-green-900 text-sm mt-1">
                      Nous vous répondrons dans les 24h ouvrées.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="0692 XX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="" className="text-gray-900">Sélectionnez un sujet</option>
                      <option value="info-produit">Information produit</option>
                      <option value="commande">Question sur une commande</option>
                      <option value="sav">Service après-vente</option>
                      <option value="reparation">Réparation</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Informations de contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Coordonnées */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    Monster Phone Boutique
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Adresse</p>
                        <p className="text-gray-900">
                          Zone Industrielle<br />
                          97438 Sainte-Marie<br />
                          La Réunion
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Téléphone</p>
                        <p className="text-gray-900">0262 XX XX XX</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-900">contact@monster-phone-reunion.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horaires */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    Horaires d'ouverture
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-900">Lundi - Vendredi</span>
                      <span className="font-medium text-gray-900">9h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-900">Samedi</span>
                      <span className="font-medium text-gray-900">9h00 - 16h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-900">Dimanche</span>
                      <span className="font-medium text-red-600">Fermé</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Showroom sur rendez-vous uniquement
                    </p>
                  </div>
                </div>

                {/* Spécialités */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    Nos spécialités
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <Badge variant="outline" className="justify-start p-3">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Smartphones gaming HONOR
                    </Badge>
                    <Badge variant="outline" className="justify-start p-3">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Accessoires MUVIT & MONSTER
                    </Badge>
                    <Badge variant="outline" className="justify-start p-3">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Réparations express
                    </Badge>
                    <Badge variant="outline" className="justify-start p-3">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Conseils personnalisés
                    </Badge>
                  </div>
                </div>

                {/* Urgences */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h3 className="font-bold text-red-900">Urgences</h3>
                  </div>
                  <p className="text-red-900 text-sm">
                    Pour les réparations urgentes ou les problèmes techniques critiques, 
                    contactez-nous directement par téléphone aux heures d'ouverture.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Section services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center"
            >
              <h2 className="text-4xl font-bold mb-4">
                Pourquoi choisir Monster Phone ?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Service local</h3>
                  <p className="text-sm text-white">Équipe technique basée à La Réunion</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Navigation className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Livraison 48h</h3>
                  <p className="text-sm text-white">Partout sur l'île, gratuit dès 50€</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Garantie 24 mois</h3>
                  <p className="text-sm text-white">Service après-vente garanti</p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        </div>
      </div>
      
      <Footer />
    </>
  );
}