# Teste de Front-end

## Sumário

Este repositório tem uma pequena fração do front-end que estamos trabalhando no nosso novo produto digital, mais precisamente o layout de perguntas de usuários para um vendedor. O usuário mandará perguntas para que o vendedor seja capaz de responde-las em tempo real, em uma live stream, e o vendedor também seja capaz de manter um controle sobre quais perguntas já foram respondidas, e quais ainda estão para serem respondidas.
Um esboço desta tela já foi feito utilizando HTML, Javascript e Bootstrap, mas há funcionalidades que estão faltando que precisam ser implementadas, como por exemplo: ao lado de cada mensagem, há uma caixa clicável aonde o vendedor sinaliza para o sistema se a pergunta já foi respondida, e no caso do clique, deve haver um feedback visual para o tal, pois a caixa deve trocar de cor, ao mesmo tempo que manda a requisição Ajax. 
Em resumo, o projeto consiste em replicar o layout enviado pelo time de arte para um front-end funcional o mais fiel possível. 

## Objetivo

O objetivo desde teste é replicar o layout vindo do time de arte para um frontend funcional que atenda os seguintes requisitos: 

- Responsivo; 
- Utilize requisições GET e PUT para o servidor de staging
- Siga a referência do time de arte

## Instruções

O link do layout está [neste link](http://www.google.com.br) e a senha é **Senha**.

Os endpoints utilizados serão: 
```py
    # Requisição para resgatar todas as mensagens. O projeto utilizado é o de id número 6
    https://staging.mtr.center/api/chat/message/

    # Requisição para pegar uma mensagem em especifico (será util para o verbo PUT):
    https://staging.mtr.center/api/chat/message/<id da mensagem>/

```

Para submeter a sua solução, é feito o seguinte procedimento: 
- Crie uma nova branch com o seu nome 
- Clone o repositório para a sua máquina e faça todas as alterações que julgar necessária.
- Quando terminar, criar um Pull Request para a branch **master** para que seja avaliado. 

