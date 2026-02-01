#
# BUILDER: Build the website
#
FROM node:22-slim AS builder

# Clone and Install Repo
WORKDIR /site
COPY . .

# Build the Site
RUN yarn install
RUN yarn build


#
# PRODUCTION
#
FROM node:22-slim

# Install Deps
RUN apt update && apt install -y curl

# Copy built site
WORKDIR /site
COPY --from=builder /site/.output/ .

# Run the site
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE ${PORT}
CMD [ "node", "/site/server/index.mjs" ]