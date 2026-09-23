// Resources are the primary output — what to DO with each state.
// Organized so the person can learn to differentiate states by their response.

export const RESOURCES = {
  sensorial: {
    primaryAction: 'Reduza o estímulo antes de qualquer coisa',
    whyItWorks: 'Na sobrecarga sensorial, o sistema nervoso está processando mais do que consegue dar conta. A única coisa que ajuda de verdade é diminuir o que entra — não respirar de um jeito especial, não "se acalmar". Primeiro o ambiente, depois a regulação.',
    steps: [
      { label: 'Saia ou modifique o ambiente', body: 'Abaixe a luz, corte ou abaixe o som, use fone com cancelamento de ruído ou protetor auricular. Se puder, saia do espaço por alguns minutos.' },
      { label: 'Dê-se permissão para sair sem se explicar', body: 'Você não precisa justificar para ninguém que o ambiente está pesado demais. Sair é regulação, não fuga.' },
      { label: 'Use o que seu sistema pede', body: 'Se um movimento repetitivo ajuda (balançar, apertar algo, tampar os ouvidos), use. Se você precisa de silêncio total, de peso, de uma textura específica — isso é informação sobre o que seu sistema precisa para se organizar.' },
      { label: 'Espere o alívio antes de voltar', body: 'O alívio geralmente vem em minutos, depois que o estímulo diminui. Só depois que ele aparecer vale a pena tentar voltar à tarefa ou ao ambiente.' },
    ],
    note: 'Este não é o momento para respiração guiada ou atenção plena. Essas técnicas podem funcionar depois — não enquanto o estímulo ainda está alto.',
    howToRecognize: 'Você sabe que é sobrecarga (e não ansiedade) quando o desconforto alivia com a mudança de ambiente. Se foi embora quando você saiu da sala ou abaixou o som, era isso.',
  },

  ansiedade: {
    primaryAction: 'Ancore o sistema no presente',
    whyItWorks: 'Quando o sistema está em alerta, a mente está no futuro (antecipando) ou no passado (revisando). Nenhuma das duas coisas é o que está acontecendo agora. O trabalho é trazer o sistema de volta para o presente — não para convencê-lo de que "não tem perigo", mas para mostrar onde o corpo está de fato.',
    steps: [
      { label: 'Respiração de ritmo calmante', body: 'Inspire contando até 4, expire contando até 6. Não precisa de postura especial nem de silêncio. O que importa é a expiração ser mais longa — isso ativa o sistema de desaceleração.' },
      { label: 'Ancoragem pelos sentidos', body: 'Nomeie mentalmente 3 coisas que você vê, 2 que você ouve, 1 que você sente tocando algo perto de você. Isso usa o cérebro para processar o ambiente real, não o cenário imaginado.' },
      { label: 'Nomeie o que está acontecendo', body: '"Meu sistema está tentando me proteger de algo que ainda não aconteceu." Nomear sem tentar convencer o contrário costuma ajudar mais do que dizer "não tem motivo para isso" — porque o sistema não responde a argumentos.' },
      { label: 'Voz gentil, não de comando', body: 'Dizer "isso vai passar" ou "estou em segurança agora" em tom de conversa (não de imposição) pode ajudar o sistema a começar a soltar.' },
    ],
    note: null,
    howToRecognize: 'Você sabe que é alerta/ansiedade (e não sobrecarga) quando o desconforto continua mesmo sozinha(o), em silêncio, sem nenhum estímulo externo. Se o ambiente ficou quieto mas a sensação não passou, é o sistema em alerta — não o ambiente.',
  },

  depressao: {
    primaryAction: 'Diminua a demanda — não aumente o esforço',
    whyItWorks: 'O esgotamento não é falta de disciplina ou motivação. É a resposta de um sistema que sustentou demanda além da sua capacidade de recuperação por tempo demais. Tentar "se motivar" ou fazer mais nesse estado geralmente aprofunda o problema. O que funciona é o oposto: reduzir o que está saindo.',
    steps: [
      { label: 'Identifique uma fonte de demanda para reduzir agora', body: 'Não todas, não amanhã — uma. Pode ser uma tarefa que dá para delegar, um compromisso que dá para cancelar, ou uma parte da rotina que dá para simplificar por enquanto.' },
      { label: 'Reconheça o mascaramento', body: 'Se você passou semanas funcionando "normalmente" para os outros enquanto estava se esforçando muito mais do que parecia, isso tem custo. O esgotamento geralmente vem depois desse período, não durante.' },
      { label: 'Busque apoio — de verdade', body: 'Uma pessoa de confiança que não vai minimizar, um profissional de saúde mental, ou uma comunidade que entenda essa experiência. O isolamento piora o esgotamento.' },
      { label: 'Não tente resolver isso com uma técnica de cinco minutos', body: 'Esgotamento leva semanas para construir e leva tempo para desfazer. Dias melhores isolados não significam que passou — o padrão ao longo de semanas é o que conta.' },
    ],
    note: 'Se os sinais persistirem por mais de algumas semanas, ou vierem acompanhados de desesperança intensa, é importante conversar com um profissional. CVV: 188 (gratuito, 24h) · cvv.org.br',
    howToRecognize: 'Você sabe que é esgotamento (e não só um dia ruim) quando a queda não melhora com uma boa noite de sono, um fim de semana de descanso, ou a remoção de um único estímulo. A duração e a consistência são o sinal.',
  },

  inercia: {
    primaryAction: 'Reduza o primeiro passo — não a tarefa inteira',
    whyItWorks: 'Na inércia de tarefas, a dificuldade não é decidir o que fazer, nem falta de capacidade — é o disparo entre a intenção e a ação. Motivação e força de vontade não resolvem, porque o problema não é de vontade. O que ajuda é encurtar a distância entre "eu quero" e "eu comecei".',
    steps: [
      { label: 'Quebre o primeiro passo ao mínimo possível', body: 'Não "escrever o relatório": "abrir o arquivo". O passo deve parecer pequeno demais para falhar.' },
      { label: 'Peça companhia, mesmo em silêncio', body: 'Fazer a tarefa perto de alguém, ou em uma chamada de vídeo, costuma destravar a iniciação sem que você precise entender o motivo.' },
      { label: 'Use um sinal de transição', body: 'Um som, uma frase ou um objeto específico que marque "agora entramos nesse modo" reduz o atrito de trocar de estado.' },
      { label: 'Deixe o ambiente pronto com antecedência', body: 'Prepare os materiais e o espaço antes, para que não faltem decisões no momento de começar.' },
    ],
    note: 'Discurso motivacional ("é só se esforçar mais") tende a piorar, porque o bloqueio não é de caráter nem de vontade.',
    howToRecognize: 'Você sabe que é inércia (e não sistema em alerta) quando não há medo, julgamento ou cenário de fracasso associado à tarefa — só a dificuldade de sair do lugar. E quando, uma vez iniciada, a tarefa flui normalmente.',
  },
};

