'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let beneficiarias = Array(10).fill().map((_, i) => {
    let item = {
      id_persona: casual.integer(1, 10),
      titular: casual.integer(1, 10),
      titular_cobro: casual.integer(1, 10),
      id_sucursal: casual.integer(1, 10),
      id_subsidio: casual.integer(1, 2),
      nro_seguro: casual.phone,
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      observaciones: casual.sentence,
      nro_hijos: casual.integer(1, 3),
      fecha_nacido_vivo: new Date(),
      estado: casual.random_element(['ACTIVO', 'INACTIVO']),
      motivo_cesacion: casual.random_element(['M1', 'M2'])
    };

    return item;
  });

  items = items.concat(beneficiarias);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('beneficiarias', items, {});
  },

  down (queryInterface, Sequelize) { }
};
