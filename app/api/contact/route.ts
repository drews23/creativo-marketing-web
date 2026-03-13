import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validación
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Enviar email usando Resend
    const result = await resend.emails.send({
      from: 'contacto@creativomarketing.com', // Debe estar verificado en Resend
      to: process.env.CONTACT_EMAIL || 'admin@creativomarketing.com',
      replyTo: body.email,
      subject: `[Formulario Contacto] ${body.subject || 'Nueva consulta'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #005FCC;">📨 Nuevo Mensaje de Contacto</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${escapeHtml(body.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
            ${body.phone ? `<p><strong>Teléfono:</strong> ${escapeHtml(body.phone)}</p>` : ''}
            <p><strong>Tema:</strong> ${escapeHtml(body.subject)}</p>
          </div>

          <div style="background: #fff; padding: 20px; border-left: 4px solid #005FCC; margin: 20px 0;">
            <h3 style="margin-top: 0;">Mensaje:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">
              ${escapeHtml(body.message)}
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="font-size: 12px; color: #999;">
            Este email fue enviado desde el formulario de contacto de Estudio Creativo de Marketing Digital
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error('Error enviando email:', result.error);
      return NextResponse.json(
        { error: 'Error al enviar el correo' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email enviado exitosamente',
        id: result.data?.id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error en API /contact:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * Escapa caracteres HTML para evitar inyecciones
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
