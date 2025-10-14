import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from '@react-email/components';

interface LowStockProduct {
  id: string;
  name: string;
  slug: string;
  variant?: string;
  stock: number;
  imageUrl: string;
}

interface LowStockNotificationProps {
  products: LowStockProduct[];
}

export default function LowStockNotification({ products }: LowStockNotificationProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://monster-phone.re';

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* En-tête */}
          <Section style={header}>
            <Heading style={h1}>⚠️ Alerte Stock Faible</Heading>
            <Text style={subtitle}>
              {products.length} produit{products.length > 1 ? 's ont' : ' a'} un stock inférieur à 5
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Liste des produits */}
          <Section style={productsSection}>
            {products.map((product, index) => (
              <Section key={`${product.id}-${product.variant || 'default'}`} style={productCard}>
                <Text style={productName}>
                  <strong>{product.name}</strong>
                  {product.variant && (
                    <span style={variantBadge}> • {product.variant}</span>
                  )}
                </Text>

                <Text style={stockText}>
                  <span style={getStockStyle(product.stock)}>
                    Stock restant : {product.stock} {product.stock > 1 ? 'unités' : 'unité'}
                  </span>
                </Text>

                <Link
                  href={`${baseUrl}/admin/stock`}
                  style={actionLink}
                >
                  Gérer le stock →
                </Link>

                {index < products.length - 1 && <Hr style={productSeparator} />}
              </Section>
            ))}
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              📊 <Link href={`${baseUrl}/admin/stock`} style={footerLink}>
                Voir tous les stocks
              </Link>
            </Text>
            <Text style={footerText}>
              Cette notification est envoyée quotidiennement pour vous alerter des produits nécessitant un réapprovisionnement.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Helper function pour le style du stock
function getStockStyle(stock: number): React.CSSProperties {
  if (stock === 0) {
    return { ...stockBadge, backgroundColor: '#ef4444', color: '#ffffff' };
  } else if (stock <= 2) {
    return { ...stockBadge, backgroundColor: '#f97316', color: '#ffffff' };
  } else if (stock <= 5) {
    return { ...stockBadge, backgroundColor: '#f59e0b', color: '#ffffff' };
  }
  return { ...stockBadge, backgroundColor: '#10b981', color: '#ffffff' };
}

// Styles
const main: React.CSSProperties = {
  backgroundColor: '#f9fafb',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '32px 24px',
  borderRadius: '8px',
  maxWidth: '600px',
};

const header: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '24px',
};

const h1: React.CSSProperties = {
  color: '#111827',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
};

const subtitle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '16px',
  margin: '0',
};

const hr: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid #e5e7eb',
  margin: '24px 0',
};

const productsSection: React.CSSProperties = {
  marginBottom: '24px',
};

const productCard: React.CSSProperties = {
  padding: '16px 0',
};

const productName: React.CSSProperties = {
  color: '#111827',
  fontSize: '18px',
  margin: '0 0 8px 0',
};

const variantBadge: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: 'normal',
};

const stockText: React.CSSProperties = {
  margin: '8px 0',
};

const stockBadge: React.CSSProperties = {
  display: 'inline-block',
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '600',
};

const actionLink: React.CSSProperties = {
  color: '#2563eb',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
};

const productSeparator: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid #f3f4f6',
  margin: '16px 0',
};

const footer: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '24px',
};

const footerText: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '8px 0',
};

const footerLink: React.CSSProperties = {
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: '500',
};
