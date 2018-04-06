'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let planillaBeneficiarias = Array(10).fill().map((_, i) => {
    let item = {
      beneficio: casual.sentence,
      monto: '12.12',
      nro_asignacion: 10,
      id_planilla: 1,
      id_beneficiaria: 1
    };

    return item;
  });

  items = items.concat(planillaBeneficiarias);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('planilla_beneficiarias', items, {});
  },

  down (queryInterface, Sequelize) { }
};
