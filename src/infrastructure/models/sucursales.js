'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    direccion: {
      type: DataTypes.STRING(200),
      allowNull: false,
      xlabel: lang.t('fields.direccion')
    },
    tipo: {
      type: DataTypes.ENUM,
      values: ['CASA_MATRIZ', 'SUCURSAL', 'REGIONAL', 'SUB_REGIONAL'],
      defaultValue: 'SUCURSAL',
      allowNull: false,
      xlabel: lang.t('fields.tipo')
    },
    proveedor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      xlabel: lang.t('fields.proveedor')
    },
    dpa: {
      type: DataTypes.STRING(30),
      defaultValue: false,
      allowNull: false,
      xlabel: lang.t('fields.dpa')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Sucursales = sequelize.define('Sucursales', fields, {
    timestamps: false,
    tableName: 'sucursales'
  });

  return Sucursales;
};
