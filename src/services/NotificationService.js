const nodemailer = require('nodemailer');

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendAlert(caregiverEmail, anomaly) {
    try {
      const severityEmoji = this.getSeverityEmoji(anomaly.severity);
      const subject = `${severityEmoji} Alerta de Anomalia - ${anomaly.type}`;
      
      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: caregiverEmail,
        subject: subject,
        html: this.generateEmailTemplate(anomaly)
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Alerta enviado com sucesso para:', caregiverEmail);
    } catch (error) {
      console.error('Erro ao enviar alerta:', error);
      throw error;
    }
  }

  getSeverityEmoji(severity) {
    switch (severity) {
      case 'HIGH':
        return '🚨';
      case 'MEDIUM':
        return '⚠️';
      case 'LOW':
        return 'ℹ️';
      default:
        return '📢';
    }
  }

  generateEmailTemplate(anomaly) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Alerta de Anomalia Detectada</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
          <p><strong>Tipo:</strong> ${anomaly.type}</p>
          <p><strong>Severidade:</strong> ${anomaly.severity}</p>
          <p><strong>Mensagem:</strong> ${anomaly.message}</p>
          <p><strong>Data/Hora:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="margin-top: 20px;">
          Por favor, verifique a situação do idoso e tome as medidas necessárias.
        </p>
      </div>
    `;
  }
}

module.exports = NotificationService; 