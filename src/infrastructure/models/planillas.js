'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    estado: {
      type: DataTypes.ENUM,
      values: ['CREADO', 'PAGADO', 'ANUALADO'],
      defaultValue: 'CREADO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    },
    cpt: {
      type: DataTypes.STRING(15),
      xlabel: lang.t('fields.cpt')
    },
    monto_total: {
      type: DataTypes.FLOAT,
      xlabel: lang.t('fields.monto_total')
    },
    fecha_pago: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fecha_pago')
    },
    tipo: {
      type: DataTypes.ENUM,
      values: ['RETROACTIVO', 'MENSUAL'],
      allowNull: false,
      xlabel: lang.t('fields.tipo')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Planillas = sequelize.define('planillas', fields, {
    timestamps: false,
    tableName: 'planillas'
  });

  return Planillas;
};
