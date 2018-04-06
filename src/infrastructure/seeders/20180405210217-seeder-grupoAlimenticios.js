'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let grupoAlimenticios = Array(10).fill().map((_, i) => {
    let item = {
      nombre: casual.words(1),
      descripcion: casual.words(10),
      porcentaje: casual.integer(1, 100),
      estado: casual.random_element(['ACTIVO', 'INACTIVO'])
    };

    return item;
  });

  items = items.concat(grupoAlimenticios);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('grupo_alimenticios', items, {});
  },

  down (queryInterface, Sequelize) { }
};
