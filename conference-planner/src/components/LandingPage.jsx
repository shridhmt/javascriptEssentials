import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div
      className="landing d-flex align-items-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1400&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <div
        style={{
          background: 'rgba(0,0,0,0.6)',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container>
          <Row className="align-items-center">
            {/* LEFT: Title + CTA */}
            <Col md={5} className="text-md-start text-center mb-5 mb-md-0">
              <h1 className="display-4 fw-bold mb-3">
                Conference Expense Planner
              </h1>
              <p className="fs-5 text-light mb-4">
                Plan your next major event with us.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="px-4 py-2"
                onClick={() => nav('/select')}
              >
                Get Started
              </Button>
            </Col>

            {/* RIGHT: Description */}
            <Col md={7}>
              <div className="bg-dark bg-opacity-50 p-4 rounded-3">
                <p className="fs-5 mb-3">
                  The <strong>Conference Expense Planner</strong> helps you
                  simplify event budgeting and organization from start to finish.
                </p>
                <p className="fs-5 mb-3">
                  Choose the perfect venue, customize your meeting spaces, and
                  add the right audio-visual equipment to suit your audience.
                </p>
                <p className="fs-5 mb-3">
                  Plan meals for guests, track costs in real time, and stay
                  within your budget effortlessly.
                </p>
                <p className="fs-5 mb-3">
                  Whether it’s a small board meeting or a large-scale summit,
                  SummitSpace ensures every detail is covered.
                </p>
                <p className="fs-5 mb-0">
                  Save time, reduce stress, and make smarter decisions — all in
                  one place.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
