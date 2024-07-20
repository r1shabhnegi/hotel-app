"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Footer_1 = __importDefault(require("../components/Footer"));
const Header_1 = __importDefault(require("../components/Header"));
const Hero_1 = __importDefault(require("../components/Hero"));
const Layout = ({ children }) => {
    return (<div className='flex flex-col min-h-dvh'>
      <Header_1.default />
      <Hero_1.default />
      {/* <div className=''>
          <SearchBar />
        </div> */}
      <div className='container flex-1 py-10 mx-auto'>{children}</div>
      <Footer_1.default />
    </div>);
};
exports.default = Layout;
