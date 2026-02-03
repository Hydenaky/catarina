## Safirial Icons – Paquete de iconos SVG para Angular

**Safirial Icons** es un paquete de iconos SVG pensado para aplicaciones Angular.  
Proporciona una lista de nombres de icono y una función para resolver rutas estáticas a los SVG.

Este paquete puede utilizarse de forma independiente o junto con los design systems `catarina` y `safirial`.

- **Paquete npm**: `safirial-icons`
- **Versión**: `1.0.2`

---

## API pública

El archivo `public-api.ts` expone los siguientes elementos:

- `ICON_BASE_PATH`: ruta base donde se sirven los SVG (`'safirial-icons'`).
- `iconList`: lista de nombres de icono disponibles (por ejemplo, `'home'`, `'sun'`, `'email'`, `'github'`, etc.).
- `IconName`: tipo TypeScript que representa cualquier nombre de icono válido.
- `getIconPath(name: IconName): string`: función que devuelve la ruta completa del SVG a partir del nombre.

Ejemplo de uso directo de `getIconPath`:

```ts
import { getIconPath, IconName } from 'safirial-icons';

const iconName: IconName = 'home';
const path = getIconPath(iconName); // 'safirial-icons/home.svg'
```

## Instalación

En un proyecto Angular:

```bash
npm install safirial-icons
```

También puede instalarse usando `pnpm` o `yarn`:

```bash
pnpm add safirial-icons
yarn add safirial-icons
```

## Construcción y publicación

Para compilar la librería desde el workspace:

```bash
ng build safirial-icons
```

El resultado se genera en:

```bash
dist/safirial-icons
```

---

## Créditos y atribución

Los iconos SVG incluidos en este paquete provienen de las siguientes fuentes:

### Heroicons

Los iconos están basados en [Heroicons](https://heroicons.com/outline), creados por los desarrolladores de Tailwind CSS.

- **Sitio web**: [https://heroicons.com/outline](https://heroicons.com/outline)
- **Licencia**: MIT License
- **Versión**: v2.1.5

### SVG Repo

Algunos iconos adicionales provienen de [SVG Repo](https://www.svgrepo.com/), una colección de iconos SVG de código abierto.

- **Sitio web**: [https://www.svgrepo.com/](https://www.svgrepo.com/)
- **Licencias**: Varias (MIT, Apache 2.0, CC0)

Todos los iconos conservan sus licencias originales según corresponda. La atribución se mantiene de acuerdo con los términos de las respectivas licencias.

---

## Idioma / Language

Esta documentación está disponible en español. Para la versión en inglés, consulta [README.md](./README.md).

This documentation is available in Spanish. For the English version, see [README.md](./README.md).

---