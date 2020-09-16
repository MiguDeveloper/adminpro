# Adminpro

Interesante proyecto con panel de administración Angular 9

> Conceptos vistos en este proyecto:

Similitudes entre promesas y obsevadores

> Similitudes:

- Ambas son para trabajar con procesos asíncronos.

> Diferencias:

Promesas:

- Trabajan con un único flujo de datos.
- Se usan con una única data asíncrona de respuesta.
- No es muy simple de cancelar.

Observables

- Trabajan con un flujo continuo de datos.
- Al fallar puedes ejecutar comandos y reintentar continuar con el observer.
- Se pueden encadenar operadores adicionales como el: map, foreach, reduce, filter y más.
- Existen otros operadores potentes como el retry() o el replay().
- Pueden ser creados desde otras fuentes, como los eventos.
- Son funciones a las cuales podemos suscribirnos en múltiples lugares.
