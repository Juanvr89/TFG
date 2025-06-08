
**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_Índice\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

1. **Resumen del documento**
   
2. -**Introducción**
   
3. -**Estudio del arte**
   
    3.1. Aplicaciones estudiadas
   
    3.2. Comparativa de Funcionalidades
   
    3.3. Reflexión final
   
4. **Puntos que incluir en vuestro proyecto**
 
   4.1 Desarrollo de la aplicación

   -  Tecnología utilizada
   
   -  Colores y diseño visual
   
   4.2 Funcionalidades principales
   
   -  Creación y gestión de listas
   
   -  Categorías
   
   -  Almacenamiento local
   
   -  Interfaz responsiva

    4.3 Pruebas y validación
   
    4.4 Estudio de mercado y análisis comparativo
   
    4.5 Mejoras del proyecto
   
5. **Conclusiones del proyecto**
   
6. **Estimación de costes y tiempo**
   
7. **Glosario de términos**

    7.1 Conceptos de desarrollo

8. **Bibliografía**
   
    8.1. Documentación oficial
   
    8.2. Tutoriales y Cursos
   
    8.3. Recursos Específicos para Funcionalidades
   
    8.4. Bibliotecas y Dependencias
   
    8.5. Plataformas de Aprendizaje
   
    8.6. Herramientas de Desarrollo
   
    8.7. Diseño
   
    8.8. Herramientas de Testing y Debugging


# Resumen

En este documento explicaré el desarrollo de una aplicación web que he realizado como proyecto final del ciclo formativo de Desarrollo de Aplicaciones Web. 

En él describo las etapas que he seguido para llevar a cabo el proyecto, desde la idea inicial, el diseño, la programación, hasta las pruebas y la puesta en marcha. También mostraré las aplicaciones en las que me he basado y tenido la idea de mejorar, al igual que una estimación del tiempo y costes que implica hacer esta aplicación. La finalidad de este trabajo es demostrar los conocimientos adquiridos durante el ciclo y aplicarlos en un proyecto<a name="_page2_x0.00_y841.89"></a> real.

# Introducción

¿Por qué he decidido crear una aplicación para hacer la compra? Pues, el motivo principal y más importante es que realmente la necesito para mí mismo y la voy a usar personalmente. He probado varias aplicaciones similares, pero ninguna me terminó de convencer del todo; siempre sentía que les faltaba alguna función o característica clave que, en mi opinión, debería tener una aplicación de este tipo para ser realmente útil. Por eso, decidí crear esta aplicación, enfocándome en que cualquier usuario pueda gestionar su lista de la compra de manera sencilla y sin complicaciones.

Una de las cosas que más me importaban era que la aplicación fuera accesible para todos: no quería que dependiera de conexión a internet ni de crear cuentas o registros engorrosos. La idea es que cualquier persona, sin importar la edad o nivel de conocimientos tecnológicos, pueda descargarla, instalarla y empezar a usarla sin tener que enfrentarse a barreras técnicas o pasos complicados. Quiero que sea una aplicación intuitiva, rápida y que cumpla su función sin poner obstáculos.

En este documento voy a explicar todo el proceso que seguí para desarrollar la aplicación, desde las tecnologías que utilicé hasta los pasos que di para asegurarme de que la app funcione bien y cumpla con su propósito. Así, cualquier persona interesada podrá entender cómo<a name="_page3_x0.00_y841.89"></a> se hizo y qué hay detrás del proyecto.

# Estudio del arte

Para comenzar con el desarrollo de esta aplicación, tuve que buscar aplicaciones similares, y ver que tipo de soluciones a algunas ideas que tenía usaban, que tenían integrado y fuí “picoteando” de unas y de otras. El objetivo era conocer las mejores prácticas, detectar carencias y establecer una base sobre la que construir mi propia aplicación, adaptada a mi, y a mi idea de como debería de ser.

Como he dicho, mi proyecto se centra en el desarrollo de una aplicación web para la gestión de listas de la compra, la cual quería que incluyeran funciones como la creación, edición y compartición de listas, con un enfoque sencillo, accesible y colaborativo. Para ello, usé y estudié varias aplicaciones muy utilizadas por los usuarios, para coger las ideas mas interesantes  e intentar aplicarlas a mi aplicación:

## **Aplicaciones estudiadas**

-    **Bring!**

Bring! Es una de las referencias más conocidas para listas de la compra compartidas. Su punto fuerte reside en una interfaz cuidada y moderna. Ofrece funciones como la creación de listas colaborativas en tiempo real, incluir imágenes asociadas a productos y sugerencias personalizadas en base a compras anteriores.

Uno de los aspectos más valorados de Bring! y que se ha tomado como referencia es su sistema de colaboración en tiempo real entre varios usuarios, lo que permite actualizar una lista de forma simultánea desde distintos dispositivos. Esta funcionalidad ha inspirado el enfoque multiusuario de la aplicación desarrollada en este TFG, con un sistema de usuarios registrados que pueden gestionar y compartir sus listas fácilmente.

