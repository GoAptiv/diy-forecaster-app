import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const compound = (principal, rate, years, withdrawStart) => {
  let data = [];
  let totalWithdrawn = 0;
  let value = principal;

  for (let year = 1; year <= years; year++) {
    let profit = value * rate;
    let withdraw = year >= withdrawStart ? profit : 0;
    totalWithdrawn += withdraw;
    value = value + profit - withdraw;
    data.push({ year, value: Math.round(value), withdrawn: Math.round(totalWithdrawn) });
  }

  return data;
};

export default function DIYForecasterApp() {
  const [investment, setInvestment] = useState(50000);
  const [rate, setRate] = useState(0.12);
  const [years, setYears] = useState(10);
  const [withdrawStart, setWithdrawStart] = useState(6);
  const [forecast, setForecast] = useState([]);

  const runForecast = () => {
    const result = compound(investment, rate, years, withdrawStart);
    setForecast(result);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">DIY Forecaster App</h1>
      <Card>
        <CardContent className="space-y-4 p-4">
          <div>
            <label>Investment Amount ($)</label>
            <Input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Annual Return Rate (%)</label>
            <Slider
              defaultValue={[rate * 100]}
              max={25}
              step={0.25}
              onValueChange={(val) => setRate(val[0] / 100)}
            />
            <div>{(rate * 100).toFixed(2)}%</div>
          </div>
          <div>
            <label>Years to Forecast</label>
            <Slider
              defaultValue={[years]}
              max={20}
              min={1}
              step={1}
              onValueChange={(val) => setYears(val[0])}
            />
            <div>{years} years</div>
          </div>
          <div>
            <label>Start Withdrawals After Year</label>
            <Slider
              defaultValue={[withdrawStart]}
              max={years}
              min={1}
              step={1}
              onValueChange={(val) => setWithdrawStart(val[0])}
            />
            <div>Year {withdrawStart}</div>
          </div>
          <Button onClick={runForecast}>Run Forecast</Button>
        </CardContent>
      </Card>

      {forecast.length > 0 && (
        <Card>
          <CardContent className="p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Year</th>
                  <th className="text-left">Projected Value ($)</th>
                  <th className="text-left">Total Withdrawn ($)</th>
                </tr>
              </thead>
              <tbody>
                {forecast.map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td>{row.value.toLocaleString()}</td>
                    <td>{row.withdrawn.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}