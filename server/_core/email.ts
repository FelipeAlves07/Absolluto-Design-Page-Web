import nodemailer from 'nodemailer';

// ── Configuração do transporte de email ───────────────────────────────────────
// Use as variáveis de ambiente no Railway:
//   EMAIL_USER     → seu Gmail (ex: absollutodesign@gmail.com)
//   EMAIL_PASSWORD → App Password do Gmail (16 caracteres, SEM espaços)
//   SITE_URL       → https://www.absollutodesign.com.br (opcional, para o link no email)

const SITE_URL = process.env.SITE_URL || 'https://www.absollutodesign.com.br';
const EMAIL_FROM = process.env.EMAIL_USER || 'absollutodesign@gmail.com';
const EMAIL_TO   = process.env.EMAIL_TO   || EMAIL_FROM; // Receber no mesmo email por padrão

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

// ── Briefing padrão ───────────────────────────────────────────────────────────

export async function sendBriefingNotification(
  clientName: string,
  clientEmail: string,
  briefingType: string,
  formData: Record<string, any>
) {
  try {
    const typeLabels: Record<string, string> = {
      'identidade-visual': 'Identidade Visual',
      'social-media': 'Social Media',
      'design-grafico': 'Design Gráfico',
      'apresentacoes': 'Apresentações',
    };

    const typeLabel = typeLabels[briefingType] || briefingType;

    const formRows = Object.entries(formData)
      .map(
        ([key, value]) => `
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#555;width:40%;border-bottom:1px solid #eee;">${key}</td>
          <td style="padding:8px 12px;color:#222;border-bottom:1px solid #eee;">${value}</td>
        </tr>`
      )
      .join('');

    const html = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e0e0e0;">
        <!-- Header -->
        <div style="background:#080808;padding:32px 40px;text-align:center;">
          <h1 style="color:#FF4C00;font-size:28px;margin:0;letter-spacing:2px;font-weight:900;">ABSOLLUTO DESIGN²</h1>
          <p style="color:#999;margin:8px 0 0;font-size:13px;letter-spacing:1px;">Sua marca, elevada ao quadrado.</p>
        </div>

        <!-- Body -->
        <div style="padding:32px 40px;">
          <h2 style="color:#FF4C00;font-size:22px;margin:0 0 24px;">🎯 Novo Briefing Recebido!</h2>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#f9f9f9;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:10px 12px;font-weight:600;color:#555;width:40%;border-bottom:1px solid #eee;">Cliente</td>
              <td style="padding:10px 12px;color:#222;font-weight:700;border-bottom:1px solid #eee;">${clientName}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Email</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;"><a href="mailto:${clientEmail}" style="color:#1E6FFF;">${clientEmail}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 12px;font-weight:600;color:#555;">Tipo de Serviço</td>
              <td style="padding:10px 12px;"><span style="background:#FF4C00;color:#fff;padding:3px 12px;border-radius:20px;font-size:13px;font-weight:700;">${typeLabel}</span></td>
            </tr>
          </table>

          <h3 style="color:#333;font-size:16px;margin:0 0 12px;">📋 Detalhes do Briefing</h3>
          <table style="width:100%;border-collapse:collapse;background:#f9f9f9;border-radius:8px;overflow:hidden;">
            ${formRows}
          </table>

          <div style="text-align:center;margin-top:32px;">
            <a href="${SITE_URL}/admin" style="background:#FF4C00;color:#fff;padding:14px 32px;text-decoration:none;border-radius:8px;font-weight:700;font-size:15px;display:inline-block;">
              Ver no Painel Admin →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#f5f5f5;padding:20px 40px;text-align:center;border-top:1px solid #e0e0e0;">
          <p style="color:#999;font-size:12px;margin:0;">Absolluto Design² — <a href="${SITE_URL}" style="color:#1E6FFF;">${SITE_URL}</a></p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Absolluto Design²" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      replyTo: clientEmail,
      subject: `🎯 [Novo Briefing] ${clientName} — ${typeLabel}`,
      html,
    });

    console.log('[Email] ✅ Notificação de briefing enviada para', EMAIL_TO);
    return true;
  } catch (error) {
    console.error('[Email] ❌ Erro ao enviar notificação de briefing:', error);
    return false;
  }
}

// ── Formulário customizado ────────────────────────────────────────────────────

export async function sendCustomFormNotification(
  clientName: string,
  clientEmail: string,
  formTitle: string,
  formData: Record<string, any>
) {
  try {
    const formRows = Object.entries(formData)
      .map(
        ([key, value]) => `
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#555;width:40%;border-bottom:1px solid #eee;">${key}</td>
          <td style="padding:8px 12px;color:#222;border-bottom:1px solid #eee;">${value}</td>
        </tr>`
      )
      .join('');

    const html = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e0e0e0;">
        <!-- Header -->
        <div style="background:#080808;padding:32px 40px;text-align:center;">
          <h1 style="color:#1E6FFF;font-size:28px;margin:0;letter-spacing:2px;font-weight:900;">ABSOLLUTO DESIGN²</h1>
          <p style="color:#999;margin:8px 0 0;font-size:13px;letter-spacing:1px;">Sua marca, elevada ao quadrado.</p>
        </div>

        <!-- Body -->
        <div style="padding:32px 40px;">
          <h2 style="color:#1E6FFF;font-size:22px;margin:0 0 8px;">📝 Formulário Respondido!</h2>
          <p style="color:#555;margin:0 0 24px;">Um cliente respondeu ao formulário: <strong>${formTitle}</strong></p>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#f9f9f9;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:10px 12px;font-weight:600;color:#555;width:40%;border-bottom:1px solid #eee;">Cliente</td>
              <td style="padding:10px 12px;color:#222;font-weight:700;border-bottom:1px solid #eee;">${clientName}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;font-weight:600;color:#555;">Email</td>
              <td style="padding:10px 12px;"><a href="mailto:${clientEmail}" style="color:#1E6FFF;">${clientEmail}</a></td>
            </tr>
          </table>

          <h3 style="color:#333;font-size:16px;margin:0 0 12px;">📋 Respostas</h3>
          <table style="width:100%;border-collapse:collapse;background:#f9f9f9;border-radius:8px;overflow:hidden;">
            ${formRows}
          </table>

          <div style="text-align:center;margin-top:32px;">
            <a href="${SITE_URL}/admin" style="background:#1E6FFF;color:#fff;padding:14px 32px;text-decoration:none;border-radius:8px;font-weight:700;font-size:15px;display:inline-block;">
              Ver no Painel Admin →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#f5f5f5;padding:20px 40px;text-align:center;border-top:1px solid #e0e0e0;">
          <p style="color:#999;font-size:12px;margin:0;">Absolluto Design² — <a href="${SITE_URL}" style="color:#1E6FFF;">${SITE_URL}</a></p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Absolluto Design²" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      replyTo: clientEmail,
      subject: `📝 [Formulário] ${clientName} respondeu: ${formTitle}`,
      html,
    });

    console.log('[Email] ✅ Notificação de formulário enviada para', EMAIL_TO);
    return true;
  } catch (error) {
    console.error('[Email] ❌ Erro ao enviar notificação de formulário:', error);
    return false;
  }
}

// ── Teste de configuração ─────────────────────────────────────────────────────

export async function testEmailConfig() {
  try {
    await transporter.verify();
    console.log('[Email] ✅ Configuração de email válida!');
    return true;
  } catch (error) {
    console.error('[Email] ❌ Configuração de email inválida:', error);
    return false;
  }
}
