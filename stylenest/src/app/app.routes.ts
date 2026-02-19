// import { Routes } from '@angular/router';
// import { Home } from './pages/home/home';
// import { adminGuard } from './guards/admin.guard';
// import { ManageProductsComponent } from './admin/manage-products/manage-products';
// import { AddProductComponent } from './admin/add-product/add-product';
// import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';

// export const routes: Routes = [
//   { path: '', component: Home },

//   { path: 'collection', loadComponent: () => import('./pages/collection/collection').then(m => m.CollectionComponent) },
//   { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
//   { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) },

//   // user
//   { path: 'user/login', loadComponent: () => import('./pages/user-login/user-login').then(m => m.UserLoginComponent) },

//   // admin
  
//   { path: 'admin/login', loadComponent: () => import('./admin/login/login').then(m => m.LoginComponent) },
//    {
//   path: 'admin/dashboard',
//   loadComponent: () =>
//     import('./admin/admin-dashboard/admin-dashboard')
//       .then(m => m.AdminDashboard),
//   canActivate: [adminGuard],
//   children: [
//     {
//       path: '',
//       loadComponent: () =>
//         import('./admin/manage-products/manage-products')
//           .then(m => m.ManageProductsComponent)
//     },
//     {
//       path: 'add-product',
//       loadComponent: () =>
//         import('./admin/add-product/add-product')
//           .then(m => m.AddProductComponent)
//     },
//     {
//       path: 'manage-products',
//       loadComponent: () =>
//         import('./admin/manage-products/manage-products')
//           .then(m => m.ManageProductsComponent)
//     }
//   ]
// },
//   {
//   path: 'admin/add-product/:id',
//   loadComponent: () =>
//     import('./admin/add-product/add-product')
//       .then(m => m.AddProductComponent)
// }

// ];

import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Home } from './pages/home/home';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [

  // 🌍 PUBLIC LAYOUT
  {
    path: '',
    component: PublicLayout, 
    children: [
      { 
        path: '', component: Home }, { path: 'collection', loadComponent: () =>  import('./pages/collection/collection') .then(m => m.CollectionComponent)
      },
      {
        path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
      },
      {
        path: 'about',loadComponent: () => import('./pages/about/about').then(m => m.About)
      },

      // user login
      {
        path: 'user/login',
        loadComponent: () =>
          import('./pages/user-login/user-login')
            .then(m => m.UserLoginComponent)
      },
      {
        path: 'user/user-register',
        loadComponent: () => import('./pages/user-register/user-register').then(m => m.UserRegisterComponent)
      },
      { path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.CartPageComponent) },
      { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist').then(m => m.WishlistPageComponent) },
      { path: 'user/orders', loadComponent: () => import('./pages/orders/orders').then(m => m.UserOrdersPageComponent) },
      // admin login (PUBLIC navbar)
      {
        path: 'admin/login',
        loadComponent: () =>
          import('./admin/login/login')
            .then(m => m.LoginComponent)
      }
    ]
  },

  // 🔐 ADMIN LAYOUT
  {
    path: 'admin/dashboard',
    component: AdminLayout,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin/manage-products/manage-products')
            .then(m => m.ManageProductsComponent)
      },
      {
        path: 'add-product',
        loadComponent: () =>
          import('./admin/add-product/add-product')
            .then(m => m.AddProductComponent)
      },
      {
        path: 'manage-products',
        loadComponent: () =>
          import('./admin/manage-products/manage-products')
            .then(m => m.ManageProductsComponent)
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./admin/manage-orders/manage-orders')
            .then(m => m.ManageOrdersComponent)
      }
    ]
  },

  // ✏️ EDIT PRODUCT (KEEP SEPARATE – VERY IMPORTANT)
  {
    path: 'admin/add-product/:id',
    loadComponent: () =>
      import('./admin/add-product/add-product')
        .then(m => m.AddProductComponent),
    canActivate: [adminGuard]
  }
];

