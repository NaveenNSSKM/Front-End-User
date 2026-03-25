export default function DashboardHeader({ userName }) {
  const firstName = userName ? userName.split(' ')[0] : '';

  return (
    <div className="dashboard-header">
      <h1 className="dashboard-title">
        Welcome back, <span style={{ color: 'var(--primary)' }}>{firstName}</span>!
      </h1>
      <p className="dashboard-subtitle">
        Here is your personalized workspace. Create and view your own entries securely.
      </p>
    </div>
  );
}
