const Footer = () => {
  return (
    <>
      <footer className="bd-footer py-4 py-md-5 mt-5 bg-body-tertiary">
        <div className="container py-4 py-md-5 px-4 px-md-3 text-body-secondary">
          <div className="row">
            <div className="col-lg-3 mb-3">
              <a
                className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none"
                href="/"
                aria-label="Bootstrap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="32"
                  className="d-block me-2"
                  viewBox="0 0 118 94"
                  role="img"
                >
                  <title>Bootstrap</title>
                  <path d="M118 25.9c-.4-1.6-2.2-2.8-4.3-2.8-2.5 0-4.7 1.4-5.2 3.3 1.6-1.7 3.5-2.4 5.3-1.7.9.3 1.5 1.3 1.5 2.4 0 1.4-.8 2.6-2.5 3.1-.8.3-1.7.5-2.5.5-.9 0-1.7-.1-2.5-.5-.7-.3-1.3-.8-1.7-1.3-.4-.6-.7-1.2-.9-2-.2-.8-.3-1.7-.3-2.5s.1-1.7.3-2.5c.2-.8.5-1.4.9-2 .4-.6 1-1 1.7-1.3.8-.3 1.6-.5 2.5-.5.8 0 1.6.2 2.4.5 1.4.5 2.6 1.3 3.5 2.3.9 1 .1 2.2-.4 3-.5.7-1.2 1.4-2.2 1.8z"></path>
                </svg>
                <span className="fs-5">CinePulse</span>
              </a>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  Feel the Pulse of Every Event, Seamless Bookings Anytime,
                  Anywhere.
                  <br />
                  <br />
                  24/7 Customer Care
                  <a href="#"> CinePulse team</a>.
                </li>
              </ul>
            </div>

            <div className="col-6 col-lg-2 offset-lg-1 mb-3">
              <h5>LINKS</h5>
              <br />
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/">Home</a>
                </li>
                <li className="mb-2">
                  <a href="/movies">Movie</a>
                </li>
                <li className="mb-2">
                  <a href="/streams">Stream</a>
                </li>
                <li className="mb-2">
                  <a href="/events">Events</a>
                </li>
                <li className="mb-2">
                  <a href="/plays">Plays</a>
                </li>
                <li className="mb-2">
                  <a href="/sports">Sports</a>
                </li>
                <li className="mb-2">
                  <a href="/activities">Activities</a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-lg-2 mb-3">
              <h5>SOCIAL MEDIA</h5>
              <br />
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#">X</a>
                </li>
                <li className="mb-2">
                  <a href="#">Facebook</a>
                </li>
                <li className="mb-2">
                  <a href="#">Instagram</a>
                </li>
                <li className="mb-2">
                  <a href="#">YouTube</a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-lg-2 mb-3">
              <h5>MOVIE BY LANGUAGE</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/Hindi">Hindi</a>
                </li>
                <li className="mb-2">
                  <a href="/Marathi">Marathi</a>
                </li>
                <li className="mb-2">
                  <a href="/English">English</a>
                </li>
                <li className="mb-2">
                  <a href="/upcoming">Upcoming</a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-lg-2 mb-3">
              <h5>HELP</h5>
              <br />
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#">About Us</a>
                </li>
                <li className="mb-2">
                  <a href="#">Contact Us</a>
                </li>
                <li className="mb-2">
                  <a href="#">Terms and Conditions</a>
                </li>
                <li className="mb-2">
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
