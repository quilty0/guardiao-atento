const BehaviorPattern = require('../models/BehaviorPattern');

class AnomalyDetection {
  static async detectAnomalies(userId) {
    try {
      // Buscar padrões dos últimos 7 dias
      const recentPatterns = await BehaviorPattern.find({
        userId,
        timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      });

      const anomalies = [];

      // Analisar padrões de sono
      const sleepAnomalies = this.analyzeSleepPatterns(recentPatterns);
      if (sleepAnomalies.length > 0) {
        anomalies.push(...sleepAnomalies);
      }

      // Analisar níveis de atividade
      const activityAnomalies = this.analyzeActivityLevels(recentPatterns);
      if (activityAnomalies.length > 0) {
        anomalies.push(...activityAnomalies);
      }

      // Analisar uso do banheiro
      const bathroomAnomalies = this.analyzeBathroomUsage(recentPatterns);
      if (bathroomAnomalies.length > 0) {
        anomalies.push(...bathroomAnomalies);
      }

      return anomalies;
    } catch (error) {
      console.error('Erro ao detectar anomalias:', error);
      throw error;
    }
  }

  static analyzeSleepPatterns(patterns) {
    const anomalies = [];
    const recentPatterns = patterns.slice(-3); // Últimos 3 dias

    // Verificar mudanças significativas na duração do sono
    const avgDuration = recentPatterns.reduce((acc, p) => acc + p.sleepPattern.duration, 0) / recentPatterns.length;
    const lastDuration = recentPatterns[recentPatterns.length - 1].sleepPattern.duration;

    if (Math.abs(lastDuration - avgDuration) > 2) { // Mais de 2 horas de diferença
      anomalies.push({
        type: 'SLEEP_DURATION',
        severity: 'HIGH',
        message: `Mudança significativa detectada no padrão de sono: ${lastDuration} horas`
      });
    }

    return anomalies;
  }

  static analyzeActivityLevels(patterns) {
    const anomalies = [];
    const recentPatterns = patterns.slice(-3);

    // Verificar redução significativa na atividade
    const avgSteps = recentPatterns.reduce((acc, p) => acc + p.activityLevel.steps, 0) / recentPatterns.length;
    const lastSteps = recentPatterns[recentPatterns.length - 1].activityLevel.steps;

    if (lastSteps < avgSteps * 0.5) { // Redução de 50% ou mais
      anomalies.push({
        type: 'ACTIVITY_LEVEL',
        severity: 'MEDIUM',
        message: 'Redução significativa detectada no nível de atividade'
      });
    }

    return anomalies;
  }

  static analyzeBathroomUsage(patterns) {
    const anomalies = [];
    const recentPatterns = patterns.slice(-3);

    // Verificar mudanças na frequência de uso do banheiro
    const avgFrequency = recentPatterns.reduce((acc, p) => acc + p.bathroomUsage.frequency, 0) / recentPatterns.length;
    const lastFrequency = recentPatterns[recentPatterns.length - 1].bathroomUsage.frequency;

    if (Math.abs(lastFrequency - avgFrequency) > 3) { // Mais de 3 visitas de diferença
      anomalies.push({
        type: 'BATHROOM_USAGE',
        severity: 'HIGH',
        message: 'Mudança significativa detectada no padrão de uso do banheiro'
      });
    }

    return anomalies;
  }
}

module.exports = AnomalyDetection; 