import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import HomeLandingPage from "pages/home-landing-page";
import LoginRegistration from "pages/login-registration";
import ProductCatalogBrowse from "pages/product-catalog-browse";
import ShoppingCartCheckout from "pages/shopping-cart-checkout";
import ProductDetailPage from "pages/product-detail-page";
import UserAccountDashboard from "pages/user-account-dashboard";
import AdminDashboard from "pages/admin-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeLandingPage />} />
        <Route path="/home-landing-page" element={<HomeLandingPage />} />
        <Route path="/login-registration" element={<LoginRegistration />} />
        <Route path="/product-catalog-browse" element={<ProductCatalogBrowse />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/product-detail-page" element={<ProductDetailPage />} />
        <Route path="/user-account-dashboard" element={<UserAccountDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;