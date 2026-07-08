import fs from 'fs';
import path from 'path';

const filePath = path.resolve('.env.easypanel-example');

if (!fs.existsSync(filePath)) {
  console.error(`Error: ${filePath} does not exist.`);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  {
    target: '# REDIS_URL=redis://localhost:6379',
    replacement: 'REDIS_URL=redis://redis:6379'
  },
  {
    target: '# DASHBOARD_PORT=20128',
    replacement: 'DASHBOARD_PORT=20128'
  },
  {
    target: '# API_PORT=20129',
    replacement: 'API_PORT=20129'
  },
  {
    target: '# QDRANT_HOST=qdrant',
    replacement: 'QDRANT_HOST=qdrant'
  },
  {
    target: '# QDRANT_PORT=6333',
    replacement: 'QDRANT_PORT=6333'
  },
  {
    target: '# QDRANT_GRPC_PORT=6334',
    replacement: 'QDRANT_GRPC_PORT=6334'
  },
  {
    target: '# BIFROST_BASE_URL=http://bifrost:8080',
    replacement: 'BIFROST_BASE_URL=http://bifrost:8080'
  },
  {
    target: '# CLIPROXYAPI_HOST=127.0.0.1',
    replacement: 'CLIPROXYAPI_HOST=cliproxyapi'
  },
  {
    target: '# CLIPROXYAPI_PORT=5544',
    replacement: 'CLIPROXYAPI_PORT=8317'
  }
];

let replacedCount = 0;
for (const { target, replacement } of replacements) {
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    replacedCount++;
  } else {
    console.warn(`Warning: Target pattern not found: "${target}"`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully completed ${replacedCount} replacements in .env.easypanel-example`);
