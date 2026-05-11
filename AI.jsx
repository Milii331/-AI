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