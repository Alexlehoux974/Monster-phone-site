'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les données de la commande depuis les query params
    const orderData = searchParams.get('order');

    if (orderData) {
      try {
        const parsedOrder = JSON.parse(decodeURIComponent(orderData));
        setOrder(parsedOrder);
      } catch (error) {
        console.error('Erreur parsing order data:', error);
      }
    }

    setLoading(false);

    // Nettoyer le panier après 2 secondes
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('monster-phone-cart');
      }
    }, 2000);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Commande non trouvée
          </h1>
          <p className="text-gray-600 mb-8">
            Impossible de récupérer les informations de votre commande.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Commande confirmée !
          </h1>

          <p className="text-gray-600 mb-6">
            Merci pour votre commande. Nous vous avons envoyé un email de confirmation.
          </p>

          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
            <Package className="w-5 h-5" />
            <span className="font-semibold">N° de commande : {order.orderNumber}</span>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Détails de la commande
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Client</span>
              <span className="font-medium text-gray-900">{order.customerName}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Email</span>
              <span className="font-medium text-gray-900">{order.customerEmail}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Date</span>
              <span className="font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            <div className="flex justify-between items-center pt-4">
              <span className="text-lg font-semibold text-gray-900">Montant total</span>
              <span className="text-2xl font-bold text-blue-600">
                {order.totalAmount.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Prochaines étapes
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Vous allez recevoir un email de confirmation à {order.customerEmail}</li>
                <li>• Votre commande sera traitée dans les 24-48 heures</li>
                <li>• Vous recevrez un email de suivi avec le numéro de livraison</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Retour à l'accueil
          </Link>

          <Link
            href="/collections"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continuer mes achats
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
