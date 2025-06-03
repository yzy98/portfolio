# Portfolio

A modern portfolio website built with Astro, featuring a clean design and smooth transitions. This project showcases my work, blog, and skills as a Web Developer.

## Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Linting:** [ESLint](https://eslint.org/)
- **Fonts:** [Fontsource (Lora, Roboto)](https://fontsource.org/)
- **Content:** MDX, RSS Feed, Sitemap

## Available Commands

In the project directory, you can run the following commands:

| Command          | Description                                                                                                      |
| :--------------- | :--------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`       | Runs the app in development mode. Open [http://localhost:4321](http://localhost:4321) to view it in the browser. |
| `pnpm build`     | Builds the app for production to the `dist/` folder.                                                             |
| `pnpm preview`   | Serves the production build locally for preview.                                                                 |
| `pnpm astro ...` | Runs Astro CLI commands.                                                                                         |
| `pnpm lint`      | Lints the codebase using ESLint.                                                                                 |
| `pnpm lint:fix`  | Lints and automatically fixes ESLint errors.                                                                     |

## Sliding Enter Animation

Inspired by [Antfu's blog post on sliding enter animation](https://antfu.me/posts/sliding-enter-animation):

```css
.slide-enter-content > * {
  --stagger: 0;
  --delay: 150ms;
  --start: 0ms;
  animation: slide-enter 1s both 1;
  animation-delay: calc(var(--start) + var(--stagger) * var(--delay));
}

.slide-enter-content > *:nth-child(1) {
  --stagger: 1;
}
.slide-enter-content > *:nth-child(2) {
  --stagger: 2;
}
/* ... */
```

The above solution only works for direct child elements under the `.slide-enter-content` parent.

In my case, I needed the "slide enter" effect to apply not only to direct children, but also to grandchildren and deeper descendants. To achieve this, I loop through all `.slide-enter` elements in a script and incrementally set the `--stagger` CSS property:

```js
function slideEnter() {
  const slideEnterElements = document.querySelectorAll(".slide-enter");
  slideEnterElements.forEach((element, index) => {
    element.style.setProperty("--stagger", index + 1);
  });
}

slideEnter();
```

```css
@keyframes slide-animation {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-enter {
  --stagger: 0;
  --delay: 150ms;
  --start: 0ms;
  animation: slide-animation 0.7s both 1;
  animation-delay: calc(var(--start) + var(--stagger) * var(--delay));
}
```

So that's it 🎉! View the source code here: [CSS](src/styles/global.css) and [JavaScript](src/components/head.astro).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
