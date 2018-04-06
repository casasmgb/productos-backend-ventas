'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let planillasx = Array(10).fill().map((_, i) => {
    let item = {
      estado: casual.random_element(['CREADO', 'PAGADO', 'ANUALADO']),
      cpt: '1234-1234-1234',
      monto_total: casual.integer(1, 10),
      fecha_pago: casual.date('YYYY-MM-DD'),
      tipo: casual.random_element(['RETROACTIVO', 'MENSUAL']),
      id_sucursal: casual.integer(1, 10)
    };

    return item;
  });

  items = items.concat(planillasx);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('planillas', items, {});
  },

  down (queryInterface, Sequelize) { }
};
