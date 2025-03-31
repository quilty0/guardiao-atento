import { BehaviorPattern } from './behaviorAnalysis';
import MessageService from './MessageService';

export interface AutoNotification {
  id: string;
  type: 'fall' | 'inactivity' | 'vitalSigns' | 'location' | 'medication' | 'activity' | 'status';
  severity: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

type NotificationCallback = (notification: AutoNotification) => void;

class AutoNotificationService {
  private static instance: AutoNotificationService;
  private subscribers: NotificationCallback[] = [];
  private notificationPermission: NotificationPermission = 'default';
  private messageService: MessageService;

  private constructor() {
    this.requestNotificationPermission();
    this.messageService = MessageService.getInstance();
  }

  public static getInstance(): AutoNotificationService {
    if (!AutoNotificationService.instance) {
      AutoNotificationService.instance = new AutoNotificationService();
    }
    return AutoNotificationService.instance;
  }

  public subscribe(callback: NotificationCallback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private async notify(notification: AutoNotification) {
    this.subscribers.forEach(callback => callback(notification));
    this.sendPushNotification(notification);
    
    // Envia mensagens automáticas para os contatos
    await this.messageService.notifyContacts(notification);
  }

  private async sendPushNotification(notification: AutoNotification) {
    if (this.notificationPermission === 'granted') {
      try {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/logo192.png',
        });
      } catch (error) {
        console.error('Erro ao enviar notificação:', error);
      }
    }
  }

  public async requestNotificationPermission() {
    if (!('Notification' in window)) {
      console.log('Este navegador não suporta notificações desktop');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      this.notificationPermission = permission;
    } catch (error) {
      console.error('Erro ao solicitar permissão para notificações:', error);
    }
  }

  public checkForFalls(accelerometerData: { x: number; y: number; z: number }) {
    const suddenChange = Math.abs(accelerometerData.y) > 20;
    
    if (suddenChange) {
      this.notify({
        id: Date.now().toString(),
        type: 'fall',
        severity: 'high',
        title: 'Queda Detectada!',
        message: 'Uma possível queda foi detectada. Verificação imediata necessária.',
        timestamp: new Date(),
        read: false
      });
    }
  }

  public checkInactivity(lastActivityTime: Date) {
    const now = new Date();
    const inactivityDuration = now.getTime() - lastActivityTime.getTime();
    const inactivityThreshold = 3 * 60 * 60 * 1000; // 3 horas

    if (inactivityDuration > inactivityThreshold) {
      this.notify({
        id: Date.now().toString(),
        type: 'inactivity',
        severity: 'medium',
        title: 'Inatividade Prolongada',
        message: 'Nenhuma atividade detectada nas últimas 3 horas.',
        timestamp: new Date(),
        read: false
      });
    }
  }

  public checkVitalSigns(heartRate: number, bloodPressure: { systolic: number; diastolic: number }) {
    if (heartRate > 100 || heartRate < 60) {
      this.notify({
        id: Date.now().toString(),
        type: 'vitalSigns',
        severity: 'high',
        title: 'Alteração nos Sinais Vitais',
        message: `Frequência cardíaca anormal detectada: ${heartRate} bpm`,
        timestamp: new Date(),
        read: false
      });
    }

    if (bloodPressure.systolic > 140 || bloodPressure.diastolic > 90) {
      this.notify({
        id: Date.now().toString(),
        type: 'vitalSigns',
        severity: 'medium',
        title: 'Pressão Arterial Elevada',
        message: `Pressão arterial: ${bloodPressure.systolic}/${bloodPressure.diastolic} mmHg`,
        timestamp: new Date(),
        read: false
      });
    }
  }

  public checkLocation(coordinates: { lat: number; lng: number }, safeArea: { center: { lat: number; lng: number }, radius: number }) {
    const distance = this.calculateDistance(
      coordinates,
      safeArea.center
    );

    if (distance > safeArea.radius) {
      this.notify({
        id: Date.now().toString(),
        type: 'location',
        severity: 'medium',
        title: 'Fora da Área Segura',
        message: 'A pessoa monitorada saiu da área segura definida.',
        timestamp: new Date(),
        read: false
      });
    }
  }

  private calculateDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = point1.lat * Math.PI / 180;
    const φ2 = point2.lat * Math.PI / 180;
    const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
    const Δλ = (point2.lng - point1.lng) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  public addStatusNotification(message: string) {
    this.notify({
      id: Date.now().toString(),
      type: 'status',
      severity: 'low',
      title: 'Status Normal',
      message,
      timestamp: new Date(),
      read: false
    });
  }

  public addMedicationReminder(medicine: string) {
    this.notify({
      id: Date.now().toString(),
      type: 'medication',
      severity: 'medium',
      title: 'Lembrete de Medicação',
      message: `Hora do remédio para ${medicine}`,
      timestamp: new Date(),
      read: false
    });
  }

  public addActivityNotification(activity: string) {
    this.notify({
      id: Date.now().toString(),
      type: 'activity',
      severity: 'low',
      title: 'Atividade Física',
      message: activity,
      timestamp: new Date(),
      read: false
    });
  }
}

export default AutoNotificationService; 