# 🌙 MoonRead - Leitor de Manhwa PWA

## ✨ Melhorias Implementadas

### 1️⃣ Leitura OFF-LINE (PWA)
- ✅ Service Worker para cache automático
- ✅ Manifest.json para instalação como app
- ✅ Indicador de status online/offline
- ✅ Cache de imagens de capítulos
- ✅ Funciona offline após primeira visita

### 2️⃣ Painel ADMIN Mobile-First
- ✅ Upload de múltiplas imagens
- ✅ Upload de arquivo ZIP
- ✅ Reordenar páginas por drag-and-drop
- ✅ Publicar capítulo com 1 clique
- ✅ Interface otimizada para celular

### 3️⃣ Reader Melhorado
- ✅ Carrega imagens reais dos capítulos
- ✅ Lazy loading de imagens
- ✅ Salva progresso automático (página + capítulo)
- ✅ Botão de download por capítulo
- ✅ Funciona online e offline

### 4️⃣ Favoritos e Histórico
- ✅ Sistema de favoritos persistente
- ✅ "Continuar lendo" automático
- ✅ Histórico de leitura
- ✅ Tudo salvo em localStorage

### 5️⃣ Busca e Filtros
- ✅ Busca em tempo real
- ✅ Filtros por categoria
- ✅ Filtro de favoritos
- ✅ Ordenação por rating/views

### 6️⃣ Código Limpo
- ✅ Arquivos separados (app.js, admin.js)
- ✅ Comentários organizados
- ✅ Mobile-first design
- ✅ Fácil de expandir

---

## 📁 Estrutura de Arquivos

```
moonread/
├── manhwa-reader.html    # Arquivo HTML principal
├── app.js                # Lógica principal do app
├── admin.js              # Painel de administração
├── service-worker.js     # Service Worker (PWA)
├── manifest.json         # Manifest PWA
├── offline.html          # Página offline
└── README.md            # Este arquivo
```

---

## 🚀 Como Usar

### Instalação Básica

1. **Coloque todos os arquivos na mesma pasta:**
   - manhwa-reader.html
   - app.js
   - admin.js
   - service-worker.js
   - manifest.json
   - offline.html

2. **Abra o arquivo manhwa-reader.html no navegador**

3. **O site pedirá para instalar como PWA** (aguarde alguns segundos)

### Como Acessar o Painel Admin

1. **Ativar modo admin:**
   ```javascript
   // No console do navegador:
   localStorage.setItem('moonread_admin_key', 'moonread2024');
   ```

2. **Recarregue a página** - aparecerá o botão ⚙️ no header

3. **Clique no botão ⚙️** para acessar o painel admin

### Como Publicar um Capítulo

1. **Acesse o painel admin** (⚙️)

2. **Selecione um manhwa** no dropdown

3. **Digite o título do capítulo** (opcional)

4. **Escolha o método de upload:**
   - **Várias Imagens:** Selecione múltiplas imagens (PNG, JPG, WEBP)
   - **Arquivo ZIP:** Faça upload de um ZIP com imagens numeradas

5. **Reordene as páginas** (arraste se necessário)

6. **Clique em "✨ Publicar Capítulo"**

### Como Baixar Capítulos para Leitura Offline

1. **Abra a página de detalhes** de um manhwa

2. **Clique no ícone ⬇️** ao lado do capítulo

3. **Aguarde** o download concluir (💾 aparecerá)

4. **Agora pode ler offline!**

---

## 💾 Dados Salvos (localStorage)

O MoonRead salva tudo localmente no navegador:

- `moonread_manhwas` - Lista de manhwas e capítulos
- `moonread_favorites` - IDs dos favoritos
- `moonread_reading_history` - Histórico de leitura
- `moonread_downloaded_chapters` - Capítulos baixados
- `moonread_admin_key` - Chave de acesso admin
- `theme` - Tema (dark/light)

---

## 🛠️ Personalização

### Adicionar Novo Manhwa (via console)

```javascript
const novoManhwa = {
    id: '4',
    title: 'Meu Manhwa',
    icon: '🎨',
    rating: 9.0,
    views: '500K',
    totalChapters: 0,
    status: 'ongoing',
    tags: ['Ação', 'Aventura'],
    synopsis: 'Descrição do manhwa...',
    chapters: []
};

let manhwas = JSON.parse(localStorage.getItem('moonread_manhwas'));
manhwas.push(novoManhwa);
localStorage.setItem('moonread_manhwas', JSON.stringify(manhwas));
location.reload();
```

### Mudar Cores do Tema

Edite as variáveis CSS no arquivo HTML:

```css
:root {
    --accent-primary: #00ff9d;    /* Verde neon */
    --accent-secondary: #00d4ff;  /* Azul ciano */
    --bg-primary: #0a0a0f;        /* Fundo escuro */
}
```

---

## 📱 PWA - Progressive Web App

### Instalação no Celular

**Android (Chrome):**
1. Abra o site
2. Menu (⋮) → "Adicionar à tela inicial"
3. Confirme a instalação

**iOS (Safari):**
1. Abra o site
2. Botão de compartilhar
3. "Adicionar à Tela de Início"

### Recursos PWA

- ✅ Funciona offline
- ✅ Ícone na tela inicial
- ✅ Notificações (futuro)
- ✅ Atualização automática
- ✅ Cache inteligente

---

## 🔧 Resolução de Problemas

### Service Worker não registra

1. Certifique-se que está usando HTTPS ou localhost
2. Verifique se todos os arquivos estão na mesma pasta
3. Limpe o cache do navegador
4. Recarregue com Ctrl+Shift+R

### Imagens não carregam offline

1. Baixe o capítulo novamente (botão ⬇️)
2. Verifique se o Service Worker está ativo (DevTools → Application)
3. Limpe o cache e recarregue

### Painel admin não aparece

1. Verifique se definiu a chave:
   ```javascript
   localStorage.setItem('moonread_admin_key', 'moonread2024');
   ```
2. Recarregue a página
3. Procure o botão ⚙️ no header

### Upload ZIP não funciona

1. Verifique se JSZip está carregado (console)
2. O ZIP deve conter apenas imagens
3. Tamanho máximo: ~50MB
4. Use nomes de arquivo em ordem (01.jpg, 02.jpg, etc.)

---

## 🎯 Próximos Passos

Sugestões de melhorias futuras:

1. **Backend real** (Node.js + MongoDB)
2. **Sistema de usuários** com autenticação
3. **Comentários reais** (não apenas mock)
4. **Sistema de notificações** (PWA)
5. **Compartilhamento** de manhwas
6. **Listas personalizadas**
7. **Modo leitura horizontal**
8. **Zoom de imagens**
9. **Modo teatro** (sem distrações)
10. **Sincronização entre dispositivos**

---

## 📄 Licença

Este é um projeto demonstrativo para fins educacionais.

---

## 🤝 Contribuindo

Ideias de melhorias:

- Adicionar mais temas de cores
- Criar templates de mangá vs manhwa
- Implementar leitor horizontal
- Adicionar filtros avançados
- Criar sistema de tags customizadas
- Adicionar animações de transição

---

## ⚠️ Notas Importantes

1. **Dados são locais** - localStorage tem limite (~10MB)
2. **Sem backend** - tudo roda no navegador
3. **Imagens em base64** - podem aumentar muito o localStorage
4. **Produção:** Use CDN/storage real para imagens
5. **Cache:** Pode crescer, limpe periodicamente

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique o console do navegador (F12)
2. Revise este README
3. Teste em modo anônimo (sem extensões)
4. Tente em outro navegador

---

**Desenvolvido com 🌙 para leitores de manhwa/webtoon**
