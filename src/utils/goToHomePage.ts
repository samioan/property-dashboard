import type { Router } from "vue-router";

export function goToHomePage(router: Router) {
  router.push({
    path: `/`,
  });
}
