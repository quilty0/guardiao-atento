// Tipos de dados
export interface BehaviorPattern {
  type: string;
  value: number;
  normalRange: [number, number];
  unit: string;
}

export interface Anomaly {
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  detectedAt: Date;
}

// Simulação de dados de sensores
export const getCurrentPatterns = (): BehaviorPattern[] => {
  return [
    {
      type: 'Horas de Sono',
      value: 6.5,
      normalRange: [7, 9],
      unit: 'horas'
    },
    {
      type: 'Passos Diários',
      value: 2500,
      normalRange: [3000, 6000],
      unit: 'passos'
    },
    {
      type: 'Uso do Banheiro',
      value: 8,
      normalRange: [4, 7],
      unit: 'vezes'
    },
    {
      type: 'Tempo Sentado',
      value: 12,
      normalRange: [6, 10],
      unit: 'horas'
    }
  ];
};

// Análise de anomalias
export const detectAnomalies = (patterns: BehaviorPattern[]): Anomaly[] => {
  const anomalies: Anomaly[] = [];

  patterns.forEach(pattern => {
    const [min, max] = pattern.normalRange;
    
    if (pattern.value < min) {
      anomalies.push({
        type: `${pattern.type} Baixo`,
        severity: pattern.value < min * 0.8 ? 'high' : 'medium',
        message: `${pattern.type} está abaixo do normal (${pattern.value} ${pattern.unit})`,
        detectedAt: new Date()
      });
    } else if (pattern.value > max) {
      anomalies.push({
        type: `${pattern.type} Alto`,
        severity: pattern.value > max * 1.2 ? 'high' : 'medium',
        message: `${pattern.type} está acima do normal (${pattern.value} ${pattern.unit})`,
        detectedAt: new Date()
      });
    }
  });

  return anomalies;
};

// Análise preditiva de riscos
export const predictRisks = (patterns: BehaviorPattern[]): Anomaly[] => {
  const risks: Anomaly[] = [];
  
  // Análise de risco de queda
  const passos = patterns.find(p => p.type === 'Passos Diários');
  const tempoSentado = patterns.find(p => p.type === 'Tempo Sentado');
  
  if (passos && tempoSentado && passos.value < 2000 && tempoSentado.value > 12) {
    risks.push({
      type: 'Risco de Queda',
      severity: 'high',
      message: 'Sedentarismo elevado detectado. Risco aumentado de quedas.',
      detectedAt: new Date()
    });
  }

  // Análise de distúrbios do sono
  const sono = patterns.find(p => p.type === 'Horas de Sono');
  if (sono && sono.value < 6) {
    risks.push({
      type: 'Distúrbio do Sono',
      severity: 'medium',
      message: 'Padrão de sono irregular detectado. Possível risco à saúde.',
      detectedAt: new Date()
    });
  }

  return risks;
}; 