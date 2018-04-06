'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    monto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      xlabel: lang.t('fields.monto')
    },
    detalle: {
      type: DataTypes.JSON,
      allowNull: false,
      xlabel: lang.t('fields.detalle')
    },
    fecha_gasto: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_gasto')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Gastos = sequelize.define('gastos', fields, {
    timestamps: false,
    tableName: 'gastos'
  });

  return Gastos;
};
