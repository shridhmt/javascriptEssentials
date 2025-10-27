import Modal from 'react-bootstrap/Modal';
import { ROOMS, ADDONS, MEALS } from '../data/items';

export default function SummaryModal({ show, onClose, rooms = {}, addons = {}, meals = {} }) {
  const lookup = (arr, id) => arr.find(i => i.id === id);

  const rows = [];

  // 🏨 Rooms
  Object.entries(rooms).forEach(([id, qty]) => {
    if (qty > 0) {
      const r = lookup(ROOMS, id);
      if (r) {
        rows.push({
          name: r.name,
          unit: r.price,
          qty,
          subtotal: r.price * qty,
        });
      }
    }
  });

  // 🎤 Add-ons
  Object.entries(addons).forEach(([id, qty]) => {
    if (qty > 0) {
      const a = lookup(ADDONS, id);
      if (a) {
        rows.push({
          name: a.name,
          unit: a.price,
          qty,
          subtotal: a.price * qty,
        });
      }
    }
  });

  // 🍽️ Meals (new structure: { meals: [ids], people: number })
  if (meals?.meals?.length && meals?.people > 0) {
    meals.meals.forEach(id => {
      const m = lookup(MEALS, id);
      if (m) {
        rows.push({
          name: m.name,
          unit: m.price,
          qty: meals.people,
          subtotal: m.price * meals.people,
        });
      }
    });
  }

  const total = rows.reduce((sum, r) => sum + r.subtotal, 0);

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Expense Summary</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr className='text-center'>
              <th>Name</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((r, idx) => (
                <tr key={idx} className='text-center'>
                  <td className='text-center'>{r.name}</td>
                  <td>${r.unit.toLocaleString()}</td>
                  <td>{r.qty}</td>
                  <td>${r.subtotal.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">
                  No selections made yet
                </td>
              </tr>
            )}
          </tbody>
          {rows.length > 0 && (
            <tfoot>
              <tr className="table-dark fw-bold">
                <td colSpan="3" className="text-end">
                  Total
                </td>
                <td>${total.toLocaleString()}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
