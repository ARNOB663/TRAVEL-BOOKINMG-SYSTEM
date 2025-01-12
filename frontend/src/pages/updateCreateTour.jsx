import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from './../utils/config';
import AdminDashboard from './adminPanel';
import { Container, Form, Button } from 'reactstrap';
import '../styles/tourform.css';

const TourForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tourData, setTourData] = useState({
    title: '',
    desc: '',
    price: '',
    city: '',
    distance: '',
    maxGroupSize: '',
    address: '',
    photo: null, // added photo state
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Fetch existing tour data for editing
      fetch(`${BASE_URL}/tours/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTourData(data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to load tour data');
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const method = id ? 'PUT' : 'POST';
      const endpoint = id ? `/tours/${id}` : '/tours';
      const formData = new FormData();
      // Adding form data including photo
      Object.keys(tourData).forEach((key) => {
        formData.append(key, tourData[key]);
      });

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message);
        setLoading(false);
        return;
      }

      alert('Tour saved successfully');
      navigate('/adminPanel');
    } catch (error) {
      setError('Error saving tour');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setTourData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value, // handle file input
    }));
  };

  return (
    <section className="tour-form-container classroom">
      <Container>
        <Form onSubmit={handleSubmit}>
          <h1>{id ? 'Update Tour' : 'Create New Tour'}</h1>
          {loading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            name="title"
            value={tourData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="desc"
            value={tourData.desc}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            type="number"
            name="price"
            value={tourData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            type="text"
            name="city"
            value={tourData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            type="number"
            name="distance"
            value={tourData.distance}
            onChange={handleChange}
            placeholder="Distance"
            required
          />
          <input
            type="number"
            name="maxGroupSize"
            value={tourData.maxGroupSize}
            onChange={handleChange}
            placeholder="Max Group Size"
            required
          />
          <input
            type="text"
            name="address"
            value={tourData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />

          {/* Show current photo if available */}
          {tourData.photo && (
            <div className="current-photo">
              <img
                src={tourData.photo} // This will display the current image
                alt="Current Tour"
                style={{ width: '200px', height: 'auto', marginBottom: '15px' }}
              />
              <p>Current Photo</p>
            </div>
          )}

          <input
            type="file"
            name="photo"
            onChange={handleChange}
            accept="image/*"
          />
          <Button type="submit" color="primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Tour'}
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default TourForm;
