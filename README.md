# Portfólio FASA

Estudo de caso do trabalho de social media feito por Pedro Munareto para a FASA, de julho a dezembro de 2024.

Site no ar: https://pedronicolasmm-coder.github.io/portfolio-fasa/

## Como editar de outro computador

### Pelo navegador (mais fácil)

1. Abra o repositório no GitHub e clique no arquivo que quer mudar.
2. Clique no lápis (Edit this file), altere e clique em **Commit changes**.
3. O site atualiza sozinho em cerca de 1 minuto.

### Pelo Git

```
git clone https://github.com/pedronicolasmm-coder/portfolio-fasa.git
cd portfolio-fasa
# edite os arquivos
git add -A
git commit -m "o que mudou"
git push
```

Para ver no computador antes de subir, basta abrir o `index.html` no navegador.

## Onde fica cada coisa

| Arquivo | O que tem |
|---|---|
| `index.html` | Textos das seções, títulos, números do topo e contato |
| `dados.js` | Lista de peças de cada seção, títulos das peças, escolas e cidades |
| `estilo.css` | Visual. As cores ficam no topo, em `:root` |
| `app.js` | Funcionamento: grade, visualizador, menu do celular |
| `img/t/` | Miniaturas que aparecem nas grades (cerca de 620 px) |
| `img/g/` | Versões grandes que abrem no visualizador (cerca de 1200 px) |
| `img/campus/` | Fotos do campus e a foto de abertura |

## Como trocar ou adicionar uma peça

1. Coloque a miniatura em `img/t/` e a versão grande em `img/g/`, em JPG.
2. Em `dados.js`, copie um bloco de peça da seção desejada e troque `titulo`, `capa` e `slides`.
3. Se a peça tiver mais de uma versão (feed, story...), liste todas em `slides`, uma por linha.

## Depois de mudar o visual ou o funcionamento

No `index.html`, `estilo.css`, `dados.js` e `app.js` são carregados com `?v=2` no fim.
Sempre que mudar um desses arquivos, aumente esse número (`?v=3`, `?v=4`...). Senão o
navegador de quem já visitou o site pode continuar usando a versão antiga guardada.

## Observação

A marca FASA pertence à instituição. As peças são exibidas aqui para fins de portfólio.
