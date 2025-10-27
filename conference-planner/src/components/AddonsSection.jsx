import React, { useMemo } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { ADDONS } from '../data/items'; // ✅ Import shared data

export default function AddonsSection({ value, onChange }) {
  const handleChange = (id, delta) => {
    const updated = { ...value, [id]: Math.max((value[id] || 0) + delta, 0) };
    onChange(updated);
  };

  // ✅ Compute subtotal dynamically
  const totalCost = useMemo(() => {
    return Object.entries(value || {}).reduce((sum, [id, qty]) => {
      const addon = ADDONS.find(a => a.id === id);
      return addon ? sum + addon.price * qty : sum;
    }, 0);
  }, [value]);

  return (
    <>
      <h3 className="mb-3">Add-ons</h3>
      <Row>
        {ADDONS.map(addon => (
          <Col md={4} lg={3} key={addon.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={addon.image}
                height="180"
                style={{ objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{addon.name}</Card.Title>
                <Card.Text>Price: ${addon.price}</Card.Text>
                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleChange(addon.id, -1)}
                  >
                    -
                  </Button>
                  <span className="mx-3 fw-bold">{value[addon.id] || 0}</span>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleChange(addon.id, 1)}
                  >
                    +
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ✅ Centered Subtotal Button */}
      <div className="text-center mt-4">
        <Button
          variant="primary"
          className="px-5 py-2 fs-5"
          disabled={totalCost === 0}
        >
          Subtotal for Add-ons: ${totalCost.toLocaleString()}
        </Button>
      </div>
    </>
  );
}
