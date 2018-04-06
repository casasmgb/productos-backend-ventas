'use strict';

const lang = require('../lang');
const util = require('../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    beneficio: {
      type: DataTypes.TEXT,
      xlabel: lang.t('fields.beneficio'),
      allowNull: false
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
      xlabel: lang.t('fields.monto')
    },
    nro_asignacion: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.nro_asignacion'),
      allowNull: false
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let PlanillaBeneficiarias = sequelize.define('planilla_beneficiarias', fields, {
    timestamps: false,
    tableName: 'planilla_beneficiarias'
  });

  return PlanillaBeneficiarias;
};
