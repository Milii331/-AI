import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════
//  SIMULATED AI — todo local, sin APIs, sin latencia real
// ═══════════════════════════════════════════════════════

const R = arr => arr[Math.floor(Math.random() * arr.length)];

const AI_RESPONSES = {
  letra_zh: [
    "La **Ж** no existe en español 🎯 Suena como la 'll' argentina o la 's' en 'vision'. Colocá la lengua como para decir 'sh' y activá las cuerdas vocales.\n\nEjemplos:\n• жить [zhit'] — vivir\n• жара [zhará] — calor\n• журнал [zhurnál] — revista\n\n¡La Ж siempre es DURA en ruso, nunca se suaviza!",
    "¡La Ж es una consonante sonora y siempre dura! 🔥\n\nComparala con la Ш (sorda):\n• шар [shar] — pelota\n• жар [zhar] — calor\n\nSentís que la Ж vibra en la garganta y la Ш no? Esa es la diferencia.\n\nPalabras para practicar: Женщина [zhénshchina] — mujer, Уже [uzhé] — ya.",
  ],
  letra_r: [
    "La **Р** rusa es una r vibrante múltiple, como la 'rr' en 'perro' pero más consistente 🌀\n\nAparece al inicio de palabra (cosa rara en español) y siempre vibra.\n\nPracticá progresivamente:\n1. 'drr, drr, drr' hasta que la lengua vibre\n2. рыба [ríba] — pez\n3. работа [rabóta] — trabajo\n4. Россия [Rossíya] — Rusia",
    "¡La Р al inicio de palabra es el mayor reto para hispanohablantes! 💪\n\nEn español solo tenemos 'rr' en medio de palabra (carro, perro). En ruso aparece en todos lados:\n• рот [rot] — boca\n• рука [ruká] — mano\n• ресторан [restorán] — restaurante\n\nTip: grabate y escuchate. El oído es clave para corregirse.",
  ],
  letra_sh: [
    "La **Ш** suena como 'sh' en inglés ('shoe', 'shop') 🎵 Es un sonido posterior y redondeado.\n\nLa **Щ** es más adelantada y aguda: 'shch' pero comprimido. Algunos la describen como una 'sh' con la lengua más arriba.\n\n• Школа [shkóla] — escuela (Ш)\n• Щи [shchi] — sopa de col (Щ)\n• Борщ [borsh] — borsch (Щ al final, sin vocal)\n\nTip: Ш = 'sh' cómoda / Щ = 'sh' apretada hacia adelante.",
  ],
  letra_y: [
    "La **Ы** es el sonido más difícil para hispanohablantes 😅 No existe en español.\n\nCómo producirla:\n1. Decí una 'i' normal\n2. Sin mover los labios, empujá la lengua hacia atrás\n3. El sonido resultante es entre 'i' y 'u'\n\nPalabras con Ы:\n• рыба [ríba] — pez\n• сыр [syr] — queso\n• ты [ty] — vos/tú\n\n¡Con práctica diaria lo dominás en pocas semanas!",
  ],
  letra_h: [
    "La **Х** suena como la 'j' española en 'jamón', pero más suave 🌬️\n\nEn algunas variedades es casi como la 'j' de España; en otras más suave.\n\nEjemplos:\n• хлеб [khleb] — pan\n• хорошо [khorosho] — bien/bueno\n• холодно [khólodno] — hace frío\n\nTip: es el mismo sonido que la 'j' castellana pero con menos fricción.",
  ],
  alfabeto: [
    "¡El **alfabeto cirílico** es más fácil de lo que parece! Estrategia rápida 🔤\n\n**Letras que ya conocés (idénticas o similares):**\nА а, О о, Т т, М м, Е е — iguales al latín\nВ → suena 'V' (parece B)\nС → suena 'S' (parece C)\nН → suena 'N' (parece H)\nР → suena 'R' (parece P)\n\n**Letras nuevas clave:**\nЖ Ш Щ Ч Ц — nuevos sonidos\nЫ Ъ Ь — signos especiales\n\n¡En 1 semana podés leer МЕТРО, КАФЕ, БАНК!",
    "Truco para memorizar el cirílico con **asociaciones visuales** 🧠\n\n• Д parece una casa con techo → Дом [dom] — casa\n• Ж parece un insecto con patas → Жук [zhuk] — escarabajo\n• Ш parece un peine → Шапка [shapka] — gorro\n• Ц parece una silla con pata → Царь [tsar'] — zar\n• Ф parece bigotes → Фамилия [familiya] — apellido\n\n¡Inventá tus propias asociaciones! Las más raras, mejor se recuerdan.",
  ],
  casos: [
    "Los **6 casos rusos** definen el rol de cada palabra en la oración 📚\n\n1. **Nominativo** — sujeto: Кот спит. (El gato duerme)\n2. **Acusativo** — objeto directo: Вижу кота. (Veo al gato)\n3. **Genitivo** — posesión/negación: Нет кота. (No hay gato)\n4. **Dativo** — destinatario: Дать коту. (Dar al gato)\n5. **Instrumental** — con/mediante: С котом. (Con el gato)\n6. **Prepositional** — sobre/en: О коте. (Sobre el gato)\n\n¡La buena noticia: los casos se aprenden de a poco con práctica real!",
    "Los casos suenan complicados, ¡pero tienen una lógica hermosa! 💡\n\nEn ruso el ORDEN de las palabras es libre porque los casos indican la función:\n• Кот любит Машу. — El gato quiere a Masha.\n• Машу любит кот. — A Masha la quiere el gato.\n\n¡Ambas frases dicen lo mismo! El acusativo 'Машу' indica quién recibe la acción, sin importar la posición.\n\nConsejo: empezá por Nominativo y Acusativo. Son los más frecuentes y los más fáciles.",
  ],
  genero: [
    "El **género gramatical** en ruso tiene 3 tipos y se determina por la terminación 🔤\n\n• Consonante → **masculino**: стол — mesa, брат — hermano\n• -а / -я → **femenino**: книга — libro, семья — familia\n• -о / -е → **neutro**: окно — ventana, море — mar\n\nLos adjetivos concuerdan:\n• красн**ый** стол (m) / красн**ая** книга (f) / красн**ое** море (n)\n\n⚠️ Excepción famosa: папа (papá) es MASCULINO aunque termina en -а.",
  ],
  pasado: [
    "¡El **tiempo pasado** ruso es más simple que el español! 😊\n\nSolo 4 formas (vs. las 6+ del español):\n\n| Sujeto | Sufijo | читать (leer) |\n|--------|--------|---------------|\n| Yo / Él | -л | читал |\n| Ella | -ла | читала |\n| Todos | -ли | читали |\n\nFrase práctica:\nВчера я читал книгу. [Vchera ya chital knigu]\n— Ayer leía un libro.",
    "El pasado ruso: quita **-ть** del infinitivo y añadí el sufijo 🎯\n\n• говорить → говорил / говорила / говорили\n• читать → читал / читала / читали\n• работать → работал / работала / работали\n\nAtención: algunos verbos irregulares:\n• идти → шёл / шла / шли [shol/shla/shli]\n\n¡Pero son la excepción! La mayoría sigue la regla perfectamente.",
  ],
  movimiento: [
    "Los **verbos de movimiento** son únicos del ruso 🚶🚗\n\nDistinción básica:\n• **идти** — ir a pie, una vez, hacia un destino\n• **ехать** — ir en vehículo, una vez, hacia un destino\n• **ходить** — ir a pie, habitualmente / sin destino fijo\n• **ездить** — ir en vehículo, habitualmente\n\nEjemplos:\n• Я иду в школу. — Voy a la escuela (ahora, caminando)\n• Я езжу на работу. — Voy al trabajo (todos los días, en transporte)",
  ],
  matrioshka: [
    "¡La **Матрёшка** es más moderna de lo que parece! 🪆\n\nFue creada recién en 1890 por el artesano Vasily Zvyozdochkin, inspirado en una muñeca japonesa (Daruma). El nombre viene de 'Матрёна', un nombre femenino ruso muy común en el siglo XIX.\n\nSimbolismo: cada muñeca interior representa una generación. La figura central es siempre la madre — conteniendo y protegiendo a todas las demás.\n\nHoy existen con temáticas modernas: políticos, personajes de cuentos, equipos deportivos...",
  ],
  baikal: [
    "¡El **Lago Baikal** (Озеро Байкал) es absolutamente extraordinario! 🌊\n\n• Lago más profundo del mundo: 1.642 metros\n• Contiene el 20% del agua dulce NO congelada del planeta\n• Tiene 25 millones de años — el más antiguo del mundo\n• En invierno el hielo puede tener 1 metro de grosor\n\nAnimales únicos:\n• Нерпа [nérpa] — la única foca de agua dulce del mundo\n• Омуль [ómul'] — pez exclusivo del Baikal\n\n¡Es Patrimonio de la Humanidad UNESCO desde 1996!",
  ],
  gagarin: [
    "¡**Юрий Гагарин** es uno de los héroes más grandes de Rusia! 🚀\n\n12 de abril de 1961 — primer humano en el espacio.\nVuelo en Vostok 1: 108 minutos orbitando la Tierra.\n\nSu frase al despegar:\n**«Поехали!»** [Poyékhali!] — ¡Vámonos!\n\nDato: venía de familia campesina humilde. Rusia celebra el 12 de abril como el **Día de la Cosmonáutica** (День космонавтики).\n\nMurió trágicamente en 1968 en un accidente de aviación, a solo 34 años.",
  ],
  gastronomia: [
    "¡La **gastronomía rusa** es riquísima! 🍲\n\nPlatos imperdibles:\n• **Борщ** [borsh] — sopa de remolacha, col y carne\n• **Пельмени** [pel'méni] — ravioles rellenos de carne\n• **Блины** [bliny] — panqueques muy finos (como crêpes)\n• **Щи** [shchi] — sopa de col (la más antigua, siglo IX)\n• **Бефстроганов** — ¡el beef stroganoff es ruso!\n\nBebidas:\n• Квас [kvas] — bebida fermentada de pan negro\n• Кефир — ¡sí, viene del Cáucaso ruso!",
    "Las sopas son el **alma de la cocina rusa** 🥣\n\nDicho popular: 'Щи да каша — пища наша' [Shchi da kasha — pisha nasha] — 'La sopa de col y el porridge — esa es nuestra comida.'\n\nVocabulario del restaurante:\n• Первое [pérvoe] — primer plato (siempre sopa)\n• Второе [vtoróe] — plato principal\n• Вкусно! [vkusno!] — ¡Está rico!\n• Счёт, пожалуйста [Schot, pozhaluysta] — La cuenta, por favor",
  ],
  ballet: [
    "¡El **ballet ruso** es considerado el mejor del mundo! 🩰\n\nLos tres grandes ballets de **Чайковский** (Tchaikovsky):\n• Лебединое озеро — El Lago de los Cisnes (1876)\n• Спящая красавица — La Bella Durmiente (1890)\n• Щелкунчик — El Cascanueces (1892)\n\nCompañías legendarias:\n• **Большой театр** [Bol'shóy teatr] — Teatro Bolshói (Moscú)\n• **Мариинский театр** — Teatro Mariinski (San Petersburgo)\n\nEn época soviética, el ballet fue el único arte que no fue censurado.",
  ],
  moscu: [
    "**Москва** (Moscú) — la ciudad más grande de Europa 🏛️\n\n• Más de 12 millones de habitantes\n• Capital desde 1918 (antes fue San Petersburgo)\n• Inviernos de hasta -20°C\n\nLugares imperdibles:\n• **Красная площадь** — Plaza Roja\n• **Кремль** — El Kremlin\n• **Метро** — ¡El metro más bello del mundo, con estaciones que son museos!\n\nSabías que 'Красная' en ruso antiguo significaba 'bella', no 'roja'? La Plaza Roja = Plaza Bella.",
  ],
  literatura: [
    "¡La **literatura rusa** es una de las más ricas del mundo! 📚\n\nLos 5 imprescindibles:\n1. **Пушкин** [Púshkin] — 'el Shakespeare ruso', padre de la lengua moderna\n2. **Толстой** [Tolstói] — Guerra y Paz, Anna Karenina\n3. **Достоевский** [Dostoyévskiy] — Crimen y Castigo, Los Hermanos Karamazov\n4. **Чехов** [Chékhov] — maestro del cuento corto y el teatro\n5. **Тургенев** [Turguénev] — Padres e Hijos\n\nLeer a Dostoievski es entender el alma rusa.",
  ],
  te_samovar: [
    "El **самовар** (samovar) es mucho más que un utensilio 🫖\n\nLa palabra significa literalmente 'que se cuece solo': само (auto) + варить (cocer).\n\nEl ritual del té ruso:\n• El samovar mantiene el agua hirviendo\n• Se prepara заварка [zavárka] — té muy concentrado\n• Cada persona lo diluye a su gusto\n• Se acompaña con варенье [var'énye] — dulce/mermelada\n\nFrase: Хотите чаю? [Khotíte cháyu?] — ¿Quiere un poco de té? (¡Negarse es casi una grosería!)",
  ],
  historia: [
    "La **historia de Rusia** en síntesis 🏰\n\n• Siglo IX: Fundación de Kiev (Киевская Русь)\n• 1240: Invasión mongola (240 años de dominio)\n• 1547: Iván IV — primer Zar oficial\n• 1703: Pedro el Grande funda San Petersburgo\n• 1812: Napoleón invade y fracasa (el invierno ruso)\n• 1917: Revolución bolchevique — nace la URSS\n• 1961: Gagarin — primer humano en el espacio\n• 1991: Caída de la URSS\n\n¿Querés profundizar algún período?",
  ],
  numeros: [
    "¡Los **números** en ruso son más regulares de lo que parecen! 🔢\n\n1 один/одна [odín/odná]\n2 два/две [dva/dve]\n3 три [tri]\n4 четыре [chetýre]\n5 пять [pyat']\n6 шесть [shest']\n7 семь [sem']\n8 восемь [vósem']\n9 девять [dévyat']\n10 десять [désyat']\n\n⚠️ El 40 es irregular: сорок [sórok] — ¡nadie sabe bien por qué!\n\nDel 11-19 todos terminan en -надцать (= 'sobre diez').",
  ],
  colores: [
    "Los **colores** en ruso son adjetivos que cambian según el género 🎨\n\n• красный [krásniy] — rojo\n• синий [síniy] — azul oscuro\n• голубой [golubóy] — azul claro (¡el ruso distingue dos azules!)\n• зелёный [zelyóniy] — verde\n• жёлтый [zhólty] — amarillo\n• белый [béliy] — blanco\n• чёрный [chyórniy] — negro\n\nCuriosidad: 'красный' antes significaba 'bello'. Por eso Красная площадь = Plaza Bella (no Roja).",
  ],
  familia: [
    "El vocabulario de **familia** en ruso 👨‍👩‍👧‍👦\n\n• мама [máma] — mamá\n• папа [pápa] — papá\n• брат [brat] — hermano\n• сестра [sestrá] — hermana\n• сын [syn] — hijo\n• дочь [doch'] — hija\n• дедушка [dédushka] — abuelo\n• бабушка [bábushka] — abuela ⭐\n\nLa **бабушка** es figura central en la cultura rusa — símbolo de sabiduría, cocina y amor incondicional. Muchos niños rusos son criados por sus abuelas.",
  ],
  viaje: [
    "Frases esenciales para **viajar a Rusia** ✈️\n\n• Где...? [Gde...?] — ¿Dónde está...?\n• Как доехать до...? [Kak doyékhat' do...?] — ¿Cómo llegar a...?\n• Сколько стоит? [Skólko stóit?] — ¿Cuánto cuesta?\n• Я не понимаю [Ya ne ponimáyu] — No entiendo\n• Говорите медленнее! [Govoríte médlenneye!] — ¡Hablen más despacio!\n• Помогите! [Pomogíte!] — ¡Ayúdenme!\n\nEl metro de Moscú es el más bello del mundo — las estaciones son museos subterráneos.",
  ],
  restaurante: [
    "Sobrevivir en un **ресторан** ruso 🍽️\n\n• Столик на двоих, пожалуйста. — Mesa para dos, por favor.\n• Что вы рекомендуете? — ¿Qué recomienda?\n• Без мяса, пожалуйста. — Sin carne, por favor.\n• Очень вкусно! — ¡Está muy rico!\n• Счёт, пожалуйста! — ¡La cuenta!\n\nEstructura del menú ruso:\n• Первое — primer plato (siempre sopa 🥣)\n• Второе — plato principal\n• Десерт — postre",
  ],
  tips: [
    "Mis mejores **consejos para aprender ruso** más rápido 📈\n\n1. **Alfabeto primero** — aprendé a leer antes que nada. Es más fácil de lo que parece.\n2. **Frecuencia > cantidad** — 15 min diarios > 2 horas los domingos.\n3. **Asociaciones visuales** — la Д parece una casa → Дом (casa).\n4. **Contenido auténtico** — películas, música, YouTube en ruso.\n5. **No tengás miedo de hablar** — los rusos aprecian muchísimo el intento.\n\nProverbio ruso: **Повторение — мать учения.** [Povtorénie — mat' uchéniya] — La repetición es la madre del aprendizaje.",
    "El secreto de los políglotas para el ruso 🧠\n\n**Método 1000 palabras:**\nLas 1000 palabras más frecuentes cubren el 85% del lenguaje cotidiano. A 5 palabras por día = 200 días para entender casi todo.\n\n**Para la pronunciación:**\n• Escuchá ruso todos los días aunque no entiendas nada\n• Tu cerebro reconoce patrones inconscientemente\n• Después de 2-3 meses el idioma 'suena diferente'\n\n**Lo más importante:** ¡disfrutarlo! La curiosidad genuina es 10x más poderosa que la obligación.",
  ],
  animo: [
    "¡No te desanimes! El ruso es uno de los idiomas más gratificantes 💪\n\nLo que SÍ es difícil: los casos, el aspecto verbal, algunos sonidos (Ж, Ы, Щ).\n\nLo que es MÁS FÁCIL que el español:\n• Pasado: solo 4 formas (vs. 6+)\n• No hay artículos (el/la/un/una — no existen en ruso)\n• Las palabras se leen exactamente como se escriben\n\nProverbio ruso: **Терпение и труд всё перетрут.**\n[Terpéniye i trud vsyo peretrút]\n— La paciencia y el trabajo todo lo vencen. 🌟",
  ],
  pronunciacion: [
    "Los 5 **sonidos más difíciles** para hispanohablantes 🎤\n\n1. **Ы** — entre 'i' y 'u', lengua hacia atrás\n2. **Ж** — como 'll' argentina / 'j' en 'vision'\n3. **Р** — r vibrante múltiple, más que la española\n4. **Щ** — 'shch' comprimido y adelantado\n5. **Х** — 'j' española pero más suave\n\n✅ Ventaja: el ruso NO tiene tonos (como el chino) ni vocales nasales (como el francés).\n\n⚠️ Clave: la **reducción vocálica** — la О sin acento suena como 'A'. Хорошо [khoROsho] suena 'kharaSHO'.",
  ],
  saludo: [
    "¡Привет! 😊 ¿En qué te puedo ayudar? Podés preguntarme sobre pronunciación de letras, gramática, cultura rusa, vocabulario o consejos para aprender.",
    "¡Здравствуй! 👋 Estoy para ayudarte con el ruso. Podés preguntarme sobre letras difíciles, los casos, cultura, gastronomía, historia... ¡lo que quieras!",
    "Привет-привет! 🌟 ¿Querés practicar pronunciación, aprender sobre la cultura rusa, o entender alguna parte de la gramática? Aquí estoy.",
  ],
  gracias: [
    "¡Con gusto! 😊 Не за что! [Ne za shto!] — ¡De nada! (más informal que пожалуйста). Seguimos cuando quieras.",
    "Пожалуйста! 🙂 Si surgió otra duda sobre ruso o cultura rusa, acá estoy.",
    "¡De nada! En ruso tenés dos formas de decirlo:\n• Не за что! [Ne za shto] — informal\n• Пожалуйста! [Pozhaluysta] — formal\n¡Seguimos!",
  ],
  fallback: [
    "¡Buena pregunta! 🤔 No tengo info específica sobre eso, pero puedo ayudarte con:\n\n• Pronunciación de letras rusas (Ж, Р, Ш, Ы...)\n• Gramática (casos, género, verbos de movimiento, pasado)\n• Cultura (historia, gastronomía, ballet, Baikal...)\n• Vocabulario por tema (comida, viajes, familia...)\n• Consejos para aprender más rápido\n\n¿Qué te interesa?",
    "Mmm, ese tema puntual no lo tengo cargado 🤷 Pero probá preguntarme sobre letras difíciles de pronunciar, los casos rusos, cultura (Matrioshka, Gagarin, Borsch...) o tips de estudio. ¡Escribí tu duda!",
    "No tengo esa info exacta, pero seguro puedo ayudarte con algo relacionado 💡 Contame más: ¿es sobre pronunciación, gramática o cultura rusa?",
  ],
};

