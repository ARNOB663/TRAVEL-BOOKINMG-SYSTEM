import '../styles/adminpanel.css';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, ListGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './../utils/config';
import useFetch from './../hooks/useFetch';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tourRating, setTourRating] = useState(null);
  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours`);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/tours/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        return alert(result.message);
      }

      alert('Tour deleted successfully');
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/tours/${id}`);
  };

  const handleCreate = () => {
    navigate('/admin/tours/create');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tours]);

  return (
    <section>
      <Container>
        {loading && <h4 className="text-center pt-5">Loading...</h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}

        {!loading && !error && (
          <Row>
            <Col lg="12">
              <div className="admin_dashboard">
                <h1 className="text-center">Admin Panel</h1>
                <Button onClick={handleCreate} color="primary" className="mb-4">
                  Create New Tour
                </Button>
                <ListGroup>
                  {tours?.map((tour) => (
                    <div className="tour_item" key={tour._id}>
                      <div className="tour_info">
                        <h4>{tour.title}</h4>
                        <p>{tour.desc}</p>
                        <div className="d-flex align-items-center">
                          <Button
                            color="warning"
                            onClick={() => handleUpdate(tour._id)}
                            className="mr-2"
                          >
                            Update
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => handleDelete(tour._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default AdminDashboard;
