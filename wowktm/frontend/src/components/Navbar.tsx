import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="w-full bg-white/90 backdrop-blur shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-primary drop-shadow">WoWKTM</Link>
        <div className="hidden md:flex gap-7 items-center">
          <NavLink to="/products" label="Products" />
          <NavLink to="/shops" label="Shops" />
          <NavLink to="/cart" label="Cart" />
          <NavLink to="/messages" label="Messages" />
          <NavLink to="/login" label="Sign In" />
        </div>
        <button className="md:hidden" onClick={() => setOpen(o => !o)}>
          <span className="text-3xl">☰</span>
        </button>
      </div>
      {/* Mobile Drawer */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto" } : { height: 0 }}
        className="md:hidden bg-white/90 overflow-hidden transition-all"
      >
        <div className="flex flex-col px-4 gap-4 pb-3">
          <NavLink to="/products" label="Products" />
          <NavLink to="/shops" label="Shops" />
          <NavLink to="/cart" label="Cart" />
          <NavLink to="/messages" label="Messages" />
          <NavLink to="/login" label="Sign In" />
        </div>
      </motion.div>
    </nav>
  );
}
function NavLink({ to, label }: { to: string, label: string }) {
  return (
    <Link to={to} className="font-semibold hover:text-primary py-2 transition">
      {label}
    </Link>
  );
}
