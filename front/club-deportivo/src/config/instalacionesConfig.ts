export interface Instalacion {
    id: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    detalles: string[];
    caracteristicas: string[];
  }
  
  export const instalacionesConfig: Instalacion[] = [
    {
      id: "futbol",
      titulo: "Cancha de Fútbol",
      descripcion: "Instalación profesional para la práctica de fútbol con césped de última generación.",
      imagen: "/images/instalaciones/futbol.jpg",
      detalles: [
        "Superficie de césped sintético",
        "Medidas reglamentarias",
        "Iluminación LED",
        "Vestuarios equipados"
      ],
      caracteristicas: [
        "Césped sintético de alta calidad",
        "Marcación oficial",
        "Sistemas de drenaje",
        "Capacidad para entrenamientos y partidos"
      ]
    },
    {
      id: "tennis",
      titulo: "Cancha de Tenis",
      descripcion: "Canchas de tenis con superficies de última generación para entrenamiento y competición.",
      imagen: "/images/instalaciones/tennis.jpg",
      detalles: [
        "Superficie de arcilla sintética",
        "Iluminación nocturna",
        "Gradas para espectadores",
        "Vestuarios individuales"
      ],
      caracteristicas: [
        "Superficie adaptada a diferentes estilos de juego",
        "Mantenimiento constante",
        "Sistemas de riego automático",
        "Zonas de calentamiento"
      ]
    },
    {
        id: "Padel",
        titulo: "Cancha de Pádel",
        descripcion: "Cancha de pádel moderna diseñada para jugadores de todos los niveles, equipada con las mejores instalaciones.",
        imagen: "/images/instalaciones/padel.jpg",
        detalles: [
          "Superficie sintética de alta calidad",
          "Cristales templados de seguridad",
          "Iluminación LED para uso nocturno",
          "Vestuarios con duchas y lockers"
        ],
        caracteristicas: [
          "Dimensiones reglamentarias",
          "Mantenimiento diario",
          "Redes de competición",
          "Zonas de descanso cercanas"
        ]
      },
      {
        id: "Natacion",
        titulo: "Piscina Olímpica",
        descripcion: "Piscina de medidas olímpicas equipada con tecnología de última generación para entrenamiento y competición.",
        imagen: "/images/instalaciones/natacion.jpg",
        detalles: [
          "Medidas oficiales de 50 metros",
          "8 carriles demarcados",
          "Sistema de climatización del agua",
          "Gradas para espectadores",
          "Vestuarios modernos con duchas"
        ],
        caracteristicas: [
          "Cronometraje electrónico",
          "Sistemas de filtración y purificación avanzados",
          "Iluminación subacuática",
          "Espacios para calentamiento y recuperación"
        ]
      }
  ];