'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // data/languages.json 파일을 읽어옵니다.
    const dataPath = path.resolve(__dirname, '../data/languages.json');
    let languagesData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // 만약 JSON 데이터에 타임스탬프가 없다면, 각 레코드에 생성 및 업데이트 시간을 추가합니다.
    languagesData = languagesData.map(record => ({
      ...record,
      created_at: record.created_at || new Date(),
      updated_at: record.updated_at || new Date()
    }));

    await queryInterface.bulkInsert('languages', languagesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // 롤백 시 모든 데이터를 삭제합니다.
    await queryInterface.bulkDelete('languages', null, {});
  }
};
