'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let gastos = Array(10).fill().map((_, i) => {
    let item = {
      monto: casual.integer(1200, 2000),
      detalle: JSON.stringify({
        grupo: casual.random_element(['carne', 'pollo', 'pescado', 'verduras']),
        producto: casual.word,
        precio: casual.integer(1, 200)
      }),
      fecha_gasto: casual.date('YYYY-MM-DD'),
      id_sucursal: casual.integer(1, 10),
      id_credito: casual.integer(1, 10)
    };

    return item;
  });

  items = items.concat(gastos);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('gastos', items, {});
  },

  down (queryInterface, Sequelize) { }
};