function getAIResponse(input) {
  const q = input.toLowerCase();
  const has = (...w) => w.some(x => q.includes(x));

  if (has("hola","buenas","привет","здравс","hi ","¡hi")) return R(AI_RESPONSES.saludo);
  if (has("gracia","спасиб","thanks","grazie")) return R(AI_RESPONSES.gracias);

  if (has("ж","zh","zhe","жить","жара")) return R(AI_RESPONSES.letra_zh);
  if (has(" р ","рр","vibrante") && has("pronunc","suena","cómo","como","letra")) return R(AI_RESPONSES.letra_r);
  if (has("ш","щ","sh","shch","школа","борщ")) return R(AI_RESPONSES.letra_sh);
  if (has(" ы","[ы]","letra ы","sonido ы")) return R(AI_RESPONSES.letra_y);
  if (has(" х ","[х]","letra х","sonido х","jota suave")) return R(AI_RESPONSES.letra_h);

  if (has("alfabet","abecedario","cirílico","cirilico","letras","alphabet")) return R(AI_RESPONSES.alfabeto);
  if (has("pronuncia","pronunc","acento","sonido","suena","difícil de decir","hablar")) return R(AI_RESPONSES.pronunciacion);

  if (has("caso","casos","nominativo","acusativo","dativo","genitivo","instrumental","prepositional")) return R(AI_RESPONSES.casos);
  if (has("género","genero","masculino","femenino","neutro")) return R(AI_RESPONSES.genero);
  if (has("pasado","pretérito","pasado ruso","tiempo verbal","ayer")) return R(AI_RESPONSES.pasado);
  if (has("movimiento","идти","ехать","idti","yekhat","ir a pie","en vehículo")) return R(AI_RESPONSES.movimiento);
  if (has("matrioshka","matriuska","матрёш","muñeca rusa")) return R(AI_RESPONSES.matrioshka);
  if (has("baikal","байкал","lago baikal","profundo")) return R(AI_RESPONSES.baikal);
  if (has("gagarin","гагарин","cosmonauta","espacio","vostok","поехали")) return R(AI_RESPONSES.gagarin);
  if (has("borsch","борщ","pelmeni","blini","comida","gastronomía","gastronomia","cocina rusa")) return R(AI_RESPONSES.gastronomia);
  if (has("ballet","tchaikovsky","чайковский","lago cisne","bolshoi","bolshói","mariinski")) return R(AI_RESPONSES.ballet);
  if (has("moscú","moscu","москва","kremlin","plaza roja","красная")) return R(AI_RESPONSES.moscu);
  if (has("tolstoi","tolstói","dostoiev","pushkin","chekhov","чехов","literatur","novela")) return R(AI_RESPONSES.literatura);
  if (has("samovar","самовар","té ruso","chay","чай","tetera")) return R(AI_RESPONSES.te_samovar);
  if (has("historia","soviet","urss","zar","revoluc","bolchev","zarr")) return R(AI_RESPONSES.historia);

  if (has("número","numero","contar","cifra","uno","dos","tres","cuatro","cinco")) return R(AI_RESPONSES.numeros);
  if (has("color","colores","rojo","azul","verde","amarillo","negro","blanco")) return R(AI_RESPONSES.colores);
  if (has("familia","mamá","papá","hermano","hermana","babushka","abuelo","abuela")) return R(AI_RESPONSES.familia);
  if (has("viaje","aeropuerto","hotel","turismo","viajar","turista")) return R(AI_RESPONSES.viaje);
  if (has("restaurant","comida","pedir","menú","menu","comer")) return R(AI_RESPONSES.restaurante);

  if (has("consejo","tip","aprender","estudiar","método","progres","rápido","cuánto tiempo")) return R(AI_RESPONSES.tips);
  if (has("difícil","dificil","complicado","no entiendo","confundo","me cuesta","no puedo")) return R(AI_RESPONSES.animo);

  return R(AI_RESPONSES.fallback);
}
// Respuesta con delay simulado
function simulateAI(input) {
  return new Promise(resolve => {
    const delay = 650 + Math.random() * 700;
    setTimeout(() => resolve(getAIResponse(input)), delay);
  });
}