En su contra, se podría decir que al principio parece un poco caótica, y para alguien de edad<a name="_page4_x0.00_y841.89"></a> avanzada o que no tenga experiencia en uso de aplicaciones, le costará entenderla

-    **Out of Milk**

Out of Milk es otra aplicación muy conocida en este ámbito. (Es importante mencionar que no la he podido instalar, según Playstore porque no está disponible en mi zona… asi que solo hablaré de lo que he 

podido informarme). A diferencia de Bring!, se centra más en la funcionalidad que en el aspecto visual. Permite no solo crear listas de la compra, sino también listas de tareas y gestionar una despensa virtual, lo que amplía su uso más allá del supermercado.

La he tomado la inspiración para estructurar de forma clara las distintas secciones de la aplicación (listas, productos, categorías), lo cual favorece a una organización lógica y escalable, que era lo que más me importaba. Además, su sistema de categorias de productos, me ha servido como referencia para incluir filtros y agrupaciones dentro de mi aplicación.

Aunque esta aplicación incorpora algunas características más avanzadas, como el escaneo de códigos de barras o alertas, los cuales me habría gustado agregar a la mía, no he podido implementar estas funcionalidades, al menos en la versión actual del proyecto.  Sin embargo, no descarto incorporarlo en un futuro, aunque eso me supondría usar una base de datos externa como firebase, y por ahora solo quiero tener base de datos local, para su uso sin ningún tipo de interrupción.

Las quejas más comunes son que parece un poco anticuada, a veces causa problemas de sincronización y está algo abandonada. Como dije antes, no pude probarla pero me informé sobre ella, asique esto es meramente especulativo.

-    **Google Keep**

Yo diría que es de las mas usadas. No es una lista de la compra, si no un block de notas de Google con funcionalidades suficientes como para convertirse en una aplicación que vale para ello. Permite crear notas y listas compartidas, establecer recordatorios, añadir etiquetas, colores y sincronizar todo automáticamente en la nube.

Keep me ha inspirado especialmente en dos aspectos del proyecto. Por un lado, su capacidad de colaboración y sincronización inmediata entre varios usuarios, que aunque actualmente es inviable, es una opción que me parece de lo más interesante, y por otro, como un diseño tan minimalista consigue ser tan funcional. 

Este equilibrio ha sido uno de los objetivos en el diseño de la aplicación desarrollada: ofrecer una herramienta que se entienda a la primera, sin renunciar a funciones clave como la multiusuario, la categorización o el filtrado de contenido.

Asimismo, el uso de colores y etiquetas como sistema de organización visual me han dado algunas ideas relacionadas con la interfaz, que acabaré implementando, y por ahora he optado por una paleta única para facilitar la adaptación del diseño a distintos dispositivos!

Al final, al no ser una aplicación destinada a ello, carece de opciones importantes como categorías, precios etc… y tan solo vale para salir de algun apuro, o alguna compra esporadica

-    **Softlist**

Softlist es la más sencilla y menos conocida, y para mi, la más interesantes (y la que actualmente uso), especialmente en lo que respecta a la eficiencia y reutilización. Su funcionalidad más destacada es la posibilidad de crear plantillas o listas predefinidas, lo cual resulta útil para personas que suelen comprar los mismos productos de forma periódica. Esta idea la implementaré algún día en mi aplicación dado que me parece primordial. Como dije, quiero que sea para todos los usuarios, rápida y sencilla, y esto evita perder el tiempo.

Su simplicidad es un claro ejemplo de lo que busco en la aplicación, demuestra que una aplicación no necesita ser compleja para ser útil, siempre que resuelva una necesidad concreta. Su diseño básico ha servido también para tener presente la importancia de optimizar el rendimiento y la accesibilidad de la aplicación en dispositivos de gama baja o con conexiones limitadas.

Aunque he dicho que es simple y es justo lo que busco, algo más de personalización, o de diseño propio, que no modifique la estructura le vendría bien, para destacarse de las demás aplicaciones destinadas a lista de compras.

##  **Comparativa de Funcionalidades**

Para tener una visión más clara, a continuación una tabla comparativa con algunas de las funcionalidades más destacadas de las aplicaciones estudiadas:



|**Funcionalidad**|<a name="_page7_x0.00_y841.89"></a>**Bring!**|**Out of Milk**|**Google Keep**|**Softlist**|**Compra y calla**|
| - | - | - | :-: | - | - |
|Colaboración multiusuario|Sí|Limitada|Sí|No|No|
|Interfaz visual intuitiva|Baja|Media|Alta|Baja|Media|
|Sincronización en tiempo real|Sí|No|Sí|No|Sí|
|Organización por categorías|Sí|Sí|Parcial|Parcial|Sí|
|Notificaciones / Recordatorios|No|Sí|Sí|No|No|
|Reutilización / plantillas|No|No|No|Sí|Sí|
|Escaneo de productos|No|Sí|No|No|No|

