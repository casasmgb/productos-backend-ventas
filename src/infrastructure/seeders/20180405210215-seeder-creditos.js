'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let creditos = Array(10).fill().map((_, i) => {
    let item = {
      monto: casual.integer(0, 1500),
      estado: casual.random_element(['VIGENTE', 'REVERTIDO']),
      saldo: casual.integer(0, 2000),
      saldo_productos: JSON.stringify({
        grupo: casual.random_element(['carne', 'pollo', 'pescado', 'verduras']),
        producto: casual.word,
        precio: casual.integer(1, 200)
      }),
      id_calendario_beneficio: casual.integer(1, 10)
    };

    return item;
  });

  items = items.concat(creditos);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('creditos', items, {});
  },

  down (queryInterface, Sequelize) { }
};
