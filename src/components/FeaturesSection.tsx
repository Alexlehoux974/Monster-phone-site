'use client';

import { motion } from "framer-motion";
import { Shield, Zap, Star, Headphones } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-purple-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pourquoi choisir Monster Phone ?
          </h3>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Nous révolutionnons l&apos;expérience gaming mobile avec des accessoires de qualité premium
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: "Protection Ultime",
              description: "Résistance aux chocs et rayures garantie",
            },
            {
              icon: Zap,
              title: "Performance Max",
              description: "Optimisé pour les sessions gaming intensives",
            },
            {
              icon: Star,
              title: "Qualité Premium",
              description: "Matériaux haut de gamme et finitions parfaites",
            },
            {
              icon: Headphones,
              title: "Son Immersif",
              description: "Audio cristallin pour une expérience totale",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-gray-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}