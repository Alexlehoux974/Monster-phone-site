import * as React from 'react';

interface CartItem {
  product_name: string;
  product_image?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface AbandonedCartEmailProps {
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  checkoutUrl: string;
  expiresAt: string;
}

export const AbandonedCartEmail: React.FC<AbandonedCartEmailProps> = ({
  customerName,
  items,
  subtotal,
  total,
  checkoutUrl,
  expiresAt,
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
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
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
        .urgency-banner {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .urgency-banner p {
          margin: 0;
          color: #92400e;
          font-weight: 600;
        }
        .items-container {
          margin: 30px 0;
        }
        .item {
          display: flex;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #e5e7eb;
          gap: 15px;
        }
        .item:last-child {
          border-bottom: none;
        }
        .item-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          background: #f3f4f6;
        }
        .item-details {
          flex: 1;
        }
        .item-name {
          font-weight: 600;
          font-size: 16px;
          color: #111827;
          margin: 0 0 5px 0;
        }
        .item-quantity {
          color: #6b7280;
          font-size: 14px;
        }
        .item-price {
          font-weight: 600;
          color: #111827;
          font-size: 16px;
        }
        .total-section {
          background: #f9fafb;
          padding: 20px;
          margin: 30px 0;
          border-radius: 8px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .total-row.final {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          padding-top: 10px;
          border-top: 2px solid #e5e7eb;
          margin-top: 10px;
        }
        .benefits {
          background: #ecfdf5;
          border: 1px solid #10b981;
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
        }
        .benefits h3 {
          margin: 0 0 15px 0;
          color: #065f46;
          font-size: 18px;
        }
        .benefit-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 10px 0;
          color: #047857;
        }
        .benefit-icon {
          font-size: 20px;
        }
        .cta-button {
          display: block;
          width: 100%;
          max-width: 400px;
          margin: 30px auto;
          padding: 18px 40px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          text-align: center;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
          transition: transform 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
        }
        .social-proof {
          text-align: center;
          margin: 30px 0;
          padding: 20px;
          background: #f9fafb;
          border-radius: 8px;
        }
        .stars {
          color: #f59e0b;
          font-size: 24px;
          margin-bottom: 10px;
        }
        .testimonial {
          font-style: italic;
          color: #6b7280;
          margin: 10px 0;
        }
        .footer {
          background: #f9fafb;
          padding: 30px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .footer a {
          color: #f59e0b;
          text-decoration: none;
        }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>🛒 Votre panier vous attend !</h1>
          <p>Ne laissez pas partir ces produits gaming</p>
        </div>

        <div className="content">
          <p className="greeting">
            Bonjour {customerName},
          </p>

          <p>
            Nous avons remarqué que vous avez laissé des articles dans votre panier.
            Vos équipements gaming préférés sont toujours disponibles !
          </p>

          <div className="urgency-banner">
            <p>⏰ Votre panier expire le {new Date(expiresAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>

          <div className="items-container">
            {items.map((item, index) => (
              <div key={index} className="item">
                {item.product_image && (
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="item-image"
                  />
                )}
                <div className="item-details">
                  <p className="item-name">{item.product_name}</p>
                  <p className="item-quantity">Quantité: {item.quantity}</p>
                </div>
                <div className="item-price">
                  {item.total_price.toFixed(2)}€
                </div>
              </div>
            ))}
          </div>

          <div className="total-section">
            <div className="total-row">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)}€</span>
            </div>
            <div className="total-row final">
              <span>Total</span>
              <span>{total.toFixed(2)}€</span>
            </div>
          </div>

          <div className="benefits">
            <h3>🎁 Pourquoi choisir Monster Phone ?</h3>
            <div className="benefit-item">
              <span className="benefit-icon">✅</span>
              <span><strong>Livraison Gratuite</strong> dès 50€ d'achat</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🔒</span>
              <span><strong>Paiement Sécurisé</strong> 100% garanti</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📦</span>
              <span><strong>Expédition Rapide</strong> sous 24-48h</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">↩️</span>
              <span><strong>Retours Gratuits</strong> sous 30 jours</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎮</span>
              <span><strong>Produits Gaming</strong> testés et approuvés</span>
            </div>
          </div>

          <a href={checkoutUrl} className="cta-button">
            🚀 Finaliser ma commande maintenant
          </a>

          <div className="social-proof">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial">
              "Livraison ultra rapide et produits de qualité ! Je recommande Monster Phone à tous les gamers."
            </p>
            <p><strong>- Thomas, client satisfait</strong></p>
          </div>

          <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '30px' }}>
            Une question ? Notre équipe est là pour vous aider !<br />
            Répondez simplement à cet email ou contactez-nous.
          </p>
        </div>

        <div className="footer">
          <p>
            <strong>Monster Phone Boutique</strong><br />
            16 Rue Claude Chappe, ZAE 2000<br />
            97290 Le Port, La Réunion<br />
            📞 02 62 02 51 02
          </p>
          <p style={{ marginTop: '20px' }}>
            <a href="https://monster-phone.re">Visiter notre boutique</a> |
            <a href="https://monster-phone.re/contact"> Nous contacter</a>
          </p>
          <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '20px' }}>
            Vous recevez cet email car vous avez laissé des articles dans votre panier sur monster-phone.re
          </p>
        </div>
      </div>
    </body>
  </html>
);
