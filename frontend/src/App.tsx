import './index.css';
import { useState } from 'react';
import { getCashChange } from './lib/services/cashChangeService';
import { validateInput } from './lib/utils/validateInput';

const App = () => {
  const [totalPrice, setTotalPrice] = useState<string>('');
  const [cashPaid, setCashPaid] = useState<string>('');
  const [currency, setCurrency] = useState<string>('EUR');
  const [cashChange, setCashChange] = useState<any>(null);

  const handleTotalPriceChange = (value: string) => {
    const validated = validateInput(value);
    setTotalPrice(validated);
  };

  const handleCashPaidChange = (value: string) => {
    const validated = validateInput(value);
    setCashPaid(validated);
  };

  const reset = () => {
    setTotalPrice('');
    setCashPaid('');
    setCashChange(null);
  };

  const submit = async () => {
    const cashChange = await getCashChange(totalPrice, cashPaid, currency);
    setCashChange(cashChange);

    setTotalPrice('');
    setCashPaid('');
  };

  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen bg-[#e3dbce] text-black text-xl">
      <div className="border-[8px] border-transparent rounded-[15px] !outline !outline-sky-950/10 shadow-md">
        <div className="w-[500px] min-h-[750px] flex flex-col items-start justify-start gap-4 h-full p-10 bg-[#f4f0eb] rounded-[10px]">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-start justify-start gap-2">
              <label htmlFor="totalPrice">Total Price</label>
              <input
                type="text"
                className="w-48 py-1 px-2 border-b-[1px] border-white/0 rounded-md transition-all duration-300 ease-in-out
              focus:border-sky-950/40 hover:!bg-slate-100 focus-within:!bg-slate-300/25 placeholder:text-gray-950/50 placeholder:italic"
                value={totalPrice}
                onChange={(e) => handleTotalPriceChange(e.target.value)}
                placeholder="0.00"
                inputMode="decimal"
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-2">
              <label htmlFor="cashPaid">Cash Amount</label>
              <input
                type="text"
                className="w-48 py-1 px-2 border-b-[1px] border-white/0 rounded-md transition-all duration-300 ease-in-out
              focus:border-sky-950/40 hover:!bg-slate-300/35 focus-within:!bg-slate-300/25 placeholder:text-gray-950/50 placeholder:italic"
                value={cashPaid}
                onChange={(e) => handleCashPaidChange(e.target.value)}
                placeholder="0.00"
                inputMode="decimal"
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-start justify-start gap-2">
              <label htmlFor="currency">Paid in</label>
              <select
                className="w-48 py-1 px-2 border-b-[1px] border-white/0 rounded-md transition-all duration-300 ease-in-out
              focus:border-sky-950/40 hover:!bg-slate-300/35 focus-within:!bg-slate-300/25 placeholder:text-gray-950/50 placeholder:italic"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <button
              className="self-end w-48 py-1 px-2.5 bg-white/50 active:scale-97 hover:scale-105 !outline !outline-white rounded-[6px] transition-all duration-200 cursor-pointer"
              onClick={submit}
            >
              Get cash change
            </button>
          </div>

          {cashChange && (
            <div className="flex flex-col gap-6 w-full mt-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold">
                  Total Change: {cashChange.totalChange} {cashChange.currency}
                </h3>
              </div>

              {Object.keys(cashChange.changeNotes).length > 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xl font-semibold text-sky-950/80">Notes</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(cashChange.changeNotes).map(([note, count]) => (
                      <div
                        key={note}
                        className="flex flex-col items-center justify-center p-4 bg-white/60 rounded-lg shadow-sm border border-sky-950/10"
                      >
                        <div className="text-3xl font-bold text-sky-950">
                          {note} {cashChange.currency}
                        </div>
                        <div className="text-lg text-sky-950/70">x {count as number}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {Object.keys(cashChange.changeCoins).length > 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xl font-semibold text-sky-950/80">Coins</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(cashChange.changeCoins).map(([coin, count]) => (
                      <div
                        key={coin}
                        className="flex flex-col items-center justify-center p-3 bg-white/40 rounded-lg shadow-sm border border-sky-950/10"
                      >
                        <div className="text-xl font-bold text-sky-950">
                          {coin} {cashChange.currency}
                        </div>
                        <div className="text-base text-sky-950/70">x {count as number}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="w-48 py-1 px-2.5 bg-white/50 active:scale-97 hover:scale-105 !outline !outline-white rounded-[6px] transition-all duration-200 cursor-pointer"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
