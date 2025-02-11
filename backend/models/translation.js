'use strict';
module.exports = (sequelize, DataTypes) => {
  const Translation = sequelize.define('Translation', {
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    example_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    language_code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    mean: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    example_mean: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'translations',
    timestamps: true,
    underscored: true
  });
  
  Translation.associate = function(models) {
    // language 테이블과의 관계 설정 (단어 기본 정보)
    Translation.belongsTo(models.Language, { foreignKey: 'language_id', onDelete: 'CASCADE' });
    // examples 테이블과의 관계 설정 (해당 예제 번역)
    Translation.belongsTo(models.Example, { foreignKey: 'example_id', onDelete: 'CASCADE' });
  };
  
  return Translation;
};
