FROM node:14-alpine as build

WORKDIR /app
COPY . .

# Install dependencies
RUN npm run setup

# Build the client
# RUN npm run client:build

ENV USE_STATIC true
ARG BLD_ARG_REACT_APP_MAPBOX_ACCESS_TOKEN
ENV REACT_APP_MAPBOX_ACCESS_TOKEN ${BLD_ARG_REACT_APP_MAPBOX_ACCESS_TOKEN}

# Expose the client
EXPOSE 3000

# Run both the API and Client
CMD ["npm","run", "production"]
