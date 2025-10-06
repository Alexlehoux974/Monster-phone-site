import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, MapPin, CreditCard } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // Récupérer la commande avec ses items
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        product_name,
        quantity,
        unit_price,
        total_price,
        product_metadata
      )
    `)
    .eq('id', id)
    .single();

  if (error || !order) {
    notFound();
  }

  // Statut de la commande avec style
  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    const labels = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      processing: 'En préparation',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles] || styles.pending}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  // Statut de paiement
  const getPaymentStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };

    const labels = {
      paid: 'Payé',
      pending: 'En attente',
      failed: 'Échoué',
      refunded: 'Remboursé',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles] || styles.pending}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/compte"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au tableau de bord
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Commande {order.order_number}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Passée le {new Date(order.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="flex gap-2">
              {getStatusBadge(order.status)}
              {getPaymentStatusBadge(order.payment_status)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Articles de la commande */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Articles commandés ({order.order_items?.length || 0})
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {order.order_items && order.order_items.length > 0 ? (
                  order.order_items.map((item: any) => (
                    <div key={item.id} className="px-6 py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.product_name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Quantité : {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {parseFloat(item.total_price).toFixed(2)} €
                          </p>
                          <p className="text-xs text-gray-500">
                            {parseFloat(item.unit_price).toFixed(2)} € / unité
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500">
                    Aucun article trouvé pour cette commande
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="text-gray-900">{parseFloat(order.subtotal || order.amount_subtotal || 0).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livraison</span>
                    <span className="text-gray-900">{parseFloat(order.shipping_cost || 0).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">{parseFloat(order.total || order.amount_total || 0).toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Suivi de livraison */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Suivi de livraison
                </h2>
              </div>

              <div className="px-6 py-4">
                {order.tracking_number ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Numéro de suivi</p>
                      <p className="text-base font-medium text-gray-900 mt-1">
                        {order.tracking_number}
                      </p>
                    </div>

                    {order.carrier && (
                      <div>
                        <p className="text-sm text-gray-600">Transporteur</p>
                        <p className="text-base font-medium text-gray-900 mt-1">
                          {order.carrier}
                        </p>
                      </div>
                    )}

                    {order.tracking_url && (
                      <a
                        href={order.tracking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Suivre ma livraison
                        <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">
                      Les informations de suivi seront disponibles une fois que votre commande aura été expédiée.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Informations client */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Informations client</h2>
              </div>

              <div className="px-6 py-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nom</p>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    {order.customer_name || 'Non renseigné'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    {order.customer_email}
                  </p>
                </div>

                {order.customer_phone && (
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {order.customer_phone}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Adresse de livraison */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Adresse de livraison
                </h2>
              </div>

              <div className="px-6 py-4">
                {order.shipping_address && typeof order.shipping_address === 'object' ? (
                  <address className="not-italic text-sm text-gray-600 leading-relaxed">
                    {order.shipping_address.line1 && <div>{order.shipping_address.line1}</div>}
                    {order.shipping_address.line2 && <div>{order.shipping_address.line2}</div>}
                    {(order.shipping_address.postal_code || order.shipping_address.city) && (
                      <div>
                        {order.shipping_address.postal_code} {order.shipping_address.city}
                      </div>
                    )}
                    {order.shipping_address.country && <div>{order.shipping_address.country}</div>}
                  </address>
                ) : (
                  <p className="text-sm text-gray-500">Adresse non disponible</p>
                )}
              </div>
            </div>

            {/* Paiement */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Paiement
                </h2>
              </div>

              <div className="px-6 py-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Méthode</p>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    Carte bancaire
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <div className="mt-1">
                    {getPaymentStatusBadge(order.payment_status)}
                  </div>
                </div>

                {order.stripe_payment_intent_id && (
                  <div>
                    <p className="text-sm text-gray-600">ID de transaction</p>
                    <p className="text-xs font-mono text-gray-500 mt-1 break-all">
                      {order.stripe_payment_intent_id}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
