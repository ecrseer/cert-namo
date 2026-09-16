<template>
  <RouterView />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap");

:global(:root) {
  color: oklch(28% 0.02 45);
  background: oklch(93% 0.01 85);
  font-family: "Playfair Display", Georgia, serif;
  font-synthesis: none;
}

:global(*) {
  box-sizing: border-box;
}

:global(body) {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  background: oklch(93% 0.01 85);
}

:global(button),
:global(input) {
  font: inherit;
}

:global(button) {
  color: inherit;
}
</style>
