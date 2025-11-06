'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Truck, Package, Clock, RefreshCw, Shield, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/data/products';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  return (
    <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <Tabs defaultValue="reviews" className="space-y-8">
        <TabsList className="grid grid-cols-2 w-full max-w-2xl mx-auto bg-gray-50 p-1 rounded-xl">
          <TabsTrigger value="reviews" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">
            Avis ({product.rating?.count || 0})
          </TabsTrigger>
          <TabsTrigger value="shipping" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">
            Livraison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {/* Afficher les étoiles même sans avis rédigés */}
            {product.rating && product.rating.count > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold">
                      {product.rating.average.toFixed(1)}
                    </p>
                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(product.rating?.average || 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.rating.count} évaluations
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Message pour laisser un avis */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex justify-center">
                  <div className="bg-gray-100 rounded-full p-4">
                    <Star className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Partagez votre expérience
                </h3>
                <p className="text-gray-600">
                  Vous avez acheté ce produit ? Aidez les autres clients en partageant votre avis !
                </p>
                <Button variant="default" className="mt-4" disabled>
                  <Star className="h-4 w-4 mr-2" />
                  Laisser un avis
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  *Disponible après achat du produit
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Informations de livraison</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Livraison express</p>
                    <p className="text-sm text-gray-600">
                      Livraison en {'24-48h'} à La Réunion (974)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Frais de port offerts</p>
                    <p className="text-sm text-gray-600">
                      Pour toute commande supérieure à 50€
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Préparation rapide</p>
                    <p className="text-sm text-gray-600">
                      Commande préparée le jour même si passée avant 14h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Politique de retour</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">14 jours pour changer d'avis</p>
                    <p className="text-sm text-gray-600">
                      Retour gratuit sous 14 jours après réception
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Garantie {'2 ans'}</p>
                    <p className="text-sm text-gray-600">
                      Garantie constructeur couvrant les défauts de fabrication
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Service après-vente local</p>
                    <p className="text-sm text-gray-600">
                      SAV disponible à La Réunion pour un support rapide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
