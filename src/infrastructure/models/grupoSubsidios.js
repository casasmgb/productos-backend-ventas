'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    nombre: {
      type: DataTypes.STRING(200),
      unique: true,
      allowNull: false,
      xlabel: lang.t('fields.nombre')
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

  let GrupoSubsidios = sequelize.define('GrupoSubsidios', fields, {
    timestamps: false,
    tableName: 'grupo_subsidios'
  });

  return GrupoSubsidios;
};
