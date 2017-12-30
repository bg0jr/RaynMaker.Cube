
# Use cases

1. As a user i want to collect new data easily
   - i want to specify some initial criteria i am looking for
   - the system provdes some "best guesses" from local DB and connected remote sources
   - i am choosing and/or corrects data
   - data is collected locally and stored structured with timestamp and origin
2. As a user i want to search for data based on
   - concrete assets (e.g. based on ISIN)
   - generic screening parameters
3. As a user i want to actively maintain the collected data
   - i want to remove obsolete data
   - i want to correct data
   - i want to get notified about any potential inconsistencies

# Architecture

- separate UI from "Cube service"
- service uses max parallelization as IO bound
  - actors?
  - suave.io based REST service?

     
     
      