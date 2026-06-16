<template>
  <div class="ufc-predictor">
    <div class="header">
      <h1>🥊 UFC Win Probability Predictor</h1>
      <p>Enter your fighting metrics to see your predicted win probability</p>
    </div>

    <!-- Input Form -->
    <form @submit.prevent="predictWinProbability" class="predictor-form">
      <div class="form-grid">
        <div class="form-group">
          <label>📏 Height (cm)</label>
          <input
            type="number"
            v-model="form.height_cm"
            required
            step="0.1"
            min="140"
            max="220"
            placeholder="e.g., 180"
          />
          <span class="hint">Average UFC: 185cm</span>
        </div>

        <div class="form-group">
          <label>⚖️ Weight (kg)</label>
          <input
            type="number"
            v-model="form.weight_in_kg"
            required
            step="0.1"
            min="50"
            max="150"
            placeholder="e.g., 77"
          />
          <span class="hint">Average UFC: 84kg</span>
        </div>

        <div class="form-group">
          <label>🦾 Reach (cm)</label>
          <input
            type="number"
            v-model="form.reach_in_cm"
            required
            step="0.1"
            min="150"
            max="230"
            placeholder="e.g., 185"
          />
          <span class="hint">Average UFC: 185cm</span>
        </div>

        <div class="form-group">
          <label>💥 Strikes Landed / Minute</label>
          <input
            type="number"
            v-model="form.significant_strikes_landed_per_minute"
            required
            step="0.1"
            min="0"
            max="15"
            placeholder="e.g., 4.5"
          />
          <span class="hint">Average: 3.5-4.5</span>
        </div>

        <div class="form-group">
          <label>🤼 Takedowns / 15 Minutes</label>
          <input
            type="number"
            v-model="form.average_takedowns_landed_per_15_minutes"
            required
            step="0.1"
            min="0"
            max="10"
            placeholder="e.g., 2.5"
          />
          <span class="hint">Average: 1.5-2.5</span>
        </div>

        <div class="form-group">
          <label>🪢 Submissions Attempted / 15 Min</label>
          <input
            type="number"
            v-model="form.average_submissions_attempted_per_15_minutes"
            required
            step="0.1"
            min="0"
            max="10"
            placeholder="e.g., 1.0"
          />
          <span class="hint">Average: 0.5-1.5</span>
        </div>
      </div>

      <button type="submit" :disabled="loading" class="predict-button">
        {{ loading ? "🔮 Analyzing..." : "🎯 Predict Win Probability" }}
      </button>
    </form>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Calculating your fighting potential...</p>
    </div>

    <!-- Results -->
    <div
      v-if="result"
      class="results-card"
      :class="getResultClass(result.win_probability)"
    >
      <h2>📊 Your Predicted Win Probability</h2>

      <!-- Win Probability Gauge -->
      <div class="probability-gauge">
        <div class="gauge-container">
          <div class="gauge-value">{{ result.win_probability }}%</div>
          <div class="gauge-bar">
            <div
              class="gauge-fill"
              :style="{
                width: result.win_probability + '%',
                background: getColor(result.win_probability),
              }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Confidence -->
      <div class="confidence">
        <span class="confidence-label">Confidence:</span>
        <span class="confidence-value">{{ result.confidence }}%</span>
      </div>

      <!-- Tier -->
      <div class="tier" :class="getTierClass(result.tier)">
        {{ result.tier }} Fighter
      </div>

      <!-- Recommendation -->
      <div class="recommendation">
        <strong>💡 Recommendation:</strong>
        <p>{{ result.recommendation }}</p>
      </div>

      <!-- Advice Section -->
      <div v-if="result.advice.length > 0" class="advice">
        <strong>📌 Specific Areas to Work On:</strong>
        <ul>
          <li v-for="advice in result.advice" :key="advice">{{ advice }}</li>
        </ul>
      </div>

      <!-- Input Summary -->
      <details class="input-summary">
        <summary>View Your Input Metrics</summary>
        <div class="metrics-grid">
          <div class="metric-item">
            <span>Height:</span>
            <strong>{{ result.metrics.height_cm }} cm</strong>
          </div>
          <div class="metric-item">
            <span>Weight:</span>
            <strong>{{ result.metrics.weight_in_kg }} kg</strong>
          </div>
          <div class="metric-item">
            <span>Reach:</span>
            <strong>{{ result.metrics.reach_in_cm }} cm</strong>
          </div>
          <div class="metric-item">
            <span>Strikes/Min:</span>
            <strong>{{ result.metrics.strikes_per_minute }}</strong>
          </div>
          <div class="metric-item">
            <span>Takedowns/15min:</span>
            <strong>{{ result.metrics.takedowns_per_15min }}</strong>
          </div>
          <div class="metric-item">
            <span>Submissions/15min:</span>
            <strong>{{ result.metrics.submissions_per_15min }}</strong>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UFCPredictor",
  data() {
    return {
      form: {
        height_cm: 180,
        weight_in_kg: 77,
        reach_in_cm: 185,
        significant_strikes_landed_per_minute: 4.5,
        average_takedowns_landed_per_15_minutes: 2.5,
        average_submissions_attempted_per_15_minutes: 1.0,
      },
      loading: false,
      result: null,
    };
  },
  methods: {
    async predictWinProbability() {
      this.loading = true;
      this.result = null;

      try {
        const response = await axios.post("/api/ufc/predict", this.form);
        this.result = response.data;
      } catch (error) {
        console.error("Error predicting:", error);
        alert("Error calculating prediction. Please try again.");
      } finally {
        this.loading = false;
      }
    },

    getColor(probability) {
      if (probability >= 70) return "linear-gradient(90deg, #2ecc71, #27ae60)";
      if (probability >= 55) return "linear-gradient(90deg, #f39c12, #e67e22)";
      if (probability >= 45) return "linear-gradient(90deg, #3498db, #2980b9)";
      return "linear-gradient(90deg, #e74c3c, #c0392b)";
    },

    getResultClass(probability) {
      if (probability >= 70) return "elite";
      if (probability >= 55) return "good";
      if (probability >= 45) return "average";
      return "poor";
    },

    getTierClass(tier) {
      return tier.toLowerCase();
    },
  },
};
</script>

