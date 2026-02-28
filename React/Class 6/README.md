# Folder Structure

src/
---- main.jsx
---- router/
      ---- route.jsx
     layouts/
      ---- RootLayout.jsx
      ---- DashboardLayout.jsx
     pages/
      ---- Home.jsx
      ---- Login.jsx
      ---- Dashboard.jsx
      ---- Users.jsx
     loaders/
      ---- usersLoader.js
      ---- todoLoader.js
     actions/
      ---- loginAction.js
      ---- todoAction.js
     utils/
      ---- auth.js
     components/
      ---- PageName1/
            Today'sDeal.jsx
            TopSellingProducts.jsx
            FeaturedProducts.jsx
      ---- PageName2/
            Today'sDeal.jsx
            TopSellingProducts.jsx
            FeaturedProducts.jsx


Steps to create a Context
/context
      ContextProvider.jsx

STEP-2: User ContextProivder Wrapper in the parent Component
STEP-3: To use the value of the state, we use "useContext(Context)"
