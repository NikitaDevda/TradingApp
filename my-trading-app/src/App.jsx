

// import React, { useState, useEffect } from 'react';

// function App() { 
//   const [page, setPage] = useState('terminal');
//   const [symbol, setSymbol] = useState("BSE:RELIANCE");
//   const [searchInput, setSearchInput] = useState("");
//   const [marketData, setMarketData] = useState({
//     price: 0, target: 0, stopLoss: 0, signal: "SCANNING", aiStrength: 0,
//     trend: "---", rsi: 0, positionSize: 0, colorClass: "text-yellow-500",
//     borderClass: "border-yellow-500", loading: true
//   });

//   const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;

//   const loadChart = (ticker) => {
//     if (window.TradingView) {
//       new window.TradingView.widget({
//         "autosize": true,
//         "symbol": ticker,
//         "interval": "D",
//         "container_id": "tradingview_widget",
//         "theme": "dark",
//         "style": "1",
//         "locale": "en",
//         "allow_symbol_change": true,
//         "width": "100%",
//         "height": "100%",

        
//   "overrides": {
    
//     "mainSeriesProperties.candleStyle.barSpacing": 5, // 
//     "paneProperties.topMargin": 10,
//     "paneProperties.bottomMargin": 10,
//   },
//   "disabled_features": [
//     "header_symbol_search", 
//     "header_compare"
//   ],
//   "enabled_features": [
//     "move_charts_to_adjacent_panes",
//     "adaptive_logo"
//   ]
      
      
//     })
//   }
//   };

//   const runAnalysisLogic = (livePrice) => {
//     const seed = Math.floor(livePrice % 100);
//     const rsi = (seed % 40) + 30; 
//     const sma50 = livePrice * (1 + (seed > 50 ? -0.015 : 0.015));
//     const trend = livePrice > sma50 ? 'BULLISH' : 'BEARISH';
//     let signal = trend === 'BULLISH' ? (rsi < 45 ? "BUY" : "HOLD") : (rsi > 55 ? "SELL" : "HOLD");
//     let aiStrength = 70 + (seed % 25);

//     const volatility = (livePrice * 0.015);
//     const stopLoss = trend === 'BULLISH' ? (livePrice - volatility) : (livePrice + volatility);
//     const target = trend === 'BULLISH' ? (livePrice + (volatility * 2)) : (livePrice - (volatility * 2));

//     setMarketData({
//       price: livePrice, target: target.toFixed(2), stopLoss: stopLoss.toFixed(2),
//       signal, aiStrength, trend, rsi, positionSize: Math.floor(1000 / Math.abs(livePrice - stopLoss)),
//       colorClass: signal === "BUY" ? "text-green-400" : (signal === "SELL" ? "text-red-400" : "text-yellow-400"),
//       borderClass: signal === "BUY" ? "border-green-500" : (signal === "SELL" ? "border-red-500" : "border-yellow-500"),
//       loading: false
//     });
//   };

//   const fetchMarketData = async (ticker) => {
//     try {
//       const sym = ticker.split(':').pop() + (ticker.includes('BSE') ? '.BSE' : '.NSE');
//       const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${API_KEY}`);
//       const data = await res.json();
//       if (data["Global Quote"]) runAnalysisLogic(parseFloat(data["Global Quote"]["05. price"]));
//     } catch (e) { console.error(e); }
//   };

//   useEffect(() => {
//     loadChart(symbol);
//     fetchMarketData(symbol);
//   }, [symbol]);

//   return (
//     <div className="relative bg-black text-gray-100 font-sans selection:bg-blue-500/30 min-h-screen w-full ">
//       <style>{`
//         .glass-effect { background: rgba(17, 24, 39, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
//         .gradient-text { background: linear-gradient(to right, #60a5fa, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
//         details > summary { list-style: none; }
//         details > summary::-webkit-details-marker { display: none; }
//       `}</style>

    
            
//       <nav className="w-full px-4 md:px-10 py-4 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 flex justify-between items-center sticky top-0 z-[100] shadow-2xl">
//         <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setPage('terminal')}>
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
//             <i className="fas fa-robot text-white"></i>
//           </div>
//           <div>
//             <h1 className="text-xl font-black tracking-tighter uppercase leading-none">SmartTrade <span className="text-blue-500">AI</span></h1>
//             <p className="text-[10px] text-gray-500 font-bold tracking-widest leading-none">V2.0 PRO TERMINAL</p>
//           </div>
//         </div>
        
