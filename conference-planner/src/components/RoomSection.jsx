import React, { useMemo } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { ROOMS } from '../data/items'; // ✅ Import shared data file

export default function RoomSection({ value, onChange }) {
  const handleChange = (id, delta) => {
    const updated = { ...value, [id]: Math.max((value[id] || 0) + delta, 0) };
    onChange(updated);
  };

  // ✅ Compute subtotal dynamically
  const totalCost = useMemo(() => {
    return Object.entries(value || {}).reduce((sum, [id, qty]) => {
      const room = ROOMS.find(r => r.id === id);
      return room ? sum + room.price * qty : sum;
    }, 0);
  }, [value]);

  return (
    <>
      <h3 className="mb-3">Venue</h3>
      <Row>
        {ROOMS.map(room => (
          <Col md={4} lg={3} key={room.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={room.image}
                height="180"
                style={{ objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{room.name}</Card.Title>
                <Card.Text>
                  Capacity: {room.capacity} <br />
                  Price: ${room.price}
                </Card.Text>
                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleChange(room.id, -1)}
                  >
                    -
                  </Button>
                  <span className="mx-3 fw-bold">{value[room.id] || 0}</span>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleChange(room.id, 1)}
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
          Subtotal for Rooms: ${totalCost.toLocaleString()}
        </Button>
      </div>
    </>
  );
}
