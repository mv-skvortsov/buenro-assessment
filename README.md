
# Buenro Tech Assessment for Senior Backend Role

## Overview

This project ingests external JSON datasets, stores them in MongoDB, and provides a unified API to search the data with flexible filtering and caching.

---

## Prerequisites

1. **MongoDB Instance**
   - You can run a local MongoDB using the provided `docker-compose.yml`.
   - Or set a custom MongoDB URI using the `MONGODB_URI` variable in the `.env` file.

2. **Package Manager**
   - The project uses **Yarn**.

---

## Running the Application

To install dependencies:
```bash
yarn install
```

To run in development:
```bash
yarn start:dev
```

To run in production:
```bash
yarn start:prod
```

---

## Configuring Data Sources

Edit the configuration file:
```
src/source/config/sources.json
```

Example configuration:
```json
[
  {
    "name": "Source 1",
    "source": {
      "type": "url",
      "url": "https://buenro-tech-assessment-materials.s3.eu-north-1.amazonaws.com/structured_generated_data.json"
    },
    "mapper": "source1",
    "interval": 3600
  },
  {
    "name": "Source 2",
    "source": {
      "type": "url",
      "url": "https://buenro-tech-assessment-materials.s3.eu-north-1.amazonaws.com/large_generated_data.json"
    },
    "mapper": "source2",
    "interval": 86400
  }
]
```

---

## API Documentation

After starting the app, the Swagger API documentation is available at:
```
http://localhost:3000/api/doc
```

---

## Search Endpoint

The unified search endpoint is available at:
```
http://localhost:3000/api/search
```

You can filter by:
- Name (partial text)
- City (partial text)
- Country (partial text)
- Availability (boolean)
- Price per night (exact or range)
- Price segment (low, medium, high)

Pagination is supported via `skip` and `limit`.

---

## Extending the Solution

The system is designed to be easily extendable using a **plugin-like architecture**:
- **Sources**: Add new entries in `sources.json` with a new `type` (e.g., `url`, `s3`).
- **Data Mappers**: Implement a new mapper class (e.g., `source3`) to transform new data structures into the unified model.

The system will automatically pick up new sources and mappers as long as they are properly registered.

---

## Caching

Search results are cached in memory using NestJS CacheModule.
- You can extend this to use **Redis** or another cache backend by updating the CacheModule configuration.

---

## Summary

✅ Modular, extensible ingestion and search pipeline  
✅ Unified MongoDB-backed storage  
✅ Flexible filtering with pagination  
✅ Swagger API docs  
✅ Built-in caching, ready for Redis upgrade
