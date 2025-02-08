'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('translations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      language_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'languages', // 기존 언어 테이블
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      example_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'examples', // 위에서 생성한 examples 테이블
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      language_code: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      mean: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      example_mean: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('translations');
  }
};
