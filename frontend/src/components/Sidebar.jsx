import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    const navItems = [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/apis", label: "API Management" },
        { path: "/history", label: "Monitoring History" }
    ];

    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">API Monitor</h2>
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
