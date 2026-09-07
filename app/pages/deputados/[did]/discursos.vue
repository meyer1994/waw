<script setup lang="ts">
const route = useRoute()
const did = route.params.did as string

const { data } = await useFetch(`/api/deputados/${did}/discursos`)

useHead(() => ({ title: 'Discursos' }))
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      Discursos
    </h2>

    <p
      v-if="data?.dados.length === 0"
      class="text-muted"
    >
      Nenhum discurso registrado.
    </p>

    <ul
      v-else
      class="space-y-4"
    >
      <li
        v-for="discurso in data?.dados ?? []"
        :key="discurso.dataHoraInicio"
        class="border rounded-lg p-4"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="font-medium">
              <NuxtTime
                v-if="discurso.dataHoraInicio"
                :datetime="discurso.dataHoraInicio"
                locale="pt-BR"
                year="numeric"
                month="2-digit"
                day="2-digit"
                hour="2-digit"
                minute="2-digit"
              />
              <span v-else>—</span>
              • {{ discurso.tipoDiscurso ?? 'Discurso' }}
            </p>
            <p
              v-if="discurso.faseEvento?.titulo"
              class="text-muted text-sm mt-1"
            >
              {{ discurso.faseEvento.titulo }}
            </p>
            <p class="text-sm mt-2 line-clamp-2">
              {{ discurso.sumario ?? discurso.keywords }}
            </p>
          </div>

          <div class="flex gap-2 shrink-0">
            <UButton
              v-if="discurso.urlVideo"
              :to="discurso.urlVideo"
              target="_blank"
              icon="i-lucide-video"
              color="neutral"
              variant="ghost"
              size="xs"
              aria-label="Ver vídeo"
            />
            <UButton
              v-if="discurso.urlAudio"
              :to="discurso.urlAudio"
              target="_blank"
              icon="i-lucide-audio-lines"
              color="neutral"
              variant="ghost"
              size="xs"
              aria-label="Ouvir áudio"
            />
            <UButton
              v-if="discurso.urlTexto"
              :to="discurso.urlTexto"
              target="_blank"
              icon="i-lucide-file-text"
              color="neutral"
              variant="ghost"
              size="xs"
              aria-label="Ler texto"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
