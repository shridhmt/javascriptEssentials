import React, { useMemo } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { MEALS } from '../data/items'; // ✅ imported from data file

export default function MealsSection({ value, onChange }) {
  const handleCheckboxChange = (id, checked) => {
    const updated = { ...value };
    if (!updated.meals) updated.meals = [];

    if (checked) {
      updated.meals = [...(updated.meals || []), id];
    } else {
      updated.meals = updated.meals.filter(mid => mid !== id);
    }
    onChange(updated);
  };

  const handlePeopleChange = (num) => {
    const updated = { ...value, people: Math.max(parseInt(num || 0, 10), 0) };
    onChange(updated);
  };

  const totalCost = useMemo(() => {
    const { meals = [], people = 0 } = value;
    return meals.reduce((sum, id) => {
      const meal = MEALS.find(m => m.id === id);
      return meal ? sum + meal.price * people : sum;
    }, 0);
  }, [value]);

  return (
    <>
      <h3 className="mb-3">Meals</h3>

      <Card className="shadow-sm p-4 mb-4">
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Number of People</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={value.people || ''}
            placeholder="Enter total number of people"
            onChange={(e) => handlePeopleChange(e.target.value)}
          />
        </Form.Group>

        <Row>
          {MEALS.map(meal => (
            <Col md={6} lg={4} key={meal.id} className="mb-3">
              <Form.Check
                type="checkbox"
                id={meal.id}
                label={`${meal.name} — $${meal.price} per person`}
                checked={value.meals?.includes(meal.id) || false}
                onChange={(e) => handleCheckboxChange(meal.id, e.target.checked)}
              />
            </Col>
          ))}
        </Row>
      </Card>

      <div className="text-center mt-4">
        <Button
          variant="primary"
          className="px-5 py-2 fs-5"
          disabled={totalCost === 0}
        >
          Total Meal Cost: ${totalCost.toLocaleString()}
        </Button>
      </div>
    </>
  );
}
