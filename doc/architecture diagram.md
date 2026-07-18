```mermaid
flowchart TD
    User[👤 User] -->|Uses UI| Browser[🌐 Web Browser]
    
    subgraph Frontend [⚛️ Frontend (Vercel)]
        Login[Login Page]
        Register[Register Page]
        Dashboard[Dashboard Page]
        ApiManagement[API Management Page]
        ApiDetail[API Detail Page]
        History[Monitoring History Page]
    end
    
    subgraph Backend [🔧 Backend (Render)]
        AuthRoutes[Auth Routes]
        ApiRoutes[API Routes]
        DashboardRoutes[Dashboard Routes]
        HistoryRoutes[History Routes]
        Scheduler[Background Scheduler]
    end
    
    Browser --> Frontend
    Frontend -->|JWT Authenticated API Calls| Backend
    
    subgraph Database [(🗄️ Database (PlanetScale)]
        UsersTable[(Users Table)]
        ApisTable[(APIs Table)]
        HistoryTable[(Monitoring History Table)]
    end
    
    Backend --> Database
    Scheduler -->|Health Checks| ExternalAPIs[☁️ External APIs (Monitored APIs)] ```
