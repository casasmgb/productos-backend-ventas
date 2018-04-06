'use strict';

// Definiendo asociaciones de las tablas
module.exports = function associations (models) {
  const {
    roles,
    usuarios,
    entidades,
    sucursales,
    modulos,
    permisos,
    personas,
    beneficiarias,
    planillaBeneficiarias,
    planillas,
    alimentos,
    grupoAlimenticios,
    grupoSubsidios,
    calendarioBeneficios,
    creditos,
    gastos,
    montos,
    subsidios,
    paquetes
  } = models;

  // Asociaciones tabla entidades
  entidades.hasMany(sucursales, { foreignKey: { name: 'id_entidad', allowNull: false }, as: 'entidad_suc' });
  sucursales.belongsTo(entidades, { foreignKey: { name: 'id_entidad', allowNull: false }, as: 'entidad_suc' });
  // Asociaciones tabla usuarios
  usuarios.belongsTo(entidades, { foreignKey: { name: 'id_entidad', allowNull: false }, as: 'entidad' });
  entidades.hasMany(usuarios, { foreignKey: { name: 'id_entidad', allowNull: false }, as: 'entidad' });
  // Asociaciones tabla personas
  personas.hasMany(beneficiarias, { foreignKey: { name: 'id_persona', allowNull: false }, as: 'persona' });
  beneficiarias.belongsTo(personas, { foreignKey: { name: 'id_persona', allowNull: false }, as: 'persona' });
  // Asociaciones tabla planillas - planillaBeneficiarias
  planillas.hasMany(planillaBeneficiarias, { foreignKey: { name: 'id_planilla', allowNull: false }, as: 'planilla' });
  planillaBeneficiarias.belongsTo(planillas, { foreignKey: { name: 'id_planilla', allowNull: false }, as: 'planilla' });

  // Asociaciones tabla beneficiarias - planillaBeneficiarias
  beneficiarias.hasMany(planillaBeneficiarias, { foreignKey: { name: 'id_beneficiaria', allowNull: false }, as: 'beneficiaria' });
  planillaBeneficiarias.belongsTo(beneficiarias, { foreignKey: { name: 'id_beneficiaria', allowNull: false }, as: 'beneficiaria' });

  // Asociaciones tabla paquetes
  // paquetes.hasMany(calendarioBeneficios, { foreignKey: { name: 'id_paquete', allowNull: false }, as: 'paquete' });
  // calendarioBeneficios.belongsTo(paquetes, { foreignKey: { name: 'id_paquete', allowNull: false }, as: 'paquete' });
  // paquetes.belongsTo(sucursales, { foreignKey: { name: 'id_sucursal', allowNull: false }, as: 'sucursal' });
  // paquetes.belongsTo(subsidios, { foreignKey: { name: 'id_subsidio', allowNull: false }, as: 'subsidio' });

  // Asociaciones tabla planillas - sucursales
  sucursales.hasMany(planillas, { foreignKey: { name: 'id_sucursal', allowNull: false }, as: 'sucursal' });
  planillas.belongsTo(sucursales, { foreignKey: { name: 'id_sucursal', allowNull: false }, as: 'sucursal' });

  usuarios.belongsTo(roles, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });
  roles.hasMany(usuarios, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });

  usuarios.belongsTo(personas, { foreignKey: { name: 'id_persona', allowNull: false } });
  personas.hasMany(usuarios, { foreignKey: { name: 'id_persona', allowNull: false } });

  // Asociaciones tablas permisos - roles
  permisos.belongsTo(roles, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });
  roles.hasMany(permisos, { foreignKey: { name: 'id_rol', allowNull: false } });

  // Asociaciones tablas permisos - modulos
  permisos.belongsTo(modulos, { foreignKey: { name: 'id_modulo', allowNull: false }, as: 'modulo' });
  modulos.hasMany(permisos, { foreignKey: { name: 'id_modulo', allowNull: false } });

  // Asociaciones tablas modulos - sección
  modulos.belongsTo(modulos, { foreignKey: 'id_modulo' });
  modulos.hasMany(modulos, { foreignKey: 'id_modulo' });
  modulos.belongsTo(modulos, { foreignKey: 'id_seccion' });
  modulos.hasMany(modulos, { foreignKey: 'id_seccion' });

  // Asociaciones tablas personas beneficiaria
  beneficiarias.belongsTo(personas, { foreignKey: 'id_persona' });
  beneficiarias.belongsTo(personas, { foreignKey: 'titular' });
  beneficiarias.belongsTo(personas, { foreignKey: 'titular_cobro' });
  // personas.hasMany(beneficiaria);

  // Asociaciones tablas sucursal beneficiaria
  sucursales.hasMany(beneficiarias, { foreignKey: 'id_sucursal' });
  beneficiarias.belongsTo(sucursales, { foreignKey: 'id_sucursal' });

  // Asociaciones tablas alimento grupo alimenticio
  grupoAlimenticios.hasMany(alimentos, { foreignKey: 'id_grupo_alimenticio' });
  alimentos.belongsTo(grupoAlimenticios, { foreignKey: 'id_grupo_alimenticio' });

  // Asociaciones tablas  grupo alimenticio subsidio
  subsidios.hasMany(grupoSubsidios, { foreignKey: 'id_subsidio' });
  grupoSubsidios.belongsTo(subsidios, { foreignKey: 'id_subsidio' });

  // Asociaciones tablas subsidios beneficiarias
  subsidios.hasMany(beneficiarias, { foreignKey: 'id_subsidio' });
  beneficiarias.belongsTo(subsidios, { foreignKey: 'id_subsidio' });

  // Asociaciones tablas gastos - sucursales
  gastos.belongsTo(sucursales, {foreignKey: { name: 'id_sucursal', allowNull: false }, as: 'sucursal'});
  sucursales.hasMany(gastos, {foreignKey: { name: 'id_sucursal', allowNull: false }, as: 'gasto'});

  // Asociaciones tablas gastos - creditos
  gastos.belongsTo(creditos, {foreignKey: { name: 'id_credito', allowNull: false }, as: 'credito'});
  creditos.hasMany(gastos, {foreignKey: { name: 'id_credito', allowNull: false }, as: 'gasto'});

  // Asociaciones tablas creditos - calendarioBeneficios
  creditos.belongsTo(calendarioBeneficios, {foreignKey: { name: 'id_calendario_beneficio', allowNull: false }, as: 'calendario_beneficio'});
  calendarioBeneficios.hasMany(creditos, {foreignKey: { name: 'id_calendario_beneficio', allowNull: false }, as: 'creditos'});

  // Asociaciones tablas subsidios - montos
  montos.belongsTo(subsidios, {foreignKey: { name: 'id_subsidio', allowNull: false }, as: 'subsidio'});
  subsidios.hasMany(montos, {foreignKey: { name: 'id_subsidio', allowNull: false }, as: 'subsidio'});

  // Asociaciones tablas beneficiarias - calendario_beneficio - subsidio - sucursal - paquete
  calendarioBeneficios.belongsTo(beneficiarias, {foreignKey: { name: 'id_beneficiaria', allowNull: false }, as: 'beneficiaria'});
  beneficiarias.hasMany(calendarioBeneficios, {foreignKey: { name: 'id_beneficiaria', allowNull: false }, as: 'calendario_beneficio'});
  calendarioBeneficios.belongsTo(subsidios, {foreignKey: { name: 'id_subsidio', allowNull: false }, as: 'subsidio'});
  subsidios.hasMany(calendarioBeneficios, {foreignKey: { name: 'id_subsidio', allowNull: false }, as: 'calendario_beneficio'});
  calendarioBeneficios.belongsTo(sucursales, {foreignKey: { name: 'id_sedem_recojo' }, as: 'sucursal'});
  sucursales.hasMany(calendarioBeneficios, {foreignKey: { name: 'id_sedem_recojo' }, as: 'calendario_beneficio'});
  calendarioBeneficios.belongsTo(paquetes, {foreignKey: { name: 'id_paquete', allowNull: false }, as: 'paquete'});
  paquetes.hasMany(calendarioBeneficios, {foreignKey: { name: 'id_paquete' }, as: 'calendario_beneficio'});

  return models;
};
