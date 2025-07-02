#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const controllersDir = path.join(__dirname, 'controllers', 'web');

// Função para atualizar controllers
function updateControllers() {
  // Lista de arquivos no diretório controllers/web
  const files = fs.readdirSync(controllersDir);
  
  files.forEach(file => {
    if (file.endsWith('.js')) {
      const filePath = path.join(controllersDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      
      // Substituir importações de módulos antigos
      if (content.includes('../../module/pessoa_cachorro.js')) {
        content = content.replace(
          /import.*from\s+['"]\.\.\/\.\.\/module\/pessoa_cachorro\.js['"]/g,
          "import { Pessoa, Cachorro, PessoaCachorro } from '../../models/index.js'"
        );
        modified = true;
      }
      
      if (content.includes('../../module/quadro_pessoa.js')) {
        content = content.replace(
          /import.*from\s+['"]\.\.\/\.\.\/module\/quadro_pessoa\.js['"]/g,
          "import { Quadro, Pessoa } from '../../models/index.js'"
        );
        modified = true;
      }
      
      // Atualizar outras importações diretas de modelos
      if (content.includes('../../models/cachorro.js') || 
          content.includes('../../models/pessoa.js') ||
          content.includes('../../models/quadro.js')) {
        
        content = content.replace(
          /import\s+\w+\s+from\s+['"]\.\.\/\.\.\/models\/cachorro\.js['"]/g,
          "import { Cachorro } from '../../models/index.js'"
        );
        
        content = content.replace(
          /import\s+\w+\s+from\s+['"]\.\.\/\.\.\/models\/pessoa\.js['"]/g,
          "import { Pessoa } from '../../models/index.js'"
        );
        
        content = content.replace(
          /import\s+\w+\s+from\s+['"]\.\.\/\.\.\/models\/quadro\.js['"]/g,
          "import { Quadro } from '../../models/index.js'"
        );
        
        modified = true;
      }
      
      // Corrigir maiúsculas/minúsculas em pessoaId e cachorroId
      if (file === 'pessoa_cachorro_controller.js') {
        if (content.includes('PessoaId') || content.includes('CachorroId')) {
          content = content.replace(/PessoaId/g, 'pessoaId');
          content = content.replace(/CachorroId/g, 'cachorroId');
          modified = true;
        }
      }
      
      // Salvar alterações
      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Arquivo atualizado: ${filePath}`);
      }
    }
  });
  
  console.log('Verificação e atualização dos controllers concluída!');
}

console.log('Iniciando atualização dos controllers...');
updateControllers();