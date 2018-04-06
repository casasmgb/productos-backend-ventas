'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let paquetes = Array(10).fill().map((_, i) => {
    let item = {
      componentes: casual.array_of_digits(7),
      estado: casual.random_element(['ACTIVO', 'INACTIVO']),
      fecha_inicio: casual.date('YYYY-MM-DD'),
      fecha_fin: casual.date('YYYY-MM-DD')
    };

    return item;
  });

  items = items.concat(paquetes);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('paquetes', items, {});
  },

  down (queryInterface, Sequelize) { }
};
