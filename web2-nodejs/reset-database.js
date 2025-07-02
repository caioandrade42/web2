import sequelize from './database/mysql.js';
import './models/index.js';

async function resetDatabase() {
  try {
    console.log('Iniciando reset completo do banco de dados...');
    
    // Desativar verificação de chaves estrangeiras
    console.log('Desativando verificação de chaves estrangeiras...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Listar todas as tabelas
    console.log('Obtendo lista de tabelas...');
    const [tables] = await sequelize.query(
      'SELECT table_name FROM information_schema.tables WHERE table_schema = ?',
      { replacements: [sequelize.config.database] }
    );
    
    // Dropar cada tabela
    console.log('Dropando tabelas existentes:');
    for (const table of tables) {
      const tableName = table.TABLE_NAME || table.table_name;
      if (tableName) {
        console.log(`- Dropando tabela: ${tableName}`);
        await sequelize.query(`DROP TABLE IF EXISTS \`${tableName}\``);
      }
    }
    
    // Reativar verificação de chaves estrangeiras
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Verificação de chaves estrangeiras reativada.');
    
    // Criar tabelas novamente
    console.log('Recriando todas as tabelas...');
    await sequelize.sync({ force: true });
    
    console.log('Reset do banco de dados concluído com sucesso!');
    console.log('Você pode agora iniciar seu aplicativo normalmente.');
  } catch (error) {
    console.error('Erro durante o reset do banco de dados:', error);
  } finally {
    // Fechar conexão
    await sequelize.close();
  }
}

// Execute o reset
resetDatabase();