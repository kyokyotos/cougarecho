import Form from 'react-bootstrap/Form';

export function ArtistProfile() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
  );
}