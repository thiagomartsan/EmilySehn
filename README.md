# Emily Sehn — Landing page V5.2

Landing page estática em HTML, CSS e JavaScript puro.

## Atualizações desta versão
- foto da Emily na primeira dobra, mantendo a composição em duas cores da V4;
- hero com texto aprovado: “Na escuta, nasce o encontro”;
- SEO local reforçado naturalmente para `Psicóloga em Porto Alegre` e psicoterapia para adultos;
- seção Sobre reescrita com o texto enviado pela Emily;
- estrutura mais direta e menos conceitual;
- formulário inicial do Google como CTA secundário: https://forms.gle/gNLVj8Dcu7USLmMn6;
- bloco de primeiro contato com formulário → conversa breve → primeira sessão;
- FAQ informa conversa inicial de até 15 minutos sem anunciar “gratuidade” como chamariz;
- presencial mantém referência provisória em Moinhos de Vento, sem inventar endereço;
- pagamentos: Pix e dinheiro no presencial; Pix no online; sem convênios no momento;
- CTA global permanece `Conversar pelo WhatsApp` no header, hero e fechamento;
- tracking preparado para `form_click`, WhatsApp, Instagram, e-mail, Maps e Waze via `dataLayer`.

## Ajustes de pré-publicação V5.2
- corrigido overflow horizontal no mobile/tablet;
- menu mobile fechado agora fica invisível e fora da navegação por teclado;
- `noindex,nofollow` mantido até a ativação planejada para dezembro;
- `areaServed` limitado a Porto Alegre no JSON-LD;
- Maps e Waze identificados como referência da região de Moinhos de Vento, sem simular endereço definido;
- sessões de 45 minutos adicionadas às duas modalidades.

> **Antes de ativar o Google:** trocar `noindex,nofollow` por `index,follow` somente quando Emily autorizar a indexação e depois validar canonical, sitemap, Search Console e URL final.

## Antes da ativação no Google / dezembro
- definir o endereço presencial real antes de criar/validar Perfil da Empresa no Google;
- não usar endereço virtual apenas para Maps;
- confirmar orientação/formação complementar que Emily quiser divulgar;
- definir domínio final e então adicionar canonical, sitemap e Open Graph image;
- conectar Search Console e Analytics;
- revisar o Google Business Profile com nome, categoria, horário, telefone e endereço consistentes com o site;
- executar Lighthouse/PageSpeed no deploy real e revisar 360/390/430/768/desktop.
