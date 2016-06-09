(function() {
  angular.module('SpotifyApp',['spotify'])
    .controller('spotifyController', spotifyCtrl)
    .config(function (SpotifyProvider) {
      SpotifyProvider.setClientId('c79d6d2d5ac74b39a6048c4342d0fb7e')
      SpotifyProvider.setRedirectUri('http://localhost:8080')
      SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public')
    // If you already have an auth token
      SpotifyProvider.setAuthToken('BQD-UTAeEMGmVEgCQgqOudfHL-s6WefJKN-oFPBGq_IGRj9N4dRLSLouFib-Y-6_l4iCoG22zVvT5_pV8ZF7Gw')
    })

    spotifyCtrl.$inject = ['$http', 'Spotify'];

    function spotifyCtrl($http, Spotify){
      var spotifyCtrl = this
      spotifyCtrl.title = 'Spotify Featured Playlist'
      spotifyCtrl.showTracks = false;
      spotifyCtrl.names = ["US","NL"];

      //--------------------------------------------------------
      spotifyCtrl.getTracksByPlaylist = function(user, id) {
        Spotify.getPlaylistTracks(user, id)  
          .then(function(response) {
          console.log(response);
          spotifyCtrl.showTracks = true;
          spotifyCtrl.selectedPlaylistTracks = response.items;
        }, function(error) {
          console.error(error);
        })
      }

      spotifyCtrl.closeTracksWindow = function() {
        spotifyCtrl.showTracks = false;
      }

      spotifyCtrl.getPlaylists = function () {
        Spotify.getFeaturedPlaylists({country: spotifyCtrl.country})
        .then(function (response) {
          console.log(spotifyCtrl.country);
          console.log(response);
          // the message returns a '.' at the end. lets remove it.
          spotifyCtrl.message = response.message.substr(0, response.message.length - 1);
          spotifyCtrl.playlists = response.playlists.items;
        }, 
        function(error) {
          console.error(error);
        })
      }      

    

      //--------------------------------------------------------
      
    }
}());
