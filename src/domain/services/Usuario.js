'use strict';

const debug = require('debug')('base:service:usuario');
const { text } = require('common');
module.exports = function userService (repositories, res) {
  const { usuarios } = repositories;

  async function findAll (params = {}, idRol, idEntidad) {
    debug('Lista de usuarios|filtros');
    let lista;
    try {
      switch (idRol) {
        case 2: // ROL: ADMININSTRADOR
          params['id_roles'] = [2, 3];
          params['id_entidad'] = idEntidad;
          break;
      }

      lista = await usuarios.findAll(params);
    } catch (e) {
      return res.error(e);
    }

    if (!lista) {
      return res.error(new Error(`Error al obtener la lista de usuarios`));
    }

    return res.success(lista);
  }

  async function findById (id) {
    debug('Buscando usuario por ID');

    let user;
    try {
      user = await usuarios.findById(id);
    } catch (e) {
      return res.error(e);
    }

    if (!user) {
      return res.error(new Error(`Usuario ${id} not found`));
    }

    return res.success(user);
  }

  async function createOrUpdate (data) {
    debug('Crear o actualizar usuario');

    let user;
    try {
      user = await usuarios.createOrUpdate(data);
    } catch (e) {
      return res.error(e);
    }

    if (!user) {
      return res.error(new Error(`El usuario no pudo ser creado`));
    }

    return res.success(user);
  }

  async function deleteItem (id) {
    debug('Eliminando usuario');

    let deleted;
    try {
      deleted = await usuarios.deleteItem(id);
    } catch (e) {
      return res.error(e);
    }

    if (deleted === -1) {
      return res.error(new Error(`No existe el usuario`));
    }

    if (deleted === 0) {
      return res.error(new Error(`El usuario ya fue eliminado`));
    }

    return res.success(deleted > 0);
  }

  async function userExist (usuario, contrasena) {
    debug('Lista de usuario existente');

    let user;
    try {
      user = await usuarios.findByUsername(usuario);
    } catch (e) {
      return res.error(e);
    }

    if (!user) {
      return res.error(new Error(`No existe el usuario ${usuario}`));
    }

    if (user.contrasena !== text.encrypt(contrasena)) {
      return res.error(new Error(`La contraseña del usuario ${usuario} es incorrecta`));
    }

    if (user.estado === 'INACTIVO') {
      return res.error(new Error(`El usuario ${usuario} se encuentra deshabilitado. Consulte con el administrador del sistema.`));
    }
    return res.success(user);
  }

  async function getUser (usuario, include = true) {
    debug('Buscando usuario por nombre de usuario');

    let user;
    try {
      user = await usuarios.findByUsername(usuario, include);
    } catch (e) {
      return res.error(e);
    }

    if (!user) {
      return res.error(new Error(`Usuario ${usuario} not found`));
    }

    return res.success(user);
  }

  return {
    findAll,
    findById,
    createOrUpdate,
    deleteItem,
    userExist,
    getUser
  };
}
;