<style lang="scss" scoped>
.ufc-predictor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: 2rem;
    margin-bottom: 8px;
  }

  p {
    color: #666;
  }
}

.predictor-form {
  background: #f8f9fa;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 24px;

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-weight: 600;
      color: #202124;
    }

    input {
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s;

      &:focus {
        outline: none;
        border-color: #e74c3c;
      }
    }

    .hint {
      font-size: 0.75rem;
      color: #999;
    }
  }

  .predict-button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

.loading {
  text-align: center;
  padding: 40px;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top-color: #e74c3c;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.results-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-out;

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }

  &.elite {
    border-left: 6px solid #2ecc71;
  }

  &.good {
    border-left: 6px solid #f39c12;
  }

  &.average {
    border-left: 6px solid #3498db;
  }

  &.poor {
    border-left: 6px solid #e74c3c;
  }
}

.probability-gauge {
  margin: 24px 0;

  .gauge-container {
    text-align: center;

    .gauge-value {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .gauge-bar {
      height: 20px;
      background: #e0e0e0;
      border-radius: 10px;
      overflow: hidden;

      .gauge-fill {
        height: 100%;
        transition: width 1s ease;
        border-radius: 10px;
      }
    }
  }
}

.confidence {
  text-align: center;
  margin-bottom: 16px;

  .confidence-label {
    font-weight: 600;
    margin-right: 8px;
  }

  .confidence-value {
    color: #666;
  }
}

.tier {
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 600;

  &.elite {
    background: #2ecc7120;
    color: #27ae60;
  }

  &.competitive {
    background: #f39c1220;
    color: #e67e22;
  }

  &.developing {
    background: #3498db20;
    color: #2980b9;
  }

  &.beginner {
    background: #e74c3c20;
    color: #c0392b;
  }
}

.recommendation,
.advice {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;

  p {
    margin-top: 8px;
    line-height: 1.5;
  }

  ul {
    margin-top: 8px;
    padding-left: 20px;

    li {
      margin: 4px 0;
    }
  }
}

.input-summary {
  margin-top: 16px;
  cursor: pointer;

  summary {
    font-weight: 600;
    color: #666;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-top: 16px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;

    .metric-item {
      display: flex;
      justify-content: space-between;

      span {
        color: #666;
      }

      strong {
        color: #202124;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
