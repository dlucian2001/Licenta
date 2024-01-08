import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../../models/user";
import NavBarLeggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
    loggedInUser: User | null;
    onSignUpClicked: () => void;
    onLoginClicked: () => void;
    onLogoutSuccessful: () => void;
    cartItemCount: number;
}

const NavBar = ({
    loggedInUser,
    onSignUpClicked,
    onLoginClicked,
    onLogoutSuccessful,
    cartItemCount,
}: NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand">
                    YourTicket
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar" className="justify-content-between align-items-center">
                    <Nav className="m-auto">
                        <Nav.Link as={Link} to="/concerts-festivals" className="me-3">
                            Concerte si Festivaluri
                        </Nav.Link>
                        <Nav.Link as={Link} to="/sport" className="me-3">
                            Sport
                        </Nav.Link>
                        <Nav.Link as={Link} to="/for-children" className="me-3">
                            Pentru Copii
                        </Nav.Link>
                        <Nav.Link as={Link} to="/theatre" className="me-3">
                            Teatru
                        </Nav.Link>
                    </Nav>
                    <Nav className="m-auto">
                        <Nav.Link as={Link} to="/cart" className="me-3">
                            <FontAwesomeIcon className="fs-5" icon={faShoppingCart} />
                            <span className="badge bg-danger fs-8">{cartItemCount}</span>
                        </Nav.Link>
                        {loggedInUser ? (
                            <NavBarLeggedInView
                                user={loggedInUser}
                                onLogoutSuccessful={onLogoutSuccessful}
                            />
                        ) : (
                            <NavBarLoggedOutView
                                onLoginClicked={onLoginClicked}
                                onSignUpClicked={onSignUpClicked}
                            />
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
