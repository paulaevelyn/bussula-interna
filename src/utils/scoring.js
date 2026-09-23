import { STATES, ANSWER_VALUES, THRESHOLD } from '../data/questions.js';

export function computeScores(answers) {
  const scores = {
    [STATES.SENSORIAL]: 0,
    [STATES.ANSIEDADE]: 0,
    [STATES.DEPRESSAO]: 0,
    [STATES.INERCIA]: 0,
  };
  for (const [qId, answer] of Object.entries(answers)) {
    const state = qId[0] === 's' ? STATES.SENSORIAL
      : qId[0] === 'a' ? STATES.ANSIEDADE
      : qId[0] === 'd' ? STATES.DEPRESSAO
      : STATES.INERCIA;
    scores[state] += ANSWER_VALUES[answer] ?? 0;
  }
  return scores;
}

export function getActiveStates(scores) {
  return Object.entries(scores)
    .filter(([, v]) => v >= THRESHOLD)
    .sort(([, a], [, b]) => b - a)
    .map(([k]) => k);
}

export function getDiffAnswer(answers, state) {
  const key = state === STATES.SENSORIAL ? 's6'
    : state === STATES.ANSIEDADE ? 'a6'
    : state === STATES.DEPRESSAO ? 'd6' : 'i6';
  return answers[key];
}

// Returns intensity bucket without exposing raw numbers to the UI
export function getIntensity(score) {
  if (score >= 5) return 'alto';
  if (score >= 3) return 'moderado';
  return 'baixo';
}
