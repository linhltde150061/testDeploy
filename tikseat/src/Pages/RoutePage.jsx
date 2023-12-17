import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Common/HomePage";
import Loading from "./Common/Loading";

import SuccessPage from "./Common/SuccessPage";
import ErrorPage from "./Common/ErrorPage";

// layout client header
const LayoutClient = lazy(() =>
  import("../Components/Common/Layout/LayoutClient")
);

const LoginPage = lazy(() => import("./Common/LoginPage"));
const SignUp = lazy(() => import("./Common/SignUp"));
const LayoutSign = lazy(() => import("../Components/Common/Layout/LayoutSign"));
const MyTicket = lazy(() => import("./Client/MyTicket"));
const RefundableTickets = lazy(() => import("./Client/RefundableTickets"));
const PaymentComplated = lazy(() => import("./Client/PaymentComplated"));
const HistoryPayment = lazy(() => import("./Client/HistoryPayment"));
const ChooseAccess = lazy(() => import("./Common/ChooseAccess"));
const ForgetPassword = lazy(() => import("./Common/ForgotPassword"));
const ProfileOrganizers = lazy(() => import("./Organizers/ProfileOrganizers"));
const ProfileClient = lazy(() => import("./Client/ProfileClient"));
const BookTickets = lazy(() => import("./Client/BookTickets"));
// Trang tam thoi
const ChangePassword = lazy(() => import("../Pages/Client/ChangePassword"));
const Sidebar = lazy(() => import("../Pages/Organizers/Sidebar"));
const ClientPageAdmin = lazy(() => import("../Pages/Admin/ClientPageAdmin"));
const OrganizerPageAdmin = lazy(() =>
  import("../Pages/Admin/OrganizerPageAdmin")
);
const Adminpage = lazy(() => import("../Pages/Admin/Adminpage"));

function RoutePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/errorpage" element={<ErrorPage />} />
        <Route path="/homePageAdmin" element={<Adminpage />} />
        <Route path="/clientPageAdmin" element={<ClientPageAdmin />} />
        <Route path="/organizerPageAdmin" element={<OrganizerPageAdmin />} />
        {/* <Route path="/my-profile" element={<MyProfile />}></Route> */}
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Sidebar />}></Route>

        <Route element={<LayoutClient />}>
          <Route path="/book-tickets/:id" element={<BookTickets />}></Route>{" "}
          <Route
            path="refundable_tickets"
            element={<RefundableTickets />}
          ></Route>
          <Route path="my_ticket" element={<MyTicket />}></Route>
          <Route path="my_history_payment" element={<HistoryPayment />}></Route>
          <Route path="payment_completed" element={<PaymentComplated />} />
        </Route>

        <Route element={<SignUp />}>
          <Route
            path="/createProfileOrganizers"
            element={<ProfileOrganizers />}
          />
          <Route path="/createProfileClient" element={<ProfileClient />} />
          <Route path="/choose-access" element={<ChooseAccess />}></Route>
        </Route>
        <Route
          element={
            <LayoutSign itemLeft={6} itemRight={6} direction="row-reverse" />
          }
        >
          <Route path="/forgot-password" element={<ForgetPassword />}></Route>
        </Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </Suspense>
  );
}

export default RoutePage;
