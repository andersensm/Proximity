$(document).ready(function() {
  var authClient = new OktaAuth({
    url: 'https://dev-718531.oktapreview.com',
    clientId: '0oaeh5zb0oT1wYElN0h7'
    redirectUri: 'https://guarded-garden-97987.herokuapp.com/'
  });

  authClient.signOut()
    .then(function() {
      console.log('successfully logged out');
      window.location.href = 'https://guarded-garden-97987.herokuapp.com/';
    })
    .fail(function(err) {
      console.error(err);
      window.location.href = 'https://guarded-garden-97987.herokuapp.com/';
    });

  localStorage.clear();
});
