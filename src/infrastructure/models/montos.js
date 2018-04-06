'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    gestion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      xlabel: lang.t('fields.gestion')
    },
    monto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      xlabel: lang.t('fields.monto')
    },
    fecha_ini: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_ini')
    },
    fecha_fin: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_fin')
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Montos = sequelize.define('montos', fields, {
    timestamps: false,
    tableName: 'montos'
  });

  return Montos;
};
