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
    estado: {
      type: DataTypes.ENUM,
      values: ['VIGENTE', 'REVERTIDO'],
      defaultValue: 'VIGENTE',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    },
    saldo: {
      type: DataTypes.DECIMAL,
      xlabel: lang.t('fields.saldo')
    },
    saldo_productos: {
      type: DataTypes.JSON,
      xlabel: lang.t('fields.saldo_productos')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Creditos = sequelize.define('creditos', fields, {
    timestamps: false,
    tableName: 'creditos'
  });

  return Creditos;
};
