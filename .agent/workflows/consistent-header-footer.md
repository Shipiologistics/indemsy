---
description: Global Header and Footer rule - All public website pages
---

# Consistent Header and Footer

## Rule
- **Public-facing pages**: Use the website Header and Footer (automatically handled by `LayoutWrapper`)
- **Admin pages (`/admin/*`)**: Use dashboard-specific Header/Sidebar (no website header/footer)
- **User dashboard (`/dashboard/*`)**: Use dashboard-specific headers (no website header/footer)

## Implementation Architecture

### LayoutWrapper Component (`app/components/LayoutWrapper/LayoutWrapper.tsx`)
The `LayoutWrapper` component conditionally renders the website Header/Footer based on the route:
- Routes starting with `/admin` or `/dashboard` → NO website header/footer (dashboards have their own)
- All other routes → Website Header + Footer

### Root Layout (`app/layout.tsx`)
```tsx
<LayoutWrapper>
    {children}
</LayoutWrapper>
```

## Correct Structure (Public Page)
```tsx
import styles from './page.module.css';

export default function SomePage() {
    return (
        <div className={styles.main}>
            {/* Only page content here - Header/Footer auto-added by LayoutWrapper */}
            <h1>Page Title</h1>
            <p>Content...</p>
        </div>
    );
}
```

## Incorrect Structure (DO NOT DO THIS)
```tsx
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function SomePage() {
    return (
        <>
            <Header />
            <main>Content</main>
            <Footer />
        </>
    );
}
```

## Dashboard Pages Structure
Dashboard pages have their own layouts:

### Admin Dashboard (`app/admin/(dashboard)/layout.tsx`)
- Uses `Sidebar` + dashboard `Header`
- NO website header/footer

### User Dashboard (`app/dashboard/page.tsx`)
- Has its own internal header
- NO website header/footer

## Applies To
| Route Pattern | Header | Footer | Notes |
|--------------|--------|--------|-------|
| `/` (home)   | Website | Website | Public page |
| `/about-us`, `/blog/*`, `/claim`... | Website | Website | Public pages |
| `/admin/*`   | Dashboard | None | Admin panel |
| `/dashboard` | Dashboard | None | User claim tracking |

## Adding New Routes
- **Public page**: Just create the page, LayoutWrapper handles Header/Footer
- **Dashboard routes**: Add route to `DASHBOARD_ROUTES` in `LayoutWrapper.tsx` if needed
