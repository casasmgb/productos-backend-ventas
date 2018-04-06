'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    nroSeguro: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'nro_seguro',
      xlabel: lang.t('fields.nroSeguro')
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'fecha_inicio',
      xlabel: lang.t('fields.fecha_inicio')
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'fecha_fin',
      xlabel: lang.t('fields.fecha_fin')
    },
    observaciones: {
      type: DataTypes.STRING(500),
      allowNull: true,
      xlabel: lang.t('fields.observaciones')
    },
    nroHijos: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'nro_hijos',
      xlabel: lang.t('fields.nroHijos')
    },
    fechaNacidoVivo: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'fecha_nacido_vivo',
      xlabel: lang.t('fields.fechaNacidoVivo')
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    },
    motivoCesacion: {
      type: DataTypes.ENUM,
      values: ['M1', 'M2'],
      allowNull: true,
      field: 'motivo_cesacion',
      xlabel: lang.t('fields.motivoCesacion')
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

  let Beneficiarias = sequelize.define('Beneficiarias', fields, {
    timestamps: false,
    tableName: 'beneficiarias'
  });

  return Beneficiarias;
};
