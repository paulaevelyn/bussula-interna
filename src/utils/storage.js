const KEY = 'bussula_history';

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEntry(entry) {
  const history = loadHistory();
  history.unshift(entry);
  localStorage.setItem(KEY, JSON.stringify(history));
}

export function deleteEntry(id) {
  const history = loadHistory().filter((e) => e.id !== id);
  localStorage.setItem(KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}

export function createEntry({ scores, answers, note }) {
  return {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    scores,
    answers,
    note: note || '',
  };
}

export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}
