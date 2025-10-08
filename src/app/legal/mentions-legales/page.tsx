'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Building, Shield, Calendar } from 'lucide-react';

export default function MentionsLegalesPage() {
  useEffect(() => {
    document.title = 'Mentions Légales | Monster Phone - ZR INDIAN OCEAN';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mentions légales de Monster Phone - ZR INDIAN OCEAN SARL. SIRET 512 455 726 RCS Saint-Denis de La Réunion. 16 Rue Claude Chappe, ZAE 2000, 97290 Le Port Cedex, La Réunion.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Mentions légales de Monster Phone - ZR INDIAN OCEAN SARL. SIRET 512 455 726 RCS Saint-Denis de La Réunion. 16 Rue Claude Chappe, ZAE 2000, 97290 Le Port Cedex, La Réunion.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <div className="pt-[110px]">
          <Header />
        </div>
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Building className="w-4 h-4" />
                MENTIONS LÉGALES
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Mentions Légales
              </h1>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                Informations légales relatives au site www.Monster-Phone.com
              </p>
              <div className="mt-4 text-sm text-gray-700">
                <Calendar className="w-4 h-4 inline mr-1" />
                Dernière mise à jour : Décembre 2024
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-8"
            >
              <div className="prose prose-slate max-w-none text-gray-900">
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-6 h-6 text-blue-600" />
                  1. Présentation du site
                </h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <p className="text-blue-800 mb-4">
                    En vertu de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique,
                    il est précisé aux utilisateurs du site <strong>www.Monster-Phone.com</strong> l&apos;identité des différents
                    intervenants dans le cadre de sa réalisation et de son suivi :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Propriétaire</h3>
                      <p className="text-blue-800">
                        <strong>ZR INDIAN OCEAN</strong><br/>
                        Société à responsabilité limitée (SARL)<br/>
                        Capital social : 3 000 €<br/>
                        SIRET : 512 455 726 00012<br/>
                        RCS Saint-Denis de La Réunion<br/>
                        16 Rue Claude Chappe, ZAE 2000<br/>
                        97290 Le Port Cedex
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Gérant</h3>
                      <p className="text-blue-800">Cyril LE COQ</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Responsable publication</h3>
                      <p className="text-blue-800">Tymothé LE COQ<br/>
                      tymothe.icell4@gmail.com</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Webmaster</h3>
                      <p className="text-blue-800">ARA-CORP<br/>
                      02 62 02 51 02</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Hébergeur</h3>
                      <p className="text-blue-800">Hostinger</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Crédits</h3>
                      <p className="text-blue-800">ARA-CORP / Digiqo.fr</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  2. Conditions générales d&apos;utilisation du site et des services proposés
                </h2>
                
                <p className="mb-4">
                  L&apos;utilisation du site <strong>www.Monster-Phone.com</strong> implique l&apos;acceptation pleine et entière des conditions 
                  générales d&apos;utilisation ci-après décrites. Ces conditions d&apos;utilisation sont susceptibles d&apos;être modifiées 
                  ou complétées à tout moment. Les utilisateurs du site sont donc invités à les consulter régulièrement.
                </p>
                
                <p className="mb-4">
                  Le site est normalement accessible à tout moment aux utilisateurs. Une interruption pour maintenance technique 
                  peut toutefois être décidée par ZR INDIAN OCEAN, qui s&apos;efforcera alors de communiquer préalablement aux 
                  utilisateurs les dates et heures de l&apos;intervention.
                </p>
                
                <p className="mb-4">
                  Le site est mis à jour régulièrement par Tymothé LE COQ. De la même façon, les mentions légales peuvent 
                  être modifiées à tout moment : elles s&apos;imposent néanmoins à l&apos;utilisateur, qui est invité à s&apos;y référer 
                  le plus souvent possible afin d&apos;en prendre connaissance.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  3. Description des services fournis
                </h2>
                
                <p className="mb-4">
                  Le site <strong>www.Monster-Phone.com</strong> a pour objet de fournir une information concernant l&apos;ensemble 
                  des activités de la société.
                </p>
                
                <p className="mb-4">
                  ZR INDIAN OCEAN s&apos;efforce de fournir sur le site des informations aussi précises que possible. Toutefois, 
                  elle ne pourra être tenue responsable des omissions, inexactitudes et carences dans la mise à jour, 
                  qu&apos;elles soient de son fait ou de celui de tiers partenaires.
                </p>
                
                <p className="mb-4">
                  Toutes les informations indiquées sur le site sont données à titre indicatif et sont susceptibles d&apos;évoluer. 
                  De plus, les renseignements figurant sur le site ne sont pas exhaustifs et sont donnés sous réserve de 
                  modifications ayant été apportées depuis leur mise en ligne.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  4. Limitations contractuelles sur les données techniques
                </h2>
                
                <p className="mb-4">
                  Le site utilise la technologie JavaScript.
                </p>
                
                <p className="mb-4">
                  Le site Internet ne pourra être tenu responsable de dommages matériels liés à son utilisation. 
                  L&apos;utilisateur s&apos;engage à accéder au site avec un matériel récent, ne contenant pas de virus, 
                  et via un navigateur de dernière génération mis à jour.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-red-600" />
                  5. Propriété intellectuelle et contrefaçons
                </h2>
                
                <p className="mb-4">
                  ZR INDIAN OCEAN est propriétaire des droits de propriété intellectuelle ou détient les droits d&apos;usage 
                  sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logos, icônes, 
                  sons et logiciels.
                </p>
                
                <p className="mb-4">
                  Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments 
                  du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable 
                  de ZR INDIAN OCEAN.
                </p>
                
                <p className="mb-4">
                  Toute exploitation non autorisée du site ou de l&apos;un quelconque de ses éléments sera considérée comme 
                  constitutive d&apos;une contrefaçon et poursuivie conformément aux articles L.335-2 et suivants du Code 
                  de Propriété Intellectuelle.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  6. Limitations de responsabilité
                </h2>
                
                <p className="mb-4">
                  ZR INDIAN OCEAN ne pourra être tenue responsable des dommages directs et indirects causés au matériel 
                  de l&apos;utilisateur lors de l&apos;accès au site www.Monster-Phone.com, et résultant soit de l&apos;utilisation 
                  d&apos;un matériel ne répondant pas aux spécifications mentionnées au point 4, soit de l&apos;apparition d&apos;un 
                  bug ou d&apos;une incompatibilité.
                </p>
                
                <p className="mb-4">
                  ZR INDIAN OCEAN ne pourra également être tenue responsable des dommages indirects (par exemple : perte 
                  de marché ou perte de chance) consécutifs à l&apos;utilisation du site.
                </p>
                
                <p className="mb-4">
                  Des espaces interactifs (formulaire de contact) sont à la disposition des utilisateurs. ZR INDIAN OCEAN 
                  se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace 
                  qui contreviendrait à la législation française, notamment aux dispositions relatives à la protection 
                  des données. Le cas échéant, ZR INDIAN OCEAN se réserve la possibilité de mettre en cause la responsabilité 
                  civile et/ou pénale de l&apos;utilisateur, notamment en cas de message à caractère raciste, injurieux, 
                  diffamant ou pornographique.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  7. Gestion des données personnelles
                </h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <p className="text-green-800 mb-4">
                    En France, les données personnelles sont protégées par :
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-green-800 mb-4">
                    <li>La loi n° 78-87 du 6 janvier 1978</li>
                    <li>La loi n° 2004-801 du 6 août 2004</li>
                    <li>L&apos;article L.226-13 du Code pénal</li>
                    <li>La Directive Européenne du 24 octobre 1995</li>
                  </ul>
                  
                  <p className="text-green-800 mb-4">
                    Lors de l&apos;utilisation du site www.Monster-Phone.com, peuvent être recueillies :
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-green-800">
                    <li>l&apos;URL des liens par lesquels l&apos;utilisateur a accédé au site</li>
                    <li>le fournisseur d&apos;accès de l&apos;utilisateur</li>
                    <li>l&apos;adresse IP de l&apos;utilisateur</li>
                  </ul>
                </div>
                
                <p className="mb-4">
                  En tout état de cause, ZR INDIAN OCEAN ne collecte des informations personnelles relatives à l&apos;utilisateur 
                  que pour certains services proposés par le site. L&apos;utilisateur fournit ces informations en toute connaissance 
                  de cause, notamment lorsqu&apos;il procède lui-même à leur saisie. Il est alors précisé le caractère obligatoire 
                  ou facultatif des informations demandées.
                </p>
                
                <p className="mb-4">
                  Conformément à la loi « Informatique et Libertés » du 6 janvier 1978, l&apos;utilisateur dispose d&apos;un droit 
                  d&apos;accès, de rectification et d&apos;opposition aux données personnelles le concernant. La demande doit être 
                  écrite, signée, accompagnée d&apos;une copie du titre d&apos;identité avec signature du titulaire, et préciser 
                  l&apos;adresse de réponse.
                </p>
                
                <p className="mb-4">
                  Aucune information personnelle de l&apos;utilisateur du site n&apos;est publiée, échangée, transférée, cédée ou 
                  vendue à des tiers, sauf en cas de rachat de ZR INDIAN OCEAN. L&apos;éventuel acquéreur serait alors soumis 
                  à la même obligation de conservation et de modification des données.
                </p>
                
                <p className="mb-4">
                  Les bases de données sont protégées par la loi du 1er juillet 1998, transposant la directive 96/9 du 
                  11 mars 1996 relative à la protection juridique des bases de données.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  8. Liens hypertextes et cookies
                </h2>
                
                <p className="mb-4">
                  Le site contient un certain nombre de liens hypertextes vers d&apos;autres sites, mis en place avec 
                  l&apos;autorisation de ZR INDIAN OCEAN. Cependant, ZR INDIAN OCEAN n&apos;a pas la possibilité de vérifier 
                  le contenu des sites visités et n&apos;assumera aucune responsabilité à ce sujet.
                </p>
                
                <p className="mb-4">
                  La navigation sur le site est susceptible de provoquer l&apos;installation de cookie(s) sur l&apos;ordinateur 
                  de l&apos;utilisateur. Un cookie est un petit fichier qui ne permet pas l&apos;identification de l&apos;utilisateur 
                  mais enregistre des informations relatives à la navigation. Ces données visent à faciliter la navigation 
                  et permettent des mesures de fréquentation.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                  <p className="text-yellow-800 mb-4">
                    Le refus d&apos;installation d&apos;un cookie peut entraîner l&apos;impossibilité d&apos;accéder à certains services. 
                    L&apos;utilisateur peut configurer son navigateur pour refuser les cookies :
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-yellow-800">
                    <li><strong>Internet Explorer :</strong> Outils → Options Internet → Confidentialité → Bloquer tous les cookies → OK</li>
                    <li><strong>Firefox :</strong> Menu Firefox → Options → Vie privée → Utiliser les paramètres personnalisés pour l&apos;historique → Désactiver les cookies</li>
                    <li><strong>Safari :</strong> Menu → Paramètres → Afficher les paramètres avancés → Confidentialité → Paramètres de contenu → Bloquer les cookies</li>
                    <li><strong>Chrome :</strong> Menu → Paramètres → Afficher les paramètres avancés → Confidentialité → Préférences → Bloquer les cookies</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  9. Droit applicable et attribution de juridiction
                </h2>
                
                <p className="mb-4">
                  Tout litige en relation avec l&apos;utilisation du site www.Monster-Phone.com est soumis au droit français. 
                  Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  10. Les principales lois concernées
                </h2>
                
                <ul className="list-disc pl-6 space-y-1 mb-6">
                  <li>Loi n° 78-17 du 6 janvier 1978, modifiée par la loi n° 2004-801 du 6 août 2004 relative à l&apos;informatique, aux fichiers et aux libertés</li>
                  <li>Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                  11. Lexique
                </h2>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <ul className="list-disc pl-6 space-y-2 text-purple-800">
                    <li>
                      <strong>Utilisateur :</strong> Internaute se connectant et utilisant le site susnommé
                    </li>
                    <li>
                      <strong>Informations personnelles :</strong> « Les informations qui permettent, sous quelque forme 
                      que ce soit, directement ou non, l&apos;identification des personnes physiques auxquelles elles 
                      s&apos;appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).
                    </li>
                  </ul>
                </div>

                <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
                  <p className="text-gray-800 text-sm">
                    <strong className="text-gray-900">ZR INDIAN OCEAN - Monster Phone</strong> - Votre spécialiste en téléphonie gaming à La Réunion
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
}