import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Login from "../pages/Login";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardCategories from "../pages/dashboard/DashboardCategories";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<div>Home Page</div>} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route
          path="products"
          element={<h1 className="text-3xl">Products</h1>}
        />
        <Route path="categories" element={<DashboardCategories />} />
      </Route>
    </>,
  ),
);

export default router;
