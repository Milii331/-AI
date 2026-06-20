import { useState, useEffect, useRef } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

// ─── DATA ────────────────────────────────────────────────────────────────────

const INSPIRATION = [
  { ru: "Терпение и труд всё перетрут.", es: "La paciencia y el trabajo todo lo pueden." },
  { ru: "Не ошибается тот, кто ничего не делает.", es: "Solo se equivoca quien hace algo." },
  { ru: "Век живи — век учись.", es: "Vive un siglo, aprende un siglo." },
  { ru: "Дорогу осилит идущий.", es: "El que camina, llega." },
  { ru: "Знание — сила.", es: "El conocimiento es poder." },
  { ru: "Лучше поздно, чем никогда.", es: "Mejor tarde que nunca." },
];

const CURIOSITIES = [
  "🏛️ El ruso es el idioma con más hablantes nativos en Europa.",
  "📚 El alfabeto cirílico fue creado por los monjes Cirilo y Metodio en el siglo IX.",
  "🌍 El ruso es uno de los 6 idiomas oficiales de la ONU.",
  "🎭 Tolstói y Dostoievski escribieron en ruso algunas de las obras más influyentes de la historia.",
  "🚀 El ruso fue el primer idioma hablado en el espacio exterior.",
  "🔤 El ruso tiene 33 letras en su alfabeto cirílico.",
  "🎵 Las palabras rusas para 'luna' (луна) y 'sol' (солнце) tienen género gramatical.",
  "🐻 El oso (медведь) es el animal símbolo de Rusia.",
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const LEVEL_DATA = {
  A1: {
    color: "#4CAF50",
    title: "Principiante",
    description: "Primeros pasos en ruso: alfabeto, saludos y frases básicas.",
    emoji: "🌱",
    sections: [
      {
        id: "alphabet",
        title: "El Alfabeto Cirílico",
        icon: "🔤",
        content: [
          { type: "heading", text: "Las 33 letras del ruso" },
          { type: "text", text: "El ruso usa el alfabeto cirílico. Aquí están todas las letras con su pronunciación:" },
          { type: "alphabet", letters: [
            { ru: "А а", sound: "a", example: "арбуз (sandía)" },
            { ru: "Б б", sound: "b", example: "банан (banana)" },
            { ru: "В в", sound: "v", example: "вода (agua)" },
            { ru: "Г г", sound: "g", example: "город (ciudad)" },
            { ru: "Д д", sound: "d", example: "дом (casa)" },
            { ru: "Е е", sound: "ye", example: "еда (comida)" },
            { ru: "Ё ё", sound: "yo", example: "ёж (erizo)" },
            { ru: "Ж ж", sound: "zh", example: "журнал (revista)" },
            { ru: "З з", sound: "z", example: "зима (invierno)" },
            { ru: "И и", sound: "i", example: "имя (nombre)" },
            { ru: "Й й", sound: "y", example: "йогурт (yogurt)" },
            { ru: "К к", sound: "k", example: "кот (gato)" },
            { ru: "Л л", sound: "l", example: "луна (luna)" },
            { ru: "М м", sound: "m", example: "мама (mamá)" },
            { ru: "Н н", sound: "n", example: "нос (nariz)" },
            { ru: "О о", sound: "o", example: "окно (ventana)" },
            { ru: "П п", sound: "p", example: "папа (papá)" },
            { ru: "Р р", sound: "r (vibrante)", example: "рука (mano)" },
            { ru: "С с", sound: "s", example: "сок (jugo)" },
            { ru: "Т т", sound: "t", example: "торт (pastel)" },
            { ru: "У у", sound: "u", example: "утро (mañana)" },
            { ru: "Ф ф", sound: "f", example: "фото (foto)" },
            { ru: "Х х", sound: "j (suave)", example: "хлеб (pan)" },
            { ru: "Ц ц", sound: "ts", example: "цвет (color)" },
            { ru: "Ч ч", sound: "ch", example: "чай (té)" },
            { ru: "Ш ш", sound: "sh", example: "школа (escuela)" },
            { ru: "Щ щ", sound: "shch", example: "щи (sopa)" },
            { ru: "Ъ ъ", sound: "signo duro", example: "(no tiene sonido propio)" },
            { ru: "Ы ы", sound: "ï (difícil)", example: "рыба (pez)" },
            { ru: "Ь ь", sound: "signo blando", example: "(suaviza la consonante)" },
            { ru: "Э э", sound: "e", example: "это (esto)" },
            { ru: "Ю ю", sound: "yu", example: "юг (sur)" },
            { ru: "Я я", sound: "ya", example: "яблоко (manzana)" },
          ]},
        ]
      },
      {
        id: "greetings",
        title: "Saludos y Presentaciones",
        icon: "👋",
        content: [
          { type: "heading", text: "Cómo saludar en ruso" },
          { type: "vocab", words: [
            { ru: "Привет!", trans: "¡Hola! (informal)", pron: "Privyet" },
            { ru: "Здравствуйте!", trans: "¡Buenos días/Hola! (formal)", pron: "Zdravstvuyte" },
            { ru: "Доброе утро!", trans: "¡Buenos días!", pron: "Dobroye utro" },
            { ru: "Добрый день!", trans: "¡Buenas tardes!", pron: "Dobry den'" },
            { ru: "Добрый вечер!", trans: "¡Buenas noches!", pron: "Dobry vecher" },
            { ru: "До свидания!", trans: "¡Adiós!", pron: "Do svidaniya" },
            { ru: "Пока!", trans: "¡Chao! (informal)", pron: "Poka" },
            { ru: "Как дела?", trans: "¿Cómo estás?", pron: "Kak dela?" },
            { ru: "Хорошо, спасибо!", trans: "¡Bien, gracias!", pron: "Khorosho, spasibo!" },
            { ru: "Меня зовут...", trans: "Me llamo...", pron: "Menya zovut..." },
            { ru: "Приятно познакомиться!", trans: "¡Mucho gusto!", pron: "Priyatno poznakomit'sya" },
          ]},
          { type: "heading", text: "Cultura: Los saludos rusos" },
          { type: "culture", text: "En Rusia es muy importante distinguir el trato formal (Вы) del informal (ты). Con personas mayores, jefes o desconocidos siempre se usa la forma formal. Los rusos suelen darse la mano al saludarse, y entre amigos cercanos es común el abrazo y beso en la mejilla. ¡Nunca saludes a alguien a través de un umbral de puerta — es de mala suerte!" },
        ]
      },
      {
        id: "numbers",
        title: "Números y Tiempo",
        icon: "🔢",
        content: [
          { type: "heading", text: "Números del 1 al 20" },
          { type: "vocab", words: [
            { ru: "один (1)", trans: "uno", pron: "odin" },
            { ru: "два (2)", trans: "dos", pron: "dva" },
            { ru: "три (3)", trans: "tres", pron: "tri" },
            { ru: "четыре (4)", trans: "cuatro", pron: "chetyre" },
            { ru: "пять (5)", trans: "cinco", pron: "pyat'" },
            { ru: "шесть (6)", trans: "seis", pron: "shest'" },
            { ru: "семь (7)", trans: "siete", pron: "sem'" },
            { ru: "восемь (8)", trans: "ocho", pron: "vosem'" },
            { ru: "девять (9)", trans: "nueve", pron: "devyat'" },
            { ru: "десять (10)", trans: "diez", pron: "desyat'" },
            { ru: "двадцать (20)", trans: "veinte", pron: "dvadtsat'" },
            { ru: "сто (100)", trans: "cien", pron: "sto" },
          ]},
        ]
      },
    ],
    exam: {
      title: "Examen A1 — Principiante",
      timeLimit: 900,
      questions: [
        { q: "¿Cómo se dice 'Hola' de forma formal en ruso?", opts: ["Привет!", "Здравствуйте!", "Пока!", "До свидания!"], ans: 1 },
        { q: "¿Qué significa 'Меня зовут'?", opts: ["Tengo hambre", "Me llamo", "¿Cómo estás?", "Buenos días"], ans: 1 },
        { q: "¿Cuántas letras tiene el alfabeto ruso?", opts: ["26", "30", "33", "36"], ans: 2 },
        { q: "¿Cuál es la pronunciación de la letra 'Ж'?", opts: ["sh", "zh", "ch", "ts"], ans: 1 },
        { q: "¿Qué significa 'хлеб'?", opts: ["agua", "leche", "pan", "carne"], ans: 2 },
        { q: "¿Cómo se dice 'diez' en ruso?", opts: ["пять", "семь", "девять", "десять"], ans: 3 },
        { q: "¿Qué significa 'Добрый вечер'?", opts: ["Buenos días", "Buenas tardes", "Buenas noches", "Adiós"], ans: 2 },
        { q: "La letra 'Ъ' (signo duro) en ruso:", opts: ["tiene sonido propio de 'a'", "suaviza la consonante anterior", "separa la consonante de la vocal sin suavizar", "siempre va al final"], ans: 2 },
        { q: "¿Cuál es la traducción de 'яблоко'?", opts: ["naranja", "manzana", "pera", "uva"], ans: 1 },
        { q: "En la cultura rusa, saludar a través de un umbral es:", opts: ["señal de respeto", "indiferente", "de mala suerte", "solo para amigos"], ans: 2 },
        { q: "¿Cómo se dice '¡Mucho gusto!' en ruso?", opts: ["Спасибо!", "Пожалуйста!", "Приятно познакомиться!", "Как дела?"], ans: 2 },
        { q: "¿Qué significa 'Как дела?'", opts: ["¿Cuántos años tienes?", "¿Cómo te llamas?", "¿Cómo estás?", "¿De dónde eres?"], ans: 2 },
        { q: "La letra 'Ы' se parece fonéticamente a:", opts: ["i normal", "una 'i' pronunciada con la boca más abierta", "la 'u'", "no tiene equivalente exacto en español"], ans: 3 },
        { q: "¿Cuál es el símbolo animal más representativo de Rusia?", opts: ["lobo", "águila", "oso", "caballo"], ans: 2 },
        { q: "¿Qué significa 'солнце'?", opts: ["luna", "estrella", "sol", "cielo"], ans: 2 },
      ]
    }
  },
  A2: {
    color: "#2196F3",
    title: "Elemental",
    description: "Gramática básica, familia, colores y conversaciones simples.",
    emoji: "🌿",
    sections: [
      {
        id: "grammar_cases",
        title: "Los Casos Gramaticales",
        icon: "📐",
        content: [
          { type: "heading", text: "Los 6 casos del ruso" },
          { type: "text", text: "El ruso tiene 6 casos que cambian las terminaciones de los sustantivos según su función en la oración:" },
          { type: "vocab", words: [
            { ru: "Именительный (Nominativo)", trans: "Sujeto — ¿Quién? ¿Qué? — Кот спит (El gato duerme)", pron: "" },
            { ru: "Родительный (Genitivo)", trans: "Posesión/negación — ¿De quién? — нет кота (no hay gato)", pron: "" },
            { ru: "Дательный (Dativo)", trans: "Objeto indirecto — ¿A quién? — дать коту (dar al gato)", pron: "" },
            { ru: "Винительный (Acusativo)", trans: "Objeto directo — ¿A quién/qué? — вижу кота (veo al gato)", pron: "" },
            { ru: "Творительный (Instrumental)", trans: "Con quién/con qué — с котом (con el gato)", pron: "" },
            { ru: "Предложный (Preposicional)", trans: "Lugar/tema — о коте (sobre el gato)", pron: "" },
          ]},
          { type: "culture", text: "Los casos son el mayor desafío para los hispanohablantes, pero también la mayor fortaleza del ruso: permiten cambiar el orden de las palabras libremente sin perder el significado." },
        ]
      },
      {
        id: "family",
        title: "La Familia y Personas",
        icon: "👨‍👩‍👧",
        content: [
          { type: "heading", text: "Vocabulario familiar" },
          { type: "vocab", words: [
            { ru: "мама", trans: "mamá", pron: "mama" },
            { ru: "папа", trans: "papá", pron: "papa" },
            { ru: "бабушка", trans: "abuela", pron: "babushka" },
            { ru: "дедушка", trans: "abuelo", pron: "dedushka" },
            { ru: "брат", trans: "hermano", pron: "brat" },
            { ru: "сестра", trans: "hermana", pron: "sestra" },
            { ru: "сын", trans: "hijo", pron: "syn" },
            { ru: "дочь", trans: "hija", pron: "doch'" },
            { ru: "муж", trans: "esposo", pron: "muzh" },
            { ru: "жена", trans: "esposa", pron: "zhena" },
            { ru: "друг/подруга", trans: "amigo/amiga", pron: "drug/podruga" },
          ]},
          { type: "culture", text: "En Rusia, la familia es el núcleo social más importante. 'Бабушка' (abuela) tiene un rol central: se encarga del hogar y los nietos mientras los padres trabajan. Es muy común vivir con los abuelos bajo el mismo techo." },
        ]
      },
    ],
    exam: {
      title: "Examen A2 — Elemental",
      timeLimit: 1200,
      questions: [
        { q: "¿Cuál es la función del caso Родительный (Genitivo)?", opts: ["Sujeto de la oración", "Objeto directo", "Posesión y negación", "Lugar o tema"], ans: 2 },
        { q: "¿Cómo se dice 'abuela' en ruso?", opts: ["дедушка", "бабушка", "мама", "сестра"], ans: 1 },
        { q: "'Вижу кота' usa el caso:", opts: ["Nominativo", "Dativo", "Acusativo", "Instrumental"], ans: 2 },
        { q: "¿Cuántos casos tiene el idioma ruso?", opts: ["4", "5", "6", "7"], ans: 2 },
        { q: "¿Qué significa 'дочь'?", opts: ["hijo", "hija", "hermana", "esposa"], ans: 1 },
        { q: "El caso Творительный (Instrumental) se usa para:", opts: ["el sujeto", "posesión", "con quién o con qué", "objeto directo"], ans: 2 },
        { q: "¿Cómo se dice 'esposo' en ruso?", opts: ["жена", "муж", "брат", "сын"], ans: 1 },
        { q: "En Rusia, ¿quién suele tener el rol central en la familia?", opts: ["el padre", "el hijo mayor", "la бабушка (abuela)", "el tío"], ans: 2 },
        { q: "'С котом' significa:", opts: ["del gato", "para el gato", "con el gato", "sobre el gato"], ans: 2 },
        { q: "¿Qué significa 'друг'?", opts: ["hermano", "amigo (masc.)", "padre", "vecino"], ans: 1 },
        { q: "¿Qué caso corresponde a 'о коте' (sobre el gato)?", opts: ["Dativo", "Instrumental", "Genitivo", "Preposicional"], ans: 3 },
        { q: "¿Cómo se dice 'hermano' en ruso?", opts: ["сестра", "брат", "сын", "дедушка"], ans: 1 },
        { q: "La ventaja de los casos rusos es:", opts: ["hacen el idioma más corto", "permiten cambiar el orden libremente", "reducen el vocabulario", "eliminan los artículos"], ans: 1 },
        { q: "'Нет кота' usa el caso:", opts: ["Acusativo", "Nominativo", "Instrumental", "Genitivo"], ans: 3 },
        { q: "¿Qué significa 'жена'?", opts: ["esposo", "esposa", "hermana", "amiga"], ans: 1 },
      ]
    }
  },
  B1: {
    color: "#FF9800",
    title: "Intermedio",
    description: "Verbos aspectuales, conversaciones cotidianas y cultura profunda.",
    emoji: "🌳",
    sections: [
      {
        id: "aspects",
        title: "Aspecto Verbal: Perfectivo e Imperfectivo",
        icon: "⚡",
        content: [
          { type: "heading", text: "El aspecto verbal — el corazón del ruso" },
          { type: "text", text: "Cada verbo ruso existe en dos formas: imperfectiva (acción en proceso) y perfectiva (acción completada):" },
          { type: "vocab", words: [
            { ru: "читать / прочитать", trans: "leer (proceso) / leer y terminar", pron: "chitat' / prochitat'" },
            { ru: "писать / написать", trans: "escribir (proceso) / escribir y terminar", pron: "pisat' / napisat'" },
            { ru: "говорить / сказать", trans: "hablar (proceso) / decir (completado)", pron: "govorit' / skazat'" },
            { ru: "делать / сделать", trans: "hacer (proceso) / hacer y terminar", pron: "delat' / sdelat'" },
            { ru: "Я читал книгу.", trans: "Yo leía el libro. (proceso, no terminó)", pron: "Ya chital knigu" },
            { ru: "Я прочитал книгу.", trans: "Yo leí el libro. (terminé de leerlo)", pron: "Ya prochital knigu" },
          ]},
          { type: "culture", text: "Este sistema no existe en español y es crucial dominarlo. Los rusos piensan en términos de si una acción está completa o no, lo cual refleja la mentalidad práctica y directa de la cultura rusa." },
        ]
      },
    ],
    exam: {
      title: "Examen B1 — Intermedio",
      timeLimit: 1500,
      questions: [
        { q: "¿Qué indica el aspecto perfectivo en ruso?", opts: ["Acción en progreso", "Acción habitual", "Acción completada", "Acción futura"], ans: 2 },
        { q: "'Я прочитал книгу' significa:", opts: ["Estoy leyendo el libro", "Leí el libro (lo terminé)", "Leía el libro a veces", "Voy a leer el libro"], ans: 1 },
        { q: "¿Cuál es la forma perfectiva de 'писать'?", opts: ["переписать", "написать", "записать", "описать"], ans: 1 },
        { q: "'Говорить' es a 'hablar' como 'сказать' es a:", opts: ["hablar continuamente", "decir algo puntualmente", "gritar", "susurrar"], ans: 1 },
        { q: "¿Cuál es la diferencia entre 'читать' y 'прочитать'?", opts: ["Ninguna", "Tiempo verbal", "Aspecto: proceso vs. completado", "Género gramatical"], ans: 2 },
        { q: "¿Qué aspecto usarías para describir una acción habitual?", opts: ["Perfectivo", "Imperfectivo", "Cualquiera", "Ninguno"], ans: 1 },
        { q: "'Делать' en su forma perfectiva es:", opts: ["переделать", "сделать", "задать", "отдать"], ans: 1 },
        { q: "La mentalidad cultural detrás del aspecto verbal ruso es:", opts: ["la belleza del lenguaje", "si la acción está completa o no", "la velocidad de hablar", "el nivel de formalidad"], ans: 1 },
        { q: "¿Cómo se traduce 'Я читал книгу'?", opts: ["Leí el libro (terminé)", "Estaba leyendo el libro", "Leeré el libro", "He leído el libro"], ans: 1 },
        { q: "¿Con qué aspecto se usa 'пожалуйста' en peticiones?", opts: ["Perfectivo siempre", "Imperfectivo siempre", "Depende del contexto", "No aplica"], ans: 2 },
        { q: "La forma perfectiva suele formarse con:", opts: ["un sufijo especial", "un prefijo añadido al imperfectivo", "cambiando la vocal", "una palabra auxiliar"], ans: 1 },
        { q: "Si quiero decir 'Escribía cartas todos los días', uso:", opts: ["perfectivo", "imperfectivo", "futuro", "pasado compuesto"], ans: 1 },
        { q: "¿Qué aspecto indica resultado y consecuencia?", opts: ["Imperfectivo", "Perfectivo", "Ambos por igual", "Ninguno"], ans: 1 },
        { q: "La pareja aspectual de 'говорить' en el sentido de 'decir algo concreto' es:", opts: ["разговаривать", "рассказывать", "сказать", "спрашивать"], ans: 2 },
        { q: "¿En qué se diferencia el sistema verbal ruso del español principalmente?", opts: ["Los tiempos verbales", "El concepto de aspecto perfectivo/imperfectivo", "Los pronombres", "La conjugación"], ans: 1 },
      ]
    }
  },
  B2: {
    color: "#9C27B0",
    title: "Intermedio Alto",
    description: "Subjuntivo, literatura rusa y comunicación avanzada.",
    emoji: "🌲",
    sections: [
      {
        id: "literature",
        title: "Literatura y Cultura Rusa",
        icon: "📖",
        content: [
          { type: "heading", text: "Los grandes escritores rusos" },
          { type: "culture", text: "La literatura rusa del siglo XIX es considerada la más influyente del mundo. Lev Tolstói (Лев Толстой) escribió Guerra y Paz y Ana Karénina. Fiódor Dostoievski (Фёдор Достоевский) exploró la psicología humana en Crimen y Castigo. Antón Chéjov (Антон Чехов) revolucionó el cuento corto y el teatro." },
          { type: "vocab", words: [
            { ru: "Война и мир", trans: "Guerra y Paz — Tolstói", pron: "Voyna i mir" },
            { ru: "Преступление и наказание", trans: "Crimen y Castigo — Dostoievski", pron: "Prestupleniye i nakazaniye" },
            { ru: "Вишнёвый сад", trans: "El jardín de los cerezos — Chéjov", pron: "Vishnyovy sad" },
            { ru: "Мастер и Маргарита", trans: "El maestro y Margarita — Bulgákov", pron: "Master i Margarita" },
          ]},
        ]
      },
    ],
    exam: {
      title: "Examen B2 — Intermedio Alto",
      timeLimit: 1800,
      questions: [
        { q: "¿Quién escribió 'Преступление и наказание'?", opts: ["Tolstói", "Chéjov", "Dostoievski", "Bulgákov"], ans: 2 },
        { q: "¿Qué significa 'Война и мир'?", opts: ["Paz y amor", "Guerra y Paz", "Cielo y tierra", "Vida y muerte"], ans: 1 },
        { q: "Antón Chéjov es conocido por revolucionar:", opts: ["la novela histórica", "la poesía épica", "el cuento corto y el teatro", "la ciencia ficción"], ans: 2 },
        { q: "¿Cuál de estas obras es de Bulgákov?", opts: ["Ana Karénina", "El maestro y Margarita", "El jardín de los cerezos", "El idiota"], ans: 1 },
        { q: "¿Cómo se dice 'El jardín de los cerezos' en ruso?", opts: ["Красный сад", "Вишнёвый сад", "Зелёный лес", "Белый парк"], ans: 1 },
        { q: "La literatura rusa del siglo XIX se considera:", opts: ["la más corta de Europa", "la menos traducida", "la más influyente del mundo", "la más difícil de entender"], ans: 2 },
        { q: "'Мастер и Маргарита' fue escrita por:", opts: ["Dostoievski", "Tolstói", "Pasternak", "Bulgákov"], ans: 3 },
        { q: "Tolstói exploró principalmente:", opts: ["la ciencia y la tecnología", "la sociedad, la guerra y la moral", "el humor y la sátira", "el folclore medieval"], ans: 1 },
        { q: "¿Cuál es el apellido completo de Tolstói en ruso?", opts: ["Толстой", "Достоевский", "Чехов", "Булгаков"], ans: 0 },
        { q: "¿En qué siglo floreció la literatura rusa clásica?", opts: ["XVII", "XVIII", "XIX", "XX"], ans: 2 },
        { q: "Ana Karénina es una novela que explora:", opts: ["la guerra napoleónica", "el amor, la sociedad y la moral", "el mundo laboral", "la conquista de Siberia"], ans: 1 },
        { q: "Dostoievski es famoso por su exploración de:", opts: ["la naturaleza rusa", "la psicología humana profunda", "la gastronomía", "los deportes"], ans: 1 },
        { q: "'Преступление' significa:", opts: ["castigo", "crimen/delito", "juicio", "policía"], ans: 1 },
        { q: "¿Cuántos volúmenes tiene aproximadamente 'Guerra y Paz'?", opts: ["1", "2", "4", "10"], ans: 2 },
        { q: "La escuela literaria principal de los grandes escritores rusos del XIX fue:", opts: ["el Realismo", "el Modernismo", "el Surrealismo", "el Romanticismo tardío"], ans: 0 },
      ]
    }
  },
  C1: {
    color: "#F44336",
    title: "Avanzado",
    description: "Expresiones idiomáticas, registro formal y matices culturales.",
    emoji: "🦅",
    sections: [
      {
        id: "idioms",
        title: "Expresiones Idiomáticas",
        icon: "💬",
        content: [
          { type: "heading", text: "Frases que los rusos usan todos los días" },
          { type: "vocab", words: [
            { ru: "Вот те раз!", trans: "¡Vaya sorpresa! / ¡Vaya!", pron: "Vot te raz!" },
            { ru: "Ни пуха ни пера!", trans: "¡Buena suerte! (lit: ni plumón ni pluma)", pron: "Ni pukha ni pera" },
            { ru: "К чёрту!", trans: "¡Al diablo! (respuesta a buena suerte)", pron: "K chyortu!" },
            { ru: "Слова из песни не выкинешь", trans: "No se puede cambiar la historia (lit: no puedes quitar palabras de una canción)", pron: "" },
            { ru: "Не всё коту масленица", trans: "No siempre es carnaval (lit: no siempre es Maslenitsa para el gato)", pron: "" },
            { ru: "Волков бояться — в лес не ходить", trans: "El que no arriesga no gana (lit: quien teme a los lobos no va al bosque)", pron: "" },
          ]},
          { type: "culture", text: "Maslenitsa (Масленица) es el carnaval ruso que celebra el fin del invierno con panqueques (блины). Es una de las fiestas más antiguas de Rusia, anterior al Cristianismo. La expresión con el gato refleja que hasta los momentos buenos tienen fin." },
        ]
      },
    ],
    exam: {
      title: "Examen C1 — Avanzado",
      timeLimit: 2100,
      questions: [
        { q: "¿Qué significa '¡Ни пуха ни пера!'?", opts: ["¡Ten cuidado!", "¡Buena suerte!", "¡Hasta luego!", "¡Lo siento!"], ans: 1 },
        { q: "La respuesta tradicional a '¡Ни пуха ни пера!' es:", opts: ["Спасибо!", "Пожалуйста!", "К чёрту!", "Хорошо!"], ans: 2 },
        { q: "¿Qué celebra la Масленица?", opts: ["La llegada del verano", "El Año Nuevo", "El fin del invierno", "La cosecha de otoño"], ans: 2 },
        { q: "'Волков бояться — в лес не ходить' equivale en español a:", opts: ["Más vale tarde que nunca", "El que no arriesga no gana", "En boca cerrada no entran moscas", "A mal tiempo, buena cara"], ans: 1 },
        { q: "El plato tradicional de la Maslenitsa son:", opts: ["пироги (empanadas)", "блины (panqueques)", "борщ (borscht)", "пельмени (ravioles)"], ans: 1 },
        { q: "¿Qué significa literalmente 'Ни пуха ни пера'?", opts: ["Ni noche ni día", "Ni plumón ni pluma", "Ni aquí ni allá", "Ni poco ni mucho"], ans: 1 },
        { q: "La expresión 'Не всё коту масленица' implica:", opts: ["Los gatos aman los panqueques", "Los momentos buenos no duran para siempre", "La vida es siempre alegre", "Hay que compartir la comida"], ans: 1 },
        { q: "¿Qué tipo de expresión es 'Слова из песни не выкинешь'?", opts: ["Un proverbio sobre música", "Un dicho sobre la historia inmutable", "Una canción popular", "Un insulto"], ans: 1 },
        { q: "La Maslenitsa es una fiesta:", opts: ["exclusivamente cristiana ortodoxa", "anterior al Cristianismo", "importada de Europa", "moderna soviética"], ans: 1 },
        { q: "'Вот те раз!' expresa:", opts: ["alegría extrema", "tristeza profunda", "sorpresa o asombro", "enojo"], ans: 2 },
        { q: "¿Cuál de estas no es una expresión idiomática rusa común?", opts: ["Ни пуха ни пера", "К чёрту", "Волков бояться", "Danke schön"], ans: 3 },
        { q: "El registro formal en ruso requiere usar:", opts: ["ты (tuteo)", "Вы (usted)", "оно (neutro)", "мы (nosotros)"], ans: 1 },
        { q: "¿Qué animal aparece en el refrán sobre el bosque?", opts: ["oso", "lobo", "zorro", "cuervo"], ans: 1 },
        { q: "Los matices culturales en el ruso avanzado incluyen:", opts: ["solo la gramática", "expresiones idiomáticas, tradiciones y registro", "solo el vocabulario técnico", "únicamente la pronunciación"], ans: 1 },
        { q: "¿Cómo se dice 'panqueques' en ruso?", opts: ["пироги", "вареники", "блины", "кисель"], ans: 2 },
      ]
    }
  },
  C2: {
    color: "#795548",
    title: "Maestría",
    description: "Dominio completo: literatura, política, filosofía y matices del idioma.",
    emoji: "👑",
    sections: [
      {
        id: "philosophy",
        title: "Filosofía y Pensamiento Ruso",
        icon: "🧠",
        content: [
          { type: "heading", text: "El alma rusa — душа" },
          { type: "culture", text: "El concepto de 'душа' (alma) es central en la filosofía y literatura rusas. Los rusos tienen fama de ser profundamente emotivos y espirituales, y la cultura valora las conversaciones filosóficas profundas ('задушевный разговор' — conversación del alma). Filósofos como Berdiaev (Бердяев) y Soloviev (Соловьёв) desarrollaron una tradición filosófica única." },
          { type: "vocab", words: [
            { ru: "душа", trans: "alma, espíritu interior", pron: "dusha" },
            { ru: "судьба", trans: "destino, suerte", pron: "sud'ba" },
            { ru: "тоска", trans: "nostalgia melancólica sin causa definida", pron: "toska" },
            { ru: "задушевный", trans: "íntimo, del alma", pron: "zadushevny" },
            { ru: "соборность", trans: "unidad colectiva espiritual", pron: "sobornost'" },
            { ru: "правда", trans: "verdad, justicia moral", pron: "pravda" },
          ]},
        ]
      },
    ],
    exam: {
      title: "Examen C2 — Maestría",
      timeLimit: 2400,
      questions: [
        { q: "¿Cuál es el concepto filosófico ruso que significa 'unidad colectiva espiritual'?", opts: ["душа", "судьба", "соборность", "тоска"], ans: 2 },
        { q: "La palabra 'тоска' describe:", opts: ["alegría intensa", "nostalgia melancólica sin causa definida", "odio profundo", "amor platónico"], ans: 1 },
        { q: "¿Qué significa 'правда' en su sentido más profundo?", opts: ["solo verdad factual", "verdad y justicia moral combinadas", "mentira piadosa", "conocimiento científico"], ans: 1 },
        { q: "El filósofo ruso Berdiaev es conocido por:", opts: ["la filosofía marxista ortodoxa", "el existencialismo cristiano ruso", "el positivismo", "el nihilismo"], ans: 1 },
        { q: "'Задушевный разговор' significa:", opts: ["conversación de negocios", "conversación del alma / íntima profunda", "discusión política", "charla superficial"], ans: 1 },
        { q: "¿Cuál es la raíz de la palabra 'задушевный'?", opts: ["задача (tarea)", "душа (alma)", "звук (sonido)", "здание (edificio)"], ans: 1 },
        { q: "La noción de 'судьба' en la cosmovisión rusa implica:", opts: ["que todo es controlable", "el destino como fuerza inevitable", "la suerte aleatoria", "el libre albedrío absoluto"], ans: 1 },
        { q: "¿Cuál de estas palabras NO tiene equivalente exacto en español?", opts: ["душа", "тоска", "правда", "семья"], ans: 1 },
        { q: "El filósofo Vladimir Soloviev desarrolló principalmente:", opts: ["el comunismo filosófico", "la metafísica de la unidad total", "el empirismo ruso", "la lógica formal"], ans: 1 },
        { q: "En el C2 del ruso, dominar 'тоска' implica comprender:", opts: ["solo el vocabulario", "la cosmovisión y sensibilidad cultural rusa", "la gramática avanzada", "el dialecto moscovita"], ans: 1 },
        { q: "¿Qué diferencia 'правда' de 'истина' (otra palabra para verdad)?", opts: ["No hay diferencia", "правда es verdad moral/social; истина es verdad absoluta/filosófica", "истина es más coloquial", "правда es arcaica"], ans: 1 },
        { q: "La 'соборность' fue un concepto central para los filósofos:", opts: ["occidentalistas rusos", "eslavófilos rusos", "nihilistas rusos", "marxistas rusos"], ans: 1 },
        { q: "¿Cuántos niveles tiene el Marco Europeo Común de Referencia (MCER)?", opts: ["4", "5", "6", "8"], ans: 2 },
        { q: "Un hablante C2 de ruso puede:", opts: ["entender textos simples", "comunicarse en situaciones básicas", "expresar matices filosóficos y culturales con fluidez nativa", "usar el presente y pasado simple"], ans: 2 },
        { q: "La característica más importante del ruso en nivel C2 es:", opts: ["memorizar vocabulario", "comprender el idioma como reflejo de la cosmovisión cultural rusa", "hablar sin acento", "escribir sin errores ortográficos"], ans: 1 },
      ]
    }
  }
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const ProgressRing = ({ percent, color, size = 80 }) => {
  const r = (size / 2) - 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0f0f0" strokeWidth="6"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: "stroke-dashoffset 1s ease" }}/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
        fontSize="14" fontWeight="700" fill={color}>{percent}%</text>
    </svg>
  );
};

const AlphabetGrid = ({ letters }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))", gap: 8, margin: "12px 0" }}>
    {letters.map((l, i) => (
      <div key={i} style={{ border: "1px solid #e8e8e8", borderRadius: 10, padding: "10px 8px", background: "#fafafa" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#CC0000", fontFamily: "Georgia,serif" }}>{l.ru}</div>
        <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>/{l.sound}/</div>
        <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>{l.example}</div>
      </div>
    ))}
  </div>
);

const VocabCard = ({ words }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "10px 0" }}>
    {words.map((w, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#fafafa", borderRadius: 10, border: "1px solid #eee" }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: "#CC0000", minWidth: 160, fontFamily: "Georgia,serif" }}>{w.ru}</span>
        <span style={{ fontSize: 13, color: "#444", flex: 1 }}>{w.trans}</span>
        {w.pron && <span style={{ fontSize: 11, color: "#999", fontStyle: "italic" }}>[{w.pron}]</span>}
      </div>
    ))}
  </div>
);

