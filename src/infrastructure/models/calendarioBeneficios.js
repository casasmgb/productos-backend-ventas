'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    mes: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.mes')
    },
    gestion: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.gestion')
    },
    fecha_validez_inicio: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_validez_inicio')
    },
    fecha_validez_fin: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_validez_fin')
    },
    fecha_recojo: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_recojo')
    },
    codigo_recojo: {
      type: DataTypes.STRING(20),
      xlabel: lang.t('fields.codigo_recojo')
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['CREADO', 'ABONADO', 'ENTREGADO', 'CADUCADO'],
      defaultValue: 'CREADO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    },
    observaciones: {
      type: DataTypes.TEXT,
      xlabel: lang.t('fields.observaciones')
    },
    monto: {
      type: DataTypes.DECIMAL,
      xlabel: lang.t('fields.monto')
    },
    saldo: {
      type: DataTypes.DECIMAL,
      xlabel: lang.t('fields.saldo')
    },
    tipo: {
      type: DataTypes.ENUM,
      values: ['PROD_FRESCOS', 'PROD_SECOS'],
      allowNull: false,
      xlabel: lang.t('fields.tipo')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let CalendarioBeneficios = sequelize.define('calendarioBeneficios', fields, {
    timestamps: false,
    tableName: 'calendario_beneficios'
  });

  return CalendarioBeneficios;
};