## **Reflexión final**

Tras este estudio del arte, he llegado a la conclusión de que existen múltiples soluciones que abordan la gestión de listas de la compra desde enfoques dstintos: desde aplicaciones visualmente muy atractivas y orientadas a la colaboración, hasta herramientas más funcionales y minimalistas centradas en la eficiencia.

No pretendo competir con estas aplicaciones, como digo, busco una propuesta propia, algo que quiera primero para mi, y luego al TFG, que recoja las mejores ideas vistas en estas soluciones y las adapte a un entorno web accesible, funcional y escalable, y quizá en un futuro, en aplicación móvil.

Este estudio ha servido, por tanto, como inspiración y guía para no repetir errores que creo que otras aplicaciones tienen. A está aplicación le queda aún mucho trabajo por delante, seguramente en un par de meses no tenga nada que ver con su estado actual, pero los pilares,<a name="_page8_x0.00_y841.89"></a> bases y ejemplos los tengo claros y creo que eso es importante.

# **Puntos incluidos en el proyecto!**

Aquí detallaré los principales puntos que forman parte del desarrollo de la aplicación, abarcando desde la fase inicial de diseño hasta la implementación, pruebas y evaluación final. Intentaré ofrecer una visión clara y organizada de todo el proceso (que ha sido bastante caotico) así como de las decisiones técnicas y estéticas adoptadas.

## **Desarrollo de la aplicación**

El desarrollo de la aplicación ha sido la parte más longeva del proyecto. No se han implementado todas las funcionalidades clave que plantee inicialmente por falta de tiempo y conocimientos que me quedan por adquirir. He utilizado un enfoque modular para facilitar la escalabilidad y el mantenimiento futuro, dado que no sabía cuánto se iba a prolongar. 

### **Tecnología utilizada:**

La aplicación la he desarrollado con HTML5, CSS3, JavaScript y React para el frontend, para asegurar la compatibilidad con todos los navegadores modernos. He optado por la API de almacenamiento local del navegador para guardar los datos del usuario de forma segura y sin necesidad de conexión a internet o servidores externos, lo que aporta privacidad y rapidez. El código lo he estructurado usando React hooks y componentes, para mantener el código limpio y mantenible.

- HTML5: Usé esta tecnología en lugar de sus alternativas como Pug, básicamente porque es la que sé usar y la que se usa en la mayoría de los casos. Se renderiza a través de JSX de React.
- CSS3: Al igual que mi elección con HTML, sé que frameworks como Bootstrap o Tailwind podrían parecer la elección correcta para el diseño, pero me sentía más cómodo con CSS3 puro usando estilos inline, lo que me daba control total sobre cada elemento.
- JavaScript y React: En cuanto al uso de JavaScript dudé bastante sobre qué framework usar. Lo hablé con el tutor de las prácticas, que en sus tareas usa Angular, pero durante las primeras semanas de investigación me di cuenta de que para mí sería más sencillo usar React, dado que es más simple de aprender y usar. Según me informé, es ideal para aplicaciones pequeñas o medianas, que es justo mi caso.
- react-toastify: Para mostrar notificaciones toast al usuario cuando realiza acciones (añadir productos, eliminar, etc.)
- localStorage API: Para persistir todos los datos (productos, listas, historial) localmente en el navegador
- FileReader API: Para permitir al usuario subir imágenes desde su dispositivo y convertirlas a base64
  
### **Colores y diseño visual**

` `La elección cromática en la que me he basado en una paleta de colores oscura en un principio(en un futuro se podría personalizar) básicamente porque creo que es menos cansado para la vista. Los tonos blancos a la larga pueden fatigar la vista y como quiero que sea para todas las edades, quiero que sea cómoda. Si alguien intenta hacer la lista por la noche antes de irse a dormir, puede usar la aplicación sin problemas y no se cansará ni dañará la vista antes de dormir. 

Predominan tonos grises neutros y suaves. El único toco claro es el de el logo, que hará contraste, pero al hacer scroll para empezar la lista, desaparecerá y la elección de colores que he elegido cumplirá con su función, no fatigar la vista.

Los colores seleccionados son

**Para el fondo**



|33333|3……………………………………………………..…|…Para el color principal|
| - | - | - |
||||




|66666|6……………………………………………..……|…Para el color de los iconos|
| - | - | - |
||||


Este cambio de color tan sutil permite ver los diferentes iconos de fondo sin destacar demasiado, hace que no destaque, pero sabes que están ahi.

![](Aspose.Words.ad59ae15-4010-4a83-a192-0dc170b81007.008.png)



**Para el logo**

