
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const Comp0 = lazy(() => import("./Admin/bluebusdasboard"));
const Comp1 = lazy(() => import("./Admin/report"));
const Comp2 = lazy(() => import("./Admin/bluebusbooktickect"));
const Comp3 = lazy(() => import("./Admin/ManageBooking"));
const Comp4 = lazy(() => import("./Admin/register"));


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Comp0 />} />
<Route path="/dashboard" element={<Comp1 />} />
<Route path="/book-ticket" element={<Comp2 />} />
<Route path="/manage-ticket" element={<Comp3 />} />
<Route path="/register" element={<Comp4 />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
