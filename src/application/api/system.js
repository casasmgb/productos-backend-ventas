'use strict';

const debug = require('debug')('base:api:modulo');
const { text } = require('common');
const { userData, generateToken } = require('../lib/auth');

module.exports = services => {
  // Obteniendo menú y permisos de un usuario - Permiso: ['modulos:read']
  async function obtenerMenu (req, res, next) {
    debug('Obteniendo menú y permisos');
    const { Modulo, Parametro } = services;
    let user = await userData(req, services);
    let menu;
    let token;
    let permisos = {};

    try {
      // Obteniendo menu
      menu = await Modulo.getMenu(user.id_rol);
      let permissions = menu.data.permissions;
      menu = menu.data.menu;

      // Generando token
      token = await generateToken(Parametro, user.usuario, permissions);

      // Formateando permisos
      permissions.map(item => (permisos[item] = true));
    } catch (e) {
      return next(e);
    }

    res.send({
      permisos,
      menu,
      token
    });
  }

  // cambiar contrasena - Permiso: ['usuarios:update']
  async function cambiarContrasena (req, res, next) {
    debug('Cambiar contraseña de usuario');
    const { Usuario } = services;
    const idUser = parseInt(req.params.user_id);
    const { password, newPassword } = req.body;
    let userFound = await Usuario.findById(idUser);

    if (userFound.data.contrasena === text.encrypt(password)) {
      let updateUsrObj = {
        id: idUser,
        contrasena: text.encrypt(newPassword)
      };
      try {
        await Usuario.createOrUpdate(updateUsrObj);
        res.send({
          finalizado: true,
          mensaje: 'Contraseña actualizada exitosamente.'
        });
      } catch (e) {
        return next(e);
      }
    } else {
      res.send({
        finalizado: false,
        mensaje: 'Contraseña original no coincide.'
      });
    }
  }

  // desactivar cuenta - Permisos: ['usuarios:update']
  async function desactivarCuenta (req, res, next) {
    debug('Desactivar cuenta de usuario');
    const { Usuario } = services;
    const idUser = parseInt(req.params.user_id);
    const { password } = req.body;
    let userFound = await Usuario.findById(idUser);

    if (userFound.data.contrasena === text.encrypt(password)) {
      let updateUsrObj = {
        id: idUser,
        estado: 'INACTIVO'
      };
      try {
        await Usuario.createOrUpdate(updateUsrObj);
        res.send({
          finalizado: true,
          mensaje: 'Cuenta desactivada exitosamente.'
        });
      } catch (e) {
        return next(e);
      }
    } else {
      res.send({
        finalizado: false,
        mensaje: 'La contraseña no coincide.'
      });
    }
  }

  async function buscarPersona (req, res, next) {
    debug('Buscando persona en SEGIP');
    const { Iop } = services;
    const { ci } = req.params;
    const { fechaNacimiento, complemento } = req.query;

    let persona;
    try {
      persona = await Iop.segip.buscarPersona(ci, fechaNacimiento, complemento);
    } catch (e) {
      return next(e);
    }

    res.send(persona);
  }

  return {
    obtenerMenu,
    cambiarContrasena,
    desactivarCuenta,
    buscarPersona
  };
};