![](Aspose.Words.ad59ae15-4010-4a83-a192-0dc170b81007.009.png)

El logo, he de decir que es de invención propia. Por suerte cuento con experiencia en diseño (2d y 3d) y un bachillerato de arte que también aporta. Hago incapié en esto porque estamos en una época en la que la IA se está imponiendo en el diseño propio y es algo que me costó algo de trabajo. Partí de un icono que encontré por internet:

A este sencillo icono, solo le tuve que implementar la mano de Mickey Mouse y una cara feliz. Me parecía sencillo y justo hacía referencia a lo que buscaba![](Aspose.Words.ad59ae15-4010-4a83-a192-0dc170b81007.010.png)

Le cambié los colores. No quería usar blancos puros y los cambié por un amarillo pastel.

El color más claro de toda la aplicación es el propio nombre de la aplicación, y aun así no he usado blanco. El motivo de esto es simple, el nombre tiene que destacar, pero al no querer que destaque por ser molesto, usé un blanco/amarilo hueso/pastel que creo que es una buena combinación entre el logo, y el fondo 

![](Aspose.Words.ad59ae15-4010-4a83-a192-0dc170b81007.011.png)

Todo esto acaba en un conjunto de colores que no destacan unos sobre otros. No se vé sobrecargado, y solo destacan los elementos que creo que son importantes. Como son:

- Guardar en la base de datos (En azul): Comprobando la aplicación, la opción de guardar no resaltaba lo suficiente, la puse en verde pero me parecía que destacaba demasiado, y opté por un azul neutro
- Eliminar y añadido: el rojo y el verde destacan sobre los tonos grises pálidos, y es muy intuitivo pensar que el ✅ es para un producto añadido, y el ❌ es para eliminarlo. Se ven bien, se intuyen bien, por tanto me parecía la opción correcta.

**Iconos**

Se pueden añadir iconos totalmente personalizables a los distintos productos. En principio pensé en hacer los iconos manualmente pero llevaría demasiado tiempo de trabajo y no dispongo de él, por tanto usé IA para la generación de los distintos iconos de los productos de la base de datos.

**Visuales**

He usado diferentes elementos para hacer algo más dinámica la aplicación. Usé Toast para añadir una ventana emergente prácticamente para cada acción que se realice. He usado esta opción porque la use durante las prácticas y me parecía que encajaba perfectamente con el estilo que estaba buscando y además ya sabía utilizarla. También añadí un efecto en el que cuando se pasaba el puntero por encima de un elemento, este aumentaba de tamaño. Pensé que simplemente sería algo más pero realmente ese efecto cambió casi por completo la aplicación haciéndola más atractiva y dinámica.

# **Funcionalidades principales**

La aplicación ofrece diversas funcionalidades, todas ellas orientadas a mejorar la organización de listas de la compra:

### **Creación y gestión de listas:**

Permite al usuario crear listas personalizadas, añadir, editar y eliminar elementos de forma rápida y sencilla. Esta opción es prácticamente obligatoria para las aplicaciones de listas de la compra, dado que sería muy tedioso el tener que añadir, las compras más comunes y sencillas (pan, leche, papel etc)

### **Categorías:**

Los elementos pueden ser etiquetados con diferentes categorías para facilitar la organización y búsqueda. También he implementado la opción de añadir categorías personalizadas. Las categorías personalizadas son un elemento que podría pasar desapercibido pero es increíblemente útil, dado que puede hacer que esta aplicación de lista de la compra, sea de lista de cualquier cosa, por ejemplo para la farmacia, para cosas que hay que hacer en la calle, electrodomésticos etc.

### **Almacenamiento local:**

Si hay algo que como usuario odio, es el tener que registrarse en una aplicación. No solo por tener que registrarme, es el hecho de lo que ello conlleva. Si estás registrado, quiere decir que necesitas conexión para usarla, o que seguramente si no estás conectado, perderás funcionalidades. Hoy en dia, todo el mundo tiene acceso a internet, por esa parte no hay problema, pero ¿y si estás en un lugar sin cobertura? y si ocurre otro apagón? o simplemente hay problemas con la compañía telefónica. Esta aplicación guarda automáticamente los datos en el almacenamiento local del navegador, garantizando que toda la información esté siempre disponible sin necesidad de conexión, solo necesitando llevar el dispositivo, como si se tratase de un bloc de notas.

### **Interfaz responsiva:**

Adaptación automática a diferentes tamaños de pantalla. Aún no lo he podido comprobar pero teóricamente debería de funcionar por en dispositivos móviles hasta ordenadores de escritorio, para ofrecer una experiencia consistente. En un futuro, esta aplicación será únicamente para el teléfono móvil, por tanto gran parte del diseño<a name="_page13_x0.00_y841.89"></a> está pensado en su uso en vertical.

## **Pruebas y validación!**

