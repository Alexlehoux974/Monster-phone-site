import { renderAsync } from '@react-email/render';
import resend from './resend';
import { OrderConfirmationEmail } from './templates/order-confirmation';
import React from 'react';

interface OrderItem {
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface SendOrderConfirmationParams {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  orderDate: string;
}

export async function sendOrderConfirmation(params: SendOrderConfirmationParams) {
  try {
    const emailHtml = await renderAsync(
      React.createElement(OrderConfirmationEmail, {
        orderId: params.orderId,
        orderNumber: params.orderNumber,
        customerName: params.customerName,
        customerEmail: params.customerEmail,
        items: params.items,
        subtotal: params.subtotal,
        total: params.total,
        orderDate: params.orderDate,
      })
    );

    const { data, error } = await resend.emails.send({
      from: 'Monster Phone Boutique <commandes@monster-phone.re>',
      to: params.customerEmail,
      subject: `✅ Confirmation de commande #${params.orderNumber}`,
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Error sending order confirmation email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
    return { success: false, error };
  }
}
