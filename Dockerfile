FROM node:18

WORKDIR /app

# Copy package.json & lockfile
COPY package*.json ./

# Install dependencies dengan legacy mode agar tidak error MUI v4 / React 18
RUN npm install --legacy-peer-deps

# Install dotenv-cli global agar script tidak error
RUN npm install -g dotenv-cli

# Copy seluruh project
COPY . .

# Set default env, nanti override dari docker-compose
ENV NODE_ENV=development
ENV PORT=3000

# WebSocket HMR React akan tetap jalan
EXPOSE 3000

# Jalankan React dev server memakai dotenv dan react-app-rewired
CMD ["sh", "-c", "export PORT=$PORT && dotenv -e .env react-app-rewired start"]
