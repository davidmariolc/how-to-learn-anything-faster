# How to Learn Anything Faster

Una guía ilustrada e interactiva para convertir lo que lees, ves y escuchas en habilidades que puedes usar.

[Leer en español](https://how-to-learn-anything-faster-omega.vercel.app/es) · [Read in English](https://how-to-learn-anything-faster-omega.vercel.app/en)

![Un libro abierto cuyas páginas forman una escalera azul, con un lápiz amarillo sobre el papel.](public/learning/cover.webp)

## Qué encontrarás

- **Recuerdo activo.** Cierra tus apuntes y comprueba qué puedes explicar de memoria con una tarjeta interactiva.
- **Práctica aplicada.** Resuelve una tarea pequeña con lo que acabas de aprender y ensaya en condiciones parecidas a las reales.
- **Un ciclo para repetir.** Aprende, recuerda, aplica y reflexiona. La guía termina con tres preguntas para tu próxima sesión de estudio.

Puedes cambiar de idioma desde la cabecera y seguir en el mismo capítulo.

## Cómo ejecutarlo

Usa Node.js 24 y pnpm 12.10.1.

```bash
git clone https://github.com/davidmariolc/how-to-learn-anything-faster.git
cd how-to-learn-anything-faster
pnpm install --frozen-lockfile
pnpm dev
```

Abre [localhost:3000](http://localhost:3000), que redirige a la guía en inglés. La versión en español está en [/es](http://localhost:3000/es).

| Comando      | Qué hace                                    |
| ------------ | ------------------------------------------- |
| `pnpm dev`   | Inicia el servidor de desarrollo            |
| `pnpm check` | Revisa el formato y el código con Ultracite |
| `pnpm build` | Compila la versión de producción            |

## Cómo está hecho

El sitio usa Next.js con App Router, React y TypeScript. Las rutas y los componentes de la guía viven en [app/[locale]](app/%5Blocale%5D), los textos en [messages](messages) y las ilustraciones en [public/learning](public/learning). La configuración de idiomas usa next-intl.
