import nodemailer from 'nodemailer';

// Configure com suas credenciais Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'absollutodesign@gmail.com',
    pass: process.env.EMAIL_PASSWORD || '', // Use App Password do Gmail
  },
});

export async function sendBriefingNotification(
  clientName: string,
  clientEmail: string,
  briefingType: string,
  formData: Record<string, any>
) {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF4C00;">Novo Briefing Recebido!</h2>
        
        <p>Você recebeu um novo briefing de:</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Cliente:</strong> ${clientName}</p>
          <p><strong>Email:</strong> ${clientEmail}</p>
          <p><strong>Tipo:</strong> ${briefingType}</p>
        </div>
        
        <h3>Dados do Formulário:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${Object.entries(formData)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('')}
        </div>
        
        <p style="margin-top: 30px;">
          <a href="https://seu-dominio.com/admin" style="background-color: #FF4C00; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Ver no Painel Admin
          </a>
        </p>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Absolluto Design² - Sua marca, elevada ao quadrado.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'absollutodesign@gmail.com',
      to: process.env.EMAIL_USER || 'absollutodesign@gmail.com',
      subject: `[Novo Briefing] ${clientName} - ${briefingType}`,
      html: htmlContent,
    });

    console.log('[Email] Notificação enviada com sucesso');
    return true;
  } catch (error) {
    console.error('[Email] Erro ao enviar notificação:', error);
    return false;
  }
}

export async function sendCustomFormNotification(
  clientName: string,
  clientEmail: string,
  formTitle: string,
  formData: Record<string, any>
) {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #FF4C00;">Novo Formulário Customizado Respondido!</h2>
        
        <p>Você recebeu uma resposta do formulário:</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Formulário:</strong> ${formTitle}</p>
          <p><strong>Cliente:</strong> ${clientName}</p>
          <p><strong>Email:</strong> ${clientEmail}</p>
        </div>
        
        <h3>Respostas:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${Object.entries(formData)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('')}
        </div>
        
        <p style="margin-top: 30px;">
          <a href="https://seu-dominio.com/admin" style="background-color: #FF4C00; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Ver no Painel Admin
          </a>
        </p>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Absolluto Design² - Sua marca, elevada ao quadrado.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'absollutodesign@gmail.com',
      to: process.env.EMAIL_USER || 'absollutodesign@gmail.com',
      subject: `[Formulário] ${clientName} respondeu: ${formTitle}`,
      html: htmlContent,
    });

    console.log('[Email] Notificação de formulário enviada com sucesso');
    return true;
  } catch (error) {
    console.error('[Email] Erro ao enviar notificação de formulário:', error);
    return false;
  }
}
