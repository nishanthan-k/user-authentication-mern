import "./Login.scss"

const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <h2>Login</h2>
        <input type="text" name="email" id="email" placeholder="Email id" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </div>
    </div>
  );
};

export default Login;