Durante el desarrollo, he realizado pruebas funcionales para garantizar el correcto funcionamiento de cada característica, y he documentado cada una de ellas paso a paso. Ajusté muchos aspectos de la navegación, visibilidad de los elementos y la velocidad de respuesta.

En general la aplicación ha cambiado muchísimo después de muchas pruebas. Se podría decir que no tiene nada que var a como empezó, y no tiene nada que ver a como estará cuando la acabe.

## **Estudio de mercado y análisis comparativo**

Para fundamentar el desarrollo, llevé a cabo un análisis comparativo de las aplicaciones que mencioné antes, que son las mas usadas en el mercado (Bring!, Out of Milk, Google Keep y Softlist). Esto me permitió identificar buenas prácticas, funciones que no se me habian ocurrido y que estaban implementadas en estas y áreas de mejora que han servido de inspiración directa para el diseño y la funcionalidad de la aplicación que he desarrollado.

## **Mejoras del proyecto**

Aunque la aplicación actualmente tiene funcionalidades básicas y avanzadas, me queda mucho por añadir, la incorporación de nuevas características es algo que me ha dado mucha pena no poder enseñar en el TFG, pero es algo que implementaré, dado que como dije antes, esta aplicación es para mi, y no pararé hasta terminarla tal y como quiero. Estas mejoras son un conjunto de las necesidades propias, como de las que carecen la competencia, dado que las características que poseen unas, no las tienen otras.

Las funciones previstas para futuras versiones son las siguientes:

- Modo claro/oscuro:

  Sé que aunque mi eleccion de paletas de color creo que es a nivel visual la mas recomendable, al usuario alternar entre un tema claro y uno oscuro, en función de sus preferencias o del entorno (si hay mucha luz o poca) es algo que le gustaría tener como opción. Esta opción mejora tanto la accesibilidad como el confort visual, especialmente durante el uso nocturno. Para dispositivos móviles seria sencillo, de implementar que fuera automático, dado que tienen un detector de iluminación, y cuando llegara a cierta cantidad, cambiará automáticamente de uno a otro.

- Artículos favoritos:

  La posibilidad de marcar ciertos artículos como favoritos permitirá un acceso rápido a los productos más utilizados por el usuario. Esto optimizará el proceso de creación de<a name="_page14_x0.00_y841.89"></a> nuevas listas al evitar búsquedas repetitivas.

- Buscador integrado en el agregador de artículos:![ ]

  Se incluirá un campo de búsqueda dinámica, es decir, actualmente poseo un buscador de artículos, el cual viene bien, pero la opción más sencilla sería que en el propio campo donde se agregan artículos a la base de datos, si el elemento que se escribe coincide con un elemento que ya existe, aparezca en un desplegable, y dicho campo, cumpliría dos opciones, buscador de artículos, y agregar artículos nuevos, simplificando la aplicación, eliminando la barra de búsqueda, y por tanto quedando mas limpia y siendo en general más usable para el usuario.

- Compartir listas de compra:

  Compartir listas de la compra o hacerla en común es algo que no se me había ocurrido hasta que la ví en Bring¡. Hay varias formas que se me ocurren de hacerlo, ya sea por bluetooth, por una key, o por registro. Todas ellas suponen cambiar muchas cosas de la aplicación, dado que como dije no quiero registro ni base de datos externa, pero para futuras actualizaciones seguramente tenga que optar por dicha opción.

- Soporte para compras periódicas o frecuentes:

  Implementar un sistema de sugerencias inteligentes basado en el historial de uso que detecte patrones de tiempo. Esto es una opción muy a largo plazo, pero si estudio lo suficiente en la integración de IA, creo que esta misma se podría encargar de ello, y una vez integrada, las opciones prácticamente serían infinitas.

Estas funciones, aunque no están presentes en la versión actual, forman parte de la hoja de ruta del proyecto y si no todas, casi todas las acabaré implementando, y quizá algún dia con suerte, pueda lanzarla al mercado, aunque ello conlleva cambiar la filosofía que tengo de la aplicación, que en un principio es de uso personal.

# Conclusiones

El desarrollo de esta aplicación me ha permitido aprender realmente lo que es la programación, y las dificultades que ello conlleva. En un futuro completaré los objetivos propuestos al inicio del TFG pero como ya he dicho, a dia de hoy carezco del tiempo y del conocimiento. A lo largo de este proceso he diseñado, implementado y evaluado una aplicación funcional que permite la gestión dinámica de productos clasificados por categorías, incluyendo opciones de creación, edición, búsqueda y eliminación, todo ello con persistencia local a través del almacenamiento en localStorage.

La conclusión principal que puedo decir es la importancia de la experiencia en el desarrollo de aplicaciones web, dado que sé que aunque pueda parecer una aplicación simple, me ha costado MUCHO trabajo realizarla, y alguien con experiencia la habría acabado quizá en un par de días. 

