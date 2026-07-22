# Fixed bid gross margin calculator

A lightweight React tool for Demand Chain Systems delivery teams to check gross margin on a fixed bid Salesforce engagement before or during staffing.

## Model

- **Revenue**: a single total contract price (the fixed bid amount from the SOW).
- **Cost**: per-role hours × cost rate, summed across all roles on the engagement.
- **Scope**: labor only. Discounts, contingency/overage buffers, and non-labor costs (travel, licenses) are intentionally out of scope for v1.

Gross margin = contract price − Σ(hours × cost rate)

## Getting started

```bash
npm install
npm run dev
```

Then open the local dev URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

Outputs a static build to `dist/`.

## Stack

- React 18
- Vite
- [lucide-react](https://lucide.dev/) for icons

## Roadmap ideas

- Toggle revenue entry between single contract price and sum of per-role bill rates
- Optional discount %, contingency buffer, and non-labor cost line items
- Save/load named scenarios (e.g. per-opportunity) via local export/import
