import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import TopMenu from "./components/TopMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.min.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://127.0.0.1:8000/api',
  cache: new InMemoryCache()
});
//const Header = lazy(() => import("./components/Header"));
//const TopMenu = lazy(() => import("./components/TopMenu"));
const HomeView = lazy(() => import("./views/Home"));
const SignInView = lazy(() => import("./views/account/SignIn"));
const SignUpView = lazy(() => import("./views/account/SignUp"));
const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const OrdersView = lazy(() => import("./views/account/Orders"));
const WishlistView = lazy(() => import("./views/account/Wishlist"));
const NotificationView = lazy(() => import("./views/account/Notification"));
const MyProfileView = lazy(() => import("./views/account/MyProfile"));
const ProductListView = lazy(() => import("./views/product/List"));
const ProductDetailView = lazy(() => import("./views/product/Detail"));
const StarZoneView = lazy(() => import("./views/product/StarZone"));
const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const DocumentationView = lazy(() => import("./views/Documentation"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const ContactUsView = lazy(() => import("./views/pages/ContactUs"));
const SupportView = lazy(() => import("./views/pages/Support"));
const BlogView = lazy(() => import("./views/blog/Blog"));
const BlogDetailView = lazy(() => import("./views/blog/Detail"));
const CouponsView = lazy(() => import('./views/product/Coupon'));

function App() {
  return (
    <ApolloProvider client = {client}>
    <BrowserRouter>
      <React.Fragment>
        <Suspense
          fallback={
            <div className="text-white text-center mt-3">Loading...</div>
          }
        > 
          <Switch>
            <Route exact path="/" component={SignInView} />
            <Route exact path="/account/signup" component={SignUpView} /> 
          <>
            <Header />
            <TopMenu />
            <Route exact path="/home/:user" render={(props) => <HomeView {...props }/>}/>
            <Route
              exact
              path="/account/forgotpassword"
              component={ForgotPasswordView}
            />
            <Route exact path="/account/profile" component={MyProfileView} />
            <Route exact path="/account/orders" component={OrdersView} />
            <Route exact path="/account/wishlist" component={WishlistView} />
            <Route
              exact
              path="/account/notification"
              component={NotificationView}
            />
            <Route exact path="/category/:user" render={(props) => <ProductListView {...props }/>}/>
            <Route exact path="/product/detail" component={ProductDetailView} />
            <Route exact path="/star/zone" component={StarZoneView} />
            <Route exact path="/redeem/coupons/:user" render={(props) => <CouponsView {...props }/>}/>
            <Route exact path="/cart/:user" render={(props) => <CartView {...props }/>}/>
            <Route exact path="/checkout/:user?:total" render={(props) => <CheckoutView {...props }/>}/>
            <Route exact path="/documentation" component={DocumentationView} />
            <Route exact path="/contact-us" component={ContactUsView} />
            <Route exact path="/support" component={SupportView} />
            <Route exact path="/blog" component={BlogView} />
            <Route exact path="/blog/detail" component={BlogDetailView} />
            <Route exact path="/500" component={InternalServerErrorView} />
          </>
          <Route component={NotFoundView} />
          </Switch>
        </Suspense>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
