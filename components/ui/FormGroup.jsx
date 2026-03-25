export default function FormGroup({ label, htmlFor, children }) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
