import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header>
      <nav className="max-w-screen-xl px-4 mx-auto navbar">
        <div className="navbar-start">
          <Link to="/" className="text-xl font-bold btn btn-ghost">
            <img src="/hacktify.png" alt="Hacktify" width={30} />
            Hacktify
          </Link>
        </div>
        <div className="navbar-end">
          <div className="items-center hidden gap-6 sm:flex">
            <Link to="/" className="link link-hover">
              Home
            </Link>
            <Link to="/favorites" className="link link-hover">
              Favorites
            </Link>
            <Link to="/profile" className="link link-hover">
              Profile
            </Link>
            <button className="btn btn-error text-base-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <details className="block sm:hidden dropdown dropdown-end">
            <summary className="m-1 btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm0 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <Link to="/" className="link link-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="link link-hover">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/profile" className="link link-hover">
                  Profile
                </Link>
              </li>
              <li>
                <button className="btn btn-error text-base-100" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
};

export default Header;
