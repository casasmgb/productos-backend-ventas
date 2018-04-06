'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
      xlabel: lang.t('fields.nombre')
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false,
      xlabel: lang.t('fields.descripcion')
    },
    porcentaje: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.porcentaje')
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

  let GrupoAlimenticios = sequelize.define('GrupoAlimenticios', fields, {
    timestamps: false,
    tableName: 'grupo_alimenticios'
  });

  return GrupoAlimenticios;
};
