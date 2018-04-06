'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let alimentos = Array(10).fill().map((_, i) => {
    let item = {
      nombre: casual.words(1),
      estado: casual.random_element(['ACTIVO', 'INACTIVO']),
      id_grupo_alimenticio: casual.integer(1, 10)
    };

    return item;
  });

  items = items.concat(alimentos);
}

// // Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('alimentos', items, {});
  },

  down (queryInterface, Sequelize) { }
};
