'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  Package,
  Mail,
  ArrowRight,
  Truck,
  CreditCard,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { trackPurchase } from '@/lib/tracking/events';
import type { GA4Item } from '@/lib/tracking/types';

interface OrderDetails {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  amount_total: number;
  subtotal?: number;
  shipping_cost?: number;
  payment_status: string;
  status: string;
  created_at: string;
  items: Array<{
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setError('Session invalide');
      setLoading(false);
      return;
    }

    const createAndFetchOrder = async () => {
      try {
        // 1. Créer la commande dans Supabase à partir de la session Stripe
        const createResponse = await fetch('/api/orders/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          throw new Error(errorData.error || 'Impossible de créer la commande');
        }

        const { order: createdOrder, alreadyExists } = await createResponse.json();

        // 2. Formater les données pour l'affichage
        setOrder({
          id: createdOrder.id,
          order_number: createdOrder.id.substring(0, 8).toUpperCase(),
          customer_name: createdOrder.customer_name,
          customer_email: createdOrder.customer_email,
          amount_total: createdOrder.total,
          subtotal: createdOrder.subtotal || createdOrder.amount_subtotal,
          shipping_cost: createdOrder.shipping_cost,
          payment_status: createdOrder.payment_status,
          status: createdOrder.status,
          created_at: createdOrder.created_at,
          items: createdOrder.items || [],
        });

        // 3. Nettoyer le panier et le draft checkout IMMÉDIATEMENT
        if (typeof window !== 'undefined') {
          localStorage.removeItem('monsterphone-cart');
          localStorage.removeItem('monsterphone-checkout-draft');
          // Force reload du panier pour mettre à jour le header
          window.dispatchEvent(new Event('storage'));
        }

        // 📊 Tracking GA4 - purchase (conversion)
        const ga4Items: GA4Item[] = (createdOrder.items || []).map((item: { product_name: string; product_id?: string; quantity: number; unit_price: number }) => ({
          item_id: item.product_id || item.product_name,
          item_name: item.product_name,
          price: item.unit_price,
          quantity: item.quantity,
        }));

        trackPurchase({
          transaction_id: createdOrder.order_number || createdOrder.id,
          items: ga4Items,
          value: createdOrder.total,
          shipping: createdOrder.shipping_cost || 0,
          currency: 'EUR',
        });

      } catch (err: any) {
        console.error('Erreur création/récupération commande:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    createAndFetchOrder();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement de votre commande...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Commande non trouvée
          </h1>
          <p className="text-gray-600 mb-8">
            {error || 'Impossible de récupérer les informations de votre commande.'}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg font-medium"
          >
            Retour à l'accueil
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Success Section */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8" />
              C'est validé !
              <Sparkles className="w-8 h-8" />
            </h1>

            <p className="text-xl md:text-2xl mb-6 text-green-50">
              Votre commande a bien été enregistrée 🎉
            </p>

            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/30">
              <Package className="w-6 h-6" />
              <span className="font-bold text-lg">Commande N° {order.order_number}</span>
            </div>
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                📧 Email de confirmation envoyé
              </h3>
              <p className="text-gray-700 mb-1">
                Un récapitulatif complet de votre commande vient d'être envoyé à :
              </p>
              <p className="font-semibold text-blue-600 mb-3">
                {order.customer_email}
              </p>
              <p className="text-sm text-gray-600">
                💡 <strong>Astuce :</strong> Vérifiez vos spams si vous ne le voyez pas dans votre boîte de réception.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            Récapitulatif de votre commande
          </h2>

          <div className="space-y-4 mb-6">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start pb-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 p-3 rounded-lg transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">{item.product_name}</p>
                  <p className="text-sm text-gray-600">
                    Quantité : <span className="font-medium">{item.quantity}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-lg">{(item.total_price || 0).toFixed(2)} €</p>
                  <p className="text-sm text-gray-500">{(item.unit_price || 0).toFixed(2)} € / unité</p>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal et frais de livraison */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            {order.subtotal !== undefined && (
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-medium">Sous-total</span>
                <span className="font-semibold">{(order.subtotal || 0).toFixed(2)} €</span>
              </div>
            )}
            {order.shipping_cost !== undefined && (
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-medium">Frais de livraison</span>
                <span className="font-semibold">{(order.shipping_cost || 0).toFixed(2)} €</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-6 border-t-2 border-gray-300">
            <span className="text-xl font-bold text-gray-900">Total payé</span>
            <span className="text-3xl font-bold text-green-600">
              {(order.amount_total || 0).toFixed(2)} €
            </span>
          </div>
        </div>

        {/* Order Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Payment Status */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-start gap-3">
              <CreditCard className="w-6 h-6 text-green-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Statut du paiement</p>
                <p className="text-lg font-bold text-green-600">
                  ✅ {order.payment_status === 'paid' ? 'Paiement confirmé' : order.payment_status}
                </p>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-start gap-3">
              <Package className="w-6 h-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Statut de la commande</p>
                <p className="text-lg font-bold text-blue-600">
                  📦 {order.status === 'processing' ? 'En cours de traitement' : order.status === 'pending' ? 'En préparation' : order.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 md:p-8 mb-8 border border-purple-200">
          <div className="flex items-start gap-4">
            <Truck className="w-8 h-8 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-xl">
                📋 Les prochaines étapes
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">1.</span>
                  <span>Votre commande est en cours de préparation dans nos entrepôts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">2.</span>
                  <span>Vous recevrez un email avec le numéro de suivi dès l'expédition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">3.</span>
                  <span>Livraison estimée sous <strong>2 à 3 jours ouvrés</strong> 🚚</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">4.</span>
                  <span>Suivez votre commande en temps réel depuis votre espace client</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Account CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white text-center shadow-xl">
          <Package className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">
            Suivez vos commandes
          </h3>
          <div className="mb-6 text-blue-100 space-y-2">
            <p className="font-medium">
              📱 <strong>Pas encore de compte ?</strong>
            </p>
            <p className="text-sm">
              Créez votre compte avec l'email <strong className="text-white">{order.customer_email}</strong> pour retrouver automatiquement cette commande et suivre son statut en temps réel.
            </p>
            <p className="text-sm mt-3">
              💡 <strong>Vous avez déjà un compte ?</strong> Connectez-vous pour accéder au récapitulatif de toutes vos commandes dans votre espace client.
            </p>
          </div>
          <Link
            href="/compte?tab=orders"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all hover:shadow-lg font-bold"
          >
            Accéder à mon espace
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-4 rounded-xl border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold shadow-sm"
          >
            Retour à l'accueil
          </Link>

          <Link
            href="/nos-produits"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-lg hover:shadow-xl"
          >
            Continuer mes achats
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Order Date Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>
            Commande passée le{' '}
            {new Date(order.created_at).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
