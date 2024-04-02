Some remarks

- Start the app: `docker compose up`
- go to `http://localhost:3000/api` for swagger
- start watching a stock symbol, for example AAPL with the PUT endpoint
- wait at least one minute to get at least one data point

I tried to follow clean architecture, certainly not 100% perfect, because the task was time boxed.
The use case layer imports the infrastructure, this is a violation of the clean architecture,
in real app, I would create some proxy classes :)
