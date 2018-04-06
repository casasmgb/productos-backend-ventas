'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let calendarioBeneficios = Array(10).fill().map((_, i) => {
    let item = {
      mes: casual.integer(1, 12),
      gestion: casual.integer(2015, 2018),
      fecha_validez_inicio: casual.date('YYYY-MM-DD'),
      fecha_validez_fin: casual.date('YYYY-MM-DD'),
      fecha_recojo: casual.date('YYYY-MM-DD'),
      codigo_recojo: casual.integer(111111, 999999),
      estado: casual.random_element(['CREADO', 'ABONADO', 'ENTREGADO', 'CADUCADO']),
      observaciones: casual.text,
      monto: casual.integer(1, 100),
      saldo: casual.integer(1, 500),
      tipo: casual.random_element(['PROD_FRESCOS', 'PROD_SECOS']),
      id_beneficiaria: casual.integer(1, 10),
      id_subsidio: casual.integer(1, 6),
      id_sedem_recojo: casual.integer(1, 10),
      id_paquete: casual.integer(1, 10)
    };

    return item;
  });

  items = items.concat(calendarioBeneficios);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('calendario_beneficios', items, {});
  },

  down (queryInterface, Sequelize) { }
};
