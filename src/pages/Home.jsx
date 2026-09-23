export default function Home({ onStart, onGoResources }) {
  return (
    <main className="page" id="main-content">
      <div className="container">
        <div style={{ maxWidth: 560, margin: '0 auto' }}>

          <h1 style={{ marginBottom: '0.5rem' }}>Bússola Interna</h1>
          <p style={{ marginBottom: '1.75rem', color: 'var(--grafite)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Uma ferramenta para ajudar você a reconhecer o que está acontecendo no seu sistema nervoso — e saber o que fazer com isso.
          </p>

          <div className="card" style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Como funciona</h2>
            <p style={{ marginBottom: '0.75rem' }}>
              Para muitas pessoas neurodivergentes, sentir o próprio estado interno não é simples. Em vez de perguntar "como você se sente", o app pergunta sobre <strong>o que aconteceu</strong>: no seu corpo, no seu comportamento, no seu contexto.
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              Com base nas suas respostas, o app aponta qual dos quatro estados parece estar presente — <strong>sobrecarga sensorial</strong>, <strong>sistema em alerta</strong>, <strong>esgotamento</strong> ou <strong>inércia de tarefas</strong> — e mostra o que você pode fazer agora com cada um deles.
            </p>
            <p>
              Com o tempo, você aprende a reconhecer esses estados pelos seus próprios sinais, sem precisar do app.
            </p>
          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>O que este app não é</h2>
            <p>
              Não é um diagnóstico. Os resultados descrevem <em>sinais observáveis</em>, não condições clínicas. Se você quiser compartilhar o histórico com um profissional de saúde, tem uma função de relatório para isso.
            </p>
          </div>

          <div className="notice-box" role="note" aria-label="Informação sobre privacidade" style={{ marginBottom: '1.5rem' }}>
            🔒 Seus registros ficam só neste dispositivo. Nada é enviado para servidores ou terceiros.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button className="btn btn-primary btn-lg" onClick={onStart} style={{ width: '100%' }}>
              Começar autoavaliação
            </button>
            <button className="btn btn-secondary" onClick={onGoResources} style={{ width: '100%' }}>
              Ver o que fazer com cada estado →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
