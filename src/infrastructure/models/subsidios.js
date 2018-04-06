'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      xlabel: lang.t('fields.nombre')
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    },
    fecha_ini: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_ini')
    },
    fecha_fin: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_fin')
    },
    vigencia_dias: {
      type: DataTypes.INTEGER,
      allowNull: false,
      xlabel: lang.t('fields.vigencia_dias')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Subsidios = sequelize.define('subsidios', fields, {
    timestamps: false,
    tableName: 'subsidios'
  });

  return Subsidios;
};
