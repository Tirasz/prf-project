To run the project (node will serve angular SPA):
1. npm run build
2. npm run serve


To start developing in BE only:
1. cd be-garfield-torrent
2. npm run dev
This will restart the server every time something changes inside this folder. 
This wont serve the angular SPA

To start developing in FE:
1. cd fe-garfield-torrent
2. ng s
This will just serve the angular app as usual.

To start developing both at the same time:
1. npm run dev
This will:
  1. Start the node server on port 3000, and will refresh on change
  2. Serve the angular app on port 4200, will refresh on change
