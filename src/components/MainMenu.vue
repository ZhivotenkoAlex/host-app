<template>
  <div class="menu">
    <NavigationMenu @change-component="loadComponent" />

    <div class="content">
      <component :is="currentComponent" v-if="currentComponent" />
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<script>
import { ref, markRaw } from "vue"
import { defineAsyncComponent } from "vue"

export default {
  name: "MainMenu",
  components: {
    NavigationMenu: defineAsyncComponent(() => import("menu/NavigationMenu")),
  },
  setup() {
    const currentComponent = ref(null)

    const loadComponent = async (pkg) => {
      try {
        if (pkg === "A") {
          const module = await import("packageA/TextA")
          currentComponent.value = markRaw(module.default)
        } else {
          const module = await import("packageB/TextB")
          currentComponent.value = markRaw(module.default)
        }
      } catch (err) {
        console.error("Failed to load component:", err)
        currentComponent.value = markRaw({
          template: "<div>Error loading component</div>",
        })
      }
    }

    return {
      currentComponent,
      loadComponent,
    }
  },
}
</script>
