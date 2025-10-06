import * as React from 'react';

interface OrderItem {
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  orderDate: string;
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  orderNumber,
  customerName,
  customerEmail,
  items,
  subtotal,
  total,
  orderDate,
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
        .order-info {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 15px 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .order-info p {
          margin: 5px 0;
          font-size: 14px;
        }
        .order-info strong {
          color: #667eea;
          font-weight: 600;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .items-table th {
          background: #f8f9fa;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #dee2e6;
          font-size: 14px;
        }
        .items-table td {
          padding: 12px;
          border-bottom: 1px solid #dee2e6;
          font-size: 14px;
        }
        .items-table tr:last-child td {
          border-bottom: none;
        }
        .total-row {
          background: #f8f9fa;
          font-weight: 600;
        }
        .total-row td {
          padding: 15px 12px;
          font-size: 16px;
          color: #667eea;
        }
        .next-steps {
          background: #e7f3ff;
          border: 1px solid #b3d9ff;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
        }
        .next-steps h3 {
          margin: 0 0 15px;
          color: #0066cc;
          font-size: 16px;
        }
        .next-steps ul {
          margin: 0;
          padding-left: 20px;
        }
        .next-steps li {
          margin: 8px 0;
          font-size: 14px;
          color: #333;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 14px 32px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          margin: 20px 0;
          font-size: 15px;
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
          color: #667eea;
          text-decoration: none;
        }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>🎉 Commande confirmée !</h1>
          <p>Merci pour votre confiance</p>
        </div>

        <div className="content">
          <p className="greeting">Bonjour {customerName},</p>

          <p>
            Nous avons bien reçu votre commande et elle est actuellement en cours de traitement.
            Vous recevrez un email de confirmation d'expédition dès que votre colis sera prêt à partir ! 📦
          </p>

          <div className="order-info">
            <p><strong>Numéro de commande :</strong> #{orderNumber}</p>
            <p><strong>Date :</strong> {new Date(orderDate).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p><strong>Email :</strong> {customerEmail}</p>
          </div>

          <h2 style={{ fontSize: '20px', marginTop: '30px', marginBottom: '15px' }}>
            📋 Récapitulatif de votre commande
          </h2>

          <table className="items-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th style={{ textAlign: 'center' }}>Qté</th>
                <th style={{ textAlign: 'right' }}>Prix unitaire</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.product_name}</td>
                  <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right' }}>{item.unit_price.toFixed(2)} €</td>
                  <td style={{ textAlign: 'right' }}>{item.total_price.toFixed(2)} €</td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan={3} style={{ textAlign: 'right' }}>Sous-total</td>
                <td style={{ textAlign: 'right' }}>{subtotal.toFixed(2)} €</td>
              </tr>
              <tr className="total-row">
                <td colSpan={3} style={{ textAlign: 'right' }}>
                  <strong>Total TTC</strong>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <strong>{total.toFixed(2)} €</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="next-steps">
            <h3>📌 Les prochaines étapes</h3>
            <ul>
              <li>✅ Votre paiement a été confirmé</li>
              <li>📦 Nous préparons votre commande avec soin</li>
              <li>🚚 Expédition sous 24-48h ouvrées</li>
              <li>📧 Vous recevrez un email avec le numéro de suivi</li>
              <li>🏠 Livraison estimée : 2-5 jours ouvrés</li>
            </ul>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/account/orders`} className="cta-button">
              Suivre ma commande
            </a>
          </div>

          <p style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
            Une question ? Notre équipe est là pour vous aider !
            Répondez simplement à cet email ou contactez-nous.
          </p>
        </div>

        <div className="footer">
          <p><strong>Monster Phone Boutique</strong></p>
          <p>La Réunion, France 🇷🇪</p>
          <p style={{ marginTop: '10px' }}>
            <a href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>Visiter le site</a>
          </p>
          <p style={{ marginTop: '15px', fontSize: '12px', color: '#999' }}>
            Vous recevez cet email car vous avez passé commande sur Monster Phone Boutique.
          </p>
        </div>
      </div>
    </body>
  </html>
);
