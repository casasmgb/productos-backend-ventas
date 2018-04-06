'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let montos = Array(10).fill().map((_, i) => {
    let item = {
      gestion: casual.integer(2015, 2018),
      monto: casual.integer(1, 100),
      fecha_ini: casual.date('YYYY-MM-DD'),
      fecha_fin: casual.date('YYYY-MM-DD'),
      estado: casual.random_element(['ACTIVO', 'INACTIVO']),
      id_subsidio: casual.integer(1, 6)
    };

    return item;
  });

  items = items.concat(montos);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('montos', items, {});
  },

  down (queryInterface, Sequelize) { }
};
