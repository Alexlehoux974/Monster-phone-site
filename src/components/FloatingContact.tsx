'use client';

import { useState, useRef, useEffect } from 'react';

const WHATSAPP_NUMBER = '262692000000'; // TODO: remplacer par le vrai numéro

interface Message {
  id: number;
  text: string;
  from: 'bot' | 'user';
  time: string;
}

const now = () => new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Bonjour ! 👋 Bienvenue chez Monster Phone. Notre assistant est en cours de mise en place et sera bientôt disponible pour répondre à vos questions.',
      from: 'bot',
      time: now(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now(), text, from: 'user', time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Envoyer vers WhatsApp dans un nouvel onglet
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Message de confirmation
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Votre message a été envoyé sur WhatsApp. Nous vous répondrons très vite ! 🚀',
          from: 'bot',
          time: now(),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-4 z-[80] flex flex-col items-end">
      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="mb-3 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col" style={{ maxHeight: 'min(500px, 70vh)' }}>
          {/* Header */}
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">Monster Phone</p>
              <p className="text-xs text-green-200">En ligne</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#ECE5DD]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h200v200H0z\' fill=\'%23ECE5DD\'/%3E%3Cpath d=\'M20 20h4v4h-4zm40 0h4v4h-4zm40 0h4v4h-4zm40 0h4v4h-4zm40 0h4v4h-4zM0 40h4v4H0zm40 0h4v4h-4zm40 0h4v4h-4zm40 0h4v4h-4zm40 0h4v4h-4z\' fill=\'%23d5cfc4\' opacity=\'.15\'/%3E%3C/svg%3E")' }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm shadow-sm ${
                    msg.from === 'user'
                      ? 'bg-[#DCF8C6] text-gray-900 rounded-tr-none'
                      : 'bg-white text-gray-900 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${msg.from === 'user' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input désactivé - bientôt disponible */}
          <div className="p-3 bg-[#F0F0F0] flex-shrink-0">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-200 text-gray-500 text-sm min-h-[44px]">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Bientôt disponible</span>
            </div>
          </div>
        </div>
      )}

      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat WhatsApp'}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </button>
    </div>
  );
}