const CultureBox = ({ text }) => (
  <div style={{ background: "linear-gradient(135deg,#fff5f5,#fff0e0)", border: "1px solid #ffcccc", borderRadius: 12, padding: "14px 16px", margin: "10px 0" }}>
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <span style={{ fontSize: 20 }}>🏛️</span>
      <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.6 }}>{text}</p>
    </div>
  </div>
);

const renderContent = (item, i) => {
  if (item.type === "heading") return <h3 key={i} style={{ fontSize: 16, fontWeight: 700, color: "#222", margin: "16px 0 8px", borderLeft: "3px solid #CC0000", paddingLeft: 10 }}>{item.text}</h3>;
  if (item.type === "text") return <p key={i} style={{ fontSize: 13, color: "#555", lineHeight: 1.7, margin: "6px 0" }}>{item.text}</p>;
  if (item.type === "alphabet") return <AlphabetGrid key={i} letters={item.letters} />;
  if (item.type === "vocab") return <VocabCard key={i} words={item.words} />;
  if (item.type === "culture") return <CultureBox key={i} text={item.text} />;
  return null;
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function RusoApp() {
  const [screen, setScreen] = useState("home"); // home | level | section | exam | results
  const [activeLevel, setActiveLevel] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [progress, setProgress] = useState(() => {
    const init = {};
    LEVELS.forEach(l => { init[l] = { unlocked: l === "A1", completed: false, score: 0, sectionsRead: [] }; });
    return init;
  });
  const [examState, setExamState] = useState({ answers: {}, current: 0, submitted: false, timeLeft: 0 });
  const [inspoIdx, setInspoIdx] = useState(0);
  const [curiosityIdx, setCuriosityIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setInspoIdx(i => (i + 1) % INSPIRATION.length), 8000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCuriosityIdx(i => (i + 1) % CURIOSITIES.length), 10000);
    return () => clearInterval(t);
  }, []);

  const startExam = (level) => {
    const exam = LEVEL_DATA[level].exam;
    setExamState({ answers: {}, current: 0, submitted: false, timeLeft: exam.timeLimit });
    setScreen("exam");
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setExamState(s => {
        if (s.timeLeft <= 1) { clearInterval(timerRef.current); return { ...s, timeLeft: 0, submitted: true }; }
        return { ...s, timeLeft: s.timeLeft - 1 };
      });
    }, 1000);
  };

  const submitExam = () => {
    clearInterval(timerRef.current);
    const exam = LEVEL_DATA[activeLevel].exam;
    let correct = 0;
    exam.questions.forEach((q, i) => { if (examState.answers[i] === q.ans) correct++; });
    const score = Math.round((correct / exam.questions.length) * 100);
    const passed = score >= 70;
    setProgress(prev => {
      const next = { ...prev };
      next[activeLevel] = { ...next[activeLevel], completed: passed, score };
      if (passed) {
        const idx = LEVELS.indexOf(activeLevel);
        if (idx < LEVELS.length - 1) next[LEVELS[idx + 1]] = { ...next[LEVELS[idx + 1]], unlocked: true };
      }
      return next;
    });
    setExamState(s => ({ ...s, submitted: true }));
    setScreen("results");
  };

  const markSectionRead = (sectionId) => {
    setProgress(prev => ({
      ...prev,
      [activeLevel]: {
        ...prev[activeLevel],
        sectionsRead: [...new Set([...prev[activeLevel].sectionsRead, sectionId])]
      }
    }));
  };

  const radarData = LEVELS.map(l => ({ subject: l, score: progress[l].score || 0, fullMark: 100 }));
  const barData = LEVELS.map(l => ({ name: l, score: progress[l].score || 0, color: LEVEL_DATA[l].color }));

  // ── HOME ──
  if (screen === "home") return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter','Segoe UI',sans-serif", color: "#111" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#CC0000 0%,#8B0000 50%,#1a1a2e 100%)", padding: "32px 24px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div style={{ fontSize: 48, marginBottom: 4 }}>🇷🇺</div>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.5px" }}>Aprende Ruso</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: 0 }}>Idioma, cultura y gramática · Niveles A1 → C2</p>
        <div style={{ marginTop: 20, background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", backdropFilter: "blur(8px)" }}>
          <p style={{ color: "#FFD700", fontSize: 17, fontFamily: "Georgia,serif", margin: "0 0 4px", fontStyle: "italic" }}>
            {INSPIRATION[inspoIdx].ru}
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, margin: 0 }}>{INSPIRATION[inspoIdx].es}</p>
        </div>
      </div>

      {/* Curiosity */}
      <div style={{ background: "#FFF8E7", borderBottom: "1px solid #FFE082", padding: "10px 20px", display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 16 }}>✨</span>
        <p style={{ margin: 0, fontSize: 12, color: "#7B6000" }}><b>Curiosidad:</b> {CURIOSITIES[curiosityIdx]}</p>
      </div>

      {/* Charts */}
      <div style={{ padding: "20px 16px 0" }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#333" }}>Tu progreso general</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: 12 }}>
            <p style={{ fontSize: 11, color: "#999", margin: "0 0 8px", textAlign: "center", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Radar de Habilidades</p>
            <ResponsiveContainer width="100%" height={140}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#f0f0f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#888" }} />
                <Radar dataKey="score" stroke="#CC0000" fill="#CC0000" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: 12 }}>
            <p style={{ fontSize: 11, color: "#999", margin: "0 0 8px", textAlign: "center", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Puntuación por Nivel</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={barData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Tooltip formatter={(v) => [`${v}%`, "Score"]} />
                <Bar dataKey="score" radius={[4,4,0,0]}>
                  {barData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Level Grid */}
      <div style={{ padding: "0 16px 100px" }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#333" }}>Niveles del Marco Europeo</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {LEVELS.map(level => {
            const d = LEVEL_DATA[level];
            const p = progress[level];
            const locked = !p.unlocked;
            return (
              <button key={level} onClick={() => { if (!locked) { setActiveLevel(level); setScreen("level"); } }}
                style={{ background: locked ? "#f8f8f8" : "#fff", border: locked ? "1.5px solid #e8e8e8" : `1.5px solid ${d.color}`, borderRadius: 14, padding: "14px 12px", textAlign: "left", cursor: locked ? "not-allowed" : "pointer", opacity: locked ? 0.6 : 1, transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
                {p.completed && <div style={{ position: "absolute", top: 8, right: 8, background: "#4CAF50", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 20 }}>✓ APROBADO</div>}
                <div style={{ fontSize: 28, marginBottom: 4 }}>{locked ? "🔒" : d.emoji}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <span style={{ background: locked ? "#ccc" : d.color, color: "#fff", fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 20 }}>{level}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: locked ? "#aaa" : "#222", marginBottom: 2 }}>{d.title}</div>
                <div style={{ fontSize: 11, color: "#999", lineHeight: 1.4 }}>{d.description}</div>
                {p.score > 0 && <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <ProgressRing percent={p.score} color={d.color} size={44} />
                </div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,0.95)", borderTop: "1px solid #eee", padding: "10px 20px", textAlign: "center", backdropFilter: "blur(10px)" }}>
        <p style={{ margin: 0, fontSize: 11, color: "#999" }}>Hecho por <b style={{ color: "#CC0000" }}>María de los Milagros Esther Calderón</b></p>
      </div>
    </div>
  );

  // ── LEVEL ──
  if (screen === "level" && activeLevel) {
    const d = LEVEL_DATA[activeLevel];
    const p = progress[activeLevel];
    const sections = d.sections;
    const allRead = sections.every(s => p.sectionsRead.includes(s.id));
    return (
      <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
        <div style={{ background: `linear-gradient(135deg,${d.color},#1a1a2e)`, padding: "20px 16px 20px", color: "#fff" }}>
          <button onClick={() => setScreen("home")} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", padding: "6px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12, marginBottom: 12 }}>← Volver</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 36 }}>{d.emoji}</span>
            <div>
              <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600, letterSpacing: 1 }}>NIVEL</div>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{activeLevel} · {d.title}</h2>
              <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>{d.description}</p>
            </div>
          </div>
        </div>

        <div style={{ padding: "16px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#333", margin: "0 0 10px" }}>📚 Lecciones</h3>
          {sections.map(s => {
            const read = p.sectionsRead.includes(s.id);
            return (
              <button key={s.id} onClick={() => { setActiveSection(s.id); markSectionRead(s.id); setScreen("section"); }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, background: "#fff", border: `1.5px solid ${read ? d.color : "#eee"}`, borderRadius: 12, padding: "14px", cursor: "pointer", marginBottom: 8, textAlign: "left" }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{read ? "✓ Leído" : "Por leer"}</div>
                </div>
                <span style={{ color: "#ccc", fontSize: 18 }}>›</span>
              </button>
            );
          })}

          <div style={{ marginTop: 20, background: allRead ? "#fff5f5" : "#f8f8f8", border: `1.5px solid ${allRead ? d.color : "#ddd"}`, borderRadius: 14, padding: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: allRead ? d.color : "#aaa", margin: "0 0 6px" }}>📝 {d.exam.title}</h3>
            <p style={{ fontSize: 12, color: "#999", margin: "0 0 12px" }}>{d.exam.questions.length} preguntas · {Math.round(d.exam.timeLimit/60)} minutos · Mínimo 70% para aprobar</p>
            {!allRead && <p style={{ fontSize: 11, color: "#CC0000", margin: "0 0 10px", background: "#fff0f0", padding: "6px 10px", borderRadius: 8 }}>⚠️ Lee todas las lecciones antes de rendir el examen</p>}
            <button onClick={() => { if (allRead) startExam(activeLevel); }}
              style={{ width: "100%", background: allRead ? d.color : "#ccc", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 700, cursor: allRead ? "pointer" : "not-allowed" }}>
              {p.completed ? `Re-examinarse (último: ${p.score}%)` : "Comenzar Examen"}
            </button>
          </div>
        </div>

        <div style={{ padding: "0 16px 20px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 11, color: "#ccc" }}>Hecho por <b style={{ color: "#CC0000" }}>María de los Milagros Esther Calderón</b></p>
        </div>
      </div>
    );
  }

  // ── SECTION ──
  if (screen === "section" && activeLevel && activeSection) {
    const d = LEVEL_DATA[activeLevel];
    const section = d.sections.find(s => s.id === activeSection);
    return (
      <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
        <div style={{ background: `linear-gradient(135deg,${d.color},#1a1a2e)`, padding: "16px", color: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={() => setScreen("level")} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", padding: "6px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12, marginBottom: 8 }}>← Volver</button>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{section.icon} {section.title}</h2>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{activeLevel} — {d.title}</div>
        </div>
        <div style={{ padding: "16px 16px 40px" }}>
          {section.content.map((item, i) => renderContent(item, i))}
        </div>
        <div style={{ padding: "0 16px 16px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 11, color: "#ccc" }}>Hecho por <b style={{ color: "#CC0000" }}>María de los Milagros Esther Calderón</b></p>
        </div>
      </div>
    );
  }

  // ── EXAM ──
  if (screen === "exam" && activeLevel) {
    const d = LEVEL_DATA[activeLevel];
    const exam = d.exam;
    const q = exam.questions[examState.current];
    const mins = Math.floor(examState.timeLeft / 60);
    const secs = examState.timeLeft % 60;
    const pct = Math.round(((examState.current) / exam.questions.length) * 100);

    return (
      <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
        <div style={{ background: `linear-gradient(135deg,${d.color},#1a1a2e)`, padding: "16px", color: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>📝 {exam.title}</span>
            <span style={{ background: examState.timeLeft < 60 ? "#ff4444" : "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700, animation: examState.timeLeft < 60 ? "pulse 1s infinite" : "none" }}>
              ⏱ {mins}:{secs.toString().padStart(2,"0")}
            </span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, height: 6 }}>
            <div style={{ background: "#fff", borderRadius: 20, height: 6, width: `${pct}%`, transition: "width 0.3s" }} />
          </div>
          <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>Pregunta {examState.current + 1} de {exam.questions.length}</div>
        </div>

        <div style={{ padding: "20px 16px" }}>
          <div style={{ background: "#fafafa", border: "1px solid #eee", borderRadius: 14, padding: "18px 16px", marginBottom: 16 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#222", margin: 0, lineHeight: 1.5 }}>{q.q}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.opts.map((opt, oi) => {
              const sel = examState.answers[examState.current] === oi;
              return (
                <button key={oi} onClick={() => setExamState(s => ({ ...s, answers: { ...s.answers, [s.current]: oi } }))}
                  style={{ background: sel ? `${d.color}15` : "#fff", border: `2px solid ${sel ? d.color : "#e8e8e8"}`, borderRadius: 12, padding: "13px 16px", textAlign: "left", cursor: "pointer", fontSize: 13, color: sel ? d.color : "#333", fontWeight: sel ? 700 : 400, transition: "all 0.15s" }}>
                  <span style={{ background: sel ? d.color : "#f0f0f0", color: sel ? "#fff" : "#888", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, marginRight: 10 }}>
                    {String.fromCharCode(65 + oi)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            {examState.current > 0 && (
              <button onClick={() => setExamState(s => ({ ...s, current: s.current - 1 }))}
                style={{ flex: 1, padding: 12, background: "#f0f0f0", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>← Anterior</button>
            )}
            {examState.current < exam.questions.length - 1 ? (
              <button onClick={() => setExamState(s => ({ ...s, current: s.current + 1 }))}
                disabled={examState.answers[examState.current] === undefined}
                style={{ flex: 2, padding: 12, background: examState.answers[examState.current] !== undefined ? d.color : "#ccc", color: "#fff", border: "none", borderRadius: 10, cursor: examState.answers[examState.current] !== undefined ? "pointer" : "not-allowed", fontSize: 13, fontWeight: 700 }}>Siguiente →</button>
            ) : (
              <button onClick={submitExam}
                disabled={Object.keys(examState.answers).length < exam.questions.length}
                style={{ flex: 2, padding: 12, background: Object.keys(examState.answers).length === exam.questions.length ? "#4CAF50" : "#ccc", color: "#fff", border: "none", borderRadius: 10, cursor: Object.keys(examState.answers).length === exam.questions.length ? "pointer" : "not-allowed", fontSize: 13, fontWeight: 700 }}>
                ✓ Enviar Examen ({Object.keys(examState.answers).length}/{exam.questions.length})
              </button>
            )}
          </div>

          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 4 }}>
            {exam.questions.map((_, i) => (
              <button key={i} onClick={() => setExamState(s => ({ ...s, current: i }))}
                style={{ width: 28, height: 28, borderRadius: 8, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700,
                  background: i === examState.current ? d.color : examState.answers[i] !== undefined ? "#e8f5e9" : "#f5f5f5",
                  color: i === examState.current ? "#fff" : examState.answers[i] !== undefined ? "#4CAF50" : "#999" }}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS ──
  if (screen === "results" && activeLevel) {
    const d = LEVEL_DATA[activeLevel];
    const p = progress[activeLevel];
    const exam = d.exam;
    let correct = 0;
    exam.questions.forEach((q, i) => { if (examState.answers[i] === q.ans) correct++; });
    const passed = p.score >= 70;
    const nextLevel = LEVELS[LEVELS.indexOf(activeLevel) + 1];

    return (
      <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
        <div style={{ background: passed ? "linear-gradient(135deg,#4CAF50,#2E7D32)" : "linear-gradient(135deg,#F44336,#B71C1C)", padding: "32px 16px 24px", textAlign: "center", color: "#fff" }}>
          <div style={{ fontSize: 56 }}>{passed ? "🎉" : "📚"}</div>
          <h2 style={{ margin: "8px 0 4px", fontSize: 22, fontWeight: 800 }}>{passed ? "¡Aprobaste!" : "Sigue intentando"}</h2>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 14 }}>{exam.title}</p>
        </div>

        <div style={{ padding: 20 }}>
          <div style={{ textAlign: "center", margin: "20px 0 24px" }}>
            <ProgressRing percent={p.score} color={passed ? "#4CAF50" : "#F44336"} size={100} />
            <p style={{ margin: "12px 0 4px", fontSize: 16, fontWeight: 700, color: "#222" }}>{correct} / {exam.questions.length} correctas</p>
            <p style={{ margin: 0, fontSize: 13, color: "#888" }}>{passed ? "Mínimo requerido: 70% ✓" : "Necesitas al menos 70% para pasar"}</p>
          </div>

          <div style={{ background: "#fafafa", borderRadius: 14, padding: 16, marginBottom: 16 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700 }}>Revisión detallada</h3>
            {exam.questions.map((q, i) => {
              const userAns = examState.answers[i];
              const isCorrect = userAns === q.ans;
              return (
                <div key={i} style={{ marginBottom: 12, padding: "10px 12px", background: isCorrect ? "#f0fdf4" : "#fff5f5", border: `1px solid ${isCorrect ? "#bbf7d0" : "#fecaca"}`, borderRadius: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#444", marginBottom: 4 }}>{i + 1}. {q.q}</div>
                  <div style={{ fontSize: 11, color: isCorrect ? "#16a34a" : "#dc2626" }}>
                    {isCorrect ? "✓ Correcto" : `✗ Tu respuesta: ${q.opts[userAns] ?? "Sin respuesta"}`}
                  </div>
                  {!isCorrect && <div style={{ fontSize: 11, color: "#16a34a", marginTop: 2 }}>→ Respuesta correcta: {q.opts[q.ans]}</div>}
                </div>
              );
            })}
          </div>

          {passed && nextLevel && (
            <div style={{ background: `${LEVEL_DATA[nextLevel].color}15`, border: `1.5px solid ${LEVEL_DATA[nextLevel].color}`, borderRadius: 14, padding: 14, marginBottom: 12, textAlign: "center" }}>
              <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: LEVEL_DATA[nextLevel].color }}>🔓 ¡Nivel {nextLevel} desbloqueado!</p>
              <button onClick={() => { setActiveLevel(nextLevel); setScreen("level"); }}
                style={{ background: LEVEL_DATA[nextLevel].color, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                Ir a {nextLevel} →
              </button>
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setScreen("level")} style={{ flex: 1, padding: 12, background: "#f0f0f0", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>← Volver al nivel</button>
            <button onClick={() => setScreen("home")} style={{ flex: 1, padding: 12, background: "#CC0000", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>🏠 Inicio</button>
          </div>
        </div>

        <div style={{ padding: "8px 16px 20px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 11, color: "#ccc" }}>Hecho por <b style={{ color: "#CC0000" }}>María de los Milagros Esther Calderón</b></p>
        </div>
      </div>
    );
  }

  return null;
}
