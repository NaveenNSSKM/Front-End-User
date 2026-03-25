export default function Button({ children, variant = 'primary', ...props }) {
  const className = variant === 'outline' ? 'btn btn-outline' : 'btn';
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
