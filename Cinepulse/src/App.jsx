import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./components/Forms/LoginForm";
import SignUpForm from "./components/Forms/SignUpForm";
import ForgotPassword from "./components/Forms/ForgotPassword";
import ResetPassword from "./components/Forms/ResetPassword";
import ManagerDashboard from "./components/Forms/ManagerDashboard";
import AdminForm from "./components/Forms/AdminForm";
import UpdateCinemaHall from "./components/Forms/UpdateCinemaHall";
import AssociateMovie from "./components/Forms/AssociateMovie";
import UpComingMovie from "./components/Movies/UpComingMovie";
import MovieDesc from "./components/Movies/MovieDesc";
import HomeCard from "./components/Movies/HomeCard";
import MovieCard from "./components/Movies/MovieCard";
import Layout from "./components/Layout";
import TodayShow from "./components/Movies/TodayShow";
import Booking from "./components/Movies/Booking";
import BookingSummary from "./components/Movies/BookingSummary";
import { SeatProvider } from "./components/Context/SeatContext";
import EventCard from "./components/Movies/EventCard";
import PlayCard from "./components/Movies/PlayCard";
import SportCards from "./components/Movies/SportCards";
import ActivitiesCard from "./components/Movies/ActivitiesCard";
import StreamCard from "./components/Movies/StreamCard";
import AddShow from "./components/Forms/AddShow";
import UpdateMovieForm from "./components/Forms/UpdateMovieForm";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SeatProvider>
      <Router>
        <Layout onSearch={handleSearch}>
          <Routes>
            <Route path="/" element={<HomeCard searchQuery={searchQuery} />} />
            {/* Login and Signup */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminForm />} />
            <Route
              path="/update-cinemaHall/:id"
              element={<UpdateCinemaHall />}
            />
            <Route path="/associate-movie/:id" element={<AssociateMovie />} />
            <Route path="/add-show/:id" element={<AddShow />} />
            <Route
              path="/update-movie/:movieId"
              element={<UpdateMovieForm />}
            />
            {/* SubHeader items */}
            <Route path="/movies" element={<MovieCard />} />
            <Route path="/events" element={<EventCard />} />
            <Route path="/streams" element={<StreamCard />} />
            <Route path="/plays" element={<PlayCard />} />
            <Route path="/sports" element={<SportCards />} />
            <Route path="/activities" element={<ActivitiesCard />} />
            {/* Upcoming */}
            <Route path="/upcoming" element={<UpComingMovie />} />
            <Route path="/moviesdesc" element={<MovieDesc />} />
            <Route path="/todayshow" element={<TodayShow />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/bookingsummary" element={<BookingSummary />} />
          </Routes>
        </Layout>
      </Router>
    </SeatProvider>
  );
}

export default App;
