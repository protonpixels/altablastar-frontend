import { createRouter, createWebHashHistory } from "vue-router";
import ScoutingForm from "@/components/ScoutingForm.vue";
import UFCPredictor from "@/components/UFCPredictor.vue";

const routes = [
  { path: "/", name: "home", component: ScoutingForm },
  { path: "/football", name: "football-scout", component: ScoutingForm },
  { path: "/mma", name: "mma-analysis", component: UFCPredictor },
];

export default createRouter({
  // Hash history keeps it working when opened from a static file / preview.
  history: createWebHashHistory(),
  routes,
});
