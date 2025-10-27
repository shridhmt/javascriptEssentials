import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomSection from './RoomSection';
import AddonsSection from './AddonsSection';
import MealsSection from './MealsSection';
import SummaryModal from './SummaryModal';

export default function ProductSelectionPage() {
  const [rooms, setRooms] = useState({});
  const [addons, setAddons] = useState({});
  const [meals, setMeals] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [activeLink, setActiveLink] = useState('venue');
  const navigate = useNavigate();

  const handleNavClick = (sectionId) => {
    setActiveLink(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container-fluid p-0">
      {/* Header with dark bg and active link */}
      <header className="d-flex flex-wrap justify-content-between align-items-center px-4 py-3 mb-4 bg-dark shadow-sm sticky-top">
        <div className="d-flex align-items-center flex-wrap">
          {/* Clickable title - navigates to landing page */}
          <h2
            className="me-4 mb-0 text-light cursor-pointer"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Conference Expense Planner
          </h2>

          {/* Navigation links */}
          <nav className="nav">
            <button
              onClick={() => handleNavClick('venue')}
              className={`btn btn-link nav-link px-3 ${
                activeLink === 'venue' ? 'text-warning fw-bold' : 'text-light'
              }`}
            >
              Venue
            </button>
            <button
              onClick={() => handleNavClick('addons')}
              className={`btn btn-link nav-link px-3 ${
                activeLink === 'addons' ? 'text-warning fw-bold' : 'text-light'
              }`}
            >
              Add-ons
            </button>
            <button
              onClick={() => handleNavClick('meals')}
              className={`btn btn-link nav-link px-3 ${
                activeLink === 'meals' ? 'text-warning fw-bold' : 'text-light'
              }`}
            >
              Meals
            </button>
          </nav>
        </div>

        {/* Show Summary Button */}
        <button
          className="btn btn-outline-light"
          onClick={() => setShowSummary(true)}
        >
          Show Details
        </button>
      </header>

      {/* Page Sections */}
      <div className="container py-4">
        <section id="venue" className="mb-5">
          <RoomSection value={rooms} onChange={setRooms} />
        </section>

        <section id="addons" className="mb-5">
          <AddonsSection value={addons} onChange={setAddons} />
        </section>

        <section id="meals" className="mb-5">
          <MealsSection value={meals} onChange={setMeals} />
        </section>
      </div>

      {/* Summary Modal */}
      <SummaryModal
        show={showSummary}
        onClose={() => setShowSummary(false)}
        rooms={rooms}
        addons={addons}
        meals={meals}
      />
    </div>
  );
}
