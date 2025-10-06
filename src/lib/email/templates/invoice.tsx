import * as React from 'react';

interface OrderItem {
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface InvoiceEmailProps {
  invoiceNumber: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  billingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  orderDate: string;
  paymentMethod: string;
}

export const InvoiceEmail: React.FC<InvoiceEmailProps> = ({
  invoiceNumber,
  orderNumber,
  customerName,
  customerEmail,
  billingAddress,
  shippingAddress,
  items,
  subtotal,
  shipping,
  tax,
  total,
  orderDate,
  paymentMethod,
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
          max-width: 700px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
          color: white;
          padding: 40px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-left h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
        }
        .header-left p {
          margin: 5px 0 0;
          font-size: 14px;
          opacity: 0.9;
        }
        .header-right {
          text-align: right;
        }
        .invoice-number {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        .invoice-date {
          font-size: 13px;
          opacity: 0.9;
        }
        .content {
          padding: 40px;
        }
        .addresses {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin: 30px 0;
        }
        .address-block h3 {
          margin: 0 0 12px;
          font-size: 14px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .address-block p {
          margin: 3px 0;
          font-size: 14px;
          color: #333;
        }
        .divider {
          height: 1px;
          background: #e5e7eb;
          margin: 30px 0;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
        }
        .items-table thead {
          background: #f8f9fa;
        }
        .items-table th {
          padding: 12px;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #dee2e6;
          font-size: 13px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .items-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }
        .items-table tr:last-child td {
          border-bottom: none;
        }
        .summary-table {
          margin-left: auto;
          width: 300px;
          margin-top: 20px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          font-size: 14px;
        }
        .summary-row.total {
          border-top: 2px solid #1e3a8a;
          margin-top: 10px;
          padding-top: 15px;
          font-size: 18px;
          font-weight: 700;
          color: #1e3a8a;
        }
        .payment-info {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
        }
        .payment-info h3 {
          margin: 0 0 12px;
          font-size: 16px;
          color: #333;
        }
        .payment-info p {
          margin: 5px 0;
          font-size: 14px;
          color: #666;
        }
        .footer {
          background: #f8f9fa;
          padding: 30px 40px;
          text-align: center;
          font-size: 13px;
          color: #666;
          border-top: 1px solid #dee2e6;
        }
        .footer p {
          margin: 5px 0;
        }
        .footer-company {
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }
        .legal {
          margin-top: 20px;
          font-size: 12px;
          color: #999;
          line-height: 1.4;
        }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <div className="header-left">
            <h1>FACTURE</h1>
            <p>Monster Phone Boutique</p>
          </div>
          <div className="header-right">
            <div className="invoice-number">N° {invoiceNumber}</div>
            <div className="invoice-date">
              {new Date(orderDate).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="addresses">
            <div className="address-block">
              <h3>🏢 Vendeur</h3>
              <p><strong>Monster Phone Boutique</strong></p>
              <p>La Réunion</p>
              <p>France 🇷🇪</p>
              <p style={{ marginTop: '10px' }}>
                SIRET : [À compléter]<br />
                TVA : [À compléter]
              </p>
            </div>

            <div className="address-block">
              <h3>👤 Client</h3>
              <p><strong>{customerName}</strong></p>
              <p>{customerEmail}</p>
              <p style={{ marginTop: '10px' }}>
                {billingAddress.street}<br />
                {billingAddress.postalCode} {billingAddress.city}<br />
                {billingAddress.country}
              </p>
            </div>
          </div>

          <div className="divider"></div>

          <div style={{ marginBottom: '20px' }}>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              <strong>Commande :</strong> #{orderNumber}
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              <strong>Adresse de livraison :</strong>
              {' '}
              {shippingAddress.street}, {shippingAddress.postalCode} {shippingAddress.city}, {shippingAddress.country}
            </p>
          </div>

          <table className="items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th style={{ textAlign: 'center', width: '80px' }}>Qté</th>
                <th style={{ textAlign: 'right', width: '100px' }}>Prix unit.</th>
                <th style={{ textAlign: 'right', width: '100px' }}>Total HT</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <strong>{item.product_name}</strong>
                  </td>
                  <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right' }}>{item.unit_price.toFixed(2)} €</td>
                  <td style={{ textAlign: 'right' }}>{item.total_price.toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="summary-table">
            <div className="summary-row">
              <span>Sous-total HT</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="summary-row">
              <span>Frais de port</span>
              <span>{shipping.toFixed(2)} €</span>
            </div>
            <div className="summary-row">
              <span>TVA (20%)</span>
              <span>{tax.toFixed(2)} €</span>
            </div>
            <div className="summary-row total">
              <span>Total TTC</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>

          <div className="payment-info">
            <h3>💳 Informations de paiement</h3>
            <p><strong>Mode de paiement :</strong> {paymentMethod}</p>
            <p><strong>Statut :</strong> ✅ Payé</p>
            <p><strong>Date de paiement :</strong> {new Date(orderDate).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>

          <div style={{ background: '#e0f2fe', border: '1px solid #0ea5e9', borderRadius: '8px', padding: '15px', marginTop: '30px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#0c4a6e' }}>
              <strong>ℹ️ Information :</strong> Ce document constitue votre facture officielle.
              Conservez-le précieusement pour toute garantie ou réclamation.
            </p>
          </div>
        </div>

        <div className="footer">
          <p className="footer-company">Monster Phone Boutique</p>
          <p>La Réunion, France 🇷🇪</p>
          <p style={{ marginTop: '10px' }}>
            Email : contact@monsterphone.re | Tél : [À compléter]
          </p>

          <div className="legal">
            <p>
              TVA non applicable, article 293 B du CGI - Dispensé d'immatriculation au registre du commerce et des sociétés (RCS)<br />
              Conformément à la loi Informatique et Libertés, vous disposez d'un droit d'accès et de rectification aux données vous concernant.
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>
);
