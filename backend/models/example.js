'use strict';
module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define('Example', {
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    example: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    example_sound: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'examples',
    timestamps: true
  });
  
  Example.associate = function(models) {
    // language 테이블(기존 단어 정보)와 외래키 관계 설정
    Example.belongsTo(models.Language, { foreignKey: 'language_id', onDelete: 'CASCADE' });
    // Translation과의 관계도 필요하면 추가 가능 (예: Example.hasMany(models.Translation, ...))
  };
  
  return Example;
};