// ─── Feedback de pronunciación (local) ──────────────────
const PHRASE_TIPS = {
  "привет":          "La П es oclusiva sin aspiración. Acento en la 2ª sílaba: pri-VIET. La Е suena 'ye', la T final sin aspirar.",
  "спасибо":         "El grupo СП va unido: 'spa'. Acento: spa-SI-ba. La О final se reduce a 'a' (reducción vocálica rusa).",
  "до свидания":     "Son dos palabras: 'до' (hasta) + 'свидания'. Acento: do svi-DA-ni-ya. La С de свидания es suave.",
  "красный":         "Acento en la 1ª sílaba: KRAS-ny. La Р debe vibrar. El grupo СН se pronuncia junto sin pausa.",
  "мама и папа":     "Ambas palabras llevan acento en la 1ª sílaba. La И entre ellas es corta. Muy similar al español.",
  "я не понимаю":    "Acento en 'я' y en 'по-ни-МА-ю'. La Я suena 'ya'. El grupo ПН va unido, sin vocal entre medio.",
  "где метро?":      "Г suena como G española. Acento: gde met-RO. La Д en 'где' es suave antes de Е.",
  "я хочу есть":     "Х suena como J suave. Acento: ya kho-CHU yest'. La Ч es como 'ch' española.",
  "спасибо большое": "Dos palabras: spa-SI-ba bol'-SHO-ye. La Ь en 'большое' suaviza la Л antes de ella.",
  "какая погода?":   "Acento: ka-KA-ya pa-GO-da. La О sin acento en 'погода' se reduce a 'a': paGOda.",
  "сегодня холодно": "Atención: 'сегодня' se pronuncia [sivódnya] — la Г desaparece! Acento: si-VOD-nya kHO-lad-na.",
  "я иду в кино":    "La И en 'иду' es breve. 'В' antes de К suena casi como 'f'. Acento: ya i-DU f ki-NO.",
  "по моему мнению": "Acento: po mo-YE-mu MNE-ni-yu. El grupo МН va unido sin vocal intermedia.",
  "я думаю что это интересно": "Acento: ya DU-ma-yu shto E-ta in-tye-RES-na. 'Что' suena [shto]. La Э en 'это' es abierta.",
  "расскажи мне о себе": "Acento: ras-ska-ZHI mne o si-BYE. La Ж es el sonido de 'vision'. La Е en 'себе' suena 'ye'.",
};

