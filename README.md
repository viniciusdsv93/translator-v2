## Ferramenta de traducao automatica de termos do portugues para outros idiomas usando a biblioteca puppeteer-cluster e o modulo nativo de worker threads do node

### Construído com

-   Node
-   Puppeteer-cluster
-   Modulo nativo de worker threads

Ferramenta para automacao de traducao de termos em portugues para outros idiomas
utilizando a biblioteca puppeteer-cluster para webscraping e o modulo nativo de worker
threads do node para execucao em paralelo das buscas e traducoes.

## Como utilizar

No arquivo source.json ha uma lista de palavras com seus respectivos nomes em portugues.

Insira as palavras que deseja traduzir neste json, no mesmo formato, e no arquivo
index.js, adicione no array de idiomas aquele para o qual deseja traduzir, com sua
abreviacao e seu nome.

Depois, execute o comando "npm start".

Apos alguns segundos, serao gerados arquivos, um para cada idioma, com a abreviacao
seguida de .json em seu nome, com as palavras traduzidas para o respectivo idioma no
formato JSON.

## Autor

-   GitHub - Vinícius dos Santos Verissimo (https://github.com/viniciusdsv93)