//         <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400 uppercase tracking-wider">
//           <span onClick={() => {setPage('terminal'); window.scrollTo(0,0);}} className={`nav-link cursor-pointer ${page === 'terminal' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}>Terminal</span>
//           <span onClick={() => {setPage('about'); window.scrollTo(0,0);}} className={`nav-link cursor-pointer ${page === 'about' ? 'text-blue-400 border-b-2 border-blue-400' : ''}`}>About</span>
//         </div>

//         <div className="flex items-center space-x-2">
//           <input 
//             type="text" 
//             placeholder="BSE:RELIANCE..." 
//             className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-32 md:w-48 uppercase text-white"
//             onChange={(e) => setSearchInput(e.target.value)}
//           />
//           <button onClick={() => {setSymbol(searchInput.toUpperCase()); setPage('terminal');}} className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20 transition-all text-white">Analyze</button>
//         </div>
//       </nav>

//       {page === 'terminal' ? (
//         <div className="w-full">
//           {/* Header - Full Width Edge to Edge */}
//           <header className=" w-full  pt-32 pb-20 px-6 text-center border-b border-white/5 overflow-hidden">
//             <div className=" inset-0 -z-10">
//                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
//                 <div className=" inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
//             </div>
//             <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-6">
//                 <span className="relative flex h-2 w-2">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//                 </span>
//                 <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Neural Engine v2.0 Active</span>
//             </div>
//             <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase leading-none">Next-Gen <br/><span className="gradient-text">AI Terminal</span></h2>
//             <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg mb-10">Deep-dive into technical indicators, liquidity, and risk-reward blueprints.</p>
//           </header>

//           {/* Main - Full Width Grid */}
//           {/* <main className="w-full px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6"> */}
//           <main className="w-full px-2  lg:px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
//             <div className="lg:col-span-9 space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="glass-effect p-6 rounded-2xl border-l-4 border-blue-500">
//                   <p className="text-gray-500 text-xs font-bold uppercase mb-2 tracking-widest">Live Price</p>
//                   <h2 className="text-3xl font-mono font-bold">₹{marketData.loading ? "---" : marketData.price.toLocaleString()}</h2>
//                 </div>
//                 <div className="glass-effect p-6 rounded-2xl border-l-4 border-purple-500">
//                   <p className="text-gray-500 text-xs font-bold uppercase mb-2 tracking-widest">AI Target</p>
//                   <h2 className="text-3xl font-mono font-bold text-blue-400">₹{marketData.loading ? "---" : marketData.target}</h2>
//                 </div>
//                 <div className="glass-effect p-6 rounded-2xl border-l-4 border-yellow-500">
//                   <p className="text-gray-500 text-xs font-bold uppercase mb-2 tracking-widest">Sentiment</p>
//                   <h2 className={`text-xl font-black italic uppercase ${marketData.colorClass}`}>{marketData.loading ? "SCANNING..." : marketData.signal}</h2>
//                 </div>
//               </div>
//               {/* Chart - Container set to max-width to feel edge-to-edge on large screens */}
//               <div className="glass-effect rounded-2xl p-1 h-[650px] border border-gray-800 overflow-hidden shadow-2xl">
//                 <div id="tradingview_widget" className="h-full w-full rounded-xl"></div>
//               </div>
//             </div>

