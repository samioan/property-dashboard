import { createRouter, createWebHistory } from "vue-router";
import {
  HomePage,
  AssetCreationPage,
  AssetDetailPage,
  AssetListPage,
} from "@/pages";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/listings/page/:page",
    name: "Listings",
    component: AssetListPage,
  },
  {
    path: "/listings/create",
    name: "Create Listing",
    component: AssetCreationPage,
  },
  {
    path: "/listings/:uuid",
    name: "View Listing",
    component: AssetDetailPage,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