Las funcionalidades implementadas, han sido pensadas con un enfoque centrado en la usabilidad, buscando que el usuario pueda operar con rapidez y de manera intuitiva. Esta perspectiva ha sido la principal desde el comienzo

Desde el punto de vista técnico, el uso de **React** ha demostrado ser una decisión acertada. La modularidad y reactividad que proporciona me ha facilitado mucho el desarrollo del código. Además, el uso de hooks como useState y useEffect ha permitido una gestión eficaz del estado de la aplicación y de los datos persistentes. Igualmente, he podido constatar la utilidad del almacenamiento local para conservar la información personalizada del usuario sin necesidad de infraestructura de backend, lo cual es ideal para aplicaciones ligeras o en fase de prototipado. Sin embargo, aunque actualmente sea la opción correcta, sé que eso cambiará en un futuro, dado que hay opciones que quiero implementar que me harán modificar gran parte de la estructura e identidad de la aplicación

Por otro lado, el desarrollo de este proyecto me ha supuesto una oportunidad para aplicar buenas prácticas en desarrollo web, cómo entender la lógica de negocio o el tratamiento adecuado de errores. Estos aspectos no solo incrementan la robustez del sistema, sino que me hacen confiar en mí mismo para afrontar retos mayores y aumentar mi experiencia, asumiendo que me queda aún mucho camino por aprender.

En cuanto a los retos encontrados, cabe destacar la necesidad de mantener una lógica coherente entre el estado de la interfaz y los datos almacenados. Al tratarse de una aplicación sin base de datos externa, era fundamental sincronizar correctamente los cambios realizados por el usuario con el almacenamiento local, especialmente en operaciones de edición y eliminación de categorías. Para ello se han diseñado estrategias de actualización del estado y limpieza de datos redundantes.

A nivel personal y académico, este proyecto ha supuesto una gran experiencia de aprendizaje. He de decir que al principio estaba bastante desencantado, dado que no entendía nada, pero poco a poco, fuí adquiriendo conocimientos y me resultó todo más agradable, pese a las dificultades encontradas. 

No solo ha reforzado los conocimientos técnicos adquiridos a lo largo del grado superior, sino que ha fomentado la capacidad de planificación, resolución de problemas y toma de decisiones en un contexto de desarrollo real. Asimismo, me ha ofrecido una visión global del ciclo de vida de un software, desde la concepción de la idea hasta su implementación y prueba funcional, y ahora entiendo por que los softwares tardan tanto en recibir actualizaciones<a name="_page16_x0.00_y841.89"></a> y por que están mejorandose constantemente-

En conclusión, la aplicación desarrollada, aunque no cumple con todos los objetivos funcionales y técnicos definidos al inicio, sienta una base sólida sobre la que podrían añadirse nuevas funcionalidades, como la integración con una API o la de una IA, autenticación de usuarios o almacenamiento en la nube. Además, puede servir como punto de partida para proyectos más ambiciosos.![ ]

# Estimación de costes y tiempo

A la hora de llevar a cabo un proyecto, ( aunque en el contexto de un TFG no suele implicar un coste económico ) es fundamental realizar una estimación de costes y tiempo realista para poder calcular adecuadamente los recursos necesarios. Esta estimación no solo es útil para medir la viabilidad del proyecto, sino que también ayuda a replicarlo o escalarlo en un entorno profesional

.

**Estimación de tiempo**

El tiempo total estimado para la realización del proyecto se ha dividido en varias fases principales. A continuación, se desglosan cada una de ellas, junto con su duración aproximada:



|**Fase del Proyecto**|**Tiempo estimado**|**Tiempo real invertido**|
| - | - | - |
|Investigación y análisis de requisitos|+-10 horas|+-10 horas|
|Diseño de la interfaz y arquitectura|+-15 horas|+-19 horas|
|Desarrollo del sistema|+-30 horas|+-40 horas|
|Pruebas y corrección de errores|+-10 horas|+-8 horas|
|Documentación técnica y memoria|+-15 horas|+-20 horas|
|Presentación y preparación de defensa|+-5 horas|+-6 horas|
|**Total**|**85 horas**|**103 horas**|

Cabe destacar que las fases de desarrollo y documentación fueron las que más tiempo requirieron. El uso de herramientas como React aceleró el proceso de implementación, pero también implicó tiempo adicional de adaptación y depuración de errores. También he de decir y reconocer, que aunque el diseño de la interfaz, logo etc puede parecer simple, es algo<a name="_page18_x0.00_y841.89"></a> a lo que le dediqué más tiempo del debido.

**Estimación de costes

En términos económicos, aunque no he contratado a personal externo ni he adquirido licencias comerciales, es interesante calcular una estimación del coste teórico del proyecto en un entorno profesional. Para ello se tiene en cuenta:

