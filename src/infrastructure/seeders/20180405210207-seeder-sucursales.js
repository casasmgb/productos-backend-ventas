'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let sucursales = Array(10).fill().map((_, i) => {
    let item = {
      id_entidad: casual.integer(1, 10),
      direccion: casual.address,
      tipo: casual.random_element(['CASA_MATRIZ', 'SUCURSAL', 'REGIONAL', 'SUB_REGIONAL']),
      proveedor: casual.random_element([true, false]),
      dpa: '1234567987890'
    };

    return item;
  });

  items = items.concat(sucursales);
}

// // Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sucursales', items, {});
  },

  down (queryInterface, Sequelize) { }
};
