<script setup lang="ts">
const route = useRoute()
// no dedicated detail view — send the base route straight to the default tab
await navigateTo(`/camara/deputados/${route.params.did}/proposicoes`, { replace: true })
</script>
