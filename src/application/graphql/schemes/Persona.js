module.exports = `
  # Personas del sistema
  type Persona {
    # ID del persona
    id: ID!    
    # Correo electrónico del persona    
    nombres: String!
    # Primer apellido
    primer_apellido: String
    # Segundo apellido
    segundo_apellido: String
    # nombre_completo
    nombre_completo: String
    # tipo_documento
    tipo_documento: TipoDocPersona
    # tipo_documento_otro
    tipo_documento_otro: String
    # nro_documento
    nro_documento: String
    # fecha_nacimiento
    fecha_nacimiento: Date
    # movil
    movil: String
    # nacionalidad
    nacionalidad: String
    # pais_nacimiento
    pais_nacimiento: String
    # genero
    genero: GeneroPersona
    # Teléfono del persona
    telefono: String    
    # Estado del persona
    estado: EstadoPersona!       
    # Persona que creo el registro
    _user_created: Int
    # Persona que actualizó el registro
    _user_updated: Int
    # Fecha de creación del registro
    _created_at: Date
    # Fecha de actualización del registro
    _updated_at: Date
  }

  # Tipos de estado del persona
  enum EstadoPersona {
    # Persona activo
    ACTIVO
    # Persona inactivo
    INACTIVO
  }

  enum TipoDocPersona {
    # Cédula de identidad
    CI
    # Pasaporte
    PASAPORTE
    # Documento Extranjero
    EXTRANJERO
  }
  enum GeneroPersona {
    # Genero Másculino
    M
    # Genero Femenino
    F
    # Otro
    OTRO
  }

  # Objeto para crear un persona
  input NewPersona {
    nombres: String!
    primer_apellido: String
    segundo_apellido: String
    nombre_completo: String
    tipo_documento: TipoDocPersona!
    tipo_documento_otro: String
    nro_documento: String!
    fecha_nacimiento: Date!
    movil: String
    nacionalidad: String
    pais_nacimiento: String
    genero: GeneroPersona
    telefono: String    
  }

  # Objeto para editar un persona
  input EditPersona {    
    nombres: String
    primer_apellido: String
    segundo_apellido: String
    nombre_completo: String
    tipo_documento: TipoDocPersona
    tipo_documento_otro: String
    nro_documento: String
    fecha_nacimiento: Date
    movil: String
    nacionalidad: String
    pais_nacimiento: String
    genero: GeneroPersona
    telefono: String    
    estado: EstadoPersona
  }

  # Objeto de paginación para persona
  type Personas {
    count: Int 
    rows: [Persona]
  }
`;
