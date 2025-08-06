'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PaymentLogos() {
  const paymentMethods = [
    {
      name: 'Visa',
      image: '/payment-logos/visa.png',
      width: 60,
      height: 40,
    },
    {
      name: 'Mastercard',
      image: '/payment-logos/mastercard.png',
      width: 60,
      height: 40,
    },
    {
      name: 'American Express',
      image: '/payment-logos/american-express.png',
      width: 60,
      height: 40,
    },
    {
      name: 'PayPal',
      image: null, // Utilisation d'un SVG inline
      width: 70,
      height: 30,
      svg: true,
    },
    {
      name: 'Stripe',
      image: '/payment-logos/stripe.png',
      width: 70,
      height: 30,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Badge de sécurité principal */}
      <div className="flex items-center gap-2 text-sm text-gray-200">
        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">Paiement 100% sécurisé</span>
      </div>

      {/* Conteneur des logos de paiement */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.name}
            className="bg-white rounded-md px-3 py-2 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            title={`${method.name} - Paiement sécurisé`}
            style={{ minWidth: '80px', height: '45px' }}
          >
            {method.svg ? (
              // Logo PayPal en SVG
              <svg width="60" height="20" viewBox="0 0 100 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.8 6.4H35.7C35.4 6.4 35.1 6.6 35 6.9L33 19.7C33 19.9 33.1 20.1 33.4 20.1H36C36.2 20.1 36.4 20 36.4 19.8L37 16.3C37.1 16 37.4 15.8 37.7 15.8H39.2C42.6 15.8 44.5 14.2 45.1 10.9C45.3 9.5 45.1 8.3 44.4 7.5C43.7 6.7 42.4 6.4 40.8 6.4ZM41.4 11.2C41.1 12.7 39.9 12.7 38.7 12.7H38L38.5 9.7C38.5 9.5 38.7 9.4 38.9 9.4H39.2C40 9.4 40.8 9.4 41.1 9.8C41.4 10.1 41.5 10.5 41.4 11.2Z" fill="#003087"/>
                <path d="M57.1 11.1H54.5C54.3 11.1 54.1 11.3 54.1 11.4L54 12L53.8 11.7C53.2 10.8 52 10.6 50.8 10.6C48.1 10.6 45.8 12.7 45.3 15.6C45.1 17 45.4 18.4 46.2 19.3C47 20.2 48.1 20.6 49.3 20.6C51.4 20.6 52.6 19.3 52.6 19.3L52.5 19.9C52.5 20.1 52.6 20.3 52.9 20.3H55.2C55.5 20.3 55.8 20.1 55.8 19.8L57.4 11.5C57.5 11.3 57.4 11.1 57.1 11.1ZM53.5 15.7C53.3 17 52.3 17.9 51 17.9C50.4 17.9 49.8 17.7 49.5 17.3C49.2 16.9 49 16.4 49.1 15.7C49.3 14.4 50.3 13.5 51.5 13.5C52.1 13.5 52.7 13.7 53 14.1C53.3 14.5 53.5 15 53.5 15.7Z" fill="#003087"/>
                <path d="M70.9 11.1H68.3C68.1 11.1 67.8 11.2 67.7 11.4L64.1 17.2L62.5 11.6C62.4 11.3 62.2 11.1 61.9 11.1H59.3C59 11.1 58.8 11.4 58.9 11.7L62.1 19.8L59.1 24.1C58.9 24.4 59.1 24.8 59.5 24.8H62.1C62.3 24.8 62.6 24.7 62.7 24.5L71.3 11.8C71.5 11.5 71.3 11.1 70.9 11.1Z" fill="#009CDE"/>
                <path d="M78.8 6.4H73.7C73.4 6.4 73.1 6.6 73 6.9L71 19.7C71 19.9 71.1 20.1 71.4 20.1H74.2C74.4 20.1 74.6 20 74.6 19.8L75.2 16.3C75.3 16 75.6 15.8 75.9 15.8H77.4C80.8 15.8 82.7 14.2 83.3 10.9C83.5 9.5 83.3 8.3 82.6 7.5C81.9 6.7 80.6 6.4 78.8 6.4ZM79.4 11.2C79.1 12.7 77.9 12.7 76.7 12.7H76L76.5 9.7C76.5 9.5 76.7 9.4 76.9 9.4H77.2C78 9.4 78.8 9.4 79.1 9.8C79.4 10.1 79.5 10.5 79.4 11.2Z" fill="#009CDE"/>
                <path d="M95.1 11.1H92.5C92.3 11.1 92.1 11.3 92.1 11.4L92 12L91.8 11.7C91.2 10.8 90 10.6 88.8 10.6C86.1 10.6 83.8 12.7 83.3 15.6C83.1 17 83.4 18.4 84.2 19.3C85 20.2 86.1 20.6 87.3 20.6C89.4 20.6 90.6 19.3 90.6 19.3L90.5 19.9C90.5 20.1 90.6 20.3 90.9 20.3H93.2C93.5 20.3 93.8 20.1 93.8 19.8L95.4 11.5C95.5 11.3 95.4 11.1 95.1 11.1ZM91.5 15.7C91.3 17 90.3 17.9 89 17.9C88.4 17.9 87.8 17.7 87.5 17.3C87.2 16.9 87 16.4 87.1 15.7C87.3 14.4 88.3 13.5 89.5 13.5C90.1 13.5 90.7 13.7 91 14.1C91.3 14.5 91.5 15 91.5 15.7Z" fill="#009CDE"/>
                <path d="M97.2 6.7L95.2 19.7C95.2 19.9 95.3 20.1 95.6 20.1H97.6C97.9 20.1 98.2 19.9 98.3 19.6L100.3 6.8C100.3 6.6 100.2 6.4 99.9 6.4H97.6C97.4 6.4 97.2 6.5 97.2 6.7Z" fill="#009CDE"/>
                <path d="M7.7 22.4L8.1 19.7L7.3 19.7H3.5L5.9 2.9C5.9 2.8 6 2.7 6.1 2.7C6.1 2.6 6.2 2.6 6.3 2.6H12.6C14.6 2.6 16 3.1 16.8 4C17.2 4.4 17.5 4.8 17.6 5.4C17.7 6 17.7 6.7 17.5 7.5V7.9L17.8 8.1C18.1 8.2 18.3 8.4 18.5 8.6C18.8 8.9 19 9.3 19.1 9.8C19.2 10.3 19.2 10.9 19 11.6C18.8 12.5 18.6 13.2 18.2 13.8C17.9 14.3 17.5 14.7 17 15C16.5 15.3 16 15.5 15.4 15.6C14.8 15.7 14.1 15.8 13.4 15.8H12.9C12.6 15.8 12.3 15.9 12 16.1C11.8 16.3 11.6 16.6 11.6 16.9L11.5 17.1L10.9 21.2V21.3C10.9 21.4 10.8 21.4 10.8 21.5C10.8 21.5 10.7 21.5 10.7 21.5H7.7V22.4Z" fill="#003087"/>
                <path d="M18.2 7.6C18.2 7.7 18.1 7.8 18.1 7.9C17.4 11.5 15.3 12.9 12.3 12.9H10.8C10.4 12.9 10.1 13.2 10 13.6L9.3 18.3L9.1 19.8C9 20 9.2 20.3 9.4 20.3H11.7C12.1 20.3 12.4 20 12.4 19.7L12.5 19.6L13 15.5L13.1 15.3C13.1 15 13.5 14.7 13.8 14.7H14.3C17.1 14.7 19.3 13.5 19.9 10.3C20.1 9.1 20 8 19.5 7.3C19.2 7.2 19 7.3 18.2 7.6Z" fill="#009CDE"/>
                <path d="M17.5 7.3C17.4 7.3 17.3 7.2 17.2 7.2C17.1 7.2 17 7.1 16.9 7.1C16.5 7 16 7 15.4 7H11.6C11.5 7 11.4 7 11.3 7.1C11.1 7.2 10.9 7.4 10.9 7.7L10.1 13.3L10 13.6C10.1 13.2 10.4 12.9 10.8 12.9H12.3C15.3 12.9 17.4 11.5 18.1 7.9C18.1 7.8 18.2 7.7 18.2 7.6C18 7.5 17.8 7.4 17.5 7.3Z" fill="#003087"/>
              </svg>
            ) : (
              <Image
                src={method.image}
                alt={method.name}
                width={method.width}
                height={method.height}
                className="object-contain"
                style={{ width: 'auto', height: 'auto', maxHeight: '30px' }}
                priority
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Texte de sécurité et certifications */}
      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="flex items-center gap-4 text-xs text-gray-300">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
            <span>SSL 256-bit</span>
          </div>
          <span className="text-gray-500">•</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>Certifié PCI DSS</span>
          </div>
          <span className="text-gray-500">•</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <span>Données cryptées</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-400 text-center max-w-md">
          Vos informations de paiement sont protégées et ne sont jamais stockées sur nos serveurs
        </p>
      </div>
    </div>
  );
}