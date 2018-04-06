'use strict';

const { setTimestampsSeeder } = require('../lib/util');

let items = [
  { nombre: 'PRENATAL URBANO', estado: 'ACTIVO', fecha_ini: '05/04/2018', fecha_fin: '05/04/2019', vigencia_dias: 60 },
  { nombre: 'PRENATAL RURAL', estado: 'ACTIVO', fecha_ini: '05/04/2018', fecha_fin: '05/04/2019', vigencia_dias: 90 },
  { nombre: 'LACTANCIA URBANO', estado: 'ACTIVO', fecha_ini: '05/04/2018', fecha_fin: '05/04/2019', vigencia_dias: 60 },
  { nombre: 'LACTANCIA RURAL', estado: 'ACTIVO', fecha_ini: '05/04/2018', fecha_fin: '05/04/2019', vigencia_dias: 90 },
  { nombre: 'UNIVERSAL URBANO', estado: 'ACTIVO', fecha_ini: '05/04/2018', fecha_fin: '05/04/2019', vigencia_dias: 60 },
  { nombre: 'UNIVERSAL RURAL', estado: 'ACTIVO', fecha_ini: '05/04/2018', fecha_fin: '05/04/2019', vigencia_dias: 90 }
];

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('subsidios', items, {});
  },

  down (queryInterface, Sequelize) { }
};
