'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('examples', {
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
          model: 'languages',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      example: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      example_sound: {
        type: Sequelize.STRING(255),
        allowNull: true
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
    await queryInterface.dropTable('examples');
  }
};
