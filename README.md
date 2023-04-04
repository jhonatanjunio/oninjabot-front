# oNinjaBot - Frontend

Projeto frontend utilizado nas lives [oNinjaDev](https://twitch.tv/oninjadev)!<br/>
A estrutura do projeto foi baseada em um template que é basicamente Vue 3, Typescript e Vite

## Onde está o que?

- O projeto é iniciado no arquivo `src/main.ts`. Lá são feitos os inits e é de onde a análise começa.
- Na pasta `src/components` encontram-se todos os componentes utilizados. No momento só o `avatar` e o `expbar` não são utilizado porque a ideia não foi evoluída ainda.
- Cada 'parte' da aplicação é composta essencialmente de:
  - route (localizada em module\Home\router.ts)
  - view (localizada em module\Home\views)
  - component
  - styles
  - service (opcional)
  - store (opcional)


## Módulos

- `avatar` → personagem que fica na tela. A movimentação foi feita usando spritesheet em CSS puro.
- `expbar` → barra de XP do personagem. É alimentada com pontos do canal.
- `musicplayer` → player de música do spotify. É exibido quando alguém manda o comando `!sl` para verificar a música que está sendo tocada.
- `slotmachine` → utilizado nos sorteios! É a nossa 'máquina de sorteio'.
- `templates` → base para inicialização do nosso projeto.

## Recomendação de IDE

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Bugs conhecidos

- Por algum motivo, para instalação de novos pacotes ou manutenção dos pacotes existentes, só funciona se usado o `pnpm add|remove|etc`;


<br/><br/>

##### Made with 💜 by [Jhonatan](https://github.com/jhonatanjunio) and [oNinjaDev Community](https://twitch.tv/oninjadev)
