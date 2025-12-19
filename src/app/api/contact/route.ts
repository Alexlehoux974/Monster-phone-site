import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit, RATE_LIMIT_CONFIGS, getClientIP } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => htmlEntities[char]);
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 messages par IP par heure
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP, 'contact', RATE_LIMIT_CONFIGS.contact);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: `Trop de messages envoyés. Réessayez dans ${Math.ceil((rateLimitResult.retryAfter || 60) / 60)} minutes.` },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter),
          }
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validate input lengths to prevent abuse
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Les champs dépassent la longueur maximale autorisée' },
        { status: 400 }
      );
    }

    // Sanitize all user inputs to prevent XSS
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = phone ? escapeHtml(phone.trim()) : '';
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');

    // Envoi de l'email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Monster Phone Contact <noreply@monster-phone.re>',
      to: ['contact@monster-phone.re'],
      replyTo: email.trim(), // Use original email for reply-to (validated above)
      subject: `[Contact Site] ${safeSubject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safePhone ? `<p><strong>Téléphone:</strong> ${safePhone}</p>` : ''}
        <p><strong>Sujet:</strong> ${safeSubject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
