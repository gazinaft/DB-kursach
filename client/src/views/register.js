const display = () => `
  <h1>Register</h1>
  <form id="register-form">
    <div class="container" style="max-width: 600px">
      <h2>Login</h2>
      <div class="form-group has-success">
        <input type="text" placeholder="Your login" class="form-control" id="login" required>
      </div>
  
      <h2>Password</h2>
      <div class="form-group has-success">
        <input type="text" placeholder="Your password" class="form-control" id="password" required="">
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
    <h1>Delete login</h1>
  <form id="delete-form">
    <div class="container" style="max-width: 600px">
      <h2>Login</h2>
      <div class="form-group has-success">
        <input type="text" placeholder="Your login" class="form-control" id="login1" required>
      </div>
  
      <h2>Password</h2>
      <div class="form-group has-success">
        <input type="text" placeholder="Your password" class="form-control" id="password1" required="">
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>`;

export default display;