- **Desarrollador Full Stack Junior**: tarifa media de 18 €/hora.
- **Tiempo total invertido**: 103 horas.
- **Coste estimado de desarrollo**:  103 horas × 18 €/hora = **1.854 €**

A esto se podrían añadir costes adicionales en un contexto real:



|**Concepto**|**Coste estimado**|
| - | - |
|Salario desarrollador (103 h)|1\.854 €|
|Equipamiento y conexión (prorrateado)|100 €|
|Uso de software (VSCode, React, etc.)|0 € (open source)|
|**Total estimado**|**1.954 €**|

En este caso, al tratarse de un proyecto de un grado superior, los recursos aportados por mi han sido mi equipo y luz gastado, y dado que se ha creado con herramientas gratuitas de código abierto, el coste real ha sido realmente mínimo.

**Conclusiones de la estimación**

La estimación de costes y tiempos refleja que, incluso para un proyecto de tamaño moderado, es necesario una planificación minuciosa y una gestión eficiente del tiempo. El valor del proyecto no se mide únicamente en términos económicos, sino también en la experiencia adquirida, la calidad del resultado final y la aplicabilidad práctica que puede tener en contextos reales o como base para proyectos mayores.

En el ámbito profesional, este tipo de estimaciones serviría para presupuestar el desarrollo, evaluar la rentabilidad del producto y establecer un cronograma adecuado de trabajo. En un entorno académico, como este, aporta una visión más completa del trabajo realizado y demuestra la capacidad del autor para abordar un proyecto de principio a fin con criterio técnico y organizativo.

# Glosario de Términos

**C**

**CSS (Cascading Style Sheets)**: Lenguaje de hojas de estilo utilizado para describir la presentación visual de documentos HTML. En esta aplicación se usa para dar estilo a los componentes (colores, tamaños, efectos hover, etc.).

**E**

**ES6+ (ECMAScript 2015+)**: Versión moderna de JavaScript que incluye características como arrow functions, destructuring, template literals, y módulos. Utilizado extensivamente en el código de la aplicación.

**Event Handling**: Sistema de gestión de eventos en JavaScript/React que permite responder a interacciones del usuario como clicks, cambios en inputs, presión de teclas, etc.

**H**

**HTML (HyperText Markup Language)**: Lenguaje de marcado estándar para crear páginas web. Aunque se usa JSX en React, este se compila a HTML estándar.

**Hooks**: Funciones especiales de React que permiten usar estado y otras características de React en componentes funcionales. En la aplicación se usan:

- useState: Para manejar el estado local
- useEffect: Para efectos secundarios y ciclo de vida

**J**

**JavaScript**: Lenguaje de programación interpretado que se ejecuta en el navegador. Es el lenguaje base sobre el cual está construida toda la lógica de la aplicación.

**JSX (JavaScript XML)**: Extensión de sintaxis para JavaScript que permite escribir elementos HTML dentro del código JavaScript. Es la forma estándar de escribir componentes en React.

**L**

**LocalStorage**: API de almacenamiento web que permite guardar datos en el navegador del usuario de forma persistente. Usado para mantener productos, listas e historial entre sesiones.

**N**

**Node.js**: Entorno de ejecución de JavaScript del lado del servidor. Aunque la aplicación es del<a name="_page20_x0.00_y841.89"></a> lado cliente, Node.js es necesario para el desarrollo y gestión de dependencias.

**NPM (Node Package Manager)**: Gestor de paquetes para JavaScript que permite instalar y manejar dependencias como React, react-toastify, etc.

**R**

**React**: Biblioteca de JavaScript para construir interfaces de usuario. Es el framework principal utilizado para crear esta aplicación de lista de compras.

**React Components**: Bloques de construcción reutilizables en React que encapsulan HTML, CSS y JavaScript. La aplicación es un gran componente que contiene múltiples elementos.

**React-Toastify**: Biblioteca de React utilizada para mostrar notificaciones toast (mensajes emergentes temporales) que informan al usuario sobre acciones realizadas.

**Responsive Design**: Técnica de diseño web que hace que las páginas se adapten a diferentes tamaños de pantalla y dispositivos.

**S**

**SPA (Single Page Application)**: Tipo de aplicación web que carga una sola página HTML y actualiza dinámicamente el contenido. React es ideal para crear SPAs.

**State Management**: Sistema de gestión del estado de la aplicación que controla cómo se almacenan y actualizan los datos. En esta aplicación se usa el estado local de React.

**U**

**UI (User Interface)**: Interfaz de usuario, se refiere a todos los elementos visuales con los que interactúa el usuario (botones, formularios, listas, etc.).

**UX (User Experience)**: Experiencia de usuario, se refiere a la experiencia general que tiene una persona al usar la aplicación (facilidad de uso, efectos visuales, feedback, etc.).

**V**

**Virtual DOM**: Representación virtual del DOM real que React mantiene en memoria para optimizar las actualizaciones de la interfaz de usuario.

**W**

