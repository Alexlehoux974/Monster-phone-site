import * as React from 'react';

interface ShippingNotificationEmailProps {
  orderNumber: string;
  customerName: string;
  trackingNumber: string;
  trackingUrl: string;
  carrier: string;
  estimatedDelivery: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export const ShippingNotificationEmail: React.FC<ShippingNotificationEmailProps> = ({
  orderNumber,
  customerName,
  trackingNumber,
  trackingUrl,
  carrier,
  estimatedDelivery,
  shippingAddress,
}) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <style>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f7f7f7;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .header p {
          margin: 10px 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          padding: 30px;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
          color: #333;
        }
        .tracking-box {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border-radius: 12px;
          padding: 25px;
          margin: 25px 0;
          text-align: center;
        }
        .tracking-box h3 {
          margin: 0 0 10px;
          font-size: 14px;
          opacity: 0.9;
          font-weight: 500;
        }
        .tracking-number {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 2px;
          margin: 10px 0 20px;
          font-family: 'Courier New', monospace;
        }
        .track-button {
          display: inline-block;
          background: white;
          color: #10b981;
          padding: 12px 32px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          margin-top: 10px;
          font-size: 15px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 25px 0;
        }
        .info-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          border-left: 4px solid #10b981;
        }
        .info-card h4 {
          margin: 0 0 10px;
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
        .info-card p {
          margin: 5px 0;
          font-size: 15px;
          color: #333;
          font-weight: 600;
        }
        .address-box {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
          border-left: 4px solid #10b981;
        }
        .address-box h4 {
          margin: 0 0 12px;
          font-size: 16px;
          color: #333;
        }
        .address-box p {
          margin: 3px 0;
          font-size: 14px;
          color: #666;
        }
        .timeline {
          margin: 30px 0;
        }
        .timeline-item {
          display: flex;
          align-items: flex-start;
          margin: 15px 0;
          padding-left: 30px;
          position: relative;
        }
        .timeline-item::before {
          content: '✓';
          position: absolute;
          left: 0;
          width: 24px;
          height: 24px;
          background: #10b981;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
        }
        .timeline-item.pending::before {
          content: '';
          background: #e5e7eb;
        }
        .timeline-text {
          font-size: 14px;
          color: #333;
          margin-left: 15px;
        }
        .footer {
          background: #f8f9fa;
          padding: 25px 30px;
          text-align: center;
          font-size: 13px;
          color: #666;
          border-top: 1px solid #dee2e6;
        }
        .footer p {
          margin: 5px 0;
        }
        .footer a {
          color: #10b981;
          text-decoration: none;
        }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>🚚 Colis expédié !</h1>
          <p>Votre commande est en route</p>
        </div>

        <div className="content">
          <p className="greeting">Bonne nouvelle {customerName} ! 🎉</p>

          <p>
            Votre commande <strong>#{orderNumber}</strong> a été expédiée et est maintenant en route vers vous.
            Vous pouvez suivre son acheminement en temps réel avec le numéro de suivi ci-dessous.
          </p>

          <div className="tracking-box">
            <h3>📦 Numéro de suivi</h3>
            <div className="tracking-number">{trackingNumber}</div>
            <a href={trackingUrl} className="track-button">
              Suivre mon colis
            </a>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <h4>🚛 Transporteur</h4>
              <p>{carrier}</p>
            </div>
            <div className="info-card">
              <h4>📅 Livraison estimée</h4>
              <p>{new Date(estimatedDelivery).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}</p>
            </div>
          </div>

          <div className="address-box">
            <h4>📍 Adresse de livraison</h4>
            <p>{shippingAddress.street}</p>
            <p>{shippingAddress.postalCode} {shippingAddress.city}</p>
            <p>{shippingAddress.country}</p>
          </div>

          <h3 style={{ fontSize: '18px', marginTop: '30px', marginBottom: '20px' }}>
            ⏱️ Progression de la livraison
          </h3>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-text">
                <strong>Commande confirmée</strong>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '3px' }}>
                  Paiement validé
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-text">
                <strong>Colis préparé</strong>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '3px' }}>
                  Emballé avec soin
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-text">
                <strong>Expédié</strong>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '3px' }}>
                  En cours d'acheminement
                </div>
              </div>
            </div>
            <div className="timeline-item pending">
              <div className="timeline-text">
                <strong>En cours de livraison</strong>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '3px' }}>
                  Prochaine étape
                </div>
              </div>
            </div>
            <div className="timeline-item pending">
              <div className="timeline-text">
                <strong>Livré</strong>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '3px' }}>
                  À votre domicile
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '8px', padding: '15px', margin: '25px 0' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
              <strong>💡 Conseil :</strong> Pensez à vérifier vos disponibilités pour la réception.
              Si vous êtes absent, le transporteur laissera un avis de passage.
            </p>
          </div>

          <p style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
            Des questions sur votre livraison ? N'hésitez pas à nous contacter,
            nous sommes là pour vous aider ! 😊
          </p>
        </div>

        <div className="footer">
          <p><strong>Monster Phone Boutique</strong></p>
          <p>La Réunion, France 🇷🇪</p>
          <p style={{ marginTop: '10px' }}>
            <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/account/orders/${orderNumber}`}>
              Voir ma commande
            </a>
          </p>
          <p style={{ marginTop: '15px', fontSize: '12px', color: '#999' }}>
            Vous recevez cet email car votre commande a été expédiée.
          </p>
        </div>
      </div>
    </body>
  </html>
);