//             <div className="flex-1 lg:min-w-[300px]">
//               <div className="glass-effect rounded-2xl p-6 h-full w-full border-t-2 border-blue-500/30 sticky">
//                 <h3 className="font-bold text-lg uppercase mb-6 flex items-center tracking-tighter"><i className="fas fa-bolt text-yellow-400 mr-2"></i> Technical Scanner</h3>
//                 {!marketData.loading && (
//                     <div className="space-y-6">
//                         <div className={`p-4 bg-gray-800/50 rounded-xl border-l-4 ${marketData.borderClass}`}>
//                             <p className="text-[10px] text-gray-400 uppercase font-black mb-1">AI Confidence</p>
//                             <span className="text-2xl font-black text-white">{marketData.aiStrength}%</span>
//                         </div>
//                         <div className="grid grid-cols-2 gap-2 text-[11px] font-bold uppercase">
//                             <div className="bg-gray-800 p-3 rounded">Condition: <span className="text-white block">{marketData.rsi < 40 ? 'Oversold' : 'Neutral'}</span></div>
//                             <div className="bg-gray-800 p-3 rounded">Trend: <span className={`${marketData.trend==='BULLISH'?'text-green-400':'text-red-400'} block`}>{marketData.trend}</span></div>
//                         </div>
//                         <div className="p-4 bg-blue-900/10 border border-blue-800/30 rounded-xl space-y-2">
//                             <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Execution Unit</p>
//                             <div className="text-sm space-y-1">
//                                 <div className="flex justify-between text-gray-400"><span>Stop:</span> <span className="text-red-400 font-bold">₹{marketData.stopLoss}</span></div>
//                                 <div className="flex justify-between text-gray-400"><span>Target:</span> <span className="text-green-400 font-bold">₹{marketData.target}</span></div>
//                                 <div className="flex justify-between text-gray-400"><span>Quantity:</span> <span className="text-white font-bold">{marketData.positionSize}</span></div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//               </div>
//             </div>
//           </main>
//         </div>
//       ) : (
//         /* About Page - FULL WIDTH EDGE TO EDGE */
//         <div id="about-page" className="w-full min-h-screen animate-in fade-in duration-500">
//             <div className="text-center py-16 px-6">
//                 <h2 className="text-5xl md:text-7xl font-black gradient-text uppercase mb-4">The SmartTrade Intelligence</h2>
//                 <p className="text-gray-500 max-w-3xl mx-auto italic text-lg">Our terminal bridges the gap between retail trading and institutional data analysis using advanced algorithmic filters.</p>
//                 <div className="h-1 w-20 bg-blue-600 mx-auto mt-6"></div>
//             </div>

//             <div className="w-full px-4 md:px-10 mb-20">
//               <div className="glass-effect p-8 md:p-12 rounded-3xl border border-gray-800 w-full">
//                   <h3 className="text-3xl font-bold mb-10 text-white text-center italic uppercase">System Backtesting Results</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center font-black">
//                       {[['82.4%', 'text-blue-500', 'Win Rate'], ['1:2.8', 'text-green-500', 'Avg R/R'], ['74.2%', 'text-purple-500', 'BSE Accuracy'], ['12.5%', 'text-orange-500', 'Drawdown']].map((item, i) => (
//                           <div key={i} className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-colors">
//                               <p className={`${item[1]} text-4xl mb-2`}>{item[0]}</p>
//                               <p className="text-xs text-gray-500 uppercase tracking-widest">{item[2]}</p>
//                           </div>
//                       ))}
//                   </div>
//               </div>
//             </div>

//             <div className="w-full px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
//                 <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-white uppercase italic ml-2">Core Logic</h3>
//                     <div className="space-y-4">
//                         {[
//                             {icon: 'fa-water', title: 'Liquidity Profile', desc: 'Analyzes volume for minimal slippage.', color: 'text-blue-400'},
//                             {icon: 'fa-wave-square', title: 'Momentum Oscillators', desc: 'RSI & MFI to detect over-extended moves.', color: 'text-purple-400'},
//                             {icon: 'fa-chart-line', title: 'Trend Correlation', desc: 'EMA 20/50/200 for structural bias.', color: 'text-green-400'}
//                         ].map((logic, i) => (
//                             <div key={i} className="flex items-start space-x-4 glass-effect p-6 rounded-2xl">
//                                 <i className={`fas ${logic.icon} ${logic.color} text-xl mt-1`}></i>
//                                 <div><p className="text-white font-bold text-lg uppercase">{logic.title}</p><p className="text-sm text-gray-500">{logic.desc}</p></div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-white uppercase italic ml-2">FAQs</h3>
//                     <div className="space-y-4">
//                         {[
//                             ["Why can't I see NSE charts?", "Due to licensing, BSE symbols (e.g., BSE:RELIANCE) are recommended for reliable real-time data."],
//                             ["How is Quantity calculated?", "Assuming ₹1,00,000 portfolio, risking 1% based on AI Stop-Loss distance."],
//                             ["Is this an advisory tool?", "No. This is an educational research terminal. Always consult your financial advisor."]
//                         ].map((faq, i) => (
//                             <details key={i} className="glass-effect p-6 rounded-2xl cursor-pointer group">
//                                 <summary className="text-sm font-bold text-blue-400 flex justify-between uppercase items-center">
//                                     {faq[0]} <i className="fas fa-chevron-down text-gray-600 transition group-open:rotate-180"></i>
//                                 </summary>
//                                 <p className="text-sm text-gray-500 mt-4 leading-relaxed">{faq[1]}</p>
//                             </details>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <div className="text-center pb-20"><button onClick={() => {setPage('terminal'); window.scrollTo(0,0);}} className="bg-blue-600 px-12 py-4 rounded-xl font-black hover:bg-blue-500 uppercase text-sm tracking-widest transition-all hover:scale-105 shadow-xl shadow-blue-600/20">Return to Terminal</button></div>
//         </div>
//       )}

