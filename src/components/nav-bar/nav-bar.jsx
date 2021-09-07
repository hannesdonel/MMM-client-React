import React from 'react';
import {
  Navbar, Nav, NavDropdown, Container,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFilter, setUser } from '../../actions/actions';

const NavBar = () => {
  const dispatch = useDispatch();
  const {
    userData, user, directors, genres,
  } = useSelector((state) => state);

  const onLoggedOut = () => {
    localStorage.clear();
    dispatch(setUser(null));
  };

  // Directors logic

  const listDirectors = directors.map((director) => (
    <NavDropdown.Item
      key={director._id}
      as={Link}
      to={`/directors/${director.name}`}
      onClick={() => dispatch(setFilter(director.name))}
      className="text-dark"
    >
      {director.name}
    </NavDropdown.Item>
  ));

  // Genres logic

  const listGenres = genres.map((genre) => (
    <NavDropdown.Item
      key={genre._id}
      as={Link}
      to={`/genres/${genre.name}`}
      onClick={() => dispatch(setFilter(genre.name))}
      className="text-dark"
    >
      {genre.name}
    </NavDropdown.Item>
  ));

  return (
    <Navbar collapseOnSelect className="shadow-sm" expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-warning"
          onClick={() => dispatch(setFilter(''))}
        >
          More Movie Metadata
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/"
              onClick={() => dispatch(setFilter(''))}
            >
              <Nav.Link>
                Movies

              </Nav.Link>
            </Link>
            <NavDropdown title="Genres" id="collasible-nav-dropdown">
              {listGenres}
            </NavDropdown>
            <NavDropdown title="Directors" id="collasible-nav-dropdown">
              {listDirectors}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
          <Nav>
            <NavDropdown title={`Welcome ${user}`} id="collasible-nav-dropdown">
              <NavDropdown.Item
                to="/favorites"
                onClick={() => dispatch(setFilter(''))}
                className="text-dark"
              >
                Favorites
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={`/users/${userData._id}`}
                className="text-dark"
              >
                Account
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to="/"
                className="text-danger"
                onClick={onLoggedOut}
              >
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
