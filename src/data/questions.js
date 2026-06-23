export const STATES = {
  SENSORIAL: 'sensorial',
  ANSIEDADE: 'ansiedade',
  DEPRESSAO: 'depressao',
};

// How each state is described as an *experience*, not a diagnosis
export const STATE_META = {
  sensorial: {
    label: 'Sobrecarga sensorial',
    tagline: 'O ambiente está pesado demais para o seu sistema agora.',
    color: '#C47B2B',
    colorLight: '#fdf0e0',
    badgeClass: 'badge-s',
    fillClass: 'fill-s',
  },
  ansiedade: {
    label: 'Sistema em alerta',
    tagline: 'Sua mente está tentando se proteger de algo que ainda não chegou.',
    color: '#6050B0',
    colorLight: '#eeebf8',
    badgeClass: 'badge-a',
    fillClass: 'fill-a',
  },
  depressao: {
    label: 'Esgotamento',
    tagline: 'Seu sistema chegou no limite — não por fraqueza, por acúmulo.',
    color: '#3d5c53',
    colorLight: '#e4efec',
    badgeClass: 'badge-d',
    fillClass: 'fill-d',
  },
};

const sensorialQ = [
  { id: 's1', state: STATES.SENSORIAL, diff: false, text: 'Senti vontade física de me afastar de um som, luz, cheiro, textura ou de um ambiente cheio de gente.' },
  { id: 's2', state: STATES.SENSORIAL, diff: false, text: 'Fiz ou senti vontade de fazer algum movimento repetitivo, balançar, apertar algo, tampar os ouvidos ou fechar os olhos.' },
  { id: 's3', state: STATES.SENSORIAL, diff: false, text: 'Fiquei em silêncio, sem conseguir falar, ou "desliguei" por um tempo, mesmo sem um motivo emocional claro.' },
  { id: 's4', state: STATES.SENSORIAL, diff: false, text: 'Reagi com irritação ou impaciência muito maior do que o estímulo parecia justificar.' },
  { id: 's5', state: STATES.SENSORIAL, diff: false, text: 'Havia mais de um estímulo ao mesmo tempo (som, luz e conversa, por exemplo) e senti que não conseguia processar tudo junto.' },
  { id: 's6', state: STATES.SENSORIAL, diff: true,  text: 'Esse desconforto melhorou quando saí do ambiente, abaixei a luz ou o som, ou fiquei em silêncio.' },
];

const ansiedadeQ = [
  { id: 'a1', state: STATES.ANSIEDADE, diff: false, text: 'Minha mente ficou repetindo um cenário que ainda não aconteceu, ou revivendo algo do passado, mesmo em um ambiente calmo.' },
  { id: 'a2', state: STATES.ANSIEDADE, diff: false, text: 'Evitei começar uma tarefa que, em outro momento, eu conseguiria fazer sem dificuldade.' },
  { id: 'a3', state: STATES.ANSIEDADE, diff: false, text: 'Senti uma tensão ou desconforto que não passou mesmo depois de sair da situação que pareceu causá-lo.' },
  { id: 'a4', state: STATES.ANSIEDADE, diff: false, text: 'Me peguei monitorando como estava sendo percebida(o) pelos outros, revendo frases ou reações.' },
  { id: 'a5', state: STATES.ANSIEDADE, diff: false, text: 'Senti uma sensação de pânico crescente conforme um prazo ou compromisso se aproximava.' },
  { id: 'a6', state: STATES.ANSIEDADE, diff: true,  text: 'Esse desconforto continuou mesmo sozinha(o), em silêncio, sem nenhum estímulo externo presente.' },
];

const depressaoQ = [
  { id: 'd1', state: STATES.DEPRESSAO, diff: false, note: 'Estas perguntas se referem às últimas 2 a 4 semanas, não a hoje.', text: 'Minha energia para tarefas do dia a dia caiu de forma constante, não só em um dia ruim isolado.' },
  { id: 'd2', state: STATES.DEPRESSAO, diff: false, note: 'Estas perguntas se referem às últimas 2 a 4 semanas, não a hoje.', text: 'Perdi o interesse em coisas que antes importavam ou davam prazer.' },
  { id: 'd3', state: STATES.DEPRESSAO, diff: false, note: 'Estas perguntas se referem às últimas 2 a 4 semanas, não a hoje.', text: 'Tarefas que antes exigiam esforço moderado começaram a parecer impossíveis de iniciar.' },
  { id: 'd4', state: STATES.DEPRESSAO, diff: false, note: 'Estas perguntas se referem às últimas 2 a 4 semanas, não a hoje.', text: 'Notei perda temporária de habilidades que antes eram automáticas (organização, fala fluente, autocuidado básico).' },
  { id: 'd5', state: STATES.DEPRESSAO, diff: false, note: 'Estas perguntas se referem às últimas 2 a 4 semanas, não a hoje.', text: 'Esse período veio depois de um tempo prolongado de sobre-esforço, mascaramento, ou de "dar conta de tudo sozinha(o)."' },
  { id: 'd6', state: STATES.DEPRESSAO, diff: true,  note: 'Estas perguntas se referem às últimas 2 a 4 semanas, não a hoje.', text: 'Essa queda não melhorou com uma noite de sono boa, um fim de semana de descanso, ou a remoção de um único estímulo.' },
];

// Intercalated: S, A, D, S, A, D ...
export const questions = [];
for (let i = 0; i < 6; i++) {
  questions.push(sensorialQ[i], ansiedadeQ[i], depressaoQ[i]);
}

export const ANSWER_VALUES = { sim: 1, nao: 0, incerto: 0.5 };
export const THRESHOLD = 3;
