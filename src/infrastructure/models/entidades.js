'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      xlabel: lang.t('fields.nombre')
    },
    descripcion: {
      type: DataTypes.TEXT,
      xlabel: lang.t('fields.descripcion')
    },
    sigla: {
      type: DataTypes.STRING(20),
      xlabel: lang.t('fields.sigla')
    },
    email: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.email'),
      allowNull: false
    },
    telefonos: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.telefonos')
    },
    direccion: {
      type: DataTypes.TEXT,
      xlabel: lang.t('fields.direccion'),
      allowNull: false
    },
    web: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.web')
    },
    nit: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.nit'),
      allowNull: false
    },
    matricula_comercio: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.matricula_comercio'),
      allowNull: false
    },
    razon_social: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.razon_social'),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    },
    codigo_portal: {
      type: DataTypes.STRING(20),
      unique: true,
      xlabel: lang.t('fields.codigo_portal')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Entidades = sequelize.define('entidades', fields, {
    timestamps: false,
    tableName: 'entidades'
  });

  return Entidades;
};