function getPronunciationFeedback(score, phraseRu) {
  const tip = PHRASE_TIPS[phraseRu.toLowerCase().replace(/[.,!?]/g,"").trim()];
  let msg;
  if (score >= 0.85) {
    msg = R([
      "🎉 ¡Excelente pronunciación! El reconocimiento captó la frase con altísima precisión. Estás progresando muy bien.",
      "🌟 ¡Perfecto! Tu pronunciación fue reconocida claramente. Seguí con esta consistencia.",
      "👏 ¡Muy bien! Prácticamente idéntico al original. Tu dicción en ruso está mejorando notablemente.",
    ]);
  } else if (score >= 0.65) {
    msg = R([
      "👍 ¡Buen intento! Estás en el camino correcto. Con un poco más de práctica llegás al 100%.",
      "😊 Bastante bien! El reconocimiento captó partes clave de la frase. ¡Seguí practicando!",
    ]);
    if (tip) msg += `\n\n💡 Consejo fonético: ${tip}`;
  } else if (score >= 0.35) {
    msg = R([
      "💪 Estás practicando, eso es lo importante. Escuchá el ejemplo (🔊) varias veces antes de intentarlo.",
      "🔄 ¡Seguí intentando! Los sonidos rusos necesitan tiempo para los hispanohablantes.",
    ]);
    if (tip) msg += `\n\n📌 ${tip}`;
    else msg += "\n\n📌 Tip: enfocate en una sílaba a la vez, no en la frase entera.";
  } else {
    msg = R([
      "🎯 No te rindas — el ruso requiere práctica constante. Escuchá el ejemplo varias veces primero.",
      "🌱 El reconocimiento necesita más claridad. Probá hablar más despacio y vocalizando cada letra.",
    ]);
    if (tip) msg += `\n\n📌 Clave: ${tip}`;
  }
  return msg;
}
// ═══════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════
const LEVELS = [
  {
    id:"A1.1",badge:"A1.1",title:"Начало",sub:"Principiante I",
    desc:"Alfabeto cirílico, saludos y presentaciones",color:"#E8192C",
    vocab:[
      {ru:"Привет",p:"Privet",es:"Hola (informal)"},
      {ru:"Здравствуйте",p:"Zdravstvuyte",es:"Hola (formal)"},
      {ru:"Пока",p:"Poka",es:"Adiós (informal)"},
      {ru:"До свидания",p:"Do svidaniya",es:"Adiós (formal)"},
      {ru:"Спасибо",p:"Spasibo",es:"Gracias"},
      {ru:"Пожалуйста",p:"Pozhaluysta",es:"Por favor / De nada"},
      {ru:"Да",p:"Da",es:"Sí"},
      {ru:"Нет",p:"Net",es:"No"},
      {ru:"Извините",p:"Izvinite",es:"Disculpe"},
      {ru:"Меня зовут...",p:"Menya zovut...",es:"Me llamo..."},
    ],
    grammar:{
      title:"El Alfabeto Cirílico",
      intro:"El alfabeto cirílico tiene 33 letras, creado en el siglo IX. Es fonéticamente regular — cada letra suena casi siempre igual. ¡Muchas se parecen al alfabeto latino!",
      headers:["Letra","Sonido","Ejemplo"],
      rows:[
        ["А а","a (padre)","Арбуз — sandía"],["Б б","b","Банан — plátano"],
        ["В в","v","Вода — agua"],["Г г","g","Город — ciudad"],
        ["Д д","d","Дом — casa"],["Е е","ye","Еда — comida"],
        ["Ж ж","zh (visión)","Жить — vivir"],["З з","z","Зима — invierno"],
        ["И и","i","Имя — nombre"],["К к","k","Кот — gato"],
        ["Л л","l","Луна — luna"],["М м","m","Мама — mamá"],
        ["Н н","n","Нет — no"],["О о","o","Окно — ventana"],
        ["П п","p","Папа — papá"],["Р р","r (vibrante)","Рыба — pez"],
        ["С с","s","Сон — sueño"],["Т т","t","Там — allí"],
        ["У у","u","Утро — mañana"],["Х х","j (suave)","Хлеб — pan"],
        ["Ц ц","ts","Цвет — color"],["Ч ч","ch","Чай — té"],
        ["Ш ш","sh","Школа — escuela"],["Я я","ya","Яблоко — manzana"],
      ],
    },
    phrases:[
      {ru:"Как тебя зовут?",p:"Kak tebya zovut?",es:"¿Cómo te llamas?"},
      {ru:"Меня зовут Анна.",p:"Menya zovut Anna.",es:"Me llamo Anna."},
      {ru:"Очень приятно!",p:"Ochen priyatno!",es:"¡Mucho gusto!"},
      {ru:"Как дела?",p:"Kak dela?",es:"¿Cómo estás?"},
      {ru:"Хорошо, спасибо!",p:"Khorosho, spasibo!",es:"¡Bien, gracias!"},
    ],
    examW:[
      {q:'¿Cómo se dice "Gracias"?',opts:["Привет","Пожалуйста","Спасибо","Пока"],a:2},
      {q:'¿Qué significa "Да"?',opts:["No","Sí","Gracias","Hola"],a:1},
      {q:'¿Cómo se dice "Adiós" informal?',opts:["Пока","Привет","Нет","Спасибо"],a:0},
      {q:'"Меня зовут" significa:',opts:["Tengo hambre","Me llamo","Buenos días","Por favor"],a:1},
      {q:'¿Cuál es el saludo formal?',opts:["Привет","Пока","Здравствуйте","Нет"],a:2},
    ],
    examS:[{ru:"Привет",es:"Hola"},{ru:"Спасибо",es:"Gracias"},{ru:"До свидания",es:"Adiós"}],
    examC:[
      {q:"¿Cuál es la capital de Rusia?",opts:["San Petersburgo","Moscú","Novosibirsk","Kiev"],a:1},
      {q:"¿En qué continentes está Rusia?",opts:["Solo Europa","Solo Asia","Europa y Asia","América y Asia"],a:2},
      {q:"¿Cuál es el lago más profundo del mundo, en Rusia?",opts:["Lago Ladoga","Lago Onega","Lago Baikal","Mar Caspio"],a:2},
    ],
  },
  {
    id:"A1.2",badge:"A1.2",title:"Первые слова",sub:"Principiante II",
    desc:"Números, colores y vocabulario familiar",color:"#E06020",
    vocab:[
      {ru:"один / одна",p:"odin / odna",es:"uno / una"},
      {ru:"два / две",p:"dva / dve",es:"dos"},
      {ru:"три",p:"tri",es:"tres"},
      {ru:"красный",p:"krasny",es:"rojo"},
      {ru:"синий",p:"siny",es:"azul"},
      {ru:"белый",p:"bely",es:"blanco"},
      {ru:"чёрный",p:"chorny",es:"negro"},
      {ru:"мама",p:"mama",es:"mamá"},
      {ru:"папа",p:"papa",es:"papá"},
      {ru:"брат / сестра",p:"brat / sestra",es:"hermano / hermana"},
    ],
    grammar:{
      title:"Género Gramatical",
      intro:"Los sustantivos rusos tienen tres géneros: masculino, femenino y neutro. El género determina cómo cambian los adjetivos que los acompañan.",
      headers:["Género","Terminación","Ejemplo"],
      rows:[
        ["Masculino","consonante","брат (hermano), дом (casa)"],
        ["Femenino","-а / -я","сестра (hermana), семья (familia)"],
        ["Neutro","-о / -е","окно (ventana), море (mar)"],
        ["Adjetivo M","-ый / -ий","красный, синий"],
        ["Adjetivo F","-ая / -яя","красная, синяя"],
        ["Adjetivo N","-ое / -ее","красное, синее"],
      ],
    },
    phrases:[
      {ru:"Сколько стоит?",p:"Skolko stoit?",es:"¿Cuánto cuesta?"},
      {ru:"Я не понимаю",p:"Ya ne ponimayu",es:"No entiendo"},
      {ru:"Повторите, пожалуйста",p:"Povtorite, pozhaluysta",es:"Repita, por favor"},
      {ru:"У меня есть брат",p:"U menya yest brat",es:"Tengo un hermano"},
      {ru:"Какой цвет?",p:"Kakoy tsvet?",es:"¿Qué color?"},
    ],
    examW:[
      {q:'¿Cómo se dice "rojo"?',opts:["синий","белый","красный","чёрный"],a:2},
      {q:'¿Qué significa "два"?',opts:["uno","dos","tres","cuatro"],a:1},
      {q:'¿Cómo se dice "hermana"?',opts:["брат","мама","сестра","папа"],a:2},
      {q:'"Я не понимаю" significa:',opts:["No hablo","No entiendo","No sé","No quiero"],a:1},
      {q:'¿Cuál es el color negro?',opts:["красный","синий","белый","чёрный"],a:3},
    ],
    examS:[{ru:"Красный",es:"Rojo"},{ru:"Мама и папа",es:"Mamá y papá"},{ru:"Я не понимаю",es:"No entiendo"}],
    examC:[
      {q:"Instrumento de cuerdas ruso de 3 cuerdas:",opts:["Balalaika","Bayan","Gusli","Domra"],a:0},
      {q:"¿Qué bebida se sirve en un samovar?",opts:["Café","Té","Cacao","Leche"],a:1},
      {q:"Catedral de colores en la Plaza Roja:",opts:["Catedral del Salvador","Catedral de San Basilio","Catedral de la Asunción","Catedral de Kazán"],a:1},
    ],
  },
  {
    id:"A2.1",badge:"A2.1",title:"В городе",sub:"Elemental I",
    desc:"Comida, ciudad y vida cotidiana",color:"#C69B00",
    vocab:[
      {ru:"хлеб",p:"khleb",es:"pan"},
      {ru:"вода",p:"voda",es:"agua"},
      {ru:"мясо",p:"myaso",es:"carne"},
      {ru:"магазин",p:"magazin",es:"tienda"},
      {ru:"ресторан",p:"restoran",es:"restaurante"},
      {ru:"метро",p:"metro",es:"metro"},
      {ru:"улица",p:"ulitsa",es:"calle"},
      {ru:"сейчас",p:"seychas",es:"ahora"},
      {ru:"завтра",p:"zavtra",es:"mañana"},
      {ru:"вчера",p:"vchera",es:"ayer"},
    ],
    grammar:{
      title:"Casos: Nominativo y Acusativo",
      intro:"El ruso tiene 6 casos. El Nominativo es el sujeto (¿quién?). El Acusativo es el objeto directo (¿qué?). Las terminaciones cambian según el caso.",
      headers:["Caso","Pregunta","Ejemplo"],
      rows:[
        ["Nominativo","¿Quién / Qué?","Это хлеб. (Esto es pan)"],
        ["Acusativo M","¿Qué?","Я ем хлеб. (Como pan)"],
        ["Acusativo F","¿Qué? → -у/-ю","Я пью воду. (Bebo agua)"],
        ["Acusativo N","= Nominativo","Я ем мясо. (Como carne)"],
      ],
    },
    phrases:[
      {ru:"Где метро?",p:"Gde metro?",es:"¿Dónde está el metro?"},
      {ru:"Я хочу есть",p:"Ya khochu yest",es:"Quiero comer"},
      {ru:"Дайте, пожалуйста, хлеб",p:"Dayte, pozhaluysta, khleb",es:"Deme pan, por favor"},
      {ru:"Счёт, пожалуйста",p:"Schot, pozhaluysta",es:"La cuenta, por favor"},
      {ru:"Это далеко?",p:"Eto daleko?",es:"¿Está lejos?"},
    ],
    examW:[
      {q:'¿Cómo se dice "pan"?',opts:["вода","хлеб","молоко","мясо"],a:1},
      {q:'"Где метро?" significa:',opts:["¿Cuánto cuesta?","¿Dónde está el metro?","¿Cómo llego?","¿Hay taxi?"],a:1},
      {q:'¿Cómo se dice "mañana"?',opts:["вчера","сейчас","завтра","сегодня"],a:2},
      {q:'¿Qué significa "магазин"?',opts:["restaurante","calle","tienda","metro"],a:2},
      {q:'"Я хочу есть" significa:',opts:["Quiero beber","Quiero comer","Quiero dormir","Quiero ir"],a:1},
    ],
    examS:[{ru:"Где метро?",es:"¿Dónde está el metro?"},{ru:"Я хочу есть",es:"Quiero comer"},{ru:"Спасибо большое",es:"Muchas gracias"}],
    examC:[
      {q:"Plaza más famosa de Moscú:",opts:["Plaza de Europa","Plaza Roja","Plaza de la Revolución","Plaza Pushkin"],a:1},
      {q:"Sopa rusa hecha con remolacha:",opts:["Solyanka","Shchi","Borsch","Ukha"],a:2},
      {q:"¿Qué es la Матрёшка?",opts:["Muñeca de madera anidada","Sombrero tradicional","Instrumento musical","Danza folklórica"],a:0},
    ],
  },
  {
    id:"A2.2",badge:"A2.2",title:"Мой день",sub:"Elemental II",
    desc:"Verbos de movimiento, clima y tiempo libre",color:"#2A7A3A",
    vocab:[
      {ru:"идти",p:"idti",es:"ir (a pie, una vez)"},
      {ru:"ехать",p:"yekhat",es:"ir (en vehículo, una vez)"},
      {ru:"погода",p:"pogoda",es:"el tiempo / clima"},
      {ru:"снег",p:"sneg",es:"nieve"},
      {ru:"дождь",p:"dozhd",es:"lluvia"},
      {ru:"читать",p:"chitat",es:"leer"},
      {ru:"смотреть",p:"smotret",es:"mirar / ver"},
      {ru:"слушать",p:"slushat",es:"escuchar"},
      {ru:"кино",p:"kino",es:"cine"},
      {ru:"отдыхать",p:"otdykhat",es:"descansar"},
    ],
    grammar:{
      title:"Verbos de Movimiento: идти vs ехать",
      intro:"El ruso distingue entre moverse a pie o en vehículo, y entre acciones únicas o habituales. Esta distinción es esencial.",
      headers:["Verbo","Tipo","Ejemplo"],
      rows:[
        ["идти","a pie (una vez)","Я иду в школу. (Voy a la escuela)"],
        ["ехать","en vehículo (una vez)","Я еду в Москву. (Voy a Moscú)"],
        ["ходить","a pie (habitual)","Я хожу в школу каждый день."],
        ["ездить","en vehículo (habitual)","Я езжу на работу."],
      ],
    },
    phrases:[
      {ru:"Какая сегодня погода?",p:"Kakaya segodnya pogoda?",es:"¿Cómo está el tiempo hoy?"},
      {ru:"Сегодня холодно и идёт снег",p:"Segodnya kholodno i idyot sneg",es:"Hoy hace frío y nieva"},
      {ru:"Я иду в кино",p:"Ya idu v kino",es:"Voy al cine (a pie)"},
      {ru:"Что ты делаешь вечером?",p:"Chto ty delayesh vecherom?",es:"¿Qué hacés esta noche?"},
      {ru:"Я люблю читать книги",p:"Ya lyublyu chitat knigi",es:"Me gusta leer libros"},
    ],
    examW:[
      {q:'¿Cómo se dice "nieve"?',opts:["дождь","ветер","снег","солнце"],a:2},
      {q:'"Какая погода?" significa:',opts:["¿Qué hora es?","¿Cómo está el tiempo?","¿Dónde estás?","¿Tienes frío?"],a:1},
      {q:'"Ir a pie, una vez" en ruso:',opts:["ехать","ходить","идти","ездить"],a:2},
      {q:'¿Qué significa "читать"?',opts:["escuchar","hablar","leer","escribir"],a:2},
      {q:'"Сегодня холодно" significa:',opts:["Hace sol","Hace frío","Llueve","Hace calor"],a:1},
    ],
    examS:[{ru:"Какая погода?",es:"¿Cómo está el tiempo?"},{ru:"Сегодня холодно",es:"Hoy hace frío"},{ru:"Я иду в кино",es:"Voy al cine"}],
    examC:[
      {q:"Estación más fría en Rusia:",opts:["Otoño","Primavera","Invierno","Verano"],a:2},
      {q:"Ballet de Tchaikovsky sobre un lago encantado:",opts:["La Bella Durmiente","El Lago de los Cisnes","La Cenicienta","El Cascanueces"],a:1},
      {q:"Río más largo de Europa, en Rusia:",opts:["Río Don","Río Ob","Río Volga","Río Ural"],a:2},
    ],
  },
  {
    id:"B1.1",badge:"B1.1",title:"Общение",sub:"Intermedio I",
    desc:"Opiniones, tiempo pasado y planes futuros",color:"#1A3A8A",
    vocab:[
      {ru:"думать",p:"dumat",es:"pensar"},
      {ru:"понимать",p:"ponimat",es:"entender"},
      {ru:"говорить",p:"govorit",es:"hablar"},
      {ru:"знать",p:"znat",es:"saber / conocer"},
      {ru:"помнить",p:"pomnit",es:"recordar"},
      {ru:"чувствовать",p:"chuvstvovat",es:"sentir"},
      {ru:"мнение",p:"mnenie",es:"opinión"},
      {ru:"опыт",p:"opyt",es:"experiencia"},
      {ru:"путешествие",p:"puteshestvie",es:"viaje"},
      {ru:"будущее",p:"budushcheye",es:"futuro"},
    ],
    grammar:{
      title:"Tiempo Pasado — Прошедшее время",
      intro:"El pasado ruso se forma añadiendo sufijos al infinitivo según el género/número del sujeto. ¡Solo 4 formas para memorizar!",
      headers:["Sujeto","Sufijo","Ejemplo: читать (leer)"],
      rows:[
        ["Yo / Él (m)","−л","читал (leía)"],
        ["Ella (f)","−ла","читала (leía)"],
        ["Nosotros/as","−ли","читали (leíamos)"],
        ["Ellos/as","−ли","читали (leían)"],
        ["Ejemplo m.","Он читал книгу.","(Él leía un libro)"],
        ["Ejemplo f.","Она говорила по-русски.","(Ella hablaba en ruso)"],
      ],
    },
    phrases:[
      {ru:"По моему мнению...",p:"Po moyemu mneniyu...",es:"En mi opinión..."},
      {ru:"Я думаю, что...",p:"Ya dumayu, chto...",es:"Creo que..."},
      {ru:"Расскажи мне о себе",p:"Rasskazhi mne o sebe",es:"Cuéntame sobre vos"},
      {ru:"Когда ты был в Москве?",p:"Kogda ty byl v Moskve?",es:"¿Cuándo estuviste en Moscú?"},
      {ru:"В будущем я хочу...",p:"V budushchem ya khochu...",es:"En el futuro quiero..."},
    ],
    examW:[
      {q:'¿Cómo se dice "entender"?',opts:["думать","говорить","понимать","знать"],a:2},
      {q:'"По моему мнению" significa:',opts:["A mi manera","En mi opinión","Según yo pienso","Solo para mí"],a:1},
      {q:'¿Qué significa "путешествие"?',opts:["trabajo","estudio","viaje","aventura"],a:2},
      {q:'Pasado femenino de "читать":',opts:["читал","читало","читала","читали"],a:2},
      {q:'"Я думаю, что..." significa:',opts:["Sé que...","Creo que...","Quiero que...","Espero que..."],a:1},
    ],
    examS:[{ru:"По моему мнению",es:"En mi opinión"},{ru:"Я думаю что это интересно",es:"Creo que es interesante"},{ru:"Расскажи мне о себе",es:"Cuéntame sobre vos"}],
    examC:[
      {q:"¿Quién fue el primer cosmonauta en el espacio?",opts:["Vladimir Putin","Yuri Gagarin","Alexei Leonov","Valentina Tereshkova"],a:1},
      {q:"¿Quién escribió 'Crimen y Castigo'?",opts:["Tolstói","Chéjov","Dostoievski","Pushkin"],a:2},
      {q:"¿Qué es la 'тройка' (troika)?",opts:["Tres generales","Trineo tirado por 3 caballos","Tres campanas","Trío musical"],a:1},
    ],
  },
];