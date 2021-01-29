FROM node:14-alpine as build

WORKDIR /app
COPY . .

# Install dependencies
RUN npm run setup

# Build the client
# RUN npm run client:build

ENV USE_STATIC true
ENV REACT_APP_MAPBOX_ACCESS_TOKEN ${REACT_APP_MAPBOX_ACCESS_TOKEN}

# Expose the client
EXPOSE 3000

# Run both the API and Client
CMD ["npm","run", "production"]
