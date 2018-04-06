'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    componentes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_inicio')
    },
    fecha_fin: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_fin')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Paquetes = sequelize.define('paquetes', fields, {
    timestamps: false,
    tableName: 'paquetes'
  });

  return Paquetes;
};
