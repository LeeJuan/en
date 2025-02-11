'use strict';
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    word: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
    // 필요한 다른 컬럼들 추가...
  }, {
    tableName: 'languages',  // 테이블 이름을 "languages"로 지정
    timestamps: true,
    underscored: true
  });

  Language.associate = function(models) {
    // 예를 들어, Language는 여러 Example을 가질 수 있음
    Language.hasMany(models.Example, { foreignKey: 'language_id', onDelete: 'CASCADE' });
    // Translation과의 관계도 필요한 경우 설정
    Language.hasMany(models.Translation, { foreignKey: 'language_id', onDelete: 'CASCADE' });
  };

  return Language;
};
