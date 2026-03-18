import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProductsPage from "../components/ProductsPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<div>Home Page</div>} />
      <Route path="products" element={<ProductsPage />} />
    </Route>,
  ),
);

export default router;
