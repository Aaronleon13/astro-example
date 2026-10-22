<template>
  <div class="relative w-full text-left font-bebas" @focusin="isOpen = true" @focusout="handleFocusOut">
    <form role="search" aria-label="Buscar personajes" @submit.prevent>
      <label :for="searchId" class="sr-only">Buscar por personaje o nombre real</label>
      <div
        class="flex items-center rounded-md border border-zinc-300 bg-white text-zinc-900 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-600/20">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
          class="ml-4 size-5 shrink-0 text-zinc-400">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path stroke-linecap="round" d="m16 16 4 4" />
        </svg>
        <input :id="searchId" ref="input" v-model="query" type="search" name="personaje" autocomplete="off"
          placeholder="Buscar personaje..." :aria-describedby="`${searchId}-status`"
          :aria-controls="`${searchId}-results`"
          class="min-h-12 min-w-0 flex-1 appearance-none bg-transparent px-3 py-3 text-sm placeholder:text-zinc-500 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
          @keydown.esc="clearSearch" />
        <button v-if="query" type="button" aria-label="Limpiar búsqueda"
          class="mr-1 inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-zinc-500 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-600"
          @click="clearSearch">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
            class="size-4">
            <path stroke-linecap="round" d="m6 6 12 12M6 18 18 6" />
          </svg>
        </button>
      </div>
    </form>

    <p :id="`${searchId}-status`" role="status" aria-atomic="true" class="sr-only">
      <template v-if="searchTerm">
        {{ results.length }} {{ results.length === 1 ? "resultado" : "resultados" }}.
      </template>
    </p>

    <div :id="`${searchId}-results`">
      <div v-if="searchTerm && isOpen"
        class="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-900 shadow-lg">
        <ul v-if="results.length" role="list" aria-label="Resultados de búsqueda"
          class="max-h-80 overflow-y-auto overscroll-contain divide-y divide-zinc-100">
          <li v-for="hero in results" :key="hero.id">
            <a :href="`/heroe/${hero.slug}/`"
              class="block px-4 py-3 hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red-600">
              <span class="block wrap-break-word text-sm font-medium">{{ hero.name }}</span>
              <span class="mt-0.5 block wrap-break-word text-xs text-zinc-500">{{ hero.biography.fullName }}</span>
            </a>
          </li>
        </ul>
        <p v-else class="px-4 py-4 text-sm text-zinc-500">No se encontraron personajes.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from "vue";
import { marvelCharacters } from "../../data/data";

const searchId = useId();
const query = ref("");
const isOpen = ref(false);
const input = ref<HTMLInputElement | null>(null);

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const searchTerm = computed(() => normalize(query.value));
const results = computed(() => {
  if (!searchTerm.value) return [];

  return marvelCharacters.filter((hero) =>
    [hero.name, hero.biography.fullName].some((name) =>
      normalize(name).includes(searchTerm.value),
    ),
  );
});

function handleFocusOut(event: FocusEvent) {
  const container = event.currentTarget;
  if (
    container instanceof HTMLElement &&
    (!(event.relatedTarget instanceof Node) || !container.contains(event.relatedTarget))
  ) {
    isOpen.value = false;
  }
}

function clearSearch() {
  query.value = "";
  input.value?.focus();
}
</script>