**Web APIs**: Interfaces de programación que proporcionan los navegadores web, como localStorage, FileReader (para leer archivos de imagen), etc.

**7.1 Conceptos de Desarrollo!

**Component Lifecycle**: Ciclo de vida de un componente React que incluye montaje, actualización y desmontaje. Se maneja con useEffect en componentes funcionales.

**Event Bubbling**: Comportamiento donde los eventos se propagan desde el elemento hijo hacia los elementos padre en el DOM.

**Functional Components**: Tipo de componente React que se define como una función JavaScript, a diferencia de los componentes de clase.

**Props**: Propiedades que se pasan a los componentes React para configurar su comportamiento y apariencia.

**Immutability**: Principio de no modificar directamente el estado, sino crear nuevas copias. Esencial en React para que los componentes se actualicen correctamente.

**Conditional Rendering**: Técnica de mostrar diferentes elementos de la UI basándose en condiciones o estado de la aplicación.

En algún punto del desarrollo del TFG he ojeado estas webs. No mentiré y diré que las he leído todas, pero si algunas de ellas, otras simplemente para agregar ciertas funcionalidades.<a name="_page22_x0.00_y841.89"></a> Conforme accedía a una de ellas, la he agregado en este apartado.

# Bibliografia
1. **Documentación Oficial**

**React**

- https://react.dev/
- Documentación oficial de React con guías, tutoriales y referencia de API

**MDN Web Docs**

- https://developer.mozilla.org/
- Referencia completa de HTML, CSS, JavaScript y Web APIs

**JavaScript Info**

- https://javascript.info/
- Tutorial completo y moderno de JavaScript desde básico hasta avanzado
2. **Tutoriales y Cursos**

**freeCodeCamp**

- https://www.freecodecamp.org/
- Cursos gratuitos de desarrollo web, incluyendo React y JavaScript

**React Tutorial - Tic Tac Toe**

- https://react.dev/learn/tutorial-tic-tac-toe
- Tutorial oficial de React para principiantes

**W3Schools**

- https://www.w3schools.com/
- Tutoriales básicos de HTML, CSS y JavaScript

**Codecademy**

- https://www.codecademy.com/
- Cursos interactivos de programación web

**W3Schools**

- https://www.w3schools.com/
- Tutoriales<a name="_page23_x0.00_y841.89"></a> de HTML, CSS y JavaScript.
3. **Recursos Específicos para Funcionalidades

**React Hooks Documentation**

- https://react.dev/reference/react
- Guía completa de useState, useEffect y otros hooks

**LocalStorage Tutorial**

- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- Documentación y ejemplos de uso de localStorage

**FileReader API**

- https://developer.mozilla.org/en-US/docs/Web/API/FileReader
- Para implementar la carga de imágenes desde archivos

**CSS Flexbox Guide**

- https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- Guía completa de Flexbox para layouts
4. **Bibliotecas y Dependencias**

**React-Toastify**

- https://fkhadra.github.io/react-toastify/
- Documentación oficial para implementar notificaciones toast

**NPM Documentation**

- https://docs.npmjs.com/
- Para gestión de paquetes y dependencia
5. **Plataformas de Aprendizaje**

**Stack Overflow**

- https://stackoverflow.com/
- Comunidad para resolver dudas específicas de programación

**GitHub**

- <a name="_page24_x0.00_y841.89"></a>https://github.com/
- Para ver código de ejemplo y proyectos similares

**CodePen**

- https://codepen.io/
- Para experimentar con código HTML, CSS y JavaScript

**YouTube - Canales Recomendados**

- Traversy Media: https://www.youtube.com/@TraversyMedia
- The Net Ninja: https://www.youtube.com/@NetNinja
- Academind: https://www.youtube.com/@academind
6. **Herramientas de Desarrollo**

**Visual Studio Code**

- https://code.visualstudio.com/
- Editor de código recomendado con extensiones para React

**Node.js**

- https://nodejs.org/
- Entorno necesario para desarrollo con React

**Create React App**

- https://create-react-app.dev/
- Herramienta para crear aplicaciones React sin configuración
7. **Diseño**

**CSS-Tricks**

- https://css-tricks.com/
- Artículos y tutoriales sobre CSS y diseño web

**Can I Use**

- https://caniuse.com/
- Compatibilidad de características web entre navegadores

**Google<a name="_page25_x0.00_y841.89"></a> Fonts**

- https://fonts.google.com/!
- Fuentes web gratuitas (aunque no usadas en esta aplicación específica)
8. **Herramientas de Testing y Debugging**

**React Developer Tools**

- https://react.dev/learn/react-developer-tools
- Extensión de navegador para debugear aplicaciones React

**Chrome DevTools**

- https://developer.chrome.com/docs/devtools/
- Herramientas<a name="_page26_x0.00_y841.89"></a> de desarrollo integradas en Chrome


