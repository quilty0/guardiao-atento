const mongoose = require('mongoose');

const behaviorPatternSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  sleepPattern: {
    bedtime: String,
    wakeTime: String,
    quality: Number, // 1-5
    duration: Number // em horas
  },
  activityLevel: {
    steps: Number,
    activeTime: Number, // em minutos
    sedentaryTime: Number // em minutos
  },
  bathroomUsage: {
    frequency: Number, // vezes por dia
    lastUsage: Date
  },
  mealPattern: {
    breakfast: String,
    lunch: String,
    dinner: String,
    snacks: [String]
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BehaviorPattern', behaviorPatternSchema); 