// Differentiation guide — shown in a dedicated "Aprenda a diferenciar" section
export const DIFFERENTIATION = [
  {
    question: 'O desconforto passou quando você mudou o ambiente?',
    sim: { state: 'sensorial', label: 'Mais provável: sobrecarga sensorial' },
    nao: { state: 'ansiedade', label: 'Mais provável: sistema em alerta' },
    note: 'Sobrecarga sensorial responde ao ambiente. Ansiedade persiste mesmo quando o ambiente muda.',
  },
  {
    question: 'A queda de energia não melhora com descanso?',
    sim: { state: 'depressao', label: 'Mais provável: esgotamento' },
    nao: { state: null, label: 'Pode ser cansaço comum — que responde ao descanso' },
    note: 'Esgotamento não se resolve com uma noite de sono. Cansaço comum sim.',
  },
  {
    question: 'A mente fica acelerada mesmo em silêncio, sem estímulo externo?',
    sim: { state: 'ansiedade', label: 'Mais provável: sistema em alerta' },
    nao: { state: 'sensorial', label: 'Mais provável: sobrecarga sensorial' },
    note: 'No alerta/ansiedade, o problema está dentro — não no ambiente.',
  },
  {
    question: 'Ao pensar na tarefa, vem junto algum medo, julgamento ou cenário de fracasso?',
    sim: { state: 'ansiedade', label: 'Mais provável: sistema em alerta' },
    nao: { state: 'inercia', label: 'Mais provável: inércia de tarefas' },
    note: 'Evitar por medo é sistema em alerta. Travar sem medo associado, mesmo querendo fazer, é inércia de tarefas.',
  },
];
