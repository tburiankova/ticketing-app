export default ({
  signUp,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  errors,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h1>{signUp ? 'Sign Up' : 'Sign In'}</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className="btn-primary">{signUp ? 'Sign Up' : 'Sign In'}</button>
    </form>
  );
};
