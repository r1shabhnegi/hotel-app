"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_tsx_1 = __importDefault(require("./App.tsx"));
require("./index.css");
const react_query_1 = require("@tanstack/react-query");
const AppContext_tsx_1 = require("./contexts/AppContext.tsx");
const SearchContext_tsx_1 = require("./contexts/SearchContext.tsx");
const queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
});
client_1.default.createRoot(document.getElementById('root')).render(<react_1.default.StrictMode>
    <react_query_1.QueryClientProvider client={queryClient}>
      <AppContext_tsx_1.AppContextProvider>
        <SearchContext_tsx_1.SearchContextProvider>
          <App_tsx_1.default />
        </SearchContext_tsx_1.SearchContextProvider>
      </AppContext_tsx_1.AppContextProvider>
    </react_query_1.QueryClientProvider>
  </react_1.default.StrictMode>);
