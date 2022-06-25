import { useEffect, useState, useRef } from "react";
import Container from "./components/Container";
import "./App.css";
import SectionBox from "./components/SectionBox";
import ReactSelect from "react-select";
import ReactSwitch from "react-switch";
import { ItemMap } from "./constants";
import Toast from "./components/Toast";

const reactSelectStyle = { option: (base) => ({ ...base, color: "black" }) };
const selectOptions = Array.from({ length: 11 }, (_, i) => i + 16).map(
  (num) => ({ label: num, value: num })
);

const DEFAULT_LENGTH = 16;
function App() {
  const [state, setState] = useState({
    length: undefined,
    symbols: false,
    numbers: true,
    lowercase: true,
    uppercase: true,
  });
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showTaost, setShowToast] = useState(false);
  const ref = useRef(null);
  const timeout = useRef(null);

  useEffect(() => {
    if (
      !state.symbols &&
      !state.numbers &&
      !state.lowercase &&
      !state.uppercase
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [state]);

  const handleChange = (data) => {
    if (data.hasOwnProperty("label")) {
      setState((prev) => ({ ...prev, length: data }));
      return;
    } else if (data.name) {
      setState((prev) => ({ ...prev, [data.name]: data.checked }));
    }
  };
  const handleSwitchChange = (checked, e, id) => {
    handleChange({ name: id, checked });
  };

  const generatePassword = () => {
    let pass = "";
    const randomMap = new Map();
    const { symbols, numbers, lowercase, uppercase } = state;

    let length = DEFAULT_LENGTH;
    if (state.length) {
      length = state.length.value;
    }

    //setting base limit
    if (symbols) randomMap.set("symbols", 4);
    if (numbers) randomMap.set("numbers", 4);
    if (lowercase) randomMap.set("lowercase", 4);
    if (uppercase) randomMap.set("uppercase", 4);

    let sum = 0;
    const items = [];
    //get total length and available types
    for (let [key, value] of randomMap.entries()) {
      sum += value;
      items.push(key);
    }

    //if total  sum less than length
    if (sum < length) {
      let complement = length - sum;
      while (complement !== 0) {
        if (lowercase && complement) {
          randomMap.set("lowercase", randomMap.get("lowercase") + 1);
          complement--;
        }
        if (uppercase && complement) {
          randomMap.set("uppercase", randomMap.get("uppercase") + 1);
          complement--;
        }
        if (numbers && complement) {
          randomMap.set("numbers", randomMap.get("numbers") + 1);
          complement--;
        }
        if (symbols && complement) {
          randomMap.set("symbols", randomMap.get("symbols") + 1);
          complement--;
        }
      }
    }

    while (pass.length !== length) {
      const randomNum = Math.trunc(Math.random() * items.length);
      const item = items[randomNum];
      if (randomMap.get(item) > 0) {
        const arr = ItemMap[item];
        const randomStr = arr[Math.trunc(Math.random() * arr.length)];
        pass += randomStr;
        randomMap.set(item, randomMap.get(item) - 1);
      }
    }

    setPassword(pass);
  };
  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    if (showTaost) return;
    setShowToast(true);
    console.log("triggered");
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="App">
      <Container>
        <header className="header mb-3">
          <h1 className="p-5 text-5xl font-bold">Password Generator</h1>
        </header>
        <main className="flex flex-col gap-2">
          <SectionBox>
            <div className="flex items-center">
              <h3 className="mr-3">Password length:</h3>
              <ReactSelect
                placeholder="16 (default)"
                name="length"
                value={state.length}
                options={selectOptions}
                styles={reactSelectStyle}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="flex items-center cursor-pointer">
                <ReactSwitch
                  id="symbols"
                  name="symbols"
                  checked={state.symbols}
                  draggable={false}
                  onChange={handleSwitchChange}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                />
                <span className="ml-5">Include symbols: ( e.g. @#$% )</span>
              </label>
            </div>
            <div>
              <label className="flex items-center cursor-pointer">
                <ReactSwitch
                  id="numbers"
                  name="numbers"
                  checked={state.numbers}
                  draggable={false}
                  onChange={handleSwitchChange}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                />
                <span className="ml-5">Include Numbers: ( e.g. 123456 )</span>
              </label>
            </div>
            <div>
              <label className="flex items-center cursor-pointer">
                <ReactSwitch
                  id="lowercase"
                  name="lowercase"
                  checked={state.lowercase}
                  draggable={false}
                  onChange={handleSwitchChange}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                />
                <span className="ml-5">
                  Include Lowercase Characters: ( e.g. abcdefgh )
                </span>
              </label>
            </div>
            <div>
              <label className="flex items-center cursor-pointer">
                <ReactSwitch
                  id="uppercase"
                  name="uppercase"
                  checked={state.uppercase}
                  draggable={false}
                  onChange={handleSwitchChange}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                />
                <span className="ml-5">
                  Include Uppercase Characters: ( e.g. ABCDEFGH )
                </span>
              </label>
            </div>
            <div className="flex justify-center">
              <button
                className={`bg-slate-100 text-black w-fit-content rounded p-3 ${
                  disabled ? "bg-slate-400" : ""
                } ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${
                  !disabled ? "shadow-xl" : ""
                }`}
                onClick={generatePassword}
                disabled={disabled}
              >
                Generate Password
              </button>
            </div>
          </SectionBox>
          <SectionBox>
            <div className="flex text-lime-700">
              <input
                ref={ref}
                type="text"
                value={password}
                placeholder="Your new password"
                className="p-2 rounded w-4/5"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={`w-1/5 bg-slate-100 ${
                  !password ? "bg-slate-400" : ""
                }
                 rounded text-black ml-2 ${password ? "shadow-xl" : ""} ${
                  password ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                onClick={copyPassword}
                disabled={!password}
              >
                Copy
              </button>
            </div>
          </SectionBox>
        </main>
      </Container>
      <Toast message="Copied to clipboard" visible={showTaost} />
    </div>
  );
}

export default App;