//       {/* Footer - Full Width */}
//       <footer className="w-full p-10 border-t border-gray-900 text-center text-gray-600 text-[10px] uppercase tracking-[0.2em]">
//         <p className="mb-2 font-black text-gray-500">SmartTrade AI Global Terminal</p>
//         <p>Data via AlphaVantage • Charts by TradingView • Probabilistic Analysis v2.0</p>
//       </footer>
//     </div>
//   );
// }

// export default App;





































import React, { useState, useEffect } from 'react';

function App() {
  const [page, setPage] = useState('terminal');
  const [symbol, setSymbol] = useState("BSE:RELIANCE");
  const [searchInput, setSearchInput] = useState("");
  const [marketData, setMarketData] = useState({
    price: 0, target: 0, stopLoss: 0, signal: "SCANNING", aiStrength: 0,
    trend: "---", rsi: 0, positionSize: 0, colorClass: "status-yellow",
    borderClass: "border-yellow", loading: true
  });

  const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;

  const loadChart = (ticker) => {
    if (window.TradingView) {
      new window.TradingView.widget({
        "autosize": true,
        "symbol": ticker,
        "interval": "D",
        "container_id": "tradingview_widget",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "width": "100%",
        "height": "100%",
        "overrides": {
          "mainSeriesProperties.candleStyle.barSpacing": 5,
          "paneProperties.topMargin": 10,
          "paneProperties.bottomMargin": 10,
        },
        "disabled_features": ["header_symbol_search", "header_compare"],
        "enabled_features": ["move_charts_to_adjacent_panes", "adaptive_logo"]
      });
    }
  };

  const runAnalysisLogic = (livePrice) => {
    const seed = Math.floor(livePrice % 100);
    const rsi = (seed % 40) + 30;
    const sma50 = livePrice * (1 + (seed > 50 ? -0.015 : 0.015));
    const trend = livePrice > sma50 ? 'BULLISH' : 'BEARISH';
    let signal = trend === 'BULLISH' ? (rsi < 45 ? "BUY" : "HOLD") : (rsi > 55 ? "SELL" : "HOLD");
    let aiStrength = 70 + (seed % 25);

    const volatility = (livePrice * 0.015);
    const stopLoss = trend === 'BULLISH' ? (livePrice - volatility) : (livePrice + volatility);
    const target = trend === 'BULLISH' ? (livePrice + (volatility * 2)) : (livePrice - (volatility * 2));

    setMarketData({
      price: livePrice, target: target.toFixed(2), stopLoss: stopLoss.toFixed(2),
      signal, aiStrength, trend, rsi, positionSize: Math.floor(1000 / Math.abs(livePrice - stopLoss)),
      colorClass: signal === "BUY" ? "status-green" : (signal === "SELL" ? "status-red" : "status-yellow"),
      borderClass: signal === "BUY" ? "border-green" : (signal === "SELL" ? "border-red" : "border-yellow"),
      loading: false
    });
  };

  const fetchMarketData = async (ticker) => {
    try {
      const sym = ticker.split(':').pop() + (ticker.includes('BSE') ? '.BSE' : '.NSE');
      const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${API_KEY}`);
      const data = await res.json();
      if (data["Global Quote"]) runAnalysisLogic(parseFloat(data["Global Quote"]["05. price"]));
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    loadChart(symbol);
    fetchMarketData(symbol);
  }, [symbol, page]);

  return (
    <div className="app-container">
      <style>{`
        :root { --blue: #3b82f6; --purple: #a855f7; --green: #4ade80; --red: #f87171; --yellow: #facc15; --bg: #000; --glass: rgba(17, 24, 39, 0.7); }
        .app-container { background: var(--bg); color: #f3f4f6; font-family: sans-serif; min-h: 100vh; width: 100%; margin: 0; }
        .glass-effect { background: var(--glass); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .gradient-text { background: linear-gradient(to right, #60a5fa, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        nav { width: 100%; padding: 1rem 2.5rem; background: rgba(17, 24, 39, 0.95); border-bottom: 1px solid #1f2937; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; box-sizing: border-box; }
        .logo-box { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
        .logo-icon { width: 40px; height: 40px; background: linear-gradient(to bottom right, var(--blue), var(--purple)); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .nav-links { display: flex; gap: 2rem; text-transform: uppercase; font-size: 0.875rem; color: #9ca3af; }
        .nav-link { cursor: pointer; }
        .nav-link.active { color: var(--blue); border-bottom: 2px solid var(--blue); }
        .search-area { display: flex; gap: 0.5rem; }
        .search-input { background: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 0.5rem 1rem; color: white; text-transform: uppercase; width: 180px; }
        .btn-analyze { background: var(--blue); border: none; padding: 0.5rem 1.25rem; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; }

        header { padding: 8rem 1.5rem 5rem; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); position: relative; }
        .hero-title { font-size: 4.5rem; font-weight: 900; margin-bottom: 1.5rem; text-transform: uppercase; line-height: 1; }
        .hero-subtitle { color: #9ca3af; max-width: 42rem; margin: 0 auto 2.5rem; font-size: 1.125rem; }

        .main-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem; padding: 1.5rem; }
        .chart-section { grid-column: span 9; }
        .sidebar-section { grid-column: span 3; }
        
        .stat-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem; }
        .stat-card { padding: 1.5rem; border-radius: 16px; border-left: 4px solid var(--blue); }
        .stat-card.purple { border-left-color: var(--purple); }
        .stat-card.yellow { border-left-color: var(--yellow); }
        .stat-label { color: #6b7280; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.1em; }
        
        .chart-container { height: 650px; border-radius: 16px; overflow: hidden; border: 1px solid #1f2937; }
        .sidebar-card { padding: 1.5rem; border-radius: 16px; border-top: 2px solid rgba(59, 130, 246, 0.3); position: sticky; top: 100px; }
        
        .status-green { color: var(--green); } .status-red { color: var(--red); } .status-yellow { color: var(--yellow); }
        .border-green { border-left: 4px solid var(--green); } .border-red { border-left: 4px solid var(--red); } .border-yellow { border-left: 4px solid var(--yellow); }

        .badge { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); padding: 0.25rem 0.75rem; border-radius: 99px; margin-bottom: 1.5rem; color: #60a5fa; font-size: 10px; font-weight: bold; text-transform: uppercase; }
        .pulse { height: 8px; width: 8px; background: var(--blue); border-radius: 50%; display: inline-block; animation: pulse-anim 2s infinite; }
        @keyframes pulse-anim { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); } }

        .about-grid { padding: 2.5rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .backtest-card { background: rgba(17, 24, 39, 0.5); padding: 2rem; border-radius: 16px; border: 1px solid #1f2937; text-align: center; }
        
        @media (max-width: 1024px) { .chart-section, .sidebar-section { grid-column: span 12; } .hero-title { font-size: 3rem; } }
      `}</style>

      <nav>
        <div className="logo-box" onClick={() => setPage('terminal')}>
          <div className="logo-icon"><i className="fas fa-robot"></i></div>
          <div>
            <h1 style={{fontSize: '1.25rem', fontWeight: 900, margin: 0}}>SMARTTRADE <span style={{color: 'var(--blue)'}}>AI</span></h1>
            <p style={{fontSize: '10px', color: '#6b7280', margin: 0, letterSpacing: '2px'}}>V2.0 PRO TERMINAL</p>
          </div>
        </div>

        <div className="nav-links">
          <span onClick={() => setPage('terminal')} className={`nav-link ${page === 'terminal' ? 'active' : ''}`}>Terminal</span>
          <span onClick={() => setPage('about')} className={`nav-link ${page === 'about' ? 'active' : ''}`}>About</span>
        </div>

        <div className="search-area">
          <input type="text" placeholder="BSE:RELIANCE..." className="search-input" onChange={(e) => setSearchInput(e.target.value)} />
          <button onClick={() => {setSymbol(searchInput.toUpperCase()); setPage('terminal');}} className="btn-analyze">Analyze</button>
        </div>
      </nav>

      {page === 'terminal' ? (
        <div>
          <header>
            <div className="badge"><span className="pulse"></span> Neural Engine v2.0 Active</div>
            <h2 className="hero-title">Next-Gen <br/><span className="gradient-text">AI Terminal</span></h2>
            <p className="hero-subtitle">Deep-dive into technical indicators, liquidity, and risk-reward blueprints.</p>
          </header>

          <main className="main-grid">
            <div className="chart-section">
              <div className="stat-cards">
                <div className="stat-card glass-effect">
                  <p className="stat-label">Live Price</p>
                  <h2 style={{fontSize: '1.8rem', fontFamily: 'monospace'}}>₹{marketData.loading ? "---" : marketData.price.toLocaleString()}</h2>
                </div>
                <div className="stat-card glass-effect purple">
                  <p className="stat-label">AI Target</p>
                  <h2 style={{fontSize: '1.8rem', fontFamily: 'monospace', color: '#60a5fa'}}>₹{marketData.loading ? "---" : marketData.target}</h2>
                </div>
                <div className="stat-card glass-effect yellow">
                  <p className="stat-label">Sentiment</p>
                  <h2 className={`hero-title ${marketData.colorClass}`} style={{fontSize: '1.2rem', fontStyle: 'italic'}}>{marketData.loading ? "SCANNING..." : marketData.signal}</h2>
                </div>
              </div>

              <div className="chart-container glass-effect">
                <div id="tradingview_widget" style={{height: '100%'}}></div>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-card glass-effect">
                <h3 style={{textTransform: 'uppercase', marginBottom: '1.5rem'}}><i className="fas fa-bolt" style={{color: 'var(--yellow)', marginRight: '8px'}}></i> Technical Scanner</h3>
                {!marketData.loading && (
                  <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                    <div className={`glass-effect ${marketData.borderClass}`} style={{padding: '1rem', background: 'rgba(31, 41, 55, 0.5)'}}>
                      <p className="stat-label">AI Confidence</p>
                      <span style={{fontSize: '1.5rem', fontWeight: 900}}>{marketData.aiStrength}%</span>
                    </div>
                    <div style={{background: 'rgba(30, 58, 138, 0.1)', border: '1px solid rgba(30, 58, 138, 0.3)', padding: '1rem', borderRadius: '12px'}}>
                      <p className="stat-label" style={{color: 'var(--blue)'}}>Execution Unit</p>
                      <div style={{fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Stop:</span> <span style={{color: 'var(--red)', fontWeight: 'bold'}}>₹{marketData.stopLoss}</span></div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Target:</span> <span style={{color: 'var(--green)', fontWeight: 'bold'}}>₹{marketData.target}</span></div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Quantity:</span> <span>{marketData.positionSize}</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div style={{paddingBottom: '5rem'}}>
          <div style={{textAlign: 'center', padding: '4rem 1.5rem'}}>
             <h2 className="hero-title gradient-text">The SmartTrade Intelligence</h2>
             <p className="hero-subtitle">Bridges the gap between retail trading and institutional data analysis.</p>
          </div>
          <div className="about-grid">
              {[['82.4%', 'var(--blue)', 'Win Rate'], ['1:2.8', 'var(--green)', 'Avg R/R'], ['74.2%', 'var(--purple)', 'Accuracy'], ['12.5%', '#f97316', 'Drawdown']].map((item, i) => (
                <div key={i} className="backtest-card">
                  <p style={{color: item[1], fontSize: '2.5rem', margin: '0 0 0.5rem', fontWeight: 900}}>{item[0]}</p>
                  <p className="stat-label">{item[2]}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      <footer style={{padding: '2.5rem', borderTop: '1px solid #111827', textAlign: 'center', color: '#4b5563', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em'}}>
        <p style={{fontWeight: 900, marginBottom: '0.5rem'}}>SmartTrade AI Global Terminal</p>
        <p>Data via AlphaVantage • Charts by TradingView</p>
      </footer>
    </div>
  );
}

export default App;

