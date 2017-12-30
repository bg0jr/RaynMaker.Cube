
# Use cases

1. As a user i want to collect new data easily
   - the user spcifies some initial criteria he searches data for
   - the machine provdes some "best guesses" from local DB and connected remote sources
   - the user chooses and/or corrects data
   - data is collected locally and stored structured with timestamp and origin
2. As a user i want to search for data based on
   - concrete assets (e.g. based on ISIN)
   - generic screening parameters
3. data maintenance
   - remove obsolete data
   - correct data
   - merge data
   - comment data
   - report inconsistencies

# Architecture

- separate UI from "Cube service"
- service uses max parallelization as IO bound
  - actors?
  - suave.io based REST service?

     
     
      