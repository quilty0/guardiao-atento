import { AutoNotification } from './AutoNotificationService';

interface Contact {
  name: string;
  phone: string;
  relationship: string;
  notifyVia: ('sms' | 'whatsapp')[];
}

const mockContacts: Contact[] = [
  {
    name: "Francisco Silva",
    phone: "(86) 98888-7777",
    relationship: "Avô",
    notifyVia: ['whatsapp', 'sms']
  },
  {
    name: "Maria Silva",
    phone: "(86) 99999-9999",
    relationship: "Cuidadora",
    notifyVia: ['whatsapp']
  },
  {
    name: "João Silva",
    phone: "(86) 97777-6666",
    relationship: "Filho",
    notifyVia: ['whatsapp', 'sms']
  }
];

class MessageService {
  private static instance: MessageService;
  private contacts: Contact[] = mockContacts;

  private constructor() {}

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  public async sendWhatsAppMessage(phone: string, message: string): Promise<void> {
    // Em um ambiente real, aqui seria a integração com a API do WhatsApp Business
    console.log(`Enviando WhatsApp para ${phone}: ${message}`);
  }

  public async sendSMS(phone: string, message: string): Promise<void> {
    // Em um ambiente real, aqui seria a integração com um serviço de SMS
    console.log(`Enviando SMS para ${phone}: ${message}`);
  }

  public getMessageFromNotification(notification: AutoNotification): string {
    const urgencyPrefix = notification.severity === 'high' ? '🚨 URGENTE: ' : '';
    return `${urgencyPrefix}${notification.title}\n${notification.message}`;
  }

  public async notifyContacts(notification: AutoNotification): Promise<void> {
    const message = this.getMessageFromNotification(notification);

    // Apenas notifica em caso de severidade média ou alta
    if (notification.severity === 'low') return;

    for (const contact of this.contacts) {
      if (contact.notifyVia.includes('whatsapp')) {
        await this.sendWhatsAppMessage(contact.phone, message);
      }
      
      // Em caso de alta severidade, envia SMS também
      if (notification.severity === 'high' && contact.notifyVia.includes('sms')) {
        await this.sendSMS(contact.phone, message);
      }
    }
  }

  public getMonitoredContact(): Contact {
    return this.contacts[0]; // Francisco (Avô)
  }

  public getCaregiverContact(): Contact {
    return this.contacts[1]; // Maria (Cuidadora)
  }
}

export default MessageService; 