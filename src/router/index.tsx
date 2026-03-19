import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import Products from "../pages/Products";
import Product from "../pages/Product";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<div>Home Page</div>} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<Product />} />
    </Route>,
  ),
);

export default router;